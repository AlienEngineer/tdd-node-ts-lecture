import { Controller, Get, Post } from '@nestjs/common';
import { BuyResult, Vehicle, VehicleServices } from '../services';

@Controller()
export class VehiclesController {
  constructor(private readonly appService: VehicleServices) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getVehicles(userId: string): Vehicle[] {
    return undefined;
  }

  @Get()
  getVehicle(userId: string, vehicleId: string): Vehicle {
    return undefined;
  }

  @Post()
  buyVehicle(userId: string, vehicleId: string): BuyResult {
    return undefined;
  }
}
