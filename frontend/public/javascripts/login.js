import { vars } from './vars.js';

function login() {
    $('#loginForm').on('submit', async function (event) {
        event.preventDefault(); // Evita o recarregamento da página

        const username = $('#username').val();
        const password = $('#password').val();

        try {
            const response = await fetch(url + 'users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); // Armazena o token no navegador
                M.toast({ html: 'Login bem-sucedido!', classes: 'green' }); // Exibe notificação com Materialize
                setTimeout(() => {
                    window.location.href = '/dashboard'; // Redireciona para página protegida
                }, 1000);
            } else {
                M.toast({ html: data.message, classes: 'red' }); // Exibe mensagem de erro
            }
        } catch (error) {
            M.toast({ html: 'Erro ao conectar com o servidor.', classes: 'red' });
        }
    });
}

export const auth = {
    login
};