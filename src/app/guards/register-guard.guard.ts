import { CanActivateFn } from '@angular/router';

export const registerGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
