let petId = 0; // determina qual pet está sendo editado
let tutorId = 0; // determina qual tutor está sendo editado
let prodId = 0; // determina qual produto está sendo editado
let servId = 0; // determina qual serviço está sendo editado // TODO criar array com ids a serem editados
let editar = 0; // determina se o usuário está editando ou não
let tab = 0; // determina qual tela será exibida
let route = window.location.pathname.split("/")[1]; // determina qual rota será utilizada


export const vars = { 
    petId,
    tutorId,
    prodId,
    servId,
    editar,
    tab,
    route
};
