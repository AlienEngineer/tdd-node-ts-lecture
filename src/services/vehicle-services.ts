import { VehicleGateway, VehicleModel } from '../gateways';

export class VehicleServices {
  constructor(private readonly gateway: VehicleGateway) {}

  getVehicles(userId: string): Vehicle[] {
    return this.gateway
      .getVehicles(userId)
      .filter(this.undefinedModels)
      .map(this.mapModelToVehicle);
  }

  getVehicle(userId: string, vehicleId: string): Vehicle {
    return undefined;
  }

  undefinedModels(model: VehicleModel) {
    return model !== undefined;
  }

  mapModelToVehicle(model: VehicleModel) {
    return {
      yearOfConstruction:
        model.dateOfConstruction == null
          ? undefined
          : model.dateOfConstruction.getFullYear(),
      model: model.model,
      vehicleId: model.vehicleId,
    } as Vehicle;
  }
}
export class Vehicle {
  vehicleId: string;
  model: string;
  yearOfConstruction: number;
}
