import User from "../models/userModel.js";
export const getUserLogin = async (req, res) => {
    const {email, senha} = req.body;
    // Verifica se os campos essenciais estão presentes
    if (!email || !senha) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    try {
        // 2. Chama o método de login com as credenciais
        const user = await User.login(email, senha);
        
        // 3. Verifica o resultado da autenticação
        if (user) {
            // Login bem-sucedido
            res.status(200).json(user); // Retorna os dados do usuário (sem o hash da senha)
        } else {
            // Falha na autenticação (e-mail ou senha inválidos)
            // Use uma mensagem genérica por segurança
            res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        }
    } catch (error) {
        console.error('Erro no processo de login:', error); // Log do erro no servidor
        // 4. Resposta de erro no servidor
        res.status(500).json({ message: 'Erro interno do servidor durante o login.', error: error.message });
    }
};
export const registerUser = async (req, res) => {
    const {nome, email, senha} = req.body;
    if(!email, !senha, !nome){
        return res.status(400).json({ message: 'E-mail, senha e nome são obrigatórios.' });
    }

    try{
        const user = await User.register(nome, email, senha);

        if(user){
            res.status(200).json(user); 
        }else{
            res.status(401).json({ message: 'Falha ao registrar' });
        }
    }catch (error) {
        console.error('Erro no processo de registro:', error); // Log do erro no servidor
        // 4. Resposta de erro no servidor
        res.status(500).json({ message: 'Erro interno do servidor durante o registro.', error: error.message });
    }
}