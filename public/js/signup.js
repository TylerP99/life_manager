// Separate file for validating new user info before sending to server (also validated on server side)

console.log("Linked");

// Get all the important form elements
const usernameField = document.querySelector("#usernameField");

const emailField = document.querySelector("#emailField");

const formSubmitButton = document.querySelector("#submitButton");


/*===========================================*/
/*            Password Validation            */
/*===========================================*/
// Get password fields
const passwordField = document.querySelector("#passwordField");
const passwordConfirmationField = document.querySelector("#passwordConfField");

// Get constraints lists
const passwordConstraintList = document.querySelector(".password-constraints");
const passwordConfConstraintsList = document.querySelector(".password-conf-constraints");

// When the password field is selected, the constraints list should open up
passwordField.addEventListener("focus", open_password_constraints);

// When the password field is deselected, the constraints list should close
passwordField.addEventListener("blur", close_password_constraints);

// Below will happen in a single function likely
// When the password is valid, the border should be green
// When the password is invalid, the border should be red
passwordField.addEventListener("input", validate_password);


function open_password_constraints() {
    passwordConstraintList.classList.remove("hidden");
}
function close_password_constraints() {
    passwordConstraintList.classList.add("hidden")
}

function validate_password() {
    // Provide feedback while entering password
    const password = passwordField.value;
    const lengthValidationIcon = passwordConstraintList.querySelector(".confirmation-icon");

    if(password.length < 8)
    {
        lengthValidationIcon.classList.remove("confirmation-success");
        lengthValidationIcon.classList.add("confirmation-error");

        passwordField.classList.add("invalid");
        passwordField.classList.remove("valid");
    }
    else
    {
        lengthValidationIcon.classList.add("confirmation-success");
        lengthValidationIcon.classList.remove("confirmation-error");

        passwordField.classList.remove("invalid");
        passwordField.classList.add("valid");
    }
}