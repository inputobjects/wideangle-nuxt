import {useNuxtApp} from '#imports'
import type {WideAngleApi} from "~/src/types";

class NoOpWideAngleAnalyticsApi implements WideAngleApi {
  dispatchEvent(name: string, params: any, values: any): void {
    console.debug(`[WideAngleApi#dispatchEvent] Defaulting to NoOp Wide Angle call with name "${name}", params: ${JSON.stringify(params)}, values: ${JSON.stringify(params)}`);
  }

  recordConsent(subjectsId: string): void {
    console.debug(`[WideAngleApi#recordConsent] Defaulting to NoOp Wide Angle call with ${subjectsId}`);
  }

  revokeConsent() {
    console.debug(`[WideAngleApi#revokeConsent] Defaulting to NoOp Wide Angle call`);
  }
}

const noOpWideAngleApi = new NoOpWideAngleAnalyticsApi();

export function useWideAngle() {
  const { $waa } = useNuxtApp()
  if ($waa) {
    return $waa.value;
  } else {
    return noOpWideAngleApi;
  }
}
