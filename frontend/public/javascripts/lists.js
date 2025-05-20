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
                            `<tr class="hoverable">
    <td class="blue-text text-darken-3"><strong>${pet.name}</strong></td>
    <td class="blue-text text-darken-2">${pet.species}</td>
    <td class="green-text text-darken-2"><strong>${pet.age} anos</strong></td>
    <td class="grey-text text-darken-1">${tutorMap.get(parseInt(pet.tutorId))}</td>
    <td>
        <a onclick="crud.menuEdit(${pet.id}, '${`petForm`}', '${endpoint}')" 
            class="btn-floating btn-small waves-effect waves-light blue darken-2">
            <i class="material-icons">edit</i>
        </a>

        <a onclick="crud.deletarPorId('${endpoint}', ${pet.id})" 
            class="btn-floating btn-small waves-effect waves-light red darken-2">
            <i class="material-icons">delete</i>
        </a>
    </td>
</tr>
`
                    }
                    $("#pet_list").html(lista);
                })
        })
}

function listaTutor(data) {
    let endpoint = `tutors/`;
    let lista = `<tr class="hoverable">
    <td class="blue-text text-darken-3"><strong>${data.name}</strong></td>
    <td class="blue-text text-darken-2">${data.email}</td>
    <td class="green-text text-darken-2">${data.phone}</td>
    <td>
        <a onclick="crud.menuEdit(${data.id}, '${`tutorForm`}', '${endpoint}')" 
            class="btn-floating btn-small waves-effect waves-light blue darken-2">
            <i class="material-icons">edit</i>
        </a>

        <a onclick="crud.deletarPorId('${endpoint}', ${data.id})" 
            class="btn-floating btn-small waves-effect waves-light red darken-2">
            <i class="material-icons">delete</i>
        </a>
    </td>
</tr>
`
    return lista;
}

function listaProduto(data) { // carrega a lista de produtos
    let endpoint = `products/`;
    let lista = `<tr class="hoverable">
    <td class="blue-text text-darken-3"><strong>${data.name}</strong></td>
    <td class="green-text text-darken-2"><strong>R$ ${data.price.toFixed(2)}</strong></td>
    <td class="blue-text text-darken-2">${data.category}</td>
    <td class="grey-text text-darken-1">${data.stock}</td>
    <td>
        <a onclick="crud.menuEdit(${data.id}, '${`produtoForm`}', '${endpoint}')" 
            class="btn-floating btn-small waves-effect waves-light blue darken-2">
            <i class="material-icons">edit</i>
        </a>

        <a onclick="crud.deletarPorId('${endpoint}',${data.id})" 
            class="btn-floating btn-small waves-effect waves-light red darken-2">
            <i class="material-icons">delete</i>
        </a>
    </td>
</tr>
`
    return lista;
}

function listaServico(data) { // carrega a lista de serviços
    let endpoint = `services/`;
    let lista = `<tr class="hoverable">
    <td class="blue-text text-darken-3"><strong>${data.name}</strong></td>
    <td class="green-text text-darken-2"><strong>R$ ${data.price.toFixed(2)}</strong></td>
    <td class="grey-text text-darken-1">${data.duration}</td>
    <td class="blue-text text-darken-2">${data.description}</td>
    <td>
        <a onclick="crud.menuEdit(${data.id}, '${`servicoForm`}', '${endpoint}')" 
            class="btn-floating btn-small waves-effect waves-light blue darken-2">
            <i class="material-icons">edit</i>
        </a>

        <a onclick="crud.deletarPorId('${endpoint}',${data.id})" 
            class="btn-floating btn-small waves-effect waves-light red darken-2">
            <i class="material-icons">delete</i>
        </a>
    </td>
</tr>
`
    return lista;
}

// function listaPedidoSemTutor(data) { // inutilizada
//     let endpoint = `orders/`;
//     let finalizado = data.status === "finalizado" ? "disabled" : ""; // se o status estiver como 'finalizado', desabilita o botão menuEdit() pelo css
//     let lista = `<tr>
//                         <td>${data.id}</td>
//                         <td>${data.tutorId}</td>
//                         <td>${data.total}</td>
//                         <td>${data.status}</td>

//                         <td>
//                         <a onclick="crud.menuEdit(${data.id}, '${`pedidoForm`}', '${endpoint}')" 
//                         class="btn-floating btn-small waves-effect waves-light green ${finalizado}"><i class="material-icons">edit</i></a> 

//                         <a onclick="crud.deletarPorId('${endpoint}',${data.id})" 
//                         class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a>
//                         </td>
//                     </tr>`
//     return lista;
// }

function listaPedido() { // carrega a lista de pets com os nomes dos tutores, dois GETs // TODO refatorar as listas abaixo
    let endpoint = `orders/`;
    crud.carregar(`tutors/`)
        .then((tutors) => {
            const tutorMap = new Map(); // cria um Map() para armazenar os tutores encontrados em 'tutors'
            for (let tutor of tutors) { // preenche o Map() com os tutores
                tutorMap.set(tutor.id, tutor.name); // coloca o id e o nome do tutor no Map()
            }
            crud.carregar(endpoint)
                .then((pedidos) => {

                    let lista = '';
                    for (let pedido of pedidos) {
                        // se o status for 'finalizado', desabilita o botão menuEdit() pelo class do css
                        let finalizado = pedido.status === "finalizado" ? "disabled" : "";
                        lista +=
                            `<tr class="hoverable">
    <td class="blue-text text-darken-3"><strong>${pedido.id}</strong></td>
    <td class="blue-text text-darken-2">${tutorMap.get(parseInt(pedido.tutorId))}</td>
    <td class="green-text text-darken-2"><strong>R$ ${pedido.total.toFixed(2)}</strong></td>
    <td class="grey-text text-darken-1">${pedido.status}</td>
    <td>
        <a onclick="crud.menuEdit(${pedido.id}, '${`pedidoForm`}', '${endpoint}')" 
            class="btn-floating btn-small waves-effect waves-light blue darken-2 ${finalizado}">
            <i class="material-icons">edit</i>
        </a>

        <a onclick="crud.deletarPorId('${endpoint}',${pedido.id})" 
            class="btn-floating btn-small waves-effect waves-light red darken-2">
            <i class="material-icons">delete</i>
        </a>
    </td>
</tr>
`
                    }
                    $("#pedido_list").html(lista);
                })
        })
}

export const lists = {
    listaPet,
    listaTutor,
    listaProduto,
    listaServico,
    listaPedido
};