export class SecurityGateway {
  checkUser(userId: string): CheckResult {
    return undefined;
  }
}




export enum SecurityCheckState {
    UNSAFE,
    REMOVED,
    AUTHORIZED
}

export class CheckResult {
  userId: string;
  state: SecurityCheckState
}
