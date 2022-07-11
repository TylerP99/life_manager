// Opens and closes the Create Task menu
document.querySelector("#add-task").addEventListener("click", openTaskCreation);


function openTaskCreation(event) {
    const taskCreationMenu = document.querySelector("#add-task-menu");

    toggle_hidden(taskCreationMenu);
}

// Opens and closes the Edit Task menu
document.querySelector("#task-edit-start-button").addEventListener("click", openTaskRevision);

function openTaskRevision(event) {
    const taskRevisionMenu = document.querySelector("#task-edit-form-container");

    toggle_hidden(taskRevisionMenu);
}

// Opens or hides target element
function toggle_hidden(elem)
{
    elem.classList.toggle("active");
    elem.classList.toggle("hidden");
}

// PUT Request for edit task
document.querySelector("#task-edit-submit-button").addEventListener("click", send_edit_task_request)

function send_edit_task_request() {
    // Get the form info

    // Make PUT request
}

// Delete Request for delete task
document.querySelector("#task-delete-button").addEventListener("click", send_delete_task_request);

function send_delete_task_request()
{
    
}