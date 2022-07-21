// Opens and closes the Create Task menu
document.querySelector("#add-task").addEventListener("click", openTaskCreation);


function openTaskCreation(event) {
    const taskCreationMenu = document.querySelector("#add-task-menu");

    toggle_hidden(taskCreationMenu);
}

// Opens and closes the Edit Task menu
document.querySelectorAll(".task-settings-button").forEach(x => x.addEventListener("click", openTaskRevision));

function openTaskRevision(event) {
    console.log("Click")
    const taskRevisionMenu = document.querySelector(".task-settings-container");

    toggle_hidden(taskRevisionMenu);
}

// Opens or hides target element
function toggle_hidden(elem)
{
    elem.classList.toggle("active");
    elem.classList.toggle("hidden");
}

// PUT Request for edit task
//document.querySelector("#task-edit-submit-button").addEventListener("click", send_edit_task_request)

async function send_edit_task_request(event) {
    // Get task id
    const taskId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;

    // Get the form info
    const newTask = {
        name:document.getElementById("task-edit-name").value,
        description: document.getElementById("task-edit-description").value,
        startTime: document.getElementById("task-edit-start-time").value,
        endTime: document.getElementById("task-edit-end-time").value,
        color: document.getElementById("task-edit-color").value
    };

    // Make PUT request
    try{
        const res = await fetch("api/task/update", {method:"put", headers: { "Content-Type":"application/json" }, body: JSON.stringify({newTask: newTask, taskId: taskId })});
        const data = await res.json();
        console.log(data);
        location.reload();
    }
    catch(e) {
        console.error(e);
        location.reload();
    }
}

// Delete Request for delete task
document.querySelectorAll("#task-delete-button").forEach( x => x.addEventListener("click", send_delete_task_request));

async function send_delete_task_request(event)
{
    console.log("deleted")
    // Get task id from dom
    const taskId = event.target.parentElement.parentElement.id;

    // Make delete request
    const response = await fetch(
        "api/task/delete", 
        {method:"delete", headers: { "Content-Type":"application/json" }, body: JSON.stringify({taskId: taskId })}
    );
    const data = await response.json();
    console.log(data);
    location.reload();
}

console.log("Linked")