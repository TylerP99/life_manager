// Separate file for validating new user info before sending to server (also validated on server side)

/*===========================================*/
/*            Username Validation            */
/*===========================================*/
const usernameField = document.querySelector("#usernameField");

const usernameConstraintList = document.querySelector(".username-constraints");

usernameField.addEventListener("focus", open_username_constraints);
usernameField.addEventListener("blur", close_username_constraints);

function open_username_constraints() {
    usernameConstraintList.classList.remove("hidden");
}

function close_username_constraints() {
    usernameConstraintList.classList.add("hidden");
}

function  validate_username() {
    if(usernameField.value == "")
    {
        return false;
    }
    else
    {
        return true;
    }
}


/*===========================================*/
/*              Email Validation             */
/*===========================================*/
const emailField = document.querySelector("#emailField");

const emailConstraintList = document.querySelector(".email-constraints");

emailField.addEventListener("focus", open_email_constraints);
emailField.addEventListener("blur", close_email_constraints);

function open_email_constraints() {
    emailConstraintList.classList.remove("hidden");
}

function close_email_constraints() {
    emailConstraintList.classList.add("hidden");
}

function validate_email() {
    if(emailField.value == "")
    {
        return false;
    }
    else
    {
        return true;
    }
}

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
    let valid = false;

    if(password.length < 8)
    {
        //Invalid
        lengthValidationIcon.classList.remove("confirmation-success");
        lengthValidationIcon.classList.add("confirmation-error");

        passwordField.classList.add("invalid");
        passwordField.classList.remove("valid");
    }
    else
    {
        //Valid
        lengthValidationIcon.classList.add("confirmation-success");
        lengthValidationIcon.classList.remove("confirmation-error");

        passwordField.classList.remove("invalid");
        passwordField.classList.add("valid");
        valid = true;
    }
    return validate_password_conf() && valid;
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
        //Invalid
        matchValidationIcon.classList.remove("confirmation-success");
        matchValidationIcon.classList.add("confirmation-error");

        passwordConfirmationField.classList.add("invalid");
        passwordConfirmationField.classList.remove("valid");

        return false;
    }
    else
    {
        //Valid
        matchValidationIcon.classList.add("confirmation-success");
        matchValidationIcon.classList.remove("confirmation-error");

        passwordConfirmationField.classList.remove("invalid");
        passwordConfirmationField.classList.add("valid");

        return true;
    }
}


/*===========================================*/
/*    Sign Up Form Submit Request Handler    */
/*===========================================*/
const form = document.querySelector("form");
const formSubmitButton = document.querySelector("#submitButton");
formSubmitButton.disabled = true;

form.addEventListener("submit", submit_form);

const allFields = [usernameField, emailField, passwordField, passwordConfirmationField]
allFields.forEach( x => x.addEventListener("change", validate_all));

function validate_all() {
    const valid = validate_username() && validate_email() && validate_password() && validate_password_conf();

    if(valid) {
        formSubmitButton.disabled = false;
    }
    else
    {
        formSubmitButton.disabled = true;
    }
}

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
            console.log(data);
        }
        else
        {
            // Success, then redirect
            console.log("Redirecting...");
            window.location.replace("/user/signin");
        }
    }
    catch(e){
        console.error(e);
    }
}

