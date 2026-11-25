import type { AccessTokenSubject } from './auth.js';

declare global {
  namespace Express {
    interface Locals {
      auth?: AccessTokenSubject;
      requestId?: string;
      loginInput: import('./auth.js').LoginInput;
      registerInput: import('./auth.js').RegisterInput;
    }
  }
}

export {};
