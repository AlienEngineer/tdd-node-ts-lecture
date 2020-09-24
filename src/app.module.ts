import { Module } from '@nestjs/common';
import { VehiclesController } from './controllers';
import { VehicleServices } from './services';
import { VehicleGateway } from './gateways';

export const appModuleMetadata = {
  imports: [],
  controllers: [VehiclesController],
  providers: [VehicleServices, VehicleGateway],
};

@Module(appModuleMetadata)
export class AppModule {}
