const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('emailInput').value;
    const senha = document.getElementById('senhaInput').value;
    const dadosLogin = {
        email: email,
        senha: senha
    };
    console.log("Dados capturados:", dadosLogin);
    enviarDadosLogin(dadosLogin);
});

/**
 * Função assíncrona para enviar os dados para o endpoint de login.
 * @param {object} dados - Objeto contendo email e senha.
 */
async function enviarDadosLogin(dados) {
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
            alert(`Login bem-sucedido! Bem-vindo(a), ${resultado.nome || dados.email}!`);
            // Redirecionando o usuario
            window.location.href = 'telageral.html'; 
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