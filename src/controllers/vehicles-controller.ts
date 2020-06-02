import { Controller, Get, Post } from '@nestjs/common';
import { BuyResult, Vehicle, VehicleServices } from '../services';

@Controller()
export class VehiclesController {
  constructor(private readonly appService: VehicleServices) {}

  @Get()
  getVehicles(userId: string): Vehicle[] {
    return undefined;
  }
}
