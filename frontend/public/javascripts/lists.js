import { crud } from './crud.js';
window.crud = crud; // para acessar as funções do crud

function listaPet() { // carrega a lista de pets com os nomes dos tutores, dois GETs // TODO refatorar as listas abaixo
    let endpoint = `pets/`;
    crud.carregar(`tutors/`)
        .then((tutors) => {
            const tutorMap = new Map(); // cria um Map() para armazenar os tutores encontrados em 'tutors'
            for (let tutor of tutors) { // preenche o Map() com os tutores
                tutorMap.set(tutor.id, tutor.name); // coloca o id e o nome do tutor no Map()
            }
            crud.carregar(endpoint)
                .then((pets) => {

                    let lista = '';
                    for (let pet of pets) {
                        lista +=
                            `<tr>
                            <td>${pet.name}</td>
                            <td>${pet.species}</td>
                            <td>${pet.age}</td>
                            <td>${tutorMap.get(parseInt(pet.tutorId))}</td>
                            
                            <td>
                            <a onclick="crud.menuEdit(${pet.id}, '${`petForm`}', '${endpoint}')" 
                            class="btn-floating btn-small waves-effect waves-light green"><i class="material-icons">edit</i></a> 
                            
                            <a onclick="crud.deletarPorId('${endpoint}',${pet.id})" 
                            class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a>
                            </td>
                        </tr>`
                    }
                    $("#pet_list").html(lista);
                })
        })
}

function listaTutor(data) {
    let endpoint = `tutors/`;
    let lista = `<tr>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
            
            <td>
                <a onclick="crud.menuEdit(${data.id}, '${`tutorForm`}', '${endpoint}')" 
                class="btn-floating btn-small waves-effect waves-light green"><i class="material-icons">edit</i></a> 
                
                <a onclick="crud.deletarPorId('${endpoint}', ${data.id})"
                class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a>
            </td>
        </tr>`
    return lista;
}

function listaProduto(data) { // carrega a lista de produtos
    let endpoint = `products/`;
    let lista = `<tr>
                        <td>${data.name}</td>
                        <td>${data.price}</td>
                        <td>${data.category}</td>
                        <td>${data.stock}</td>
                        
                        <td>
                        <a onclick="crud.menuEdit(${data.id}, '${`produtoForm`}', '${endpoint}')" 
                        class="btn-floating btn-small waves-effect waves-light green"><i class="material-icons">edit</i></a> 
                        
                        <a onclick="crud.deletarPorId('${endpoint}',${data.id})" 
                        class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a>
                        </td>
                    </tr>`
    return lista;
}

function listaServico(data) { // carrega a lista de serviços
    let endpoint = `services/`;
    let lista = `<tr>
                        <td>${data.name}</td>
                        <td>${data.price}</td>
                        <td>${data.duration}</td>
                        <td>${data.description}</td>
                        
                        <td>
                        <a onclick="crud.menuEdit(${data.id}, '${`servicoForm`}', '${endpoint}')" 
                        class="btn-floating btn-small waves-effect waves-light green"><i class="material-icons">edit</i></a> 
                        
                        <a onclick="crud.deletarPorId('${endpoint}',${data.id})" 
                        class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a>
                        </td>
                    </tr>`
    return lista;
}

function listaPedido(data) {
    // implementar a lista de pedidos TODO
}

export const lists = {
    listaPet,
    listaTutor,
    listaProduto,
    listaServico
    // listaPedido
};