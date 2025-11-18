const loginForm = document.getElementById('RegisterForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('emailInput').value;
    const senha = document.getElementById('senhaInput').value;
    const nome = document.getElementById('nomeInput').value;
    const dadosResgistro = {
        email: email,
        senha: senha,
        nome: nome
    };
    console.log("Dados capturados:", dadosResgistro);
    enviarDadosRegistro(dadosResgistro);
});

/**
 * Função assíncrona para enviar os dados para o endpoint de login.
 * @param {object} dados - Objeto contendo email, senha e nome.
 */
async function enviarDadosRegistro(dados) {
    var mensagemErroElemento;
    mensagemErroElemento = ' '; // Limpa mensagens anteriores

    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const resultado = await response.json();
            alert(`Registro bem-sucedido! ${resultado.nome || dados.email}!`);
            // Redirecionando o usuario
            window.location.href = 'telalogin.html'; 
        } else {
            // Lida com erros (401 Unauthorized, 400 Bad Request, etc.)
            const erro = await response.json();
            mensagemErroElemento = erro.message || 'E-mail ou senha inválidos.';
        }
    } catch (error) {
        // Lida com erros de rede (o servidor não está acessível)
        console.log('Erro de rede:' + error);
        mensagemErroElemento = 'Não foi possível conectar ao servidor. Tente novamente.';
    }

}