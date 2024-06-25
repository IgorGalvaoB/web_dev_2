const a = ()=>{
    console.log('b')
}

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
            const valorArmazenado = localStorage.getItem('id')||sessionStorage.getItem('idLogin');
            const teste= async ()=>{
                const btn = document.getElementById(button-login)
                btn.addEventListener('click',()=>{
                    console.log('b')
                })
            }
            if (!valorArmazenado) {
                const element = document.getElementById('btn-sing-login');
                const notLoged=`<button type="button" class="btn btn-dark button-nav btn-sm mb-1 ms-1 mt-1" id="button-login">
                                    <a class="text-light nav-link" href="#">Login</a>
                                </button>
                                <button type="button" class="btn btn-light button-nav btn-sm mb-1 mt-1" id="button-sing-up">
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
                const notLoged=`<button type="button" class="btn btn-light button-nav btn-sm" id="button-profile">
                                    <a class="nav-link" href="#">Conta</a>
                                </button>
                                <button type="button" class="btn btn-light button-nav btn-sm " id="button-logout">
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
        const onClickBtns=async()=>{
            await loadNav   
            try {
                if(document.getElementById('button-login')){
                    document.getElementById('button-login').addEventListener('click',()=>{
                        console.log('b')
                })}
                if(document.getElementById('button-logout')){
                    document.getElementById('button-logout').addEventListener('click',()=>{
                        localStorage.clear()
                        sessionStorage.clear()
                        
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

