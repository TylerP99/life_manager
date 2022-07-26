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
    // Best way to validate an email is to send a verification email
}

//password HANDLER
passwordField.addEventListener("change", validatePassword);

function validatePassword(event) {
    //8 chars at least
    const regStr = new RegExp(/.{8,}/)
    const password = event.target.value;

    let valid = regStr.test(password);
    console.log(valid)
}

//USERNAME HANDLER
passwordConfField.addEventListener("change", validatePasswordConf);

function validatePasswordConf(event) {
    //Should match password
}