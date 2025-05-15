$(document).ready(function() {
    $('#logout').on('click', function() {
        localStorage.removeItem('token'); // Remove o token do usuário
        window.location.href = '/login'; // Redireciona para a página de login
    });
});
