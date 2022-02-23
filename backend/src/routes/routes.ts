import {Router} from 'express';
import auth from "./auth/auth";
import users from "./users/users";

const router = Router();
router.use('/auth', auth);
router.use('/users', users);

export default router;
