import { start } from "./start.js"; // funções para iniciar telas
import { vars } from "./vars.js"; // variáveis globais
import { tools } from "./tools.js"; // funções auxiliares
import { crud } from "./crud.js"; // funções para CRUD
import { alerts } from "./alerts.js";

let produtos = []; // array final com a lista de produtos
let quantidadeProdutos = []; // quantidade de cada produto
let listaProdutos = []; // lista de produtos do pedido

let servicos = [];
let quantidadeServicos = [];
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

const botoesTutor = () => { // botões para a tela de tutors
    $("#btn_novoTutor").on('click', function () { // tela para adicionar um novo tutor
        alerts.verificarLogin().then((resultado) => {
            if (!resultado) {
                return;
            } else {
                crud.menuAdd(`tutorForm`);
            }
        });
    });

    $("#btn_salvarTutor").on('click', function () { // tela para salvar um tutor
        if (vars.editar) { // verifica se é uma edição ou um novo tutor
            alerts.mensagemSalvar().then((result) => {
                if (result.isConfirmed) {
                    crud.atualizarPorId(vars.tutorId, `tutors/`, `tutorForm`);
                    start.telaInicial();
                }
            })
        } else { // caso seja um novo tutor, confirma se todos os campos estão preenchidos, caso sim, salva
            tools.verificarCamposNovo(`tutorForm`, `tutors/`);
        }
    });

    $("#btn_voltarTutor").on('click', function () { // voltar para a tela de tutors
        alerts.mensagemVoltar().then((result) => {
            if (result.isConfirmed) {
                start.telaInicial();
            }
        })
    });
};

const botoesProduto = () => { // botões para a tela de produtos
    $("#btn_novoProduto").on('click', function () { // tela para adicionar um novo produto
        alerts.verificarLogin().then((resultado) => {
            if (!resultado) {
                return;
            } else {
                crud.menuAdd(`produtoForm`);
            }
        });
    })
    $("#btn_salvarProduto").on('click', function () { // tela para salvar um produto
        if (vars.editar) { // verifica se é uma edição ou um novo produto
            alerts.mensagemSalvar().then((result) => {
                if (result.isConfirmed) {
                    crud.atualizarPorId(vars.prodId, `products/`, `produtoForm`);
                    start.telaInicial();
                }
            })
        } else { // caso seja um novo produto, confirma se todos os campos estão preenchidos, caso sim, salva
            tools.verificarCamposNovo(`produtoForm`, `products/`);
        }
    })
    $("#btn_voltarProduto").on('click', function () { // voltar para a tela de produtos
        alerts.mensagemVoltar().then((result) => {
            if (result.isConfirmed) {
                start.telaInicial();
            }
        })
    })
}

const botoesServico = () => { // botões para a tela de serviços
    $("#btn_novoServico").on('click', function () { // tela para adicionar um novo serviço
        alerts.verificarLogin().then((resultado) => {
            if (!resultado) {
                return;
            } else {
                crud.menuAdd(`servicoForm`);
            }
        });
    })
    $("#btn_salvarServico").on('click', function () { // tela para salvar um serviço
        if (vars.editar) { // verifica se é uma edição ou um novo produto
            alerts.mensagemSalvar().then((result) => {
                if (result.isConfirmed) {
                    crud.atualizarPorId(vars.servId, `services/`, `servicoForm`);
                    start.telaInicial();
                }
            })
        } else { // caso seja um novo produto, confirma se todos os campos estão preenchidos, caso sim, salva
            tools.verificarCamposNovo(`servicoForm`, `services/`);
        }
    })
    $("#btn_voltarServico").on('click', function () { // voltar para a tela de serviços
        alerts.mensagemVoltar().then((result) => {
            if (result.isConfirmed) {
                start.telaInicial();
            }
        })
    })
}

const botoesPedido = () => { // botões para a tela de pedidos
    $("#btn_novoPedido").on('click', function () { // tela para adicionar um novo pedido
        alerts.verificarLogin().then((resultado) => {
            if (!resultado) {
                return;
            } else {
                crud.menuAdd(`pedidoForm`);
            }
        });
    });
    $("#btn_salvarPedido").on('click', function () { // tela para salvar um pedido
        produtosCorpo(quantidadeProdutos, listaProdutos);
        servicosCorpo(quantidadeServicos, listaServicos);
        if (vars.editar) { // verifica se é uma edição ou um novo pedido
            alerts.mensagemSalvar().then((result) => {
                if (result.isConfirmed) {
                    crud.atualizarPorId(vars.pedId, `orders/`, `pedidoForm`);
                    start.telaInicial();
                }
            })
        } else { // caso seja um novo produto, confirma se todos os campos estão preenchidos, caso sim, salva
            tools.verificarCamposNovo(`pedidoForm`, `orders/`);
        }
    })
    $("#btn_voltarPedido").on('click', function () { // botão para voltar
        alerts.mensagemVoltar().then((result) => {
            if (result.isConfirmed) {
                start.telaInicial();
            }
        })
    });

    // botões card produto
    addCardProduto();
    removerCardProduto();
    atualizarValoresProduto();

    // botões card serviço
    addCardServico();
    removerCardServico();
    atualizarValoresServico();
}

function limparCards() {
    $('.card.produtos').remove(); // Remove todos os cards de produtos
    $('.card.servicos').remove(); // Remove todos os cards de produtos
    atualizarListaQuantidadesProdutos();
    atualizarListaProdutos();
    atualizarListaQuantidadesServicos();
    atualizarListaServicos();
}

// funções para produtos
function addCardProduto() {
    $(document).on('click', '#btn_produtoAdd, .btnAdicionarProduto', function () {
        cardProduto();

        if ($(this).hasClass("btnAdicionarProduto")) {
            $(".btnAdicionarProduto").hide();
            $(".btnRemoverProduto").show();
        }
    });
}

function removerCardProduto() {
    $(document).on('click', '.btnRemoverProduto', function () {
        $(this).closest('.card.produtos').remove();
        atualizarListaQuantidadesProdutos();
        atualizarListaProdutos();
    });
}

function atualizarValoresProduto() {
    $(document).on('change', 'select[name="Produto"], .quantProduto', function () {
        let card = $(this).closest(".card");
        let selectedOption = card.find('select[name="Produto"] option:selected');
        let preco = selectedOption.data('price') || 0;
        let quantidade = card.find('.quantProduto').val() || 1;
        let total = preco * quantidade;

        card.find(".precoProduto").text(preco);
        card.find(".totalProduto").text(total);

        atualizarListaQuantidadesProdutos();
        atualizarListaProdutos();
    });
}

function cardProduto(produtoId = null, quantidade = 1) { // recupera o card do backend e preenche os campos ou cria um novo card
    crud.carregar(`products/`).then((data) => {
        let options = '<option value="" disabled>Selecione um Produto</option>';
        for (let i = 0; i < data.length; i++) {
            const selected = produtoId == data[i].id ? 'selected' : '';
            options += `<option value="${data[i].id}" data-price="${data[i].price}" ${selected}>${data[i].name}</option>`;
        }

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
                            <input class="quantProduto" type="number" min="1" class="validate" value="${quantidade}">
                            <label class="active">Quantidade</label>
                        </div>
                        <div class="input-field col s3">
                            <label class="active">Total</label>
                            <a href="#!" class="collection-item"><span class="badge totalProduto">0</span>R$</a>
                        </div>
                    </div>
                    <div class="row s12">
                        <div class="col s3">
                            <a class="waves-effect waves-light btn btnRemoverProduto">Remover Produto</a>
                        </div>
                    </div>
                </div>
            </div>
        `);

        $('#produtos_container').append(novoItem);

        // Atualiza valores do card
        novoItem.find('select[name="Produto"]').val(produtoId).trigger('change');
        novoItem.find('.quantProduto').val(quantidade).trigger('change');
        atualizarListaQuantidadesProdutos();
        atualizarListaProdutos();
    });
}

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
    for (let i = 0; i < qtd.length; i++) {
        produtos.push(...Array(qtd[i]).fill(prod[i]));
    }
}

function addCardServico() {
    $(document).on('click', '#btn_servicoAdd, .btnAdicionarServico', function () {
        cardServico();
        if ($(this).hasClass("btnAdicionarServico")) {
            $(".btnAdicionarServico").hide();
            $(".btnRemoverServico").show();
        }
    });
}

function removerCardServico() {
    $(document).on('click', '.btnRemoverServico', function () {
        $(this).closest('.card.servicos').remove();
        atualizarListaQuantidadesServicos();
        atualizarListaServicos();
    });
}

function atualizarValoresServico() {
    $(document).on('change', 'select[name="Servico"], .quantServico', function () {
        let card = $(this).closest(".card");
        let selectedOption = card.find('select[name="Servico"] option:selected');
        let preco = selectedOption.data('price') || 0;
        let quantidade = card.find('.quantServico').val() || 1;
        let total = preco * quantidade;

        card.find(".precoServico").text(preco);
        card.find(".totalServico").text(total);

        atualizarListaQuantidadesServicos();
        atualizarListaServicos();
    });
}

function cardServico(servicoId = null, quantidade = 1) {
    crud.carregar(`services/`).then((data) => {
        let options = '<option value="" disabled>Selecione um Servico</option>';
        for (let i = 0; i < data.length; i++) {
            const selected = servicoId == data[i].id ? 'selected' : '';
            options += `<option value="${data[i].id}" data-price="${data[i].price}" ${selected}>${data[i].name}</option>`;
        }

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
                            <input class="quantServico" type="number" min="1" class="validate" value="${quantidade}">
                            <label class="active">Quantidade</label>
                        </div>
                        <div class="input-field col s3">
                            <label class="active">Total</label>
                            <a href="#!" class="collection-item"><span class="badge totalServico">0</span>R$</a>
                        </div>
                    </div>
                    <div class="row s12">
                        <div class="col s3">
                            <a class="waves-effect waves-light btn btnRemoverServico">Remover Servico</a>
                        </div>
                    </div>
                </div>
            </div>
        `);

        $('#servicos_container').append(novoItem);

        novoItem.find('select[name="Servico"]').val(servicoId).trigger('change');
        novoItem.find('.quantServico').val(quantidade).trigger('change');
        atualizarListaQuantidadesServicos();
        atualizarListaServicos();
    });
}

function atualizarListaServicos() { // atualiza a lista de servicos do pedido
    $('.card.servicos').each(function (index) {
        let servicoId = $(this).find('select[name="Servico"]').val(); // Captura o ID do servico
        if (servicoId) { // Evita criar valores vazios dentro do array
            listaServicos[index] = Number(servicoId); // guarda o valor antigo, e altera apenas o que modificado
        }
    });
}

function atualizarListaQuantidadesServicos() { // atualiza a lista de quantidades dos servicos do pedido
    quantidadeServicos = [];
    $('.quantServico').each(function () {
        quantidadeServicos.push(Number($(this).val())); // Armazena cada valor corretamente
    });
}

function servicosCorpo(qtd, serv) { // cria um array com a lista dos servicos para o backend
    for (let i = 0; i < qtd.length; i++) {
        servicos.push(...Array(qtd[i]).fill(serv[i]));
    }
}

export const buttons = {
    botoesPet,
    botoesTutor,
    botoesProduto,
    botoesServico,
    botoesPedido,
    produtos,
    servicos,
    quantidadeProdutos,
    quantidadeServicos,
    produtosCorpo,
    servicosCorpo,
    limparCards,
    cardProduto,
    cardServico
};