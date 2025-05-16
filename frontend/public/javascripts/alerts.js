import { start } from './start.js';

async function mensagemAcesso() {
    return Swal.fire({
        icon: 'error',
        title: 'Acesso negado',
        text: 'Você precisa estar logado para essa ação.',
        confirmButtonText: 'Logar?',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
    });
}

async function mensagemPermitido() {
    return Swal.fire({
        title: 'Ação permitida',
        toast: true,
        icon: 'success',
        showConfirmButton: false,
        position: 'top-end',
        timer: 3000
    });
}

async function mensagemSalvar() {
    return Swal.fire({
        title: 'Salvar alterações',
        text: "Você tem certeza que deseja salvar as alterações?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    });
}

async function mensagemFeito() {
    return Swal.fire({
        title: 'Ação realizada com sucesso',
        toast: true,
        icon: 'success',
        showConfirmButton: false,
        position: 'top-end',
        timer: 3000
    });
}

async function mensagemCampo(campo) {
    return Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: `O campo ${campo} é obrigatório!`,
        confirmButtonText: 'Ok'
    });
}

async function verificarLogin() {
    const token = localStorage.getItem('token'); // Obtém o token armazenado
    if (!token) {
        mensagemAcesso().then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/login';
                return false;
            } else {
                start.telaInicial();
                return false;
            }
        })
    } else {
        mensagemPermitido();
        return true;
    }
}

async function mensagemApagar() {
    return Swal.fire({
        title: 'Deseja apagar?',
        text: 'Esta ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    });
}

async function mensagemVoltar() {
    return Swal.fire({
        title: 'Deseja voltar?',
        text: 'Seu progresso não será salvo!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    });
}

async function mensagemApagarTutorPet(data) {
    return Swal.fire({
        title: 'Erro',
        text: data.message,
        toast: true,
        position: 'top-end',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000
    });
}

export const alerts = {
    mensagemAcesso,
    mensagemPermitido,
    verificarLogin,
    mensagemCampo,
    mensagemSalvar,
    mensagemFeito,
    mensagemApagar,
    mensagemVoltar,
    mensagemApagarTutorPet
};