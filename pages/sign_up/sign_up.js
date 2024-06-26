function validarNome(nome) {

    nome = nome.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    nome = nome.slice(0, 37);
    return nome;
}

function handleNomeInput() {
    let nomeInput = document.getElementById('name');
    let valor = nomeInput.value;
    valor = validarNome(valor);
    nomeInput.value = valor;
}

document.getElementById('name').addEventListener('input', handleNomeInput);
//---------------------------------------------------------------------------------------------------------------------

function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return cpf;
}

function handleCPFInput() {
    let cpfInput = document.getElementById('cpf');
    let valor = cpfInput.value;
    valor = valor.replace(/\D/g, '');
    valor = formatarCPF(valor);
    cpfInput.value = valor;
}

function handleCPFBlur() {
    let cpfInput = document.getElementById('cpf');
    let valor = cpfInput.value;

    valor = valor.replace(/\D/g, '');

    while (valor.length < 11) {
        valor = '0' + valor;
    }
    valor = formatarCPF(valor);
    cpfInput.value = valor;
}

document.getElementById('cpf').addEventListener('input', handleCPFInput);
document.getElementById('cpf').addEventListener('blur', handleCPFBlur);
//---------------------------------------------------------------------------------------------------------------------
function formatarBirthDate(birthDate) {
    birthDate = birthDate.replace(/\D/g, '');
    birthDate = birthDate.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    return birthDate;
}

function handleBirthDateInput() {
    let birthDateInput = document.getElementById('birth-date');
    let valor = birthDateInput.value;
    valor = valor.replace(/\D/g, '');
    valor = formatarBirthDate(valor);
    birthDateInput.value = valor;
}

function handleBirthDateBlur() {
    let birthDateInput = document.getElementById('birth-date');
    let valor = birthDateInput.value;

    valor = valor.replace(/\D/g, '');
    valor = formatarBirthDate(valor);
    birthDateInput.value = valor;
}

document.getElementById('birth-date').addEventListener('input', handleBirthDateInput);
document.getElementById('birth-date').addEventListener('blur', handleBirthDateBlur);
//---------------------------------------------------------------------------------------------------------------------
function handlePasswordInput() {
    let passwordInput = document.getElementById('password');
    let valor = passwordInput.value;

    if (valor.length > 16) {
        passwordInput.value = valor.slice(0, 16);
    }
}

function handlePasswordBlur() {
    let passwordInput = document.getElementById('password');
    let valor = passwordInput.value;

    if (valor.length < 8) {
        document.getElementById('password-helper').innerHTML = `<p class="text-danger">A senha deve conter entre 8 a 16 caracteres</>`
    } else {
        document.getElementById('password-helper').innerHTML = `<p>Deve conter entre 8 a 16 caracteres</>`
    }
}

document.getElementById('password').addEventListener('input', handlePasswordInput);
document.getElementById('password').addEventListener('blur', handlePasswordBlur);
//---------------------------------------------------------------------------------------------------------------------
function handlePasswordInput2() {
    let passwordInput = document.getElementById('password2');
    let valor = passwordInput.value;

    if (valor.length > 16) {
        passwordInput.value = valor.slice(0, 16);
    }
}
function comparePasswords() {

    let password1 = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;

    if (password1 !== password2) {
        document.getElementById('password-helper2').innerHTML = `<span class="text-danger">As senhas são diferentes</span>`
        if (password2 === '') {
            document.getElementById('password-helper2').innerHTML = `<span>Deve ser igual a anterior</span>`
        }
    } else {
        if (password1.length < 8 || password1.length === '') {
            document.getElementById('password-helper2').innerHTML = `<span>Deve ser igual a anterior</>`
        } else {
            document.getElementById('password-helper2').innerHTML = `<span class="text-success">Senhas são iguais</span>`
        }
    }
}
document.getElementById('password2').addEventListener('input', handlePasswordInput2);
document.getElementById('password2').addEventListener('blur', comparePasswords);
//---------------------------------------------------------------------------------------------------------------------
function formatarCEP(cep) {

    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{5})(\d{3})/, '$1-$2');
    return cep;
}

function handleCEPInput() {
    let cepInput = document.getElementById('cep');
    let valor = cepInput.value;
    valor = formatarCEP(valor);
    cepInput.value = valor;
}

const handleCEPBlur = () => {
    let cepInput = document.getElementById('cep');
    let valor = cepInput.value;
    if(valor===''){
        return
    }
    valor = valor.replace(/\D/g, '');
    valor = formatarCEP(valor);
    cepInput.value = valor;
    while (valor.length < 8) {
        valor = '0' + valor;
    }
    const cepNumber = valor
    valor = formatarCEP(valor)
    cepInput.value = valor;
    GetDataCep()
}
async function GetDataCep() {
    let cepInput = document.getElementById('cep');
    let cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length < 8) {
        alert('CEP incompleto.');
        return;
    }

    cep = formatarCEP(cep);

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            document.getElementById('cep-helper-text').innerHTML = `<span class="text-danger">CEP não encontrado</>`
        } else {
            console.log(`Endereço: ${data}, ${data.localidade} - ${data.uf}`)
            
        }
    } catch (error) {
        alert('Erro ao consultar o CEP.');
        console.error('Erro:', error);
    }
}

document.getElementById('cep').addEventListener('input', handleCEPInput);
document.getElementById('cep').addEventListener('blur', handleCEPBlur);

//---------------------------------------------------------------------------------------------------------------------
document.getElementById('form-1').addEventListener('submit', (event) => {
    event.preventDefault();
    const fieldsetForm1 = document.getElementById('fieldset-form-1')
    const form1 = document.getElementById('form-1')
    const fieldsetForm2 = document.getElementById('fieldset-form-2')
    const form2 = document.getElementById('form-2')

    fieldsetForm1.disabled = true
    form1.classList.remove('bg-light')
    form1.style.backgroundColor = 'rgb(180, 182, 189)'
    form1.style.opacity = '0.8'

    fieldsetForm2.disabled = false
    form2.classList.add('bg-light')
    form2.style.opacity = '1'

});