import { Router } from 'express';
import passport from 'passport';
import { getUsers, profile } from '../controllers/user.js';

const router = Router();

router.get(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    profile
);

export default router;
