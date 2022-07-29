const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = function init_passport(passport) {
    passport.use(new LocalStrategy(
        {usernameField:"email"},
        async function verifyCredentials(email, password, done) {
            const user = await db.collection(userCollection)
                                .findOne({"email": email});

            console.log(user);

            if(user)
            {
                // User exists
                // Compare entered password with stored password
                const match = await bcrypt.compare(password, user.password);

                if(!match)
                {
                    // Password Incorrect
                    done(null, false, {"message":"That password is incorrect!"});
                }
                else
                {
                    // Authenticate
                    done(null, user);
                }
            }
            else
            {
                // User does not exist
                // Email "Incorrect"
                done(null, false, {"message":"That email was not found!"})
            }
        }
    ));

    passport.serializeUser((user,done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id,done) => {
        db.collection(userCollection)
          .findOne({id:id})
    });
}