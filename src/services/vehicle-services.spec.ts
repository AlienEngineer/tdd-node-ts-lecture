
import { mock, instance, when } from 'ts-mockito';
import { VehicleGateway, SecurityGateway, VehicleModel, UnknownUserGatewayException, SecurityCheckState, CheckResult } from '../gateways';
import { UnknownUserException, UnthorizedUserException, Vehicle, VehicleServices } from './vehicle-services';


function makeVehicleGateway(actionRetry?: (userId: String) => VehicleModel[]) {
  const gateway = mock(VehicleGateway);

  when(gateway.getVehicles('1')).thenReturn([{
    vehicleId: '(⌐■_■)'
  } as VehicleModel])

  when(gateway.getVehicles('2')).thenReturn([{
    vehicleId: '¯\_(ツ)_/¯',
    model: 'M3',
    dateOfConstruction: new Date(2020, 1, 1)
  }])

  when(gateway.getVehicles('UnknownUser')).thenThrow(new UnknownUserGatewayException())

  when(gateway.getVehicles('toThrowException')).thenThrow(new Error())

  when(gateway.getVehicles('retryAction')).thenCall(actionRetry)

  return instance(gateway);
}

function makeSecurityGateway() {
  const gateway = mock(SecurityGateway);

  ['1', '2', 'UnknownUser', 'toThrowException', 'retryAction', 'nullTest']
  .forEach(userId => {
    when(gateway.checkUser(userId)).thenReturn({
        state: SecurityCheckState.AUTHORIZED,
    } as CheckResult)
  });

  when(gateway.checkUser('UNSAFE')).thenReturn({
    state: SecurityCheckState.UNSAFE,
  } as CheckResult)

  when(gateway.checkUser('REMOVED')).thenReturn({
    state: SecurityCheckState.REMOVED,
  } as CheckResult)

  
  return instance(gateway);
}

describe('VehicleServices', () => {
  const makeVehicleServices = (actionRetry?: (userId: String) => VehicleModel[]) =>
    new VehicleServices(
        makeVehicleGateway(actionRetry),
        makeSecurityGateway()
    );

  it('returns an empty array when user Id is empty string', () => {
    const vehicleServices = makeVehicleServices();

    const vehicles = vehicleServices.getVehicles('');

    expect(vehicles).toEqual([]);
  });

  it('returns an empty array when user Id is null', () => {
    const vehicleServices = makeVehicleServices();

    const vehicles = vehicleServices.getVehicles(null);

    expect(vehicles).toEqual([]);
  });

  it('returns an empty array when user does not have vehicles', () => {
    const vehicleServices = makeVehicleServices();

    const vehicles = vehicleServices.getVehicles('nullTest');

    expect(vehicles).toEqual([]);
  });

  it('returns a vehicle array when user Id is 1', () => {
    const vehicleServices = makeVehicleServices();

    const vehicles = vehicleServices.getVehicles('1');

    expect(vehicles).toEqual([{
      vehicleId: '(⌐■_■)'
    }]);
  });

  it('returns a vehicle array when user Id is 2', () => {
    const vehicleServices = makeVehicleServices();

    const vehicles = vehicleServices.getVehicles('2');

    expect(vehicles).toEqual([{
      vehicleId: '¯\_(ツ)_/¯',
      model: 'M3',
      yearOfConstruction: 2020
    }]);
  });

  it('when getting unknown user, throws a UnkownUserException', () => {
    const vehicleServices = makeVehicleServices();

    try {
      vehicleServices.getVehicles('UnknownUser');
      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(UnknownUserException);
    }
  });

  it('when getting exception, throws a the same exception', () => {
    const vehicleServices = makeVehicleServices();

    try {
      vehicleServices.getVehicles('toThrowException');
      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('when getting exception, retry request 3x', () => {
    let retries = 0;
    const vehicleServices = makeVehicleServices(_ => {
      if (retries < 2) {
        retries++;
        throw new Error();
      } else {
        return [{vehicleId: 'fdsf'} as VehicleModel];
      }
    });

    const vehicles = vehicleServices.getVehicles('retryAction');
    
    expect(vehicles).toEqual([{vehicleId: 'fdsf'}]);
    expect(retries).toEqual(2);
  });

  it('throw exception after 3x', () => {
    let retries = 0;

    const vehicleServices = makeVehicleServices(_ => {
        retries++;
        throw new Error();
    });

    try{
        vehicleServices.getVehicles('retryAction');
        fail();
    }
    catch(e)
    {
      expect(retries).toEqual(3);
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('when user in UNSAFE, throws a UnthorizedUserException', () => {
    const vehicleServices = makeVehicleServices();

    try {
      vehicleServices.getVehicles('UNSAFE');
      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(UnthorizedUserException);
    }
  });

  it('when user in REMOVED, throws a UnthorizedUserException', () => {
    const vehicleServices = makeVehicleServices();

    try {
      vehicleServices.getVehicles('REMOVED');
      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(UnthorizedUserException);
    }
  });

  it('when securityCheck is null, throws a UnthorizedUserException', () => {
    const vehicleServices = makeVehicleServices();

    try {
      vehicleServices.getVehicles('3');
      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(UnthorizedUserException);
    }
  });
});
