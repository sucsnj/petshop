import { start } from "./start.js"; // funções para iniciar telas
import { vars } from "./vars.js"; // variáveis globais
import { tools } from "./tools.js"; // funções auxiliares
import { crud } from "./crud.js"; // funções para CRUD
import { alerts } from "./alerts.js";

let produtos = []; // array final com a lista de produtos
let quantidadeProdutos = []; // quantidade de cada produto
let produtosLista = []; // array com a lista de todos os produtos no banco de dados
let produtoId = 0; // id do produto (apenas para gerar um id único para cada produto dentro do html dinâmico)
let listaProdutos = []; // lista de produtos do pedido

let servicos = [];
let quantidadeServicos = [];
let servicosLista = [];
let servicoId = 0;
let listaServicos = [];

const botoesPet = () => { // botões para a tela de pets
    $("#btn_novoPet").on('click', function () { // tela para adicionar um novo pet
        alerts.verificarLogin().then((resultado) => {
            if (!resultado) {
                return;
            } else {
                crud.menuAdd(`petForm`);
            }
        });
    });

    $("#btn_salvarPet").on('click', function () { // tela para salvar um pet
        if (vars.editar) { // verifica se é uma edição ou um novo pet
            alerts.mensagemSalvar().then((result) => {
                if (result.isConfirmed) {
                    crud.atualizarPorId(vars.petId, `pets/`, `petForm`);
                    start.telaInicial();
                }
            })
        } else { // caso seja um novo pet, confirma se todos os campos estão preenchidos, caso sim, salva
            tools.verificarCamposNovo(`petForm`, `pets/`);
        }
    });

    $("#btn_voltarPet").on('click', function () { // voltar para a tela de pets
        alerts.mensagemVoltar().then((result) => {
            if (result.isConfirmed) {
                start.telaInicial();
            }
        })
    });
};

const botoesTutor = () => { // botões para a tela de tutores
    $("#btn_novoTutor").on('click', function () { // tela para adicionar um novo tutor
        crud.menuAdd(`tutorForm`);
    })
    $("#btn_salvarTutor").on('click', function () { // tela para salvar um tutor
        if (vars.editar) { // verifica se é uma edição ou um novo tutor
            if (confirm("Deseja salvar?")) {
                crud.atualizarPorId(vars.tutorId, `tutors/`, `tutorForm`);
                start.telaInicial();
            }
        } else { // caso seja um novo tutor, confirma se todos os campos estão preenchidos, caso sim, salva
            tools.verificarCamposNovo(`tutorForm`, `tutors/`);
        }
    })
    $("#btn_voltarTutor").on('click', function () { // voltar para a tela de tutores
        if (confirm("Deseja voltar?")) {
            start.telaInicial();
        }
    })
}

const botoesProduto = () => { // botões para a tela de produtos
    $("#btn_novoProduto").on('click', function () { // tela para adicionar um novo produto
        crud.menuAdd(`produtoForm`);
    })
    $("#btn_salvarProduto").on('click', function () { // tela para salvar um produto
        if (vars.editar) { // verifica se é uma edição ou um novo produto
            if (confirm("Deseja salvar?")) {
                crud.atualizarPorId(vars.prodId, `products/`, `produtoForm`);
                start.telaInicial();
            }
        } else { // caso seja um novo produto, confirma se todos os campos estão preenchidos, caso sim, salva
            tools.verificarCamposNovo(`produtoForm`, `products/`);
        }
    })
    $("#btn_voltarProduto").on('click', function () { // voltar para a tela de produtos
        if (confirm("Deseja voltar?")) {
            start.telaInicial();
        }
    })
}

const botoesServico = () => { // botões para a tela de serviços
    $("#btn_novoServico").on('click', function () { // tela para adicionar um novo serviço
        crud.menuAdd(`servicoForm`);
    })
    $("#btn_salvarServico").on('click', function () { // tela para salvar um serviço
        if (vars.editar) { // verifica se é uma edição ou um novo serviço
            if (confirm("Deseja salvar?")) {
                crud.atualizarPorId(vars.servId, `services/`, `servicoForm`);
                start.telaInicial();
            }
        } else { // caso seja um novo serviço, confirma se todos os campos estão preenchidos, caso sim, salva
            tools.verificarCamposNovo(`servicoForm`, `services/`);
        }
    })
    $("#btn_voltarServico").on('click', function () { // voltar para a tela de serviços
        if (confirm("Deseja voltar?")) {
            start.telaInicial();
        }
    })
}

// implementando botões do pedido ////////////////////////////////////////////////////////
const botoesPedido = () => { // botões para a tela de pedidos
    $("#btn_novoPedido").on('click', function () { // tela para adicionar um novo pet
        crud.menuAdd(`pedidoForm`);
    });

    // produtos
    $("#btn_enviarPedido").on('click', function () { // botão para enviar pedido
        produtosCorpo(quantidadeProdutos, listaProdutos); // retorna o array de produtos para o backend
        servicosCorpo(quantidadeServicos, listaServicos); // retorna o array de serviços para o backend
    });
    $("#btn_voltarPedido").on('click', function () { // botão para voltar
        start.telaInicial();
    });
    $("#btn_produtoAdd").on('click', function () { // botão para produto dentro do html
        cardProduto();
    });
    $(document).on('click', '.btnAdicionarProduto', function () { // botão para produto dentro do js
        $(".btnAdicionarProduto").hide();
        $(".btnRemoverProduto").show();
        cardProduto();
    });
    $(document).on('click', '.btnRemoverProduto', function () { // botão para remover produto
        $(this).closest('.card.produtos').remove();
        atualizarListaQuantidadesProdutos();
        atualizarListaProdutos();
    });
    $(document).on('input', '.quantProduto', function () {
        atualizarListaQuantidadesProdutos();
    });
    $(document).on('input', '.quantProduto', atualizarListaProdutos);
    $(document).on('change', 'select[name="Produto"]', atualizarListaProdutos);

    $(document).on('change', 'select[name="Produto"]', function () {
        let selectedOption = $(this).find('option:selected');
        let preco = selectedOption.data('price') || 0;
        $(this).closest(".card").find(".precoProduto").text(preco);
    });

    $(document).on('change', 'select[name="Produto"], .quantProduto', function () {
        let card = $(this).closest(".card");
        let selectedOption = card.find('select[name="Produto"] option:selected');
        let preco = selectedOption.data('price') || 0;
        let quantidade = card.find('.quantProduto').val() || 1;
        let total = preco * quantidade;

        card.find(".precoProduto").text(preco);
        card.find(".totalProduto").text(total);
    });

    // serviços
    $("#btn_servicoAdd").on('click', function () { // botão para serviço dentro do html
        cardServico();
    });
    $(document).on('click', '.btnAdicionarServico', function () { // botão para serviço dentro do js
        $(".btnAdicionarServico").hide();
        $(".btnRemoverServico").show();
        cardServico();
    });
    $(document).on('click', '.btnRemoverServico', function () { // botão para remover serviço
        $(this).closest('.card.servicos').remove();
        atualizarListaQuantidadesServicos();
        atualizarListaServicos();
    });
    $(document).on('input', '.quantServico', function () {
        atualizarListaQuantidadesServicos();
    });
    $(document).on('input', '.quantServico', atualizarListaServicos);
    $(document).on('change', 'select[name="Servico"]', atualizarListaServicos);

    $(document).on('change', 'select[name="Servico"]', function () {
        let selectedOption = $(this).find('option:selected');
        let preco = selectedOption.data('price') || 0;
        $(this).closest(".card").find(".precoServico").text(preco);
    });

    $(document).on('change', 'select[name="Servico"], .quantServico', function () {
        let card = $(this).closest(".card");
        let selectedOption = card.find('select[name="Servico"] option:selected');
        let preco = selectedOption.data('price') || 0;
        let quantidade = card.find('.quantServico').val() || 1;
        let total = preco * quantidade;

        card.find(".precoServico").text(preco);
        card.find(".totalServico").text(total);
    });
}

// card produto //////////////////////////////////////////////////////////////////////////////////////
function cardProduto() { // cria um card para um único produto
    crud.carregar(`products/`).then((data) => {
        produtosLista = data; // contém a lista de todos os produtos no banco de dados

        let options = '<option value="" disabled selected>Selecione um Produto</option>';
        for (let i = 0; i < produtosLista.length; i++) {
            options += `<option value="${produtosLista[i].id}" data-price="${produtosLista[i].price}">${produtosLista[i].name}</option>`;
        }
        produtoId += 1;

        const novoItem = $(`
            <div class="card produtos col s12">
                <div class="row s12">
                    <div class="row">
                        <div class="input-field col s4">
                            <i class="material-icons prefix">add_shopping_cart</i>
                            <select name="Produto" class="browser-default">
                                ${options}
                            </select>
                            <label class="active">Produto</label>
                        </div>
                        <div class="input-field col s3">
                            <label class="active">Preço</label>
                            <a href="#!" class="collection-item"><span class="badge precoProduto">0</span>R$</a>
                        </div>
                        <div class="input-field col s2">
                            <i class="material-icons prefix">control_point</i>
                            <input class="quantProduto" name="quantProduto[]" type="number" min="1" class="validate" value="1">
                            <label class="active">Quantidade</label>
                        </div>
                        <div class="input-field col s3">
                            <label class="active">Total</label>
                            <a href="#!" class="collection-item"><span class="badge totalProduto">0</span>R$</a>
                        </div>
                    </div>
                    <div class="row s12">
                        <div class="col s3">
                            <a id="btn_removeProd-${produtoId}" class="waves-effect waves-light btn btnRemoverProduto">Remover Produto</a>
                        </div>
                    </div>
                </div>
            </div>
        `);

        $('#produtos_container').append(novoItem);
        atualizarListaQuantidadesProdutos();
        atualizarListaProdutos();
    });
}

// Atualiza o preço e o total ao mudar o produto ou a quantidade
$(document).on('change', 'select[name="Produto"], .quantProduto', function () {
    let card = $(this).closest(".card");
    let selectedOption = card.find('select[name="Produto"] option:selected');
    let preco = selectedOption.data('price') || 0;
    let quantidade = card.find('.quantProduto').val() || 1;
    let total = preco * quantidade;

    card.find(".precoProduto").text(preco);
    card.find(".totalProduto").text(total);
});


function atualizarListaProdutos() { // atualiza a lista de produtos do pedido
    $('.card.produtos').each(function (index) {
        let produtoId = $(this).find('select[name="Produto"]').val(); // Captura o ID do produto
        if (produtoId) { // Evita criar valores vazios dentro do array
            listaProdutos[index] = Number(produtoId); // guarda o valor antigo, e altera apenas o que modificado
        }
    });
}

function atualizarListaQuantidadesProdutos() { // atualiza a lista de quantidades dos produtos do pedido
    quantidadeProdutos = [];
    $('.quantProduto').each(function () {
        quantidadeProdutos.push(Number($(this).val())); // Armazena cada valor corretamente
    });
}

function produtosCorpo(qtd, prod) { // cria um array com a lista dos produtos para o backend
    produtos = [];
    for (let i = 0; i < qtd.length; i++) {
        produtos.push(...Array(qtd[i]).fill(prod[i]));
    }
}

// card serviço //////////////////////////////////////////////////////////////////////////////////////
function cardServico() { // cria um card para um único servico
    crud.carregar(`services/`).then((data) => {
        servicosLista = data; // contém a lista de todos os servicos no banco de dados

        let options = '<option value="" disabled selected>Selecione um Servico</option>';
        for (let i = 0; i < servicosLista.length; i++) {
            options += `<option value="${servicosLista[i].id}" data-price="${servicosLista[i].price}">${servicosLista[i].name}</option>`;
        }
        servicoId += 1;

        const novoItem = $(`
            <div class="card servicos col s12">
                <div class="row s12">
                    <div class="row">
                        <div class="input-field col s4">
                            <i class="material-icons prefix">add_shopping_cart</i>
                            <select name="Servico" class="browser-default">
                                ${options}
                            </select>
                            <label class="active">Servico</label>
                        </div>
                        <div class="input-field col s3">
                            <label class="active">Preço</label>
                            <a href="#!" class="collection-item"><span class="badge precoServico">0</span>R$</a>
                        </div>
                        <div class="input-field col s2">
                            <i class="material-icons prefix">control_point</i>
                            <input class="quantServico" name="quantServico[]" type="number" min="1" class="validate" value="1">
                            <label class="active">Quantidade</label>
                        </div>
                        <div class="input-field col s3">
                            <label class="active">Total</label>
                            <a href="#!" class="collection-item"><span class="badge totalServico">0</span>R$</a>
                        </div>
                    </div>
                    <div class="row s12">
                        <div class="col s3">
                            <a id="btn_removeProd-${servicoId}" class="waves-effect waves-light btn btnRemoverServico">Remover Servico</a>
                        </div>
                    </div>
                </div>
            </div>
        `);

        $('#servicos_container').append(novoItem);
        atualizarListaQuantidadesServicos();
        atualizarListaServicos();
    });
}

function atualizarListaServicos() { // atualiza a lista de serviços do pedido
    $('.card.servicos').each(function (index) {
        let servicoId = $(this).find('select[name="Servico"]').val(); // Captura o ID do serviço
        if (servicoId) { // Evita criar valores vazios dentro do array
            listaServicos[index] = Number(servicoId); // guarda o valor antigo, e altera apenas o que modificado
        }
    });
}

function atualizarListaQuantidadesServicos() { // atualiza a lista de quantidades dos serviços do pedido
    quantidadeServicos = [];
    $('.quantServico').each(function () {
        quantidadeServicos.push(Number($(this).val())); // Armazena cada valor corretamente
    });
}

function servicosCorpo(qtd, prod) { // cria um array com a lista dos serviços para o backend
    servicos = [];
    for (let i = 0; i < qtd.length; i++) {
        servicos.push(...Array(qtd[i]).fill(prod[i]));
    }
}

export const buttons = {
    botoesPet,
    botoesTutor,
    botoesProduto,
    botoesServico,
    botoesPedido
};