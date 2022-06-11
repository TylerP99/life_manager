class Task {
    constructor(name, description, start, end, color)
    {
        this.name = name; // String, idk char limit yet. 50 seems reasonable
        this.description = description; // String (text field for db semantics) (limit unclear right now)
        this.startTime = start;  // Should be a date object
        this.endTime = end; // Should be a date object
        this.color = color; // Should be a hex code probably
    }
}

// Need to interface this with calendar somehow later. Actually calendar interfacing should be generic if this app expands


//Test driver code for basic functional task page

document.querySelector("#add-task").addEventListener("click", openTaskCreation)


function openTaskCreation(event) {
    const taskCreationMenu = document.querySelector("#add-task-menu");

    taskCreationMenu.classList.toggle("hidden");
    taskCreationMenu.classList.toggle("activated");
}