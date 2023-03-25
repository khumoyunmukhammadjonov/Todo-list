const form = document.querySelector("form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector("#task-list");
const taskCounter = document.querySelector("#task-counter");

let taskCount = 0;

form.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Please add a task");
  } else {
    const li = document.createElement("li");
    li.innerHTML = `${taskInput.value} <span>X</span>`;
    taskList.appendChild(li);

    localStorage.setItem("tasks", taskList.innerHTML);
    localStorage.setItem("taskCount", ++taskCount);

    taskCounter.innerHTML = `You have: ${taskCount} tasks`;

    taskInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTasks = localStorage.getItem("tasks");
  const savedTaskCount = localStorage.getItem("taskCount");
  if (savedTasks) {
    taskList.innerHTML = savedTasks;
    taskCount = Number(savedTaskCount);
    taskCounter.innerHTML = `You have: ${taskCount} tasks`;
  }
});

taskList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed");
    localStorage.setItem("tasks", taskList.innerHTML);
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    localStorage.setItem("tasks", taskList.innerHTML);
    localStorage.setItem("taskCount", --taskCount);
    taskCounter.innerHTML = `You have: ${taskCount} tasks`;
  }
});
