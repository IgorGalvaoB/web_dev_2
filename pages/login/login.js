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
                this.storeSession(user.id, stayLogged);
                this.redirectToNextPage();
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

    storeSession(userId, stayLogged) {
        if (stayLogged) {
            sessionStorage.setItem('id', userId);
        } else {
            localStorage.setItem('id', userId);
        }
    }

    redirectToNextPage() {
        const params = new URLSearchParams(window.location.search);
        const idProduct = params.get('idProduct');
        if (idProduct) {
            // Implementar a lógica de redirecionamento para o pagamento com o ID do produto
        } else {
            window.location.href = '../../index.html';
        }
    }

    displayLoginError() {
        const errorContainer = document.querySelector('.error-container');
        errorContainer.innerHTML = '<p id="error" class="text-danger">Usuário ou senha incorretos</p>';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new LoginHandler();
});
