import {Router} from 'express'
import loginWithGoogle from './loginWithGoogle-routes';

const router = Router()
 router.use(loginWithGoogle)

export default router