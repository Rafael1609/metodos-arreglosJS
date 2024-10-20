// Lista inicial de tareas
let tasks = [
  { id: 1, description: "Tarea 1", completed: false },
  { id: 2, description: "Tarea 2", completed: false },
  { id: 3, description: "Tarea 3", completed: false },
];

// Elementos del DOM
const taskInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const totalTask = document.getElementById("total-task");
const completedTask = document.getElementById("completed-task");
const pendingTask = document.getElementById("pending-task");
const todoList = document.getElementById("todo-list");

// Función para agregar una tarea
function addTask() {
  const description = taskInput.value.trim();

  if (description !== "") {
    const newTask = {
      id: Date.now(), // Generar un ID único
      description: description,
      completed: false,
    };
    tasks.push(newTask);
    taskInput.value = "";
    renderTask();
  } else {
    alert("Por favor, ingresa una descripción para la tarea.");
  }
}

// Función que renderiza las tareas en el DOM
function renderTask() {
  todoList.innerHTML = ""; // Limpiar la lista

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <span>${task.description}</span>
          <input type="checkbox" ${
            task.completed ? "checked" : ""
          } onchange="toggleTask(${task.id})"/>
          <button onclick="deleteTask(${task.id})">Borrar</button>
      `;

    todoList.appendChild(li);
  });

  updateCounter();
}

// Función para actualizar los contadores
function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  totalTask.textContent = total;
  completedTask.textContent = completed;
  pendingTask.textContent = pending;
}

// Función para borrar una tarea
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTask();
}

// Función para cambiar el estado de una tarea (completada o no)
function toggleTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTask();
  }
}

// Escuchar el evento de clic para agregar tareas
addBtn.addEventListener("click", addTask);

// Cargar las tareas iniciales
renderTask();
