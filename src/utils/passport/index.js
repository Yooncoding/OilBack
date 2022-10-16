import passport from "passport";
import local from "./localStrategy";

export default function passportConfig() {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  local();
}
