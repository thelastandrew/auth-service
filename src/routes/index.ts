import { Router } from 'express';
import { registration, login, logout, refresh, getUsers } from '../controllers';
import {
  requiredBodyUsernameValidation,
  requiredBodyPasswordValidation,
  bodyValidationMiddleware,
  authMiddleware,
} from '../middlewares';
import { ROUTES } from '../constants';

export const router = Router();

router.post(
  ROUTES.REGISTRATION,
  requiredBodyUsernameValidation,
  requiredBodyPasswordValidation,
  bodyValidationMiddleware,
  registration
);

router.post(
  ROUTES.LOGIN,
  requiredBodyUsernameValidation,
  requiredBodyPasswordValidation,
  bodyValidationMiddleware,
  login
);

router.post(ROUTES.LOGOUT, logout);
router.get(ROUTES.REFRESH, refresh);
router.get(ROUTES.USERS, authMiddleware, getUsers);
