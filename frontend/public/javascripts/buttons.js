import { start } from "./start.js"; // funções para iniciar telas
import { vars } from "./vars.js"; // variáveis globais
import { tools } from "./tools.js"; // funções auxiliares
import { crud } from "./crud.js"; // funções para CRUD

const botoesPet = () => { // botões para a tela de pets
    $("#btn_novoPet").on('click', function () { // tela para adicionar um novo pet
        crud.menuAdd(`petForm`);
    });

    $("#btn_salvarPet").on('click', function () { // tela para salvar um pet
        if (vars.editar) { // verifica se é uma edição ou um novo pet
            if (confirm("Deseja salvar?")) {
                crud.atualizarPorId(vars.petId, `pets/`, `petForm`);
                start.telaInicial();
            }
        } else { // caso seja um novo pet, confirma se todos os campos estão preenchidos, caso sim, salva
            tools.verificarCamposNovo(`petForm`, `pets/`);
        }
    });

    $("#btn_voltarPet").on('click', function () { // voltar para a tela de pets
        if (confirm("Deseja voltar?")) {
            start.telaInicial();
        }
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

const botoesPedido = () => { // botões para a tela de pedidos
    // implementar botões da tela de pedidos TODO
}

export const buttons = {
    botoesPet,
    botoesTutor,
    botoesProduto,
    botoesServico
    // botoesPedido
};