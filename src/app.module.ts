import { Module } from '@nestjs/common';
import { VehiclesController } from './controllers';
import { VehicleServices } from './services';
import { SecurityGateway, VehicleGateway } from './gateways';

export const appModuleMetadata = {
  imports: [],
  controllers: [VehiclesController],
  providers: [VehicleServices, VehicleGateway, SecurityGateway],
  exports: [VehicleGateway],
};

@Module(appModuleMetadata)
export class AppModule {}
