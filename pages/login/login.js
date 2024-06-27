document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const checkbox = document.getElementById('stay-logged');

    fetch('../../data/profiles.json')
        .then(response => response.json())
        .then(data => {
            const profileToFind = data.profiles.find(profile => profile.email === email);
            handleLogin(profileToFind, password, checkbox);
        });
});

function handleLogin(profile, password, checkbox) {
    clearPreviousError();
    if (!profile || profile.password !== password) {
        displayLoginError();
        return;
    }
    storeSession(profile.id, checkbox.checked);
    redirectToNextPage();
}

function clearPreviousError() {
    const errorLogin = document.getElementById('error');
    if (errorLogin) {
        errorLogin.remove();
    }
}

function displayLoginError() {
    const errorContainer = document.querySelector('.error-container');
    errorContainer.innerHTML = `<p id="error" class='text-danger'>Usuário ou senha incorretos</p>`;
}

function storeSession(profileId, stayLogged) {
    if (stayLogged) {
        sessionStorage.setItem('id', profileId);
    } else {
        localStorage.setItem('id', profileId);
    }
}

function redirectToNextPage() {
    const params = new URLSearchParams(window.location.search);
    const idProduct = params.get('idProduct');
    if (idProduct) {
        // Implementar a lógica de redirecionamento para o pagamento com o ID do produto
    } else {
        window.location.href = '../../index.html';
    }
}
const inputPassword = document.getElementById('password');

// Adiciona um listener para o evento input
inputPassword.addEventListener('input', function () {
    const valorInput = this.value;

    // Verifica se o número de caracteres excede 10
    if (valorInput.length > 16) {
        // Se exceder, corta o valor para 10 caracteres
        this.value = valorInput.slice(0, 16);
    }
});