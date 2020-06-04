import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Vehicle, VehicleServices } from '../services';
import { GatewayException } from '../gateways';

@Controller()
export class VehiclesController {
  constructor(private readonly appService: VehicleServices) {}

  @Get()
  getVehicles(userId: string): Vehicle[] {
    if (userId === undefined) {
      throw new HttpException('missing user id', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.appService.getVehicles(userId);
    } catch (e) {
      if (e instanceof GatewayException) {
        throw new HttpException(
          'unable to get the vehicles',
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
      throw e;
    }
  }

  @Get()
  getVehicle(userId: string, vehicleId: string): Vehicle {
    return undefined;
  }

  @Post()
  buyVehicle(userId: string, vehicleId: string): void {
    return undefined;
  }
}
