import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error.js';
import {
  TASK_PRIORITIES,
  type TaskPriority
} from '../models/task.js';

const isTaskPriority = (value: unknown): value is TaskPriority =>
  typeof value === 'string'
  && TASK_PRIORITIES.some((priority) => priority === value);

// Comprueba el titulo de la nueva tarea y guarda su version sin espacios externos.
export const validateTaskTitle = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const title: unknown = req.body?.title;

  if (typeof title !== 'string' || !title.trim()) {
    next(new AppError(
      'La solicitud contiene datos inválidos.',
      422,
      'VALIDATION_ERROR',
      [{ field: 'title', message: 'Debe ser texto no vacío.' }]
    ));
    return;
  }

  if (title.trim().length > 120) {
    next(new AppError(
      'La solicitud contiene datos inválidos.',
      422,
      'VALIDATION_ERROR',
      [{ field: 'title', message: 'No debe superar 120 caracteres.' }]
    ));
    return;
  }

  const description: unknown = req.body?.description;

  if (description !== undefined && typeof description !== 'string') {
    next(new AppError(
      'La solicitud contiene datos inválidos.',
      422,
      'VALIDATION_ERROR',
      [{ field: 'description', message: 'Debe ser texto.' }]
    ));
    return;
  }

  if (typeof description === 'string' && description.trim().length > 300) {
    next(new AppError(
      'La solicitud contiene datos inválidos.',
      422,
      'VALIDATION_ERROR',
      [{ field: 'description', message: 'No debe superar 300 caracteres.' }]
    ));
    return;
  }

  const priority: unknown = req.body?.priority;
  if (priority !== undefined && !isTaskPriority(priority)) {
    next(new AppError(
      'La solicitud contiene datos inválidos.',
      422,
      'VALIDATION_ERROR',
      [{ field: 'priority', message: 'Debe ser low, medium o high.' }]
    ));
    return;
  }

  res.locals.taskTitle = title.trim();
  if (typeof description === 'string') {
    res.locals.taskDescription = description.trim();
  }
  if (priority !== undefined) {
    res.locals.taskPriority = priority;
  }
  next();
};
