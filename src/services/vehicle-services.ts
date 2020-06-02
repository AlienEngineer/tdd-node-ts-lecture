export class VehicleServices {
  getHello(): string {
    return 'Hello World!';
  }
  getVehicles(userId: string): Vehicle[] {
    return undefined;
  }
  getVehicle(userId: string, vehicleId: string): Vehicle {
    return undefined;
  }
  buyVehicle(userId: string, vehicleId: string): BuyResult {
    return undefined;
  }
}
export class Vehicle {
  vehicleId: string;
  model: string;
  yearOfConstruction: number;
}

export class BuyResult {
  ownerId: string;
  failedReason: string;
}
