import { UnknownUserGatewayException, VehicleGateway, SecurityGateway, SecurityCheckState, CheckResult } from "../gateways";

export class VehicleServices {

  constructor(
    private readonly vehicleGateway: VehicleGateway,
    private readonly securityGateway: SecurityGateway) {
  }

  getVehicles(userId: string): Vehicle[] {
    let retryCounter = 3;

    if (userId == '' || userId == null) return [];

    var checkResult: CheckResult = this.securityGateway.checkUser(userId);
    if (checkResult == null) {
      throw new UnthorizedUserException();
    } else if (checkResult.state == SecurityCheckState.UNSAFE) {
      throw new UnthorizedUserException();
    } else if (checkResult.state == SecurityCheckState.REMOVED) {
      throw new UnthorizedUserException();
    }  

    do {
      try {
        return this.getVehiclesFromGateway(userId);
      } catch (e) {
        if (e instanceof UnknownUserGatewayException) {
          throw new UnknownUserException;
        }
        retryCounter--;
        if (retryCounter == 0) throw e;
      }
    } while (retryCounter > 0);

  }

  private getVehiclesFromGateway(userId: string): Vehicle[] {
    return this.vehicleGateway.getVehicles(userId)?.map(vehicle => {
      return {
        vehicleId: vehicle.vehicleId,
        model: vehicle.model,
        yearOfConstruction: vehicle.dateOfConstruction?.getFullYear()
      } as Vehicle;
    }) || [];
  }

}

export class UnknownUserException implements Error {
  message: string;
  name: string;
}

export class UnthorizedUserException implements Error {
  message: string;
  name: string;
}

export class Vehicle {
  vehicleId: string;
  model: string;
  yearOfConstruction: number;
}