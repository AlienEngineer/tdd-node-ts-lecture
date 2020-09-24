import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { appModuleMetadata } from "../src/app.module";
import { INestApplication } from '@nestjs/common';
import { VehicleServices } from "../src/services";
import { makeVehicleServices } from "../src/controllers/vehicle-services.mock";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule(appModuleMetadata)
      .overrideProvider(VehicleServices).useValue(makeVehicleServices())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('api/v1/vehicles/ (GET) - 404 NotFound', () => {
    return request(app.getHttpServer())
      .get('/api/v1/vehicles/')
      .expect(404);
  });

  it('api/v1/vehicles/1 (GET) - 200 ok', () => {
    return request(app.getHttpServer())
      .get('/api/v1/vehicles/1')
      .expect(200);
  });

  it('api/v1/vehicles/Error (GET) - 500 InternalServerError', () => {
    return request(app.getHttpServer())
      .get('/api/v1/vehicles/Error')
      .expect(500);
  });

  it("api/v1/vehicles/1 (GET) - vehicle list", () => {
    return request(app.getHttpServer())
      .get("/api/v1/vehicles/1")
      .expect(200)
      .expect([
        {
          vehicleId: "v1",
          model: "S1"
        }
      ]);
  });

});
