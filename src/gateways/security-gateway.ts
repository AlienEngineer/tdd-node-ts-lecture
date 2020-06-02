export class SecurityGateway {
  checkUser(userId: string): CheckResult {
    return undefined;
  }
}

export class CheckResult {
  userId: string;
  state: SecurityCheckState;
}

export enum SecurityCheckState {
  AUTHORIZED,
  UNSAFE,
  REMOVED,
}
