export class VehicleGateway {
  getVehicles(userId: string): VehicleModel[] {
    return undefined;
  }
}

export class VehicleModel {
  vehicleId: string;
  model: string;
  dateOfConstruction: Date;
}

export class UnknownUserGatewayException implements Error {
  message: string;
  name: string;
}