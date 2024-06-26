
document.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname;
    let url = ''
    if(path==="/index.html"){
        url = './global/header.html'
    }else{
        url = '../../global/header.html'
     
    }
    const loadNav = fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            const valorArmazenado = localStorage.getItem('id')||sessionStorage.getItem('id');
            
            if (!valorArmazenado) {
                const element = document.getElementById('btn-sing-login');
                const notLoged=`<button type="button" class="btn btn-dark button-nav btn-sm mb-1 ms-1 mt-1" id="button-login" style="max-height:5vh">
                                    <a class="text-light nav-link" href="#">Login</a>
                                </button>
                                <button type="button" class="btn btn-light button-nav btn-sm mb-1 mt-1" id="button-sign-up" style="max-height:5vh">
                                    <a class="nav-link" href="#">Sing Up</a>
                                </button>`

                const tempDiv= document.createElement('div')
                tempDiv.innerHTML = notLoged
                while(tempDiv.firstChild){
                    element.appendChild(tempDiv.firstChild)
                }
                while(!document.getElementById('button-login')){
                    document.getElementById('')
                }
                
            }else{
                const element = document.getElementById('btn-sing-login');
                const notLoged=`<button type="button" class="btn btn-dark button-nav btn-sm mb-1 ms-1 mt-1" id="button-profile" style="max-height:5vh">
                                    <a class="nav-link text-light" href="#">Conta</a>
                                </button>
                                <button type="button" class="btn btn-danger button-nav btn-sm mb-1 ms-1 mt-1" id="button-logout style="max-height:5vh">
                                    <a class="nav-link text-light" href="#">Sair</a>
                                </button>`
                const tempDiv= document.createElement('div')
                tempDiv.innerHTML = notLoged
                while(tempDiv.firstChild){
                    element.appendChild(tempDiv.firstChild)
                }
            }

        })
        .catch(error => console.error('Error loading header:', error));
        const onClickBtns=async()=>{
            await loadNav
            const btnLogin = document.getElementById('button-login')||false
            const btnSignUp = document.getElementById('button-sign-up')||false
            const btnProfile = document.getElementById('button-profile')||false
            const btnLogout = document.getElementById('button-logout')||false
            try {
                if(btnLogin){
                    btnLogin.addEventListener('click',()=>{
                        if(path==='/index.html'){
                            window.location.href = './pages/login/login.html'
                        }else{
                            window.location.href = '../login/login.html'
                        }
                })}
                if(btnLogout){
                    btnLogout.addEventListener('click',()=>{
                        localStorage.clear()
                        sessionStorage.clear()
                        if(path==='/index.html'){
                            window.location.href = './index.html'
                        }else{
                            window.location.href = '../../index.html'
                        }
                    })
                }
                if(btnSignUp){
                    btnSignUp.addEventListener('click',()=>{
                        if(path==='/index.html'){
                            window.location.href = './pages/sign_up/sign_up.html'
                        }else{
                            window.location.href = '../sign_up/sign_up.html'
                        }
                    })
                }
            } catch (error) {
                console.error("Error loading button login:",error)
            }
        }
        onClickBtns()
})
document.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname
    if(path==="/index.html"){
        url = './global/footer.html'
    }else{
        url = '../../global/footer.html'
    }
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
});

