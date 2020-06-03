export class VehicleGateway {
  getVehicles(userId: string): VehicleModel[] {
    return undefined;
  }
  getVehicle(userId: string, vehicleId: string): VehicleModel {
    return undefined;
  }
  buyVehicle(userId: string, vehicleId: string): void {}
}

export class VehicleModel {
  vehicleId: string;
  model: string;
  dateOfConstruction: Date;
}
