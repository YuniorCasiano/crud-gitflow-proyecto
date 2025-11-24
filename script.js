// Base de datos en memoria
let users = [];
let tasks = [];
let projects = [];

let userIdCounter = 1;
let taskIdCounter = 1;
let projectIdCounter = 1;

// ==================== ACTUALIZAR CONTADORES ====================

function updateCounters() {
    document.getElementById('userCount').textContent = users.length;
    document.getElementById('taskCount').textContent = tasks.length;
    document.getElementById('projectCount').textContent = projects.length;
}

// ==================== FUNCIÓN DE VALIDACIÓN ====================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================== CRUD DE USUARIOS ====================

function addUser() {
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();

    if (name === '' || email === '') {
        alert('Por favor completa todos los campos');
        return;
    }

    if (!validateEmail(email)) {
        alert('Por favor ingresa un email válido');
        return;
    }

    const user = {
        id: userIdCounter++,
        name: name,
        email: email
    };

    users.push(user);

    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';

    renderUsers();
    updateCounters();
}

function editUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;

    const newName = prompt('Nuevo nombre:', user.name);
    const newEmail = prompt('Nuevo email:', user.email);

    if (newName !== null && newName.trim() !== '') {
        user.name = newName.trim();
    }
    if (newEmail !== null && newEmail.trim() !== '') {
        if (validateEmail(newEmail.trim())) {
            user.email = newEmail.trim();
        } else {
            alert('Email inválido');
            return;
        }
    }

    renderUsers();
    updateCounters();
}

function deleteUser(id) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        users = users.filter(u => u.id !== id);
        renderUsers();
        updateCounters();
    }
}

function renderUsers() {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="action-btn" onclick="editUser(${user.id})">Editar</button>
                <button class="action-btn delete-btn" onclick="deleteUser(${user.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ==================== CRUD DE TAREAS ====================

function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (title === '' || description === '') {
        alert('Por favor completa todos los campos');
        return;
    }

    if (title.length < 3) {
        alert('El título debe tener al menos 3 caracteres');
        return;
    }

    const task = {
        id: taskIdCounter++,
        title: title,
        description: description,
        priority: priority
    };

    tasks.push(task);

    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskPriority').value = 'baja';

    renderTasks();
    updateCounters();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newTitle = prompt('Nuevo título:', task.title);
    const newDescription = prompt('Nueva descripción:', task.description);
    const newPriority = prompt('Nueva prioridad (baja/media/alta):', task.priority);

    if (newTitle !== null && newTitle.trim() !== '') {
        task.title = newTitle.trim();
    }
    if (newDescription !== null && newDescription.trim() !== '') {
        task.description = newDescription.trim();
    }
    if (newPriority !== null && ['baja', 'media', 'alta'].includes(newPriority)) {
        task.priority = newPriority;
    }

    renderTasks();
    updateCounters();
}

function deleteTask(id) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
        updateCounters();
    }
}

function renderTasks() {
    const tbody = document.getElementById('taskTableBody');
    tbody.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td><span class="priority-${task.priority}">${task.priority.toUpperCase()}</span></td>
            <td>
                <button class="action-btn" onclick="editTask(${task.id})">Editar</button>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ==================== CRUD DE PROYECTOS ====================

function addProject() {
    const name = document.getElementById('projectName').value.trim();
    const date = document.getElementById('projectDate').value;

    if (name === '' || date === '') {
        alert('Por favor completa todos los campos');
        return;
    }

    const project = {
        id: projectIdCounter++,
        name: name,
        date: date
    };

    projects.push(project);

    document.getElementById('projectName').value = '';
    document.getElementById('projectDate').value = '';

    renderProjects();
    updateCounters();
}

function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    const newName = prompt('Nuevo nombre:', project.name);
    const newDate = prompt('Nueva fecha (YYYY-MM-DD):', project.date);

    if (newName !== null && newName.trim() !== '') {
        project.name = newName.trim();
    }
    if (newDate !== null && newDate.trim() !== '') {
        project.date = newDate.trim();
    }

    renderProjects();
    updateCounters();
}

function deleteProject(id) {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
        projects = projects.filter(p => p.id !== id);
        renderProjects();
        updateCounters();
    }
}

function renderProjects() {
    const tbody = document.getElementById('projectTableBody');
    tbody.innerHTML = '';

    projects.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.id}</td>
            <td>${project.name}</td>
            <td>${project.date}</td>
            <td>
                <button class="action-btn" onclick="editProject(${project.id})">Editar</button>
                <button class="action-btn delete-btn" onclick="deleteProject(${project.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ==================== INICIALIZACIÓN ====================

window.addEventListener('DOMContentLoaded', () => {
    renderUsers();
    renderTasks();
    renderProjects();
    updateCounters();
});
