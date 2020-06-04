import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from '.';
import { appModuleMetadata } from '../app.module';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule(appModuleMetadata).compile();
  });

  function makeController(): VehiclesController {
    return app.get<VehiclesController>(VehiclesController);
  }
});
