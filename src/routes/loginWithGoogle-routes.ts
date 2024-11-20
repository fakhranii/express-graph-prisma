import {Router} from 'express'
import passport from 'passport';

const successLoginUrl = 'http://localhost:3000/login/success';
const errorLoginUrl = 'http://localhost:3000/login/error';

const router = Router()

// i didn't write res, google gonna send me the response on the google_callback_url that i provided in "auth/loginWithGoogle"
router.get('/login/google', passport.authenticate('google', { scope: ['email','profile'] }))
router.get("/auth/google/callback", passport.authenticate('google', {
  failureMessage : "Failed to authenticate google",
  failureRedirect: errorLoginUrl,
  successRedirect: successLoginUrl,
}),

  (req , res) => {
  console.log("loginWithGoogle")
    res.redirect(successLoginUrl);
  }
  )

export default router