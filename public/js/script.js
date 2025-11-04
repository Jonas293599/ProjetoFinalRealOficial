document.addEventListener("DOMContentLoaded", () => {
    //aqui é o header

    const header = document.querySelector('header');
    const style = document.querySelector('style');
    const css = `:root {
    --cor-senai-vermelho: #e30613;
    --cor-senai-preto: #000000;
    --cor-senai-cinza-escuro: #878787;
    --cor-fundo: #f5f5f5;
    --cor-borda: #e0e0e0;
    --cor-texto: #333;
}

body {
    font-family: 'Montserrat', sans-serif;
    background-color: var(--cor-fundo);
    color: var(--cor-texto);
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.header-senai {
    background-color: var(--cor-senai-vermelho);
    color: white;
    padding: 15px 30px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-senai span{
    width: 200px;
}
.header-senai .nav-bar ul{
    list-style: none;
    flex-wrap: nowrap;
    display: flex;
    justify-content: center;
}

.header-senai .nav-bar ul li{
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header-senai .nav-bar ul li a {
    text-decoration: none;
    outline: none;
    color: #fff;
    font-size: 1.2vw;
    padding: 0px 20px; 
}

.header-senai .nav-bar ul li a:hover{
    transform: scale(1.01);
    transition: 0.5s;
}


.header-senai .logo-text {
    font-size: 2em;
    font-weight: 700;
    letter-spacing: 2px;
    border: 4px solid white;
    padding: 5px 15px;
}

.container {
    width: 80vw;
    max-width: 1200px;
    margin: auto;
}

h1,
h2 {
    font-weight: 700;
    color: var(--cor-senai-preto);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

h2 {
    border-bottom: 3px solid var(--cor-senai-vermelho);
    padding-bottom: 10px;
}


.card {
    background-color: #fff;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 30px;
}

.item-list {
    list-style-type: none;
    padding: 0;
    max-height: 400px;
    overflow-y: auto;
}

.item-list li {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 2fr 0.5fr 0.5fr;
    gap: 10px;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid var(--cor-borda);
}

.item-list .list-header {
    font-weight: 700;
    background-color: #f9f9f9;
}

@media only screen and (max-width: 600px){

    .header-senai{
        width: 80vw;
        position: fixed;
    }
    .nav-menu{
        display: flex !important;
        width: 40px;
        height: 30px;
        flex-wrap: wrap;
        align-content: space-between;
        cursor: pointer;
    }
    .nav-menu:hover{
        background-color: rgba(0, 0, 0, 0.301);
        transition: all 0.2s;
    }
    .nav-menu .barra-menu1, .barra-menu2, .barra-menu3{
        height: 7px;
        background-color: white;
        border: solid 0px black;
        border-radius: 10px;
    }
    .nav-bar {
        display: none;
    }
    .header-senai{
        flex-wrap: wrap !important;
    }
    .span-espaco{
        display: none;
    }
    .container-menu{
        height: 100vh;
        width: 50vw;
        display: flex !important;
        justify-content: flex-end;
        background-color: #e30613;
        position: fixed;
        top: 104px;
        right: -50vw;
        transition: right 0.1s;
    }
    .container-menu ul{
        display: flex;
        flex-direction: column;
        transition: all 1s;
    }
    .container-menu ul li{
        list-style: none;
        padding: 15px;
        display: flex;
    }
    .container-menu ul li a{
        text-decoration: none;
        color: #ffff;
        text-align: end;
        display: flex;
        justify-content: flex-end;
    }
    .container-menu ul li a:hover{
        transform: scale(1.02);
        transition: all 0.5s;
    }
}`
    if (header) {
        header.innerHTML = `<div class="logo-text">SENAI</div>
            <div class="nav-bar">
                <ul>
                    <li><a href="/pages/cadprofessores.html">Cadastro de Professores</a></li>
                    <li><a href="/pages/cadambientes.html">Cadastro de Ambiente</a></li>
                    <li><a href="/pages/calendarioletivo.html">Calendário Letivo</a></li>
                    <li><a href="/pages/gestaodecadastros.html">Cadastro de Cursos</a></li>
                    <li><a href="/pages/telageral.html">Relatório Geral</a></li>
                </ul>
            </div>
            <div class="nav-menu" style="display: none;">
                <span class="barra-menu1"></span>
                <span class="barra-menu2"></span>
                <span class="barra-menu3"></span>
            </div>
            <span class="span-espaco"></span>
        `;

    }
    style.innerHTML = css;
    document.head.appendChild(style);

    //aqui é a manipulacao do css do menu

    const navMenu = document.querySelector('.nav-menu');
    const containerMenu = document.querySelector('.container-menu')

    navMenu.addEventListener('click', () => {
        if (containerMenu.style.right != '20px') {
            containerMenu.style.right = '20px';
        } else {
            containerMenu.style.right = '-50vw'
        }
    });

    //aqui é a aplicação do menu no html

    if(containerMenu){
        containerMenu.innerHTML = `<ul>
            <li>
                <a href="/pages/cadprofessores.html">Cadastro de Professores</a>
            </li>
            <li>
                <a href="/pages/cadambientes.html">Cadastro de Ambiente</a>
            </li>
            <li>
                <a href="/pages/calendarioletivo.html">Calendario Letivo</a>
            </li>
            <li>
                <a href="/pages/gestaodecadastros.html">Cadastro de Cursos</a>
            </li>
            <li>
                <a href="/pages/telageral.html">Relatório Geral</a>
            </li>
        </ul>`
    }
});
