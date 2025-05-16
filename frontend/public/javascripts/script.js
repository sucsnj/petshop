import { vars } from './vars.js';
import { tools } from './tools.js';
import { start } from './start.js';
import { buttons } from './buttons.js';
import { auth } from './login.js';

$(window).on('load', function () {

    const token = localStorage.getItem('token'); // Obtém o token armazenado
    if (!token && vars.route == 'dashboard') { // se o usuário estiver na tela de logout sem um token, redireciona para a tela de login
        window.location.href = '/login';
    }
    if (vars.route === 'login') {
        auth.login(); // Executa a lógica de login apenas na página de login
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