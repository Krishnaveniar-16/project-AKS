const API = "http://localhost:3000";

/* -------- REGISTER USER -------- */
async function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        alert("Please enter name and email");
        return;
    }

    try {
        await fetch(`${API}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        // Clear input
        document.getElementById('name').value = "";
        document.getElementById('email').value = "";

        loadUsers();

    } catch (err) {
        alert("Error adding user");
        console.error(err);
    }
}

/* -------- LOAD USERS -------- */
async function loadUsers() {
    try {
        const res = await fetch(`${API}/users`);
        const users = await res.json();

        const list = document.getElementById('users');
        list.innerHTML = "";

        users.forEach(u => {
            const item = document.createElement('div');
            item.className = "list-group-item d-flex justify-content-between align-items-center";

            item.innerHTML = `
                <div>
                    <strong>${u.name}</strong><br>
                    <small class="text-muted">${u.email}</small>
                </div>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${u.id})">Delete</button>
            `;

            list.appendChild(item);
        });

    } catch (err) {
        alert("Error loading users");
        console.error(err);
    }
}

/* -------- DELETE USER -------- */
async function deleteUser(id) {
    try {
        await fetch(`${API}/users/${id}`, {
            method: 'DELETE'
        });

        loadUsers();

    } catch (err) {
        alert("Error deleting user");
        console.error(err);
    }
}

/* -------- INITIAL LOAD -------- */
loadUsers();