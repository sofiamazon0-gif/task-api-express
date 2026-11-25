import type { Request, Response } from 'express';
import { AppError } from '../errors/app-error.js';
import {
  getAuthenticatedUser,
  loginUser,
  registerUser
} from '../services/auth.service.js';

export const getMe = async (_req: Request, res: Response): Promise<void> => {
  const auth = res.locals.auth;

  if (!auth) {
    throw new AppError(
      'No existe una identidad autenticada en la solicitud.',
      401,
      'AUTHENTICATION_REQUIRED'
    );
  }

  res.status(200).json({
    data: { user: await getAuthenticatedUser(auth.userId) }
  });
};

export const postRegister = async (_req: Request, res: Response): Promise<void> => {
  res.status(201).json({
    data: await registerUser(res.locals.registerInput)
  });
};

export const postLogin = async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    data: await loginUser(res.locals.loginInput)
  });
};
