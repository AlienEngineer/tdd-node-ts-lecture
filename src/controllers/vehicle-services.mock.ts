import { instance, mock, when } from "ts-mockito";
import { UnknownUserException, Vehicle, VehicleServices } from "../services";

export function makeVehicleServices() {
  const services = mock(VehicleServices);

  when(services.getVehicles("1")).thenReturn([
    {
      vehicleId: "v1",
      model: "S1",
    } as Vehicle
  ]);

  when(services.getVehicles('Error'))
    .thenThrow(new Error('myError'));

  when(services.getVehicles('UnknownUser'))
    .thenThrow(new UnknownUserException());

  return instance(services);
}
