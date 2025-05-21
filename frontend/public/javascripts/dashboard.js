$(document).ready(function () {

    $('#logout').on('click', function () { // deslogando o usuário
        localStorage.removeItem('token'); // Remove o token do usuário
        localStorage.removeItem('user'); // Remove os dados do usuário
        window.location.href = '/login'; // Redireciona para a página de login
    });

    $('#register').on('click', function (event) { // cadastrando o usuário
        event.preventDefault(); // Impede o recarregamento da página

        let endpoint = 'users/register';
        let name = $('#nome').val();
        const username = $('#usuario').val();
        const email = $('#email').val();
        const password = $('#senha').val();

        if (!name) { name = username };
        const json = JSON.stringify({ name, username, email, password });

        fetch(url + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: json
        })
            .then(async res => {
                if (!res.ok) {
                    const data = await res.json(); // Converte a resposta do erro para JSON
                    throw new Error(data.message || `Erro ${res.status}: ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Cadastro realizado!',
                    toast: true,
                    position: 'top-end',
                    text: data.message || 'Usuário cadastrado com sucesso!',
                    shwoCancelButton: false,
                    showConfirmButton: false,
                    timer: 7000
                });
            })
            .catch(error => {
                console.error('Erro ao criar conta:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro no cadastro',
                    text: error.message,
                    toast: true,
                    position: 'top-end',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 7000
                });
            });
    });
});

