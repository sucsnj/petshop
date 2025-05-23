let chartInstance = null;

function verificarGrafico(id) { // remove o gráfico antigo e recria o novo
    if (chartInstance) {
        chartInstance.destroy(); // Remove o gráfico antigo
        if ($(`#${id}`).length) {
            $(`#${id}`).replaceWith(`<canvas id="${id}" width="400" height="200"></canvas>`); // Recria o canvas apenas se necessário
        }
    }
}

function graficoQuantidade() {

    Promise.all([
        fetch(url + "tutors").then(res => res.json()),
        fetch(url + "pets").then(res => res.json()),
        fetch(url + "products").then(res => res.json()),
        fetch(url + "services").then(res => res.json()),
        fetch(url + "orders").then(res => res.json()),
    ]).then(([tutors, pets, products, services, orders]) => {
        const newCtx = $("#quantidade")[0].getContext("2d"); // Pegando o novo canvas corretamente

        chartInstance = new Chart(newCtx, { // Armazena o novo gráfico
            type: "bar",
            data: {
                labels: ["Tutores", "Pets", "Produtos", "Serviços", "Pedidos"],
                datasets: [{
                    label: "Quantidade",
                    data: [tutors.length, pets.length, products.length, services.length, orders.length],
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        });
    }).catch(error => console.error("Erro ao carregar dados:", error));
}

function graficoFaturamento() {

    fetch(url + "orders")
        .then(res => res.json())
        .then(orders => {
            const totalFaturamento = orders.reduce((acc, order) => acc + order.total, 0);

            console.log("Faturamento Total:", totalFaturamento);

            const newCtx = $("#faturamento")[0].getContext("2d");

            chartInstance = new Chart(newCtx, {
                type: "bar",
                data: {
                    labels: ["Faturamento"],
                    datasets: [{
                        label: "Total (R$)",
                        data: [totalFaturamento],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } }
                }
            });
        }).catch(error => console.error("Erro ao carregar faturamento:", error));
}

function graficoPedidosStatus() {

    fetch(url + "orders")
        .then(res => res.json())
        .then(orders => {
            const statusCount = orders.reduce((acc, order) => {
                acc[order.status] = (acc[order.status] || 0) + 1;
                return acc;
            }, {});

            console.log(statusCount);

            const newCtx = $("#statusPedidos")[0].getContext("2d");

            chartInstance = new Chart(newCtx, {
                type: "pie",
                data: {
                    labels: Object.keys(statusCount),
                    datasets: [{
                        label: "Pedidos por Status",
                        data: Object.values(statusCount),
                        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"]
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }).catch(error => console.error("Erro ao carregar pedidos:", error));
}

function graficoServicosTipo() {

    fetch(url + "services")
        .then(res => res.json())
        .then(services => {
            const serviceTypes = services.reduce((acc, service) => {
                acc[service.name] = (acc[service.name] || 0) + 1;
                return acc;
            }, {});

            console.log(serviceTypes);

            const newCtx = $("#servicosTipo")[0].getContext("2d");

            chartInstance = new Chart(newCtx, {
                type: "bar",
                data: {
                    labels: Object.keys(serviceTypes),
                    datasets: [{
                        label: "Serviços Prestados",
                        data: Object.values(serviceTypes),
                        backgroundColor: "rgba(75, 192, 192, 0.5)"
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }).catch(error => console.error("Erro ao carregar serviços:", error));
}

export const charts = {
    graficoQuantidade,
    graficoFaturamento,
    graficoPedidosStatus,
    graficoServicosTipo
};