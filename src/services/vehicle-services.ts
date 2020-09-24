export class VehicleServices {
  getVehicles(userId: string): Vehicle[] {
    return undefined;
  }
}

export class UnknownUserException implements Error {
  message: string;
  name: string;
}

export class Vehicle {
  vehicleId: string;
  model: string;
  yearOfConstruction: number;
}
