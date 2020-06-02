export class VehicleServices {
  getVehicles(userId: string): Vehicle[] {
    return undefined;
  }
  getVehicle(userId: string, vehicleId: string): Vehicle {
    return undefined;
  }
}
export class Vehicle {
  vehicleId: string;
  model: string;
  yearOfConstruction: number;
}
