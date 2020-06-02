export class VehicleGateway {
  getVehicles(userId: string): VehicleModel[] {
    return undefined;
  }
  getVehicle(userId: string, vehicleId: string): VehicleModel {
    return undefined;
  }
}

export class VehicleModel {
  vehicleId: string;
  model: string;
  dateOfConstruction: Date;
}
