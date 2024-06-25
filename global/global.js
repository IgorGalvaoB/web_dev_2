document.addEventListener("DOMContentLoaded", function() {
    fetch('./global/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            const valorArmazenado = localStorage.getItem('idLogin')||sessionStorage.getItem('idLogin');
            if (!valorArmazenado) {
                const element = document.getElementById('btn-sing-login');
                const notLoged=`<button type="button" class="btn btn-dark button-nav btn-sm me-2" id="button-login">
                                    <a class="text-light nav-link" href="#">Login</a>
                                </button>
                                <button type="button" class="btn btn-light button-nav btn-sm " id="button-sing-up">
                                    <a class="nav-link" href="#">Sing Up</a>
                                </button>`
                const tempDiv= document.createElement('div')
                tempDiv.innerHTML = notLoged
                while(tempDiv.firstChild){
                    element.appendChild(tempDiv.firstChild)
                }
            }else{
                const element = document.getElementById('btn-sing-login');
                const notLoged=`<button type="button" class="btn btn-light button-nav btn-sm me-2" id="button-profile">
                                    <a class="nav-link" href="#">Conta</a>
                                </button>
                                <button type="button" class="btn btn-light button-nav btn-sm" id="button-logout">
                                    <a class="nav-link" href="#">Sair</a>
                                </button>`
                const tempDiv= document.createElement('div')
                tempDiv.innerHTML = notLoged
                while(tempDiv.firstChild){
                    element.appendChild(tempDiv.firstChild)
                }
            }

        })
        .catch(error => console.error('Error loading header:', error));
});
document.addEventListener("DOMContentLoaded", function() {
    fetch('./global/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
});

