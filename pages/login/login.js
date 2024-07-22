// pages/login/login.js
class LoginHandler {
    constructor() {
        this.setupListeners();
    }

    setupListeners() {
        document.getElementById('login-form').addEventListener('submit', (event) => this.handleLoginSubmit(event));
    }

    handleLoginSubmit(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const stayLogged = document.getElementById('stay-logged').checked;
        this.fetchUsers().then(users => {
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                this.storeSession(user.id, email, stayLogged);
                this.setUserLoggedIn(user.id, true);
                this.redirectToDashboard();
            } else {
                this.displayLoginError();
            }
        }).catch(error => {
            console.error('Erro ao buscar usuários:', error);
        });
    }

    async fetchUsers() {
        return fetch('https://prjeto-2-web1-default-rtdb.firebaseio.com/users.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar usuários');
                }
                return response.json();
            })
            .then(data => {
                const users = [];
                for (let key in data) {
                    users.push(data[key]);
                }
                return users;
            });
    }

    storeSession(userId, email, stayLogged) {
        if (stayLogged) {
            sessionStorage.setItem('id', userId);
            sessionStorage.setItem('email', email);
        } else {
            localStorage.setItem('id', userId);
            localStorage.setItem('email', email);
        }
    }

    async setUserLoggedIn(userId, status) {
        try {
            const response = await fetch(`https://prjeto-2-web1-default-rtdb.firebaseio.com/users/${userId}.json`);
            const user = await response.json();
            user.logado = status;
            await fetch(`https://prjeto-2-web1-default-rtdb.firebaseio.com/users/${userId}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
        } catch (error) {
            console.error('Erro ao atualizar status de login:', error);
        }
    }

    redirectToDashboard() {
        window.location.href = '../../pages/dashboard/dashboard.html';
    }

    displayLoginError() {
        const errorContainer = document.querySelector('.error-container');
        errorContainer.innerHTML = '<p id="error" class="text-danger">Usuário ou senha incorretos</p>';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new LoginHandler();
});
