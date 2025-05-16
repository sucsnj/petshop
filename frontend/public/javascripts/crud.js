import { tools } from './tools.js';
import { vars } from './vars.js';
import { lists } from './lists.js'; // funções para listas dinâmicas

function menuAdd(formulario) { // menu de adição
    const form = document.getElementById(formulario);
    form.reset(); // limpa o formulário capturado
    let input = form.querySelectorAll('input'); // obtém todos os campos input dentro de 'form'

    for (let verif of input) { // seta o atributo required para todos os campos obrigatórios
        verif.setAttribute('required', '');
    }
    vars.editar = false; // confirma que não está editando
    $(`#${formulario}`).show();

    const param = tools.formParam(formulario);
    $(`#table_${param[0]}`).hide(); // esconde a tabela correspondente ao formulário
    $(`#btn_novo${param[1]}`).hide(); // esconde o botão de adicionar correspondente ao formulário
    tools.listaSuspensa(`tutors`, `tutorId`);
}

function menuEdit(id, form, endpoint) { // menu de edição, está sendo chamado por uma lista dinâmica
    const esconder = [ // elementos a serem escondidos
        `#table_pet`,
        `#table_tutor`,
        `#table_produto`,
        `#table_servico`,
        `#table_pedido`,
        `#btn_novoPet`,
        `#btn_novoTutor`,
        `#btn_novoProduto`,
        `#btn_novoServico`,
        `#btn_novoPedido`,
    ];
    esconder.forEach(item => $(item).hide()) // faz um for dentro de 'esconder' para aplicar hide() em tudo que encontrar 
    // > 'item' é o equivalente a qualquer item dentro de 'esconder'
    $(`#${form}`).show(); // mostra o formulário

    fetch(url + endpoint + id)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (Array.isArray(data)) { // se a resposta for um array, pega o primeiro [0], usado para preencher os campos
                data = data[0];
            }
            tools.listaSuspensa(`tutors`, `tutorId`).then(() => {
                $(`#tutorId`).val(data.tutorId).trigger("change");
            });
            vars.editar = true; // confirma que o usuário está editando

            const ids = {
                petForm: () => { vars.petId = id }, // petForm é uma String > equivalente a if (form === "petForm") { petId = id}
                tutorForm: () => { vars.tutorId = id },
                produtoForm: () => { vars.prodId = id },
                servicoForm: () => { vars.servId = id },
                pedidoForm: () => { vars.prodId = id },
            }
            if (ids[form]) {
                ids[form](); // chama a função correspondente ao form dentro de 'ids'
            }

            for (let campoName in data) { // aqui será preenchido o 'form'
                tools.ativarClassesDeInputPreencher(`[name="${campoName}"]`, data[campoName]);
            }

        })
}

async function carregar(endpoint) { // faz um GET e ordena alfabeticamente >> usando async/await
    const res = await fetch(url + endpoint) // equivalente fetch(url + endpoint)
    const data = await res.json() // equivalente a then(res => res.json())

    if (endpoint == `orders/`) {
        return data;
    } else {
        return data.sort((a, b) => a.name.localeCompare(b.name));
    }
}

function gravar(endpoint, form) { // faz um POST
    let json = JSON.stringify(tools.pegarForm(form)); // converte o objeto para JSON

    fetch(url + endpoint, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: json
    })
        .then(res => res.json())
        .then(data => {
            carregarListaAposCRUD();
        })
}

function atualizarPorId(id, endpoint, form) { // faz um PATCH
    let json = JSON.stringify(tools.pegarForm(form));
    fetch(url + endpoint + id, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: json
    })
        .then(res => res.json())
        .then(data => {
            carregarListaAposCRUD();
        })
}

function deletarPorId(endpoint, id) { // faz um DELETE
    if (!confirm("Deseja deletar?")) return; // Confirmação antes da requisição

    fetch(url + endpoint + id, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}` // Envia token JWT para autenticação
        }
    })
        .then(res => res.json()) // Converte a resposta para JSON
        .then(data => {
            if (vars.tab === 2 && data.message) {
                alert(data.message); // Se for "tutors", exibe a mensagem do backend
                return;
            }
            carregarListaAposCRUD();
        })
        .catch(error => console.error("Erro ao excluir:", error)); // Captura erros inesperados
}

// Independente do endpoint, recarrega os dados
function carregarListaAposCRUD() {
    const executar = {
        1: () => lists.listaPet(),
        2: () => tools.listaDinamica(`tutors/`, `tutor_list`, lists.listaTutor),
        3: () => tools.listaDinamica(`products/`, `produto_list`, lists.listaProduto),
        4: () => tools.listaDinamica(`services/`, `servico_list`, lists.listaServico),
        // 5: () => tools.listaDinamica(`orders/`, `pedido_list`, lists.listaPedido), TODO implementar pedidos
    };

    if (executar[vars.tab]) { // executa a função correspondente ao endpoint
        executar[vars.tab]();
    }
}

export const crud = {
    menuAdd,
    menuEdit,
    carregar,
    gravar,
    deletarPorId,
    atualizarPorId
};