import { Vehicle, VehicleServices } from './vehicle-services';
import { VehicleGateway, VehicleModel } from '../gateways';
import { instance, mock, when } from 'ts-mockito';

describe('VehicleServices', () => {
  function makeVehiclesGateway(): VehicleGateway {
    const mockType = mock(VehicleGateway);

    when(mockType.getVehicles('0')).thenReturn([
      {
        dateOfConstruction: new Date(2020, 1),
        vehicleId: '1',
        model: 'my model',
      } as VehicleModel,
    ]);

    when(mockType.getVehicles('1')).thenReturn([
      {
        dateOfConstruction: new Date(2019, 1),
      } as VehicleModel,
    ]);

    when(mockType.getVehicles('listWithUndefined')).thenReturn([
      {
        dateOfConstruction: new Date(2020, 1),
        vehicleId: '7',
        model: 'my model 7',
      } as VehicleModel,
      undefined,
      {
        dateOfConstruction: new Date(2017, 1),
        vehicleId: '2',
        model: 'my model 2',
      } as VehicleModel,
    ]);

    when(mockType.getVehicles('undefinedDate')).thenReturn([
      {
        dateOfConstruction: undefined,
      } as VehicleModel,
    ]);

    when(mockType.getVehicles('nullDate')).thenReturn([
      {
        dateOfConstruction: null,
      } as VehicleModel,
    ]);

    return instance(mockType);
  }

  function makeVehicleServices(): VehicleServices {
    return new VehicleServices(makeVehiclesGateway());
  }

  describe('getVehicles', () => {
    it('returns vehicles from the gateway', () => {
      const service = makeVehicleServices();

      const vehicles = service.getVehicles('0');

      expect(vehicles).toEqual([
        {
          yearOfConstruction: 2020,
          vehicleId: '1',
          model: 'my model',
        } as Vehicle,
      ]);
    });

    it('returns vehicles from the gateway that are not undefined', () => {
      const service = makeVehicleServices();

      const vehicles = service.getVehicles('listWithUndefined');

      expect(vehicles).toEqual([
        {
          yearOfConstruction: 2020,
          vehicleId: '7',
          model: 'my model 7',
        } as Vehicle,
        {
          yearOfConstruction: 2017,
          vehicleId: '2',
          model: 'my model 2',
        } as Vehicle,
      ]);
    });

    it('when year of date is 2019 maps out to year of construction 2019', () => {
      const service = makeVehicleServices();

      const vehicles = service.getVehicles('1');

      expect(vehicles).toEqual([
        {
          yearOfConstruction: 2019,
        } as Vehicle,
      ]);
    });

    it('when date is undefined maps out to year of construction undefined', () => {
      const service = makeVehicleServices();

      const vehicles = service.getVehicles('undefinedDate');

      expect(vehicles).toEqual([
        {
          yearOfConstruction: undefined,
        } as Vehicle,
      ]);
    });

    it('when date is null maps out to year of construction undefined', () => {
      const service = makeVehicleServices();

      const vehicles = service.getVehicles('nullDate');

      expect(vehicles).toEqual([
        {
          yearOfConstruction: undefined,
        } as Vehicle,
      ]);
    });
  });
});
