/*===========================================*/
/*           Sign In Form Handler            */
/*===========================================*/
const signinForm = document.querySelector("#signin-form"); // Get form element

const emailField = document.querySelector("#email-field");
const passwordField = document.querySelector("#password-field");

// Add event listener to form that prevents default, then sends own request
signinForm.addEventListener("submit", signin);

async function signin(event) {
    // Stop html form from sending request
    event.preventDefault();

    const account = {
        email: emailField.value,
        password: passwordField.value
    }

    // Send over own request instead, so can control response behavior better
    const res = await fetch(
        "/api/account/authenticate",
        {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email:account.email,
                password: account.password
            })
        }
    );

    const data = await res.json();
    console.log(data);
}

console.log("Linked");