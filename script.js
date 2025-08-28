// Função para validar todos os campos do formulário
function validarFormulario() {
    // Captura os valores dos campos do formulário e remove espaços em branco
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const login = document.getElementById("login").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const senhaConfirma = document.getElementById("senhaConfirma").value.trim();
    const salario = parseFloat(document.getElementById("salario").value.trim());
    const dependentes = parseInt(document.getElementById("dependentes").value.trim(), 10);

    // Expressões regulares para validar os formatos de senha, CPF, login e e-mail
    const regexSenha = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const regexLogin = /^[A-Za-z0-9.-]{4,}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Validação do campo Nome
    if (!nome) {
        alert("Favor preencher o campo Nome.");
        return false;
    }

    if (nome.length <= 3) {
        alert("O nome deve conter no mínimo 3 caracteres.");
        return false;
    }

    // Validação do campo CPF
    if (!cpf) {
        alert("Favor preencher o campo CPF.");
        return false;
    }

    if (!regexCPF.test(cpf)) {
        alert("Formato de CPF inválido. Tente o seguinte formato: 000.000.000-00.");
        return false;
    }

    // Validação do campo Login
    if (!login) {
        alert("Favor preencher o campo Login.");
        return false;
    }

    if (login.length <= 3) {
        alert("O Login deve conter no mínimo 3 caracteres.");
        return false;
    }

    if (!regexLogin.test(login)) {
        alert("Formato de Login inválido. Utilize apenas letras, números e símbolos como (. , / _ -).");
        return false;
    }

    // Validação do campo E-mail
    if (!email) {
        alert("Favor preencher o campo E-mail.");
        return false;
    }

    if (!regexEmail.test(email)) {
        alert("Formato de e-mail inválido.");
        return false;
    }

    // Validação do campo Senha
    if (!senha) {
        alert("Favor preencher a senha.");
        return false;
    }

    if (!regexSenha.test(senha)) {
        alert("A senha deve conter pelo menos 1 dígito e 1 letra.");
        return false;
    }

    if (senha.length < 8) {
        alert("Digite uma senha com no mínimo 8 caracteres.");
        return false;
    }

    // Validação do campo de confirmação de senha
    if (!senhaConfirma) {
        alert("Favor preencher o campo de confirmação da senha.");
        return false;
    }

    if (senhaConfirma.length < 8) {
        alert("A confirmação da senha deve conter no mínimo 8 caracteres.");
        return false;
    }

    if (senhaConfirma !== senha) {
        alert("As senhas não coincidem.");
        return false;
    }

    // Validação do campo Salário
    if (isNaN(salario) || salario <= 0) {
        alert("O salário deve ser um número maior que zero.");
        return false;
    }

    // Validação do campo Dependentes
    if (isNaN(dependentes) || dependentes < 0) {
        alert("O número de dependentes deve ser zero ou mais.");
        return false;
    }

    // Se todas as validações passarem, exibe mensagem de sucesso
    alert("Formulário preenchido com sucesso!");
    return true; // Retorna true para permitir o envio do formulário
}

// Função para calcular o valor do IR com base no salário e número de dependentes
function calcularIR() {
    const salario = parseFloat(document.getElementById("salario").value.trim());
    const dependentes = parseInt(document.getElementById("dependentes").value.trim(), 10);
    const campoIR = document.getElementById("ir"); // Campo onde será exibido o IR

    // Verifica se os dados são válidos
    if (isNaN(salario) || salario <= 0 || isNaN(dependentes) || dependentes < 0) {
        campoIR.value = '';
        return;
    }

    // Cálculo do IR
    const baseCalculo = salario - (dependentes * 200); // Desconto de R$200 por dependente
    const baseCorrigida = baseCalculo < 0 ? 0 : baseCalculo; // Garante que não seja negativo
    const aliquota = 0.15; // Alíquota de 15%
    const ir = baseCorrigida * aliquota;

    campoIR.value = ir.toFixed(2); // Exibe o resultado com 2 casas decimais
}

// Função para alternar a visibilidade dos campos de senha
function toggleSenha(idCampo, elemento) {
    const campo = document.getElementById(idCampo);

    // Alterna entre os tipos "password" e "text"
    if (campo.type === "password") {
        campo.type = "text";
        elemento.textContent = "🙈"; // Ícone quando a senha está visível
    } else {
        campo.type = "password";
        elemento.textContent = "👁️"; // Ícone quando a senha está oculta
    }
}

// Função para limpar todos os campos do formulário
function limparFormulario() {
    const formulario = document.querySelector('form');
    formulario.reset(); // Limpa os campos preenchidos
    document.getElementById('ir').value = ''; // Limpa também o campo do IR
}
