document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function addTodo() {
  const textJudul = document.getElementById('judul').value;
  const textNama = document.getElementById('nama').value;
  const timestamp = document.getElementById('date').value;
 
  const generatedID = generateId();
  const todoObject = generateTodoObject(generatedID, textJudul, textNama, timestamp, false);
  todos.push(todoObject);


  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  if (saveData()) {
    myFunction();
  }
  kosong()
}

function kosong() {
  const textJudul = document.getElementById('judul').value = "";
  const textNama = document.getElementById('nama').value = "";
  const timestamp = document.getElementById('date').value = "";

}


function generateId() {
  return +new Date();
}
 
function generateTodoObject(id, judul, name, timestamp, isCompleted) {
  return {
    id,
    judul,
    name,
    timestamp,
    isCompleted
  }
}

const todos = [];
const RENDER_EVENT = 'render-todo';
document.addEventListener(RENDER_EVENT, function () {
  console.log(todos);
  saveData();
});

function makeTodo(todoObject) {

  const textJudul = document.createElement('h3');
  textJudul.innerText ="Judul : " + todoObject.judul;
  textJudul.setAttribute('id', 'judul-'+todoObject.id);

  const textNama = document.createElement('h4');
  textNama.innerText ="Pembuat : " + todoObject.name;
  textNama.setAttribute('id', 'Nama-'+todoObject.id);
 
  const textTimestamp = document.createElement('p');
  textTimestamp.innerText ="Tanggal : " + todoObject.timestamp;
  textTimestamp.setAttribute('id', 'Date-'+todoObject.id);
 
  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textJudul, textNama, textTimestamp);
 
  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(textContainer);
  container.setAttribute('id', 'todo-'+todoObject.id);

  if (todoObject.isCompleted) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
 
    undoButton.addEventListener('click', () => {
      undoTaskFromCompleted(todoObject.id);
    });
 
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
 
    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(todoObject.id);
    });
    // console.log(todoObject);

 
    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    // console.log(todoObject);
    // console.log("Else");
    checkButton.addEventListener('click', function () {
      addTaskToCompleted(todoObject.id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
 
    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(todoObject.id);
    });
    
    container.append(checkButton, trashButton);
  }
 
  return container;
}

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById('todos');
  uncompletedTODOList.innerHTML = '';
 
  const completedTODOList = document.getElementById('completed-todos');
  completedTODOList.innerHTML = '';
 
  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isCompleted)
      uncompletedTODOList.append(todoElement);
    else
      completedTODOList.append(todoElement);
  }
});

function addTaskToCompleted (todoId) {
  const todoTarget = findTodo(todoId);
 
  if (todoTarget == null) return;
 
  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  myadd()

}

function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}

function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);
 
  if (todoTarget === -1) return;
 
  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  alert("Berhasil Menghapus Data !");
}
 
 
function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);
 
  if (todoTarget == null) return;
 
  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  mycheck();
}

function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }
 
  return -1;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
    
  }
}

const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

function isStorageExist() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
 
  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function checkform() {
  if (document.getElementById("form").value == "") {
    // something is wrong
    alert('There is a problem with the first field');
    return false;
  } else {
    myFunction(); 
  }
}
function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}

function mycheck() {
  var x = document.getElementById("checkdata");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}

function myadd() {
  var x = document.getElementById("tambahdata");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}