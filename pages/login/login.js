document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); 
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
                        window.location.href = '../home/index.html';
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
inputPassword.addEventListener('input', function () {
    const valorInput = this.value;
    if (valorInput.length > 16) {
        this.value = valorInput.slice(0, 16);
    }
});