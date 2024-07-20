class User {
    constructor({ id, name, cpf, birthDate, email, password, address }) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.address = address;
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
        document.getElementById('name').addEventListener('input', () => this.handleNomeInput());
        document.getElementById('cpf').addEventListener('input', () => this.handleCPFInput());
        document.getElementById('cpf').addEventListener('blur', () => this.handleCPFBlur());
        document.getElementById('birth-date').addEventListener('input', () => this.handleBirthDateInput());
        document.getElementById('birth-date').addEventListener('blur', () => this.handleBirthDateBlur());
        document.getElementById('password').addEventListener('input', () => this.handlePasswordInput());
        document.getElementById('password').addEventListener('blur', () => this.handlePasswordBlur());
        document.getElementById('password2').addEventListener('input', () => this.handlePasswordInput2());
        document.getElementById('password2').addEventListener('blur', () => this.comparePasswords());
        document.getElementById('cep').addEventListener('input', () => this.handleCEPInput());
        document.getElementById('cep').addEventListener('blur', () => this.handleCEPBlur());
        document.getElementById('form-1').addEventListener('submit', (event) => this.handleForm1Submit(event));
        document.getElementById('form-2').addEventListener('submit', (event) => this.handleForm2Submit(event));
        document.getElementById('back-button').addEventListener('click', (event) => this.handleBackButton(event));
        window.onload = this.updateTargetPosition;
        window.addEventListener('resize', this.updateTargetPosition);
    }

    validarNome(nome) {
        nome = nome.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
        return nome.slice(0, 37);
    }

    handleNomeInput() {
        let nomeInput = document.getElementById('name');
        let valor = nomeInput.value;
        valor = this.validarNome(valor);
        nomeInput.value = valor;
    }

    formatarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    handleCPFInput() {
        let cpfInput = document.getElementById('cpf');
        let valor = cpfInput.value;
        valor = this.formatarCPF(valor);
        cpfInput.value = valor;
    }

    handleCPFBlur() {
        let cpfInput = document.getElementById('cpf');
        let valor = cpfInput.value.replace(/\D/g, '');
        while (valor.length < 11) {
            valor = '0' + valor;
        }
        valor = this.formatarCPF(valor);
        cpfInput.value = valor;
    }

    formatarBirthDate(birthDate) {
        birthDate = birthDate.replace(/\D/g, '');
        return birthDate.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }

    handleBirthDateInput() {
        let birthDateInput = document.getElementById('birth-date');
        let valor = birthDateInput.value;
        valor = this.formatarBirthDate(valor);
        birthDateInput.value = valor;
    }

    handleBirthDateBlur() {
        let birthDateInput = document.getElementById('birth-date');
        let valor = birthDateInput.value.replace(/\D/g, '');
        valor = this.formatarBirthDate(valor);
        birthDateInput.value = valor;
        if (birthDateInput.value.length < 10 && birthDateInput.value.length !== 0) {
            document.getElementById('birth-date-helper-text').innerHTML = '<span class="text-danger">Data inválida</span>';
        } else {
            document.getElementById('birth-date-helper-text').innerHTML = 'DD/MM/AAAA';
        }
    }

    handlePasswordInput() {
        let passwordInput = document.getElementById('password');
        let valor = passwordInput.value;
        if (valor.length > 16) {
            passwordInput.value = valor.slice(0, 16);
        }
    }

    handlePasswordBlur() {
        let passwordInput = document.getElementById('password');
        let valor = passwordInput.value;
        if (valor.length < 8) {
            document.getElementById('password-helper').innerHTML = '<p class="text-danger">A senha deve conter entre 8 a 16 caracteres</p>';
        } else {
            document.getElementById('password-helper').innerHTML = 'Deve conter entre 8 a 16 caracteres';
        }
    }

    handlePasswordInput2() {
        let passwordInput = document.getElementById('password2');
        let valor = passwordInput.value;
        if (valor.length > 16) {
            passwordInput.value = valor.slice(0, 16);
        }
    }

    comparePasswords() {
        let password1 = document.getElementById('password').value;
        let password2 = document.getElementById('password2').value;
        if (password1 !== password2) {
            document.getElementById('password-helper2').innerHTML = '<span class="text-danger">As senhas são diferentes</span>';
        } else if (password2 === '') {
            document.getElementById('password-helper2').innerHTML = 'Deve ser igual a anterior';
        } else {
            document.getElementById('password-helper2').innerHTML = '<span class="text-success">Senhas são iguais</span>';
        }
    }

    formatarCEP(cep) {
        cep = cep.replace(/\D/g, '');
        return cep.replace(/^(\d{5})(\d{3})/, '$1-$2');
    }

    handleCEPInput() {
        let cepInput = document.getElementById('cep');
        let valor = cepInput.value;
        valor = this.formatarCEP(valor);
        cepInput.value = valor;
    }

    async handleCEPBlur() {
        let cepInput = document.getElementById('cep');
        let valor = cepInput.value.replace(/\D/g, '');
        while (valor.length < 8) {
            valor = '0' + valor;
        }
        valor = this.formatarCEP(valor);
        cepInput.value = valor;
        await this.GetDataCep();
    }

    async GetDataCep() {
        let cepInput = document.getElementById('cep');
        let cep = cepInput.value.replace(/\D/g, '');
        if (cep.length < 8) {
            alert('CEP incompleto.');
            return;
        }
        cep = this.formatarCEP(cep);
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) {
                document.getElementById('cep-helper-text').innerHTML = '<span class="text-danger">CEP não encontrado</span>';
            } else {
                const logradouro = document.getElementById('logradouro');
                const uf = document.getElementById('uf');
                const cidade = document.getElementById('city');
                const bairro = document.getElementById('neighborhood');
                if (data.logradouro) logradouro.value = data.logradouro;
                if (data.localidade) cidade.value = data.localidade;
                if (data.uf) uf.value = data.uf;
                if (data.bairro) bairro.value = data.bairro;
            }
        } catch (error) {
            alert('Erro ao consultar o CEP.');
            console.error('Erro:', error);
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

    validateForm1() {
        const name = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value;
        const birthDate = document.getElementById('birth-date').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;

        return name && cpf && birthDate && email && password && (password === password2);
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
        return new User({ id, name, cpf, birthDate, email, password, address });
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
