const url = window.location.origin + '/';

let petId; // determina qual pet está sendo editado
let tutorId; // determina qual tutor está sendo editado
let prodId; // determina qual produto está sendo editado
let servId; // determina qual serviço está sendo editado // TODO criar array com ids a serem editados
let editar; // determina se o usuário está editando ou não
let tab; // determina qual tela será exibida

$(document).ready(function () {
    console.log("jQuery está funcionando!");
    tab = 1;
    telaInicial();

    $("#tab_pet").on('click', function () { // muda para tela de pets conforme clicar em uma das tabs
        tab = 1;
        telaInicial();
    })
    $("#tab_tutor").on('click', function () { // muda para tela de tutores conforme clicar em uma das tabs
        tab = 2;
        telaInicial();
    })
    $("#tab_produto").on('click', function () {
        tab = 3;
        telaInicial();
    })
    $("#tab_servico").on('click', function () {
        tab = 4;
        telaInicial();
    })
    $("#tab_pedido").on('click', function () {
        tab = 5;
        telaInicial();
    })
})

// botões do pet
$("#btn_novoPet").on('click', function () { // tela para adicionar um novo pet
    menuAdd(`petForm`);
    console.log("jQuery está funcionando!");
})
$("#btn_salvarPet").on('click', function () { // tela para salvar um pet
    if (editar) { // verifica se é uma edição ou um novo pet
        if (confirm("Deseja salvar?")) {
            atualizarPorId(petId, `pets/`, `petForm`);
            telaInicial();
        }
    } else { // caso seja um novo pet, confirma se todos os campos estão preenchidos, caso sim, salva
        verificarCamposNovo(`petForm`, `pets/`);
    }
})
$("#btn_voltarPet").on('click', function () { // voltar para a tela de pets
    if (confirm("Deseja voltar?")) {
        telaInicial();
    }
})

// botões do tutor 
$("#btn_novoTutor").on('click', function () { // tela para adicionar um novo tutor
    menuAdd(`tutorForm`);
})
$("#btn_salvarTutor").on('click', function () { // tela para salvar um tutor
    if (editar) { // verifica se é uma edição ou um novo tutor
        if (confirm("Deseja salvar?")) {
            atualizarPorId(tutorId, `tutors/`, `tutorForm`);
            telaInicial();
        }
    } else { // caso seja um novo tutor, confirma se todos os campos estão preenchidos, caso sim, salva
        verificarCamposNovo(`tutorForm`, `tutors/`);
    }
})
$("#btn_voltarTutor").on('click', function () { // voltar para a tela de tutores
    if (confirm("Deseja voltar?")) {
        telaInicial();
    }
})

// botões do produto 
$("#btn_novoProduto").on('click', function () { // tela para adicionar um novo produto
    menuAdd(`produtoForm`);
})
$("#btn_salvarProduto").on('click', function () { // tela para salvar um produto
    if (editar) { // verifica se é uma edição ou um novo produto
        if (confirm("Deseja salvar?")) {
            atualizarPorId(prodId, `products/`, `produtoForm`);
            telaInicial();
        }
    } else { // caso seja um novo produto, confirma se todos os campos estão preenchidos, caso sim, salva
        verificarCamposNovo(`produtoForm`, `products/`);
    }
})
$("#btn_voltarProduto").on('click', function () { // voltar para a tela de produtos
    if (confirm("Deseja voltar?")) {
        telaInicial();
    }
})

// botões do serviço 
$("#btn_novoServico").on('click', function () { // tela para adicionar um novo serviço
    menuAdd(`servicoForm`);
})
$("#btn_salvarServico").on('click', function () { // tela para salvar um serviço
    if (editar) { // verifica se é uma edição ou um novo serviço
        if (confirm("Deseja salvar?")) {
            atualizarPorId(servId, `services/`, `servicoForm`);
            telaInicial();
        }
    } else { // caso seja um novo serviço, confirma se todos os campos estão preenchidos, caso sim, salva
        verificarCamposNovo(`servicoForm`, `services/`);
    }
})
$("#btn_voltarServico").on('click', function () { // voltar para a tela de serviços
    if (confirm("Deseja voltar?")) {
        telaInicial();
    }
})

// começo das funções

function pegarForm(formulario) { // retorna um objeto com os valores do formulario
    const form = document.getElementById(formulario);
    const objForm = new FormData(form); // cria um FormData() para pegar os valores do formulario

    obj = {};
    for (const [key, value] of objForm) { // preenche o obj com os valores do formulario
        obj[key] = value; // para cada obj[chave] atribui o valor do formulario de mesmo nome
        if (key === "tutorId") { // o FormData() sempre captura os valores como strings
            obj[key] = Number(value); // converte para números
        }
        if (obj[key] === "" && editar) { // verifica se o campo está vazio e se está editando
            delete obj[key]; // se estiver vazio, exclui o campo, caso esteja sendo editado
        }
    }
    return obj;
}

function verificarCamposNovo(formulario, endpoint) { // verifica se todos os campos estão preenchidos
    const form = document.getElementById(formulario);
    const objForm = new FormData(form);
    let preenchido = true; // determina se o campo está preenchido
    obrigatorio = form.querySelectorAll('[required]'); // obtém todos os campos obrigatórios dentro de 'form'

    for (let verif of obrigatorio) { // verifica campo a campo se estão preenchidos
        if (!objForm.get(verif.name)) { // se o campo não estiver preenchido
            preenchido = false;
            return alert(`O campo ${verif.dataset.label} é obrigatório!`);
        }
    }

    if (preenchido) {
        if (confirm("Deseja salvar?")) {
            gravar(endpoint, formulario);
            telaInicial();
        }
    }
}

async function listaSuspensa(endpoint, idName) { // cria uma lista suspensa dinâmica usando o async para garantir o termino da requisição
    return carregar(`${endpoint}/`)
        .then((data) => {
            lista = `<option disabled selected>Selecione um item</option>`;
            for (let dat of data) {
                lista += `<option value="${dat.id}">${dat.name}</option>`;
            }
            $(`#${idName}`).html(lista); // injeta no elemento de id 'idName' a lista criada
        });
}

function formParam(formulario) { // captura a referência do formulário > [0]minuscula - [1]maiuscula
    param = formulario.replace("Form", ""); // remove 'Form' do nome do formulário
    paramUpper = param.substring(0, 1).toUpperCase() + param.substring(1, param.length);
    return [param, paramUpper]; // retorna um array com os dois valores
}

function removerAttrRequired(formulario) { // remove o atributo required de todos os inputs dentro de um formulario
    const form = document.getElementById(formulario);
    form.reset(); // limpa o formulário capturado
    input = form.querySelectorAll('input');

    for (let verif of input) { // procura todos os campos input dentro de 'form' para remover o atributo required
        verif.removeAttribute('required');
    }
}

function ativarClassesDeInputPreencher(element, value) { // ativa as classes de input
    $(element).val(value).addClass('valid').siblings('label').addClass('active');
}

async function embed(endpoint, id, cEndpoint) { // faz um embed de tutor para pets
    const res = await fetch(url + `${endpoint}/${id}` + `?_embed=${cEndpoint}`); // faz um GET com embed
    return data = await res.json();
}

function menuAdd(formulario) { // menu de adição
    const form = document.getElementById(formulario);
    form.reset(); // limpa o formulário capturado
    input = form.querySelectorAll('input'); // obtém todos os campos input dentro de 'form'

    for (let verif of input) { // seta o atributo required para todos os campos obrigatórios
        verif.setAttribute('required', '');
    }
    editar = false; // confirma que não está editando
    $(`#${formulario}`).show();

    const param = formParam(formulario);
    $(`#table_${param[0]}`).hide(); // esconde a tabela correspondente ao formulário
    $(`#btn_novo${param[1]}`).hide(); // esconde o botão de adicionar correspondente ao formulário
    listaSuspensa(`tutors`, `tutorId`);
}

//  funções que precisam de modificações para novos endpoints

function menuEdit(id, form, endpoint) { // menu de edição, está sendo chamado por uma lista dinâmica
    const esconder = [ // elementos a serem escondidos
        `#table_pet`,
        `#table_tutor`,
        `#table_produto`,
        `#table_servico`,
        `#btn_novoPet`,
        `#btn_novoTutor`,
        `#btn_novoProduto`,
        `#btn_novoServico`,
    ];
    esconder.forEach(item => $(item).hide()) // faz um for dentro de 'esconder' para aplicar hide() em tudo que encontrar 
    // > 'item' é o equivalente a qualquer item dentro de 'esconder'
    $(`#${form}`).show(); // mostra o formulário

    fetch(url + endpoint + id)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            listaSuspensa(`tutors`, `tutorId`).then(() => {
                $(`#tutorId`).val(data.tutorId).trigger("change");
            });
            editar = true; // confirma que o usuário está editando

            const ids = {
                petForm: () => { petId = id }, // petForm é uma String > equivalente a if (form === "petForm") { petId = id}
                tutorForm: () => { tutorId = id },
                produtoForm: () => { prodId = id },
                servicoForm: () => { servId = id },
            }
            if (ids[form]) {
                ids[form](); // chama a função correspondente ao form dentro de 'ids'
            }

            for (let campoName in data) { // aqui será preenchido o 'form'
                ativarClassesDeInputPreencher(`[name="${campoName}"]`, data[campoName]);
            }
        })
}

async function carregar(endpoint) { // faz um GET e ordena alfabeticamente >> usando async/await
    const res = await fetch(url + endpoint) // equivalente fetch(url + endpoint)
    const data = await res.json() // equivalente a then(res => res.json())

    return data.sort((a, b) => a.name.localeCompare(b.name)); // ordena alfabeticamente
}

function gravar(endpoint, form) { // faz um POST
    json = JSON.stringify(pegarForm(form)); // converte o objeto para JSON

    fetch(url + endpoint, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: json
    })
}

function atualizarPorId(id, endpoint, form) { // faz um PATCH
    json = JSON.stringify(pegarForm(form));
    fetch(url + endpoint + id, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json"
        },
        body: json
    })
}

function deletarPorId(endpoint, id) { // faz um DELETE
    embed(`${endpoint}`, id, `pets`) // faz um embed de tutor para pets
        .then((data) => {
            if (tab == 2 && data.pets.length !== 0) { // se estiver em tutor e o tutor tiver pets
                return alert("Não é possível deletar um tutor que tenha pets associados!"); // caso tenha pets, não pode deletar
            } else { // executa o código do DELETE
                if (confirm("Deseja deletar?")) {
                    fetch(url + endpoint + id, {
                        method: 'DELETE'
                    })
                        .then(() => {

                            const executar = {
                                1: () => listaPet(),
                                2: () => listaDinamica(`tutors/`, `tutor_list`, listaTutor),
                                3: () => listaDinamica(`products/`, `produto_list`, listaProduto),
                                4: () => listaDinamica(`services`, `servico_list`, listaServico),
                            };

                            if (executar[tab]) {
                                executar[tab]();
                            }
                        })
                }
            }
        })
}

function telaInicial() { // exibe a tela inicial
    const removerRequired = [ // elementos que terão seus atributos required removidos
        `petForm`,
        `tutorForm`,
        `produtoForm`,
        `servicoForm`,
    ];
    removerRequired.forEach(item => removerAttrRequired(item));

    const executar = { // executa a função correspondente ao valor de tab
        1: () => { // se tab for 1, executa as funções abaixo
            listaPet();
            $("#petForm").hide();
            $("#btn_novoPet").show();
            $("#table_pet").show();
        },
        2: () => { // se tab for 2, executa as funções abaixo
            listaDinamica(`tutors/`, `tutor_list`, listaTutor);
            $("#tutorForm").hide();
            $("#btn_novoTutor").show();
            $("#table_tutor").show();
        },
        3: () => { // se tab for 3, executa as funções abaixo...
            listaDinamica(`products/`, `produto_list`, listaProduto);
            $("#produtoForm").hide();
            $("#btn_novoProduto").show();
            $("#table_produto").show();
        },
        4: () => { // se tab for 4, executa as funções abaixo...
            listaDinamica(`services/`, `servico_list`, listaServico);
            $("#servicoForm").hide();
            $("#btn_novoServico").show();
            $("#table_servico").show();
        },
        5: () => {
            listaSuspensa(`tutors/`, `listaTutor`);
            // listaSuspensa(`pets/`, `listaPet`);
        },
    };

    if (executar[tab]) { // se o valor de tab existir dentro de executar, executa a função correspondente > if() não obrigatório
        executar[tab](); // executa a função correspondente ao valor de tab
    }
}

function pegarTutor(e) {
    id = e.value.split('-')[0]
    carregar(`pets/`)
        .then((pets) => {
            lista = ``
            for (let pet of pets) {
                if (pet.tutorId == id) {
                    lista += `<option value="${pet.id}-${pet.name}">${pet.name}</option>`
                }
            }
            $("#listaPet").html(lista);
        })
}

// funções de lista
function listaDinamica(endpoint, localLista, functionLista) { // cria e carrega uma lista dinâmica
    carregar(endpoint)
        .then((itens) => {
            let lista = itens.map(data => functionLista(data)); // faz um map percorrendo itens
            $(`#${localLista}`).html(lista); // id onde será criada a lista
        });
}

function listaPet() { // carrega a lista de pets com os nomes dos tutores, dois GETs // TODO refatorar as listas abaixo
    endpoint = `pets/`
    carregar(`tutors/`)
        .then((tutors) => {
            const tutorMap = new Map(); // cria um Map() para armazenar os tutores encontrados em 'tutors'
            for (let tutor of tutors) { // preenche o Map() com os tutores
                tutorMap.set(tutor.id, tutor.name); // coloca o id e o nome do tutor no Map()
            }
            carregar(endpoint)
                .then((pets) => {

                    lista = ''
                    for (let pet of pets) {
                        lista +=
                            `<tr>
                            <td>${pet.name}</td>
                            <td>${pet.species}</td>
                            <td>${pet.age}</td>
                            <td>${tutorMap.get(parseInt(pet.tutorId))}</td>
                            
                            <td>
                            <a onclick="menuEdit(${pet.id}, '${`petForm`}', '${endpoint}')" 
                            class="btn-floating btn-small waves-effect waves-light green"><i class="material-icons">edit</i></a> 
                            
                            <a onclick="deletarPorId('${endpoint}',${pet.id})" 
                            class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a>
                            </td>
                        </tr>`
                    }
                    $("#pet_list").html(lista)
                })
        })
} // TODO modularizar

function listaTutor(data) {
    endpoint = `tutors/`;
    let lista = `<tr>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
            
            <td>
                <a onclick="menuEdit(${data.id}, '${`tutorForm`}', '${endpoint}')" 
                class="btn-floating btn-small waves-effect waves-light green"><i class="material-icons">edit</i></a> 
                
                <a onclick="deletarPorId('${endpoint}', ${data.id})"
                class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a>
            </td>
        </tr>`
    return lista
}

function listaProduto(data) { // carrega a lista de produtos
    endpoint = `products/`;
    let lista = `<tr>
                        <td>${data.name}</td>
                        <td>${data.price}</td>
                        <td>${data.category}</td>
                        <td>${data.stock}</td>
                        
                        <td>
                        <a onclick="menuEdit(${data.id}, '${`produtoForm`}', '${endpoint}')" 
                        class="btn-floating btn-small waves-effect waves-light green"><i class="material-icons">edit</i></a> 
                        
                        <a onclick="deletarPorId('${endpoint}',${data.id})" 
                        class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a>
                        </td>
                    </tr>`
    return lista;
}

function listaServico(data) { // carrega a lista de serviços
    endpoint = `services/`;
    let lista = `<tr>
                        <td>${data.name}</td>
                        <td>${data.price}</td>
                        <td>${data.duration}</td>
                        <td>${data.description}</td>
                        
                        <td>
                        <a onclick="menuEdit(${data.id}, '${`servicoForm`}', '${endpoint}')" 
                        class="btn-floating btn-small waves-effect waves-light green"><i class="material-icons">edit</i></a> 
                        
                        <a onclick="deletarPorId('${endpoint}',${data.id})" 
                        class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a>
                        </td>
                    </tr>`
    return lista;
}