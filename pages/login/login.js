

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const checkbox = document.getElementById('stay-logged');

    fetch('../../data/profiles.json')
        .then(response => response.json())
        .then(data => {
            const profiles = data.profiles

            const profileToFind = profiles.find(profile => profile.email === email)
            const errorLogin = document.getElementById('error') || false
            if (errorLogin) {
                errorLogin.remove()
            }
            if (profileToFind) {
                if (profileToFind.password === password) {
                    if (checkbox.checked) {
                        sessionStorage.setItem('id', profileToFind.id)
                    } else {
                        localStorage.setItem('id', profileToFind.id)
                    }
                    const params = new URLSearchParams(window.location.search);
                    const idProduct = params.get('idProduct');
                    if (idProduct) {
                        //FALTA AQUI O CODIGO PARA O PAYMENT COM O ID DO PRODUTO
                    } else {
                        window.location.href = '../../index.html';
                    }
                } else {


                    const falseLogin = `<p id="error" class='text-danger'>Usuário ou senha incorretos</p>`
                    const messageError = document.getElementById('controler-login')

                    const tempDiv = document.createElement('div')
                    tempDiv.innerHTML = falseLogin
                    while (tempDiv.firstChild) {
                        messageError.appendChild(tempDiv.firstChild)
                    }


                    document.getElementById('password').value = ''

                }
            } else {

                const falseLogin = `<p id="error" class='text-danger'>Usuário ou senha incorretos</p>`
                const messageError = document.getElementById('controler-login')

                const tempDiv = document.createElement('div')
                tempDiv.innerHTML = falseLogin
                while (tempDiv.firstChild) {
                    messageError.appendChild(tempDiv.firstChild)
                }


                document.getElementById('password').value = ''
            }
        })


});
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