import "./style.css";
import Tasks from "./tasks.js";
import statusUpdateBtns from "./status.js";

const toDoTasks = new Tasks();
const listContent = document.querySelector(".list-content");

// populate list items
const populateListItems = (arrayOfTasks) => {
  listContent.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    listContent.innerHTML += `
    <li>
      <button class="check-btn" ><i class="fa-solid fa-check ${
        task.completed ? "active" : ""
      }"></i></button>
      <div class="container ${task.completed ? "active" : ""}">
      <div contenteditable="true" class="content-description">${
        task.description
      }</div>
      </div>
      <i class="move-item fa-solid fa-ellipsis-vertical"></i>
      <i class="delete-item fa-regular fa-trash-can"></i>
    </li>
    `;
  });
};
// Sort array by indexes
const sortArray = (arr) => arr.sort((a, b) => a.index - b.index);

const populateListItemsWithCheckBtns = (arr) => {
  populateListItems(sortArray(arr));
  // After populating list items, we add click listener on check marks
  statusUpdateBtns(toDoTasks);

  // Modify values + delete btn event listener
  const modifyTaskLists = document.querySelectorAll(".content-description");
  const moveItemBtn = document.querySelectorAll(".move-item");
  const deleteItemBtn = document.querySelectorAll(".delete-item");
  modifyTaskLists.forEach((modifyTask, index) => {
    modifyTask.addEventListener("input", () => {
      toDoTasks.modifyTask(
        index,
        modifyTask.textContent,
        toDoTasks.arr[index].completed
      );
    });

    modifyTask.addEventListener("focus", () => {
      modifyTask.parentElement.parentElement.classList.add("editing");
      moveItemBtn[index].classList.add("none");
      deleteItemBtn[index].classList.add("active");
      // prevent input from loosing focus
      deleteItemBtn[index].addEventListener("pointerdown", (event) => {
        event.preventDefault();
      });
      deleteItemBtn[index].addEventListener("click", () => {
        toDoTasks.deleteTask(index);
        populateListItemsWithCheckBtns(sortArray(toDoTasks.arr));
      });
    });

    modifyTask.addEventListener("blur", () => {
      modifyTask.parentElement.parentElement.classList.remove("editing");
      moveItemBtn[index].classList.remove("none");
      deleteItemBtn[index].classList.remove("active");
    });
  });
};
populateListItemsWithCheckBtns(sortArray(toDoTasks.arr));

// form
const inputText = document.querySelector("#type-list");
const form = document.querySelector(".submit-item");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputText.value.trim().length > 0) {
    toDoTasks.addNewTask({
      description: inputText.value,
    });
    populateListItemsWithCheckBtns(sortArray(toDoTasks.arr));
    form.reset();
  }
});

// Clear completed Tasks
const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
  toDoTasks.deleteTask();
  populateListItemsWithCheckBtns(sortArray(toDoTasks.arr));
});

// Refresh Button
const refreshBtn = document.querySelector(".refresh-btn");
refreshBtn.addEventListener("click", () => {
  refreshBtn.classList.remove("active");
  setInterval(() => {
    refreshBtn.classList.add("active");
  }, 10);
  populateListItemsWithCheckBtns(sortArray(toDoTasks.arr));
});
