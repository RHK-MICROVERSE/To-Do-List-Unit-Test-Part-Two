import addTask, { removeTask } from './modules/addAndRemove.js';
import './index.css';
import DeleteAll from './modules/markCompletion.js';

// Activating the Refresh sign if clicked it will refresh the list
document.querySelector('.fa-arrows-rotate').addEventListener('click', () => {
  window.location.reload();
});

// Creating Rendering class
const displayContainer = document.getElementById('addtodotasks');
const input = document.querySelector('.user-input');
const tasksList = JSON.parse(localStorage.getItem('list')) || [];
const DisplayTask = () => {
  tasksList.forEach((list, index) => {
    displayContainer.innerHTML += `
      <li class="li-list" >
        <input class="li-check" id="trfa" type="checkbox" ${list.completed ? 'checked' : ''} data-id="${index}" data-com="${list.completed}">
        <p contenteditable="true" class="paragraph ${list.completed ? 'overlined' : ''}"  data-para="${index}">
          ${list.description}
        </p>
        <i class="fa-regular fa-trash-can" data-index="${index}"></i>
        <i class="li-list fa-solid fa-ellipsis-vertical"></i>
      </li>
      `;// eslint-disable-line no-return-assign
  });
};

// Task add function
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
    window.location.reload();
  }
});

// Activating the enter sign if clicked it will add task
document.querySelector('.fa-turn-down').addEventListener('click', () => {
  addTask();
  window.location.reload();
});

// Creating the list of Task from the Display
const listItemsContainer = document.querySelector('#addtodotasks');
const liLists = document.getElementsByClassName('li-list');
listItemsContainer.addEventListener('click', (e) => {
  for (let i = 0; i < liLists.length; i += 1) {
    liLists[i].classList.remove('active');
  }
  if (e.target.classList.contains('li-list')) {
    e.target.classList.toggle('active');
  } else if (e.target.classList.contains('paragraph')) {
    e.target.parentElement.classList.toggle('active');
  }
});

// Remove task function
listItemsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-trash-can')) {
    const index = e.target.getAttribute('data-index');
    removeTask(index);
    window.location.reload();
  }
});

// Consturtion to show updated list
const update = () => {
  for (let i = 0; i < tasksList.length; i += 1) {
    tasksList[i].index = i + 1;
  }
  localStorage.setItem('list', JSON.stringify(tasksList));
  DisplayTask();
};

// Updating the List after edit the description function
update();
listItemsContainer.addEventListener('keypress', (e) => {
  if (e.target.classList.contains('paragraph')) {
    if (e.key === 'Enter') {
      if (e.target.textContent === '') {
        return false;
      }
      const num = e.target.getAttribute('data-para');
      tasksList[num].description = e.target.textContent;
    }
  }
  return localStorage.setItem('list', JSON.stringify(tasksList));
});

// Check box function
const tickmarked = document.querySelectorAll('.li-check');
tickmarked.forEach((list) => {
  list.addEventListener('change', (e) => {
    const data = JSON.parse(localStorage.getItem('list'));
    if (e.currentTarget.checked === true) {
      const idnx = e.currentTarget.getAttribute('data-id');
      data[idnx].completed = true;
    } else {
      const idnx = e.currentTarget.getAttribute('data-id');
      data[idnx].completed = false;
    }
    localStorage.setItem('list', JSON.stringify(data));
    window.location.reload();
  });
});

// All Clear Button
const deleteBtn = document.getElementById('clear-btn');
deleteBtn.addEventListener('click', DeleteAll);