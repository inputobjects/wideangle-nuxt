export interface WideAngleApi {
  dispatchEvent(name: string, params: any, values: any) : void;
  recordConsent(subjectsId: string) : void;
  revokeConsent() : void;
}
