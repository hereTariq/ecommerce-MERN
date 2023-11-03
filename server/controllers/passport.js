import passport from 'passport';
import passportJWT from 'passport-jwt';
import userModel from '../models/user.js';
import path from 'path';
import { config } from 'dotenv';
config({ path: path.join(path.resolve(), 'config/config.env') });

const JWTStrategy = passportJWT.Strategy;

const extractJWT = (req) => {
    let jwt = null;

    if (req && req.cookies) {
        jwt = req.cookies['jwt'];
    }
    return jwt;
};

// console.log(process.env.SECRET_KEY);

passport.use(
    'jwt',
    new JWTStrategy(
        { jwtFromRequest: extractJWT, secretOrKey: process.env.SECRET_KEY },
        async (payload, done) => {
            // console.log(payload);
            const user = await userModel.findById(payload.userId);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
    )
);

export default passport;
