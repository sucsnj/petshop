$(document).ready(function () {

    $('#logout').on('click', function () {
        localStorage.removeItem('token'); // Remove o token do usuário
        window.location.href = '/login'; // Redireciona para a página de login
    });

    $('#register').on('click', function (event) {
        event.preventDefault(); // Impede recarregamento da página ao clicar

        let endpoint = 'users/register';
        const username = $('#nome').val();
        const password = $('#senha').val();

        const json = JSON.stringify({ username, password });

        fetch(url + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: json
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Erro ${res.status}: ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                if (data.message) {
                    M.toast({ html: data.message, classes: 'green darken-1' });
                } else {
                    M.toast({ html: 'Usuário cadastrado com sucesso!', classes: 'green darken-1' });
                }
            })
            .catch(error => {
                console.error('Erro ao criar conta:', error);
                M.toast({ html: 'Falha no cadastro!', classes: 'red darken-1' });
            });
    });
});