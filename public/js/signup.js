// Separate file for validating new user info before sending to server (also validated on server side)

console.log("Linked");

// Get all the important form elements
const usernameField = document.querySelector("#usernameField");

const emailField = document.querySelector("#emailField");


/*===========================================*/
/*            Password Validation            */
/*===========================================*/
// Get password fields
const passwordField = document.querySelector("#passwordField");

// Get constraints lists
const passwordConstraintList = document.querySelector(".password-constraints");

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
    validate_password_conf();
}


/*===========================================*/
/*     Password Confirmation Validation      */
/*===========================================*/
const passwordConfirmationField = document.querySelector("#passwordConfField");
const passwordConfConstraintsList = document.querySelector(".password-conf-constraints");

passwordConfirmationField.addEventListener("focus", open_password_conf_constraints);
passwordConfirmationField.addEventListener("blur", close_password_conf_constraints);

passwordConfirmationField.addEventListener("input", validate_password_conf);

function open_password_conf_constraints() {
    passwordConfConstraintsList.classList.remove("hidden");
}
function close_password_conf_constraints() {
    passwordConfConstraintsList.classList.add("hidden")
}
function validate_password_conf() {
    // Provide feedback while entering password
    const password = passwordField.value;
    const passwordConf = passwordConfirmationField.value;
    const matchValidationIcon = passwordConfConstraintsList.querySelector(".confirmation-icon");

    if(password !== passwordConf)
    {
        matchValidationIcon.classList.remove("confirmation-success");
        matchValidationIcon.classList.add("confirmation-error");

        passwordConfirmationField.classList.add("invalid");
        passwordConfirmationField.classList.remove("valid");
    }
    else
    {
        matchValidationIcon.classList.add("confirmation-success");
        matchValidationIcon.classList.remove("confirmation-error");

        passwordConfirmationField.classList.remove("invalid");
        passwordConfirmationField.classList.add("valid");
    }
}


/*===========================================*/
/*    Sign Up Form Submit Request Handler    */
/*===========================================*/
const form = document.querySelector("form");
const formSubmitButton = document.querySelector("#submitButton");

form.addEventListener("submit", submit_form);

async function submit_form(event) {
    event.preventDefault();

    const account = {
        username: usernameField.value,
        email: emailField.value,
        password: passwordField.value,
        passwordConfirmation: passwordConfirmationField.value,
    }

    // Send form via post request
    try{
        console.log("Sending req")
        const res = await fetch(
            "/api/account/create",
            {
                method: "post",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    account:account
                })
            }
        )

        const data = await res.json();
        
        if(!data.isValid)
        {
            // Display errors
        }
        else
        {
            // Success, then redirect
        }
    }
    catch(e){
        console.error(e);
    }
}

