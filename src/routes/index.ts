import { Router } from 'express';
import { registration, login, logout, refresh, getUsers } from '../controllers';
import { requiredBodyUsernameValidation, requiredBodyPasswordValidation, bodyValidationMiddleware } from '../middlewares';

export const router = Router();

router.post(
  '/registration',
  requiredBodyUsernameValidation,
  requiredBodyPasswordValidation,
  bodyValidationMiddleware,
  registration,
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);
router.get('/users', getUsers);
