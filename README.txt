Sistema de Gestão de Cronogramas SENAI
1. Introdução
Este projeto é um sistema web completo desenhado para a gestão e planeamento de cronogramas académicos para unidades do SENAI. O objetivo é substituir o uso de folhas de cálculo manuais por uma plataforma centralizada, inteligente e em tempo real, otimizando a alocação de recursos como professores, ambientes e turmas.

A aplicação foi construída com uma arquitetura robusta MVC (Model-View-Controller) no backend, garantindo a separação de responsabilidades e facilitando a manutenção e a escalabilidade do sistema.

2. Funcionalidades Principais
Cadastros Centralizados: Módulos dedicados para a gestão completa de:

Áreas de Conhecimento (com identificação por cor).

Disciplinas (com carga horária padrão).

Professores (associados a áreas, com horários e dias de folga).

Ambientes (salas, laboratórios, com detalhes de bloco, andar e capacidade).

Cursos (Técnico, FIC, CAI, associando múltiplas disciplinas).

Gestão do Calendário Letivo: Um calendário académico interativo para marcar feriados, recessos, eventos, reuniões e reposições de aula.

Planeamento Inteligente: Ferramentas para gerar cronogramas de turmas de forma automática, com base na carga horária total, respeitando o calendário letivo, horários de trabalho e intervalos.

Visualização e Relatórios: (Funcionalidade em desenvolvimento) Módulos para visualizar o cronograma geral e gerar relatórios de ocupação de professores e ambientes.

3. Tecnologias Utilizadas
Backend: Node.js com o framework Express.js.

Base de Dados: MySQL.

Arquitetura: MVC (Model-View-Controller).

Frontend (Views): HTML5, CSS3 e JavaScript (Vanilla JS) para a interface do utilizador.

4. Estrutura do Projeto
O código está organizado da seguinte forma para manter a clareza e a separação de conceitos:

/
|-- config/
|   `-- db.js               # Configuração da ligação à base de dados MySQL
|-- controllers/
|   |-- areaController.js
|   |-- calendarioController.js
|   |-- cursoController.js
|   |-- disciplinaController.js
|   |-- ambienteController.js
|   `-- professorController.js  # Lógica para tratar as requisições
|-- database/
|   `-- schema.sql          # Script SQL para criar todas as tabelas e dados iniciais
|-- models/
|   |-- areaModel.js
|   |-- calendarioModel.js
|   |-- cursoModel.js
|   |-- disciplinaModel.js
|   |-- ambienteModel.js
|   `-- professorModel.js     # Lógica de interação com a base de dados
|-- routes/
|   |-- areaRoutes.js
|   |-- calendarioRoutes.js
|   |-- cursoRoutes.js
|   |-- disciplinaRoutes.js
|   |-- ambienteRoutes.js
|   `-- professorRoutes.js      # Definição dos endpoints da API
|-- views/
|   |-- calendario.html
|   |-- professores.html
|   `-- ...                 # Ficheiros HTML que o utilizador vê
`-- server.js                 # Ficheiro principal que inicia a aplicação

5. Instalação e Execução
Siga os passos abaixo para configurar e executar o projeto no seu ambiente local.

Pré-requisitos
Node.js (versão 14 ou superior)

Servidor MySQL (XAMPP, WAMP, Docker, etc.)

Passos
Clonar o Repositório (se estiver num sistema de controlo de versões)

git clone https://...

Instalar Dependências
Navegue até à pasta do projeto e instale as bibliotecas necessárias (Express, mysql2, etc.).

npm install

Configurar a Base de Dados

Inicie o seu serviço MySQL.

Crie uma nova base de dados chamada cronograma_senai.

Execute o script database/schema.sql para criar todas as tabelas e inserir os dados de exemplo.

Configurar a Ligação

Abra o ficheiro config/db.js.

Altere os campos host, user e password com as suas credenciais do MySQL.

Iniciar o Servidor

Execute o seguinte comando no seu terminal:

node server.js
