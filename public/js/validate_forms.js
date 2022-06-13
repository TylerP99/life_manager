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
    const regStr = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
    const email = event.target.value;

    let valid = regStr.test(email);
    console.log(valid);
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
    console.log(event.target);
}