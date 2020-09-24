import { Test, TestingModule } from "@nestjs/testing";
import { VehiclesController } from ".";
import { appModuleMetadata } from "../app.module";
import { Vehicle, VehicleServices } from "../services";
import { HttpException, HttpStatus } from "@nestjs/common";
import { makeVehicleServices } from "./vehicle-services.mock";

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule(appModuleMetadata)
      .overrideProvider(VehicleServices)
      .useValue(makeVehicleServices())
      .compile();
  });

  function makeController(): VehiclesController {
    return app.get<VehiclesController>(VehiclesController);
  }

  it("when getting vehicles throws an exception, thrown that exception", () => {
    const controller = makeController();

    try {
      controller.getVehicles('Error');
      fail('should throw exception');
    }
    catch (e) {
      expect(e).toEqual(new Error('myError'));
    }
  });

  it("return 403 Forbidden for the given user (UnknownUser)", () => {
    const controller = makeController();

    try {
      controller.getVehicles('UnknownUser');
      fail('should throw exception');
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect((e as HttpException).getStatus()).toEqual(HttpStatus.FORBIDDEN);
      expect((e as HttpException).getResponse()).toEqual('user doesn\'t exist');
    }
  });

  it("return vehicle list for the given user (1)", () => {
    const controller = makeController();

    const vehicles = controller.getVehicles('1');

    expect(vehicles).toEqual([
      {
        vehicleId: 'v1',
        model: 'S1',
      } as Vehicle
    ]);
  });

});
