import { Router } from 'express';
import { registration, login, logout, refresh, getUsers } from '../controllers';
import { requiredBodyUsernameValidation, requiredBodyPasswordValidation } from '../middlewares';

export const router = Router();

router.post(
  '/registration',
  requiredBodyUsernameValidation,
  requiredBodyPasswordValidation,
  registration,
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);
router.get('/users', getUsers);
