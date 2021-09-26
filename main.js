let tasks = [];

let taskItemsList = document.getElementById("task-list");

const addTaskBtn = document.getElementById("add-task-button");
addTaskBtn.addEventListener("click", addTask);


//Get task name
function getTaskName(elementName) {
    return document.getElementById(elementName).value;
}

//Add a new task to the list
function addTask() {
    let taskName = getTaskName("input-task");
    if (taskName !== "") {
        //Each task has id(based on the time of creation), name and status of completion
        let newTask = {
            id: Date.now(),
            name: taskName,
            completed: false
        };

        //Add task to tasks array and save in local storage
        tasks.push(newTask);
        addToLocalStorage(tasks);

        //Clear the input box value
        document.getElementById("input-task").value = "";
    }
}

//Creates a list of <li> tasks
function renderTasks(tasks) {
    taskItemsList.innerHTML = "";

    tasks.forEach(function(item) {
        const checked = item.completed ? "checked": null;
        const li = document.createElement("li");
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.classList.add("checked");
        }
        //Template literal
        li.innerHTML = `
      <input type="checkbox" ${checked}>
      <span class="task">${item.name}</span>
      <button class="btn delete-btn"></button>
    `;
        taskItemsList.append(li);
    });
}

//Toggle the task's value of completed
function toggleCompleted(taskId) {
    tasks.forEach(function(item){
        if (String(item.id) === (taskId)) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(tasks);
}

//Remove task
function removeTask(taskId) {
    //Filters out the <li> with the given id
    tasks = tasks.filter(function(item) {
       return String(item.id) !== taskId;
    });

    addToLocalStorage(tasks);
}

//Save list of tasks in local storage and render it
function addToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
}

//Load list of tasks from local storage and render it
function getFromLocalStorage() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks(tasks);
}


getFromLocalStorage();

taskItemsList.addEventListener("click", function(event)
{
    //If the user clicked checkbox
    if (event.target.type === 'checkbox') {
        toggleCompleted(event.target.parentElement.getAttribute('data-key'));
    }

    //If the user clicked the delete button
    if (event.target.classList.contains("delete-btn")) {
        removeTask(event.target.parentElement.getAttribute('data-key'));
    }

});




