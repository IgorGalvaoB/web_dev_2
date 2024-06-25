

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const checkbox = document.getElementById('stay-logged');
    const stayLogged = 'a'
    if (checkbox.checked) {
        
    } else {

    }
    localStorage.setItem('id', stayLogged)
    window.location.href = '../../index.html'; // Substitua 'nova_pagina.html' pelo URL desejado

});