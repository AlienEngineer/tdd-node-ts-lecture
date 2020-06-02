export class VehicleServices {
  getHello(): string {
    return 'Hello World!';
  }
  getVehicles(userId: string): Vehicle[] {
    return undefined;
  }
}
export class Vehicle {
  vehicleId: string;
  model: string;
  yearOfConstruction: number;
}
