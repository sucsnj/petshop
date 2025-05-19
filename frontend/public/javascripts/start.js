import { vars } from './vars.js';
import { lists } from './lists.js';
import { tools } from './tools.js';
import { buttons } from './buttons.js';

function telaInicial() { // exibe a tela inicial
    const removerRequired = [ // elementos que terão seus atributos required removidos sempre que a tela inicial for carregada
        `petForm`,
        `tutorForm`,
        `produtoForm`,
        `servicoForm`,
        `pedidoForm`,
    ];
    removerRequired.forEach(item => tools.removerAttrRequired(item)); // executa a função removerAttrRequired() para cada item do array

    const executar = { // executa a função correspondente ao valor de tab
        1: () => { // se tab for 1, executa as funções abaixo
            lists.listaPet();
            $("#petForm").hide();
            $("#btn_novoPet").show();
            $("#table_pet").show();
        },
        2: () => { // se tab for 2, executa as funções abaixo
            tools.listaDinamica(`tutors/`, `tutor_list`, lists.listaTutor);
            $("#tutorForm").hide();
            $("#btn_novoTutor").show();
            $("#table_tutor").show();
        },
        3: () => { // se tab for 3, executa as funções abaixo...
            tools.listaDinamica(`products/`, `produto_list`, lists.listaProduto);
            $("#produtoForm").hide();
            $("#btn_novoProduto").show();
            $("#table_produto").show();
        },
        4: () => { // se tab for 4, executa as funções abaixo...
            tools.listaDinamica(`services/`, `servico_list`, lists.listaServico);
            $("#servicoForm").hide();
            $("#btn_novoServico").show();
            $("#table_servico").show();
        },
        5: () => {
            // lists.listaPedido();
            tools.listaDinamica(`orders/`, `pedido_list`, lists.listaPedido);
            buttons.limparCards();
            $("#pedidoForm").hide();
            $("#btn_novoPedido").show();
            $("#table_pedido").show();
        },
    };

    if (executar[vars.tab]) { // se o valor de tab existir dentro de executar, executa a função correspondente > if() não obrigatório
        executar[vars.tab](); // executa a função correspondente ao valor de tab
    }
}

export const start = {
    telaInicial
};