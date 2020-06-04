import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from '.';
import { appModuleMetadata } from '../app.module';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Vehicle, VehicleServices } from '../services';
import { instance, mock, when } from 'ts-mockito';
import { GatewayException } from '../gateways';

describe('VehiclesController', () => {
  let app: TestingModule;

  function makeVehicleServices(): VehicleServices {
    const mockedType = mock(VehicleServices);

    when(mockedType.getVehicles('1')).thenReturn([
      {
        model: 'my model',
        vehicleId: '1',
        yearOfConstruction: 2020,
      } as Vehicle,
    ]);

    when(mockedType.getVehicles('2')).thenReturn([]);
    when(mockedType.getVehicles('gatewayError')).thenThrow(
      new GatewayException(),
    );
    when(mockedType.getVehicles('unknownError')).thenThrow(
      new Error('some unknown exception'),
    );

    return instance(mockedType);
  }

  beforeAll(async () => {
    app = await Test.createTestingModule(appModuleMetadata)
      .overrideProvider(VehicleServices)
      .useValue(makeVehicleServices())
      .compile();
  });

  function makeController(): VehiclesController {
    return app.get(VehiclesController);
  }

  describe('getVehicles', () => {
    it('throws BAD REQUEST when user id is not provided', () => {
      const controller = makeController();

      try {
        controller.getVehicles(undefined);
        fail('expect to throw exception');
      } catch (e) {
        expect(e).toEqual(
          new HttpException('missing user id', HttpStatus.BAD_REQUEST),
        );
      }
    });

    it('throws FAILED DEPENDENCY when services fail to get the vehicles', () => {
      const controller = makeController();

      try {
        controller.getVehicles('gatewayError');
        fail('expect to throw exception');
      } catch (e) {
        expect(e).toEqual(
          new HttpException(
            'unable to get the vehicles',
            HttpStatus.FAILED_DEPENDENCY,
          ),
        );
      }
    });

    it('throws Error when services fail', () => {
      const controller = makeController();

      try {
        controller.getVehicles('unknownError');
        fail('expect to throw exception');
      } catch (e) {
        expect(e).toEqual(new Error('some unknown exception'));
      }
    });

    it('returns vehicles for the given user id', () => {
      const controller = makeController();

      const vehicles = controller.getVehicles('1');

      expect(vehicles).toEqual([
        {
          model: 'my model',
          vehicleId: '1',
          yearOfConstruction: 2020,
        } as Vehicle,
      ]);
    });

    it('returns empty list when services return empty list', () => {
      const controller = makeController();

      const vehicles = controller.getVehicles('2');

      expect(vehicles).toEqual([]);
    });
  });
});
