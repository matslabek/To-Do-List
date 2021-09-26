
function getTaskName(elementName) {
    return document.getElementById(elementName).value;
}

function addTask() {
    let taskName = getTaskName("input-task");
    if (taskName !== "") {
        let taskList = document.getElementById("task-list");
        taskList.innerHTML += '<li><input type="checkbox"><span class="task">' + taskName + '</span><button class="btn delete-btn"></button></li>'
        document.getElementById("input-task").value = "";
        addRemove();
    }
}

function addRemove(){
    let deleteBtns = document.getElementsByClassName("delete-btn");

    Array.prototype.slice.call(deleteBtns).forEach(function(item) {
        item.addEventListener("click", function(e) {
            e.target.parentNode.remove()
        });
    })
}

addRemove();


let addTaskBtn = document.getElementById("add-task-button");
addTaskBtn.addEventListener("click", addTask);
