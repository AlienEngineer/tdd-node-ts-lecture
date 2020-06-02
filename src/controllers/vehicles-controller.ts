import { Controller, Get } from '@nestjs/common';
import { Vehicle, VehicleServices } from '../services';

@Controller()
export class VehiclesController {
  constructor(private readonly appService: VehicleServices) {}

  @Get()
  getVehicles(userId: string): Vehicle[] {
    return undefined;
  }
}
