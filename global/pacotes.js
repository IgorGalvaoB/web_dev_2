// global/pacotes.js
class Pacote {
    constructor({ id, nome, tipo, preco }) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo; // 'viagem' ou 'cruzeiro'
        this.preco = preco;
    }
}

class PacoteManager {
    constructor() {
        this.pacotes = [];
    }

    adicionarPacote(pacote) {
        this.pacotes.push(pacote);
    }

    obterPacotesPorTipo(tipo) {
        return this.pacotes.filter(pacote => pacote.tipo === tipo);
    }

    carregarPacotes(data) {
        this.pacotes = Object.keys(data).map(key => new Pacote(data[key]));
    }
}

const pacoteManager = new PacoteManager();
