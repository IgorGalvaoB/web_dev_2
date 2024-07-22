// index.js
document.addEventListener("DOMContentLoaded", function () {
    carregarPacotes();
});

async function carregarPacotes() {
    try {
        const responsePacotes = await fetch('https://prjeto-2-web1-default-rtdb.firebaseio.com/pacotes.json');
        const pacotesData = await responsePacotes.json();

        const pacotesContainer = document.getElementById('pacotesContainer');
        pacotesContainer.innerHTML = '';

        for (const key in pacotesData) {
            const pacote = pacotesData[key];
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card">
                    <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${pacote.nome}</h5>
                        <p class="card-text">Tipo: ${pacote.tipo}</p>
                        <p class="card-text">Preço: R$ ${pacote.preco}</p>
                        <button class="btn btn-primary" onclick="adicionarPacote('${key}')">Adicionar</button>
                    </div>
                </div>
            `;
            pacotesContainer.appendChild(card);
        }

        await atualizarPacotesAdicionados();
    } catch (error) {
        console.error('Erro ao carregar pacotes:', error);
    }
}

async function atualizarPacotesAdicionados() {
    const userId = localStorage.getItem('id') || sessionStorage.getItem('id');
    if (!userId) return;

    try {
        const responseUser = await fetch(`https://prjeto-2-web1-default-rtdb.firebaseio.com/users/${userId}.json`);
        const userData = await responseUser.json();

        if (userData.pacotes) {
            userData.pacotes.forEach(pacoteId => {
                const pacoteCard = document.querySelector(`button[onclick="adicionarPacote('${pacoteId}')"]`);
                if (pacoteCard) {
                    pacoteCard.innerText = "Adicionado";
                    pacoteCard.disabled = true;
                }
            });
        }
    } catch (error) {
        console.error('Erro ao atualizar pacotes adicionados:', error);
    }
}

async function adicionarPacote(pacoteId) {
    const userId = localStorage.getItem('id') || sessionStorage.getItem('id');

    if (!userId) {
        alert('Você precisa estar logado para adicionar pacotes à sua lista.');
        window.location.href = './pages/login/login.html';
        return;
    }

    try {
        const responseUser = await fetch(`https://prjeto-2-web1-default-rtdb.firebaseio.com/users/${userId}.json`);
        const user = await responseUser.json();

        if (!user.pacotes) {
            user.pacotes = [];
        }

        // Verifica se o pacote já está na lista do usuário
        if (user.pacotes.includes(pacoteId)) {
            alert('Pacote já adicionado à sua lista.');
            return;
        }

        user.pacotes.push(pacoteId);

        await fetch(`https://prjeto-2-web1-default-rtdb.firebaseio.com/users/${userId}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        alert('Pacote adicionado à sua lista com sucesso!');
        await atualizarPacotesAdicionados(); // Atualiza os botões "Adicionar" para refletir o novo estado
    } catch (error) {
        console.error('Erro ao adicionar pacote:', error);
        alert('Erro ao adicionar pacote. Tente novamente.');
    }
}
