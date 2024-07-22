// pages/sign_up/sign_up.js
class User {
    constructor({ id, name, cpf, birthDate, email, password, address, logado = false, pacotes = [] }) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.address = address;
        this.logado = logado;
        this.pacotes = pacotes; // Inicializa com uma lista de pacotes vazia, se não fornecida
    }
}

class Address {
    constructor({ cep, logradouro, number, neighborhood, city, uf, complement }) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.number = number;
        this.neighborhood = neighborhood;
        this.city = city;
        this.uf = uf;
        this.complement = complement;
    }
}

class SignUpHandler {
    constructor() {
        this.setupListeners();
    }

    setupListeners() {
        document.getElementById('cpf').addEventListener('input', () => this.formatarCPF());
        document.getElementById('birth-date').addEventListener('input', () => this.formatarBirthDate());
        document.getElementById('cep').addEventListener('input', () => this.formatarCEP());
        document.getElementById('cep').addEventListener('blur', () => this.preencherEndereco());
        document.getElementById('form-1').addEventListener('submit', (event) => this.handleForm1Submit(event));
        document.getElementById('form-2').addEventListener('submit', (event) => this.handleForm2Submit(event));
        document.getElementById('back-button').addEventListener('click', (event) => this.handleBackButton(event));
        window.onload = this.updateTargetPosition;
        window.addEventListener('resize', this.updateTargetPosition);
    }

    formatarCPF() {
        const cpfInput = document.getElementById('cpf');
        cpfInput.value = cpfInput.value
            .replace(/\D/g, '') // Remove todos os caracteres não numéricos
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona um ponto após os primeiros 3 dígitos
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona um ponto após os 3 dígitos seguintes
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona um hífen antes dos últimos 2 dígitos
    }

    formatarBirthDate() {
        const birthDateInput = document.getElementById('birth-date');
        birthDateInput.value = birthDateInput.value
            .replace(/\D/g, '') // Remove todos os caracteres não numéricos
            .replace(/(\d{2})(\d)/, '$1/$2') // Adiciona uma barra após os primeiros 2 dígitos
            .replace(/(\d{2})(\d{1,4})$/, '$1/$2'); // Adiciona uma barra após os 2 dígitos seguintes
    }

    formatarCEP() {
        const cepInput = document.getElementById('cep');
        cepInput.value = cepInput.value
            .replace(/\D/g, '') // Remove todos os caracteres não numéricos
            .replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona um hífen após os primeiros 5 dígitos
    }

    async preencherEndereco() {
        const cepInput = document.getElementById('cep');
        const cep = cepInput.value.replace(/\D/g, '');

        if (cep.length !== 8) {
            alert('CEP inválido');
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) {
                throw new Error('Erro ao buscar informações do CEP');
            }
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado');
                return;
            }

            document.getElementById('logradouro').value = data.logradouro || '';
            document.getElementById('neighborhood').value = data.bairro || '';
            document.getElementById('city').value = data.localidade || '';
            document.getElementById('uf').value = data.uf || '';

        } catch (error) {
            console.error('Erro ao buscar informações do CEP:', error);
            alert('Erro ao buscar informações do CEP. Tente novamente.');
        }
    }

    handleForm1Submit(event) {
        event.preventDefault();
        const form1Valid = this.validateForm1();
        if (form1Valid) {
            const fieldsetForm1 = document.getElementById('fieldset-form-1');
            const form1 = document.getElementById('form-1');
            const fieldsetForm2 = document.getElementById('fieldset-form-2');
            const form2 = document.getElementById('form-2');
            fieldsetForm1.disabled = true;
            form1.classList.remove('bg-light');
            form1.style.backgroundColor = 'rgb(180, 182, 189)';
            form1.style.opacity = '0.8';
            fieldsetForm2.disabled = false;
            form2.classList.add('bg-light');
            form2.style.opacity = '1';
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    }

    async handleForm2Submit(event) {
        event.preventDefault();
        const user = this.collectUserData();
        try {
            await this.saveUser(user);
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../../pages/login/login.html';
        } catch (error) {
            console.error('Erro ao salvar o usuário:', error);
            alert('Erro ao cadastrar usuário. Tente novamente.');
        }
    }

    collectUserData() {
        const id = Date.now().toString(); // Simulação de um ID único
        const name = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;
        const birthDate = document.getElementById('birth-date').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const address = new Address({
            cep: document.getElementById('cep').value,
            logradouro: document.getElementById('logradouro').value,
            number: document.getElementById('number').value,
            neighborhood: document.getElementById('neighborhood').value,
            city: document.getElementById('city').value,
            uf: document.getElementById('uf').value,
            complement: document.getElementById('complement').value,
        });
        const logado = false;
        const pacotes = [];
        return new User({ id, name, cpf, birthDate, email, password, address, logado, pacotes });
    }

    async saveUser(user) {
        return fetch('https://prjeto-2-web1-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar usuário');
            }
        });
    }

    handleBackButton(event) {
        event.preventDefault();
        const fieldsetForm1 = document.getElementById('fieldset-form-1');
        const form1 = document.getElementById('form-1');
        const fieldsetForm2 = document.getElementById('fieldset-form-2');
        const form2 = document.getElementById('form-2');
        fieldsetForm2.disabled = true;
        fieldsetForm1.disabled = false;
        form1.classList.add('bg-light');
        form2.classList.remove('bg-light');
        form2.style.opacity = '0.8';
        form2.style.backgroundColor = 'rgb(180, 182, 189)';
    }

    validateForm1() {
        const name = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;
        const birthDate = document.getElementById('birth-date').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;

        return name && cpf && birthDate && email && password && (password === password2);
    }

    updateTargetPosition() {
        const reference = document.getElementById('btns-form-1');
        const target = document.getElementById('btns-form-2');
        const negativeReference = document.getElementById('div-complement');
        const negativeReferenceOffsetTop = negativeReference.offsetTop;
        const referenceOffsetTop = reference.offsetTop;
        const sizeNegativeReference = negativeReference.offsetHeight;
        target.style.marginTop = `${referenceOffsetTop - negativeReferenceOffsetTop - sizeNegativeReference}px`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new SignUpHandler();
});
