import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { UnknownUserException, Vehicle, VehicleServices } from "../services";

@Controller('api/v1/vehicles')
export class VehiclesController {
  constructor(private readonly appService: VehicleServices) {}

  @Get(':userId')
  getVehicles(@Param('userId') userId: string): Vehicle[] {
    try {
      return this.appService.getVehicles(userId);
    } catch (e) {
      if (e instanceof UnknownUserException) {
        throw new HttpException(
          'user doesn\'t exist',
          HttpStatus.FORBIDDEN
        );
      }
      throw e;
    }

  }
}
