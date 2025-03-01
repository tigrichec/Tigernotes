function login() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();

    if (username) {
        localStorage.setItem('currentUser', username);
        showNotes();
    } else {
        alert('Пожалуйста, введите имя пользователя.');
    }
}

function showNotes() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('notes').style.display = 'block';
    
    loadNotes();
}

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const note = noteInput.value.trim();

    if (note) {
        const username = localStorage.getItem('currentUser');
        let userNotes = JSON.parse(localStorage.getItem(username)) || [];
        
        userNotes.push(note);
        localStorage.setItem(username, JSON.stringify(userNotes));
        
        loadNotes();
        noteInput.value = '';
    } else {
        alert('Пожалуйста, введите заметку.');
    }
}

function loadNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    
    const username = localStorage.getItem('currentUser');
    let userNotes = JSON.parse(localStorage.getItem(username)) || [];
    
    userNotes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;

        // Кнопка удаления
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.className = 'red-button';
        deleteButton.onclick = () => deleteNote(index);

        li.appendChild(deleteButton);
        notesList.appendChild(li);
    });
}

function deleteNote(index) {
    const username = localStorage.getItem('currentUser');
    let userNotes = JSON.parse(localStorage.getItem(username)) || [];

    userNotes.splice(index, 1); // Удаляем заметку по индекс
        localStorage.setItem(username, JSON.stringify(userNotes));
    
    loadNotes(); // Обновляем список заметок
}

function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('login').style.display = 'block';
    document.getElementById('notes').style.display = 'none';
}

// Проверка при загрузке страницы
window.onload = function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        showNotes();
    }
};

