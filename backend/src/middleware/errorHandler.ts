import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  // Verifica se o erro é do Zod
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: 'Erro de validação',
      errors: err.flatten((issue) => issue.message).fieldErrors,
    });
  }

  console.error(err);

  // Retorna erro genérico para o usuário
  return res.status(500).json({
    message: 'Erro interno do servidor',
  });
}