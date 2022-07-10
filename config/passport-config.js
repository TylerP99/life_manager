// Exports function to initialize passport

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");
const saltRounds = 10;

//User Schema
const User = require("../models/User")

function init_passport_local(passport) {
    passport.use(new LocalStrategy(
        {usernameField:"email"},
        async function verifyCredentials(email, password, done) {
            const user = await User.findOne({"email": email});

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

    passport.deserializeUser(async (id,done) => {
        const user = await User.findById(id);
        done(null,user);
    });
}

module.exports = init_passport_local;