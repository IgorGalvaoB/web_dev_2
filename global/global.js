document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;

    const getBaseUrl = () => {
        const pathArray = path.split('/');
        let depth = pathArray.length - 2; // -2 para compensar /pages/<subdir>/ e a própria página
        let baseUrl = '';
        for (let i = 0; i < depth; i++) {
            baseUrl += '../';
        }
        return baseUrl || './';
    };

    const baseUrl = getBaseUrl();

    const loadComponent = (url, elementId) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${url}`);
                }
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;
                    if (elementId === 'header') setupNavButtons();
                } else {
                    console.error(`Element with id ${elementId} not found`);
                }
            })
            .catch(error => console.error(`Error loading ${elementId}:`, error));
    };

    loadComponent(`${baseUrl}global/header.html`, 'header');
    loadComponent(`${baseUrl}global/footer.html`, 'footer');

    const setupNavButtons = () => {
        const valorArmazenado = localStorage.getItem('id') || sessionStorage.getItem('id');
        const navContainer = document.getElementById('btn-sing-login');
        if (navContainer) {
            navContainer.innerHTML = '';

            if (!valorArmazenado) {
                navContainer.innerHTML = `
                    <button type="button" class="btn btn-dark button-nav btn-sm mb-1 ms-1 mt-1" id="button-login">
                        <a class="text-light nav-link" href="#">Login</a>
                    </button>
                    <button type="button" class="btn btn-light button-nav btn-sm mb-1 mt-1" id="button-sign-up">
                        <a class="nav-link" href="#">Sign Up</a>
                    </button>`;
            } else {
                navContainer.innerHTML = `
                    <button type="button" class="btn btn-dark button-nav btn-sm mb-1 ms-1 mt-1" id="button-profile">
                        <a class="nav-link text-light" href="#">Conta</a>
                    </button>
                    <button type="button" class="btn btn-danger button-nav btn-sm mb-1 ms-1 mt-1" id="button-logout">
                        <a class="nav-link text-light" href="#">Sair</a>
                    </button>`;
            }

            document.getElementById('button-login')?.addEventListener('click', () => {
                window.location.href = `${baseUrl}pages/login/login.html`;
            });

            document.getElementById('button-sign-up')?.addEventListener('click', () => {
                window.location.href = `${baseUrl}pages/sign_up/sign_up.html`;
            });

            document.getElementById('button-logout')?.addEventListener('click', () => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = `${baseUrl}index.html`;
            });
        } else {
            console.error("Element with id 'btn-sing-login' not found");
        }
    };
});
