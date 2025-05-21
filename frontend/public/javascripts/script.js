import { vars } from './vars.js';
import { tools } from './tools.js';
import { start } from './start.js';
import { buttons } from './buttons.js';
import { auth } from './login.js';
import { masks } from './imask.js';

$(document).ready(function () {
    masks.emailMask();
    masks.phoneMask();
    masks.ageMask();
});

$(window).on('load', function () {

    const token = localStorage.getItem('token'); // Obtém o token armazenado
    if (!token && vars.route == 'dashboard') { // se o usuário estiver na tela de logout sem um token, redireciona para a tela de login
        window.location.href = '/login';
    }
    if (vars.route === 'login') {
        auth.login(); // Executa a lógica de login apenas na página de login
    }
    if (vars.route === 'login' && token) { // se o usuário estiver logado e tentar acessar a tela de login
        window.location.href = '/dashboard'; // manda para a tela de dashboard
    }
    if (token) {
        $(".login_logout").hide();
        $(".dashboard").show();
    } else {
        $(".login_logout").show();
        $(".dashboard").hide();
    }

    tools.telaDeCarregamento(800); // tela de loading
    vars.tab = 0

    const routes = {
        index: () => {
            vars.tab = 0; // indica que a tela é a de inicial - (0, 1, 2, 3, 4, 5) - (index, pets, tutors, products, services, orders)
        },
        pets: () => {
            vars.tab = 1;
            buttons.botoesPet(); // executa os botões da tela de pets
            start.telaInicial(); // carrega a tela de inicio com base no endpoint escolhido
        },
        tutors: () => {
            vars.tab = 2;
            buttons.botoesTutor();
            start.telaInicial();
        },
        products: () => {
            vars.tab = 3;
            buttons.botoesProduto();
            start.telaInicial();
        },
        services: () => {
            vars.tab = 4;
            buttons.botoesServico();
            start.telaInicial();
        },
        orders: () => {
            vars.tab = 5;
            buttons.botoesPedido();
            start.telaInicial();
        }
    }

    if (vars.route in routes) {
        routes[vars.route](); // executa a função correspondente ao endpoint
    }
});