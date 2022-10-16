import passport from "passport";
import passportLocal from "passport-local";
import AuthService from "../../api/services/auth";

const LocalStrategy = passportLocal.Strategy;

export default function local() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await AuthService.login(email, password);
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
}
