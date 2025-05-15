import { start } from "./start.js";
import { vars } from "./vars.js";
import { crud } from "./crud.js";

function telaDeCarregamento(tempo) {
    setTimeout(function () {
        $("#loading").css("display", "none");
        $("#content").css("display", "block");
    }, tempo);
}

async function listaSuspensa(endpoint, idName) { // cria uma lista suspensa dinâmica usando o async para garantir o termino da requisição
    return crud.carregar(`${endpoint}/`)
        .then((data) => {
            let lista = `<option disabled selected>Selecione um item</option>`;
            for (let dat of data) {
                lista += `<option value="${dat.id}">${dat.name}</option>`;
            }
            $(`#${idName}`).html(lista); // injeta no elemento de id 'idName' a lista criada
        });
}

function ativarClassesDeInputPreencher(element, value) { // ativa as classes de input
    $(element).val(value).addClass('valid').siblings('label').addClass('active');
}

function formParam(formulario) { // captura a referência do formulário > [0]minuscula - [1]maiuscula
    let param = formulario.replace("Form", ""); // remove 'Form' do nome do formulário
    let paramUpper = param.substring(0, 1).toUpperCase() + param.substring(1, param.length);
    return [param, paramUpper]; // retorna um array com os dois valores
}

function verificarCamposNovo(formulario, endpoint) { // verifica se todos os campos estão preenchidos
    const form = document.getElementById(formulario);
    const objForm = new FormData(form);
    let preenchido = true; // determina se o campo está preenchido
    let obrigatorio = form.querySelectorAll('[required]'); // obtém todos os campos obrigatórios dentro de 'form'

    for (let verif of obrigatorio) { // verifica campo a campo se estão preenchidos
        if (!objForm.get(verif.name)) { // se o campo não estiver preenchido
            preenchido = false;
            return alert(`O campo ${verif.dataset.label} é obrigatório!`);
        }
    }

    if (preenchido) {
        if (confirm("Deseja salvar?")) {
            crud.gravar(endpoint, formulario);
            start.telaInicial();
        }
    }
}

function pegarForm(formulario) { // retorna um objeto com os valores do formulario
    const form = document.getElementById(formulario);
    const objForm = new FormData(form); // cria um FormData() para pegar os valores do formulario

    let obj = {};
    for (const [key, value] of objForm) { // preenche o obj com os valores do formulario
        obj[key] = value; // para cada obj[chave] atribui o valor do formulario de mesmo nome
        if (key === "tutorId") { // o FormData() sempre captura os valores como strings
            obj[key] = Number(value); // converte para números
        }
        if (obj[key] === "" && vars.editar) { // verifica se o campo está vazio e se está editando
            delete obj[key]; // se estiver vazio, exclui o campo, caso esteja sendo editado
        }
    }
    return obj;
}

function listaDinamica(endpoint, localLista, functionLista) { // cria e carrega uma lista dinâmica
    crud.carregar(endpoint)
        .then((itens) => {
            let lista = itens.map(data => functionLista(data)); // faz um map percorrendo itens
            $(`#${localLista}`).html(lista); // id onde será criada a lista
        });
}

function removerAttrRequired(formulario) { // remove o atributo required de todos os inputs dentro de um formulario
    const $form = $(`#${formulario}`)
    $form.trigger("reset"); // Limpa o formulário
    $form.find("input").removeAttr("required"); // Remove o atributo required de todos os inputs
}

function janelaAlerta(titulo, mensagem) {
    $("#tituloAlerta").html(titulo);
    $("#mensagemAlerta").html(mensagem);
    $("#bloqueioDeFundo").css("display", "block");
    $("#janelaAlerta").css("display", "block");
}

export const tools = {
    telaDeCarregamento,
    listaSuspensa,
    ativarClassesDeInputPreencher,
    formParam,
    verificarCamposNovo,
    pegarForm,
    janelaAlerta, // não usada
    listaDinamica,
    removerAttrRequired
};