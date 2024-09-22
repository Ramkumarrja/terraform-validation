declare module '@azure/arm-policy' {
  export class PolicyClient {
    constructor(credential: any, subscriptionId: string);
    policyDefinitions: {
      list: () => Promise<any>;
    };
  }
}
