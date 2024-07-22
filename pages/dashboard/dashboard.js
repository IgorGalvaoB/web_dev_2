// pages/dashboard/dashboard.js
document.addEventListener("DOMContentLoaded", function () {
    verificarAutenticacao();
    inicializarDashboard();

    document.getElementById('adicionarPacoteBtn').addEventListener('click', () => {
        const novoPacote = new Pacote({
            id: Date.now().toString(),
            nome: prompt("Nome do Pacote:"),
            tipo: prompt("Tipo do Pacote (viagem/cruzeiro):"),
            preco: parseFloat(prompt("Preço do Pacote:"))
        });
        pacoteManager.adicionarPacote(novoPacote);
        salvarPacoteNoFirebase(novoPacote);
        atualizarGraficos();
        alert('Pacote adicionado!');
    });

    document.getElementById('editarPacoteBtn').addEventListener('click', () => {
        const pacoteId = prompt("ID do Pacote a ser editado:");
        const pacote = pacoteManager.pacotes.find(p => p.id === pacoteId);
        if (pacote) {
            pacote.nome = prompt("Nome do Pacote:", pacote.nome);
            pacote.tipo = prompt("Tipo do Pacote (viagem/cruzeiro):", pacote.tipo);
            pacote.preco = parseFloat(prompt("Preço do Pacote:", pacote.preco));
            salvarPacoteNoFirebase(pacote, true);
            atualizarGraficos();
            alert('Pacote editado!');
        } else {
            alert('Pacote não encontrado!');
        }
    });

    document.getElementById('removerPacoteBtn').addEventListener('click', () => {
        const pacoteId = prompt("ID do Pacote a ser removido:");
        const pacoteIndex = pacoteManager.pacotes.findIndex(p => p.id === pacoteId);
        if (pacoteIndex >= 0) {
            pacoteManager.pacotes.splice(pacoteIndex, 1);
            removerPacoteDoFirebase(pacoteId);
            atualizarGraficos();
            alert('Pacote removido!');
        } else {
            alert('Pacote não encontrado!');
        }
    });
});

async function verificarAutenticacao() {
    const userId = localStorage.getItem('id') || sessionStorage.getItem('id');
    const userEmail = localStorage.getItem('email') || sessionStorage.getItem('email');
    if (!userId) {
        window.location.href = '../../pages/login/login.html';
        return;
    }
    try {
        const response = await fetch(`https://prjeto-2-web1-default-rtdb.firebaseio.com/users/${userId}.json`);
        const user = await response.json();
        if (!user.logado) {
            window.location.href = '../../pages/login/login.html';
            return;
        }
        if (userEmail === 'deyves@admin.com') {
            document.getElementById('admin-menu').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
    }
}

async function inicializarDashboard() {
    await buscarPacotesDoFirebase();
    atualizarGraficos();
}

async function buscarPacotesDoFirebase() {
    try {
        const response = await fetch('https://prjeto-2-web1-default-rtdb.firebaseio.com/pacotes.json');
        const data = await response.json();
        pacoteManager.carregarPacotes(data);
    } catch (error) {
        console.error('Erro ao buscar pacotes:', error);
    }
}

async function salvarPacoteNoFirebase(pacote, isUpdate = false) {
    try {
        const method = isUpdate ? 'PUT' : 'POST';
        await fetch(`https://prjeto-2-web1-default-rtdb.firebaseio.com/pacotes/${pacote.id}.json`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pacote),
        });
    } catch (error) {
        console.error('Erro ao salvar pacote:', error);
    }
}

async function removerPacoteDoFirebase(pacoteId) {
    try {
        await fetch(`https://prjeto-2-web1-default-rtdb.firebaseio.com/pacotes/${pacoteId}.json`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Erro ao remover pacote:', error);
    }
}

function atualizarGraficos() {
    const pacotesViagem = pacoteManager.obterPacotesPorTipo('viagem');
    const pacotesCruzeiro = pacoteManager.obterPacotesPorTipo('cruzeiro');

    const labelsViagem = pacotesViagem.map(p => p.nome);
    const dataViagem = pacotesViagem.map(p => p.preco);

    const labelsCruzeiro = pacotesCruzeiro.map(p => p.nome);
    const dataCruzeiro = pacotesCruzeiro.map(p => p.preco);

    const ctxViagem = document.getElementById('chartViagem').getContext('2d');
    const chartViagem = new Chart(ctxViagem, {
        type: 'bar',
        data: {
            labels: labelsViagem,
            datasets: [{
                label: 'Preço dos Pacotes de Viagem',
                data: dataViagem,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxCruzeiro = document.getElementById('chartCruzeiro').getContext('2d');
    const chartCruzeiro = new Chart(ctxCruzeiro, {
        type: 'line',
        data: {
            labels: labelsCruzeiro,
            datasets: [{
                label: 'Preço dos Pacotes de Cruzeiro',
                data: dataCruzeiro,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
