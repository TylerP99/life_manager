const registrationForm = document.querySelector("#register");

const usernameField = registrationForm.querySelector("#usernameField");
const emailField = registrationForm.querySelector("#emailField");
const passwordField = registrationForm.querySelector("#passwordField");
const passwordConfField = registrationForm.querySelector("#passwordConfField");


//USERNAME HANDLER
usernameField.addEventListener("change", validateUsername);

function validateUsername(event) {
    //Only alnum and space
    const regStr = new RegExp(/^[a-zA-Z\s\-_.]+$/);
    const username = event.target.value;

    let valid = regStr.test(username);
}

//Email HANDLER
emailField.addEventListener("change", validateEmail);

function validateEmail(event) {
    //Follows correct format
    //Not in db already (interest problem to solve async) (need to keep confirm button off until this is resolved)
}

//password HANDLER
passwordField.addEventListener("change", validatePassword);

function validatePassword(event) {
    //8 chars at least
}

//USERNAME HANDLER
usernameField.addEventListener("change", validateUsername);

function validatePasswordConf(event) {
    //Should match password
}