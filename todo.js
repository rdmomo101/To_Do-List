let input = document.getElementById("input-box");
let tasksDiv = document.getElementById("tasks");
let allTask = document.getElementById("all-task");
let activeTask = document.getElementById("active-task");
let deleteAllTask = document.getElementById("delete-all-task");
let submit = document.querySelector(".add");

let mood = "active";
// Empty Array To Store The Tasks
let tasksArray = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your Task has been added",
      showConfirmButton: false,
      timer: 1500,
    });
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  } else {
    Swal.fire({
      title: "Oops...",
      text: "You Should Write Something !",
      icon: "error",
    });
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    e.target.classList.toggle("completed");
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
    } else {
      e.target.classList.add("active");
    }
  } else if (e.target.classList.contains("checked")) {
  } else if (e.target.tagName === "SPAN") {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element From Page
        e.target.parentElement.remove();
        allTask.innerHTML = ` Tasks ${tasksArray.length}`;
      }
    });
  } else if (e.target.tagName === "BUTTON") {
    console.log("momo");
  }
});

deleteAllTask.onclick = function () {
  if (this.onclick) {
    Swal.fire({
      title: "Do you want to delete the list?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        localStorage.clear();
        tasksArray = [];
        allTask.innerHTML = `Tasks ${tasksArray.length}`;
        addElements(tasksArray);
      }
    });
  }
};

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
  };
  // Push Task To Array Of Tasks
  tasksArray.push(task);
  // Add Tasks To Page
  addElements(tasksArray);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(tasksArray);
}

function addElements(tasksArray) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks

  for (let i = 0; i < tasksArray.length; i++) {
    allTask.innerHTML = `Tasks ${tasksArray.length}`;
    let li = document.createElement("li");
    li.classList.add("active");

    li.setAttribute("data-id", tasksArray[i].id);
    li.appendChild(document.createTextNode(tasksArray[i].title));

    let span = document.createElement("span");
    span.className = "del";
    span.innerHTML = " \u00d7";

    li.appendChild(span);
    tasksDiv.appendChild(li);
  }
}

function addDataToLocalStorageFrom(tasksArray) {
  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElements(tasks);
  }
}

function deleteTaskWith(taskId) {
  // For Explain Only
  // for (let i = 0; i < tasksArray.length; i++) {
  //   console.log(`${tasksArray[i].id} === ${taskId}`);
  // }
  tasksArray = tasksArray.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(tasksArray);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == taskId) {
      tasksArray[i].completed == false
        ? (tasksArray[i].completed = true)
        : (tasksArray[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(tasksArray);
}
