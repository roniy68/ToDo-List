import './style.css';

const toDoTasks = [
  {
    description: 'Create ToDo list',
    completed: false,
    index: 0,
  },
  {
    description: 'Revise HTML and CSS course',
    completed: true,
    index: 1,
  },
  {
    description: 'Finish webpack project',
    completed: false,
    index: 2,
  },
  {
    description: 'Create professional CV',
    completed: false,
    index: 3,
  },
];

const listContent = document.querySelector('.list-content');

// populate list items
const populateListItems = (arrayOfTasks) => {
  listContent.innerHTML = '';
  arrayOfTasks.forEach((task) => {
    listContent.innerHTML += `
      <li>
        <button><i class="fa-solid fa-check ${task.completed ? 'active' : ''}"></i></button>
        <div class="container">
        <div contenteditable="true" class="content-description">${task.description}</div>
        </div>
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </li>
      `;
  });
};
  // Sort array by indexes
const sortArray = (arr) => arr.sort((a, b) => a.index - b.index);

populateListItems(sortArray(toDoTasks));