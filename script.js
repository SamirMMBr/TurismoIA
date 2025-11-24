let cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector('input[type="search"]');

// Adiciona um ouvinte de eventos para a tecla 'Enter' no campo de busca
searchInput.addEventListener('keydown', (event) => {
    // Verifica se a tecla pressionada foi 'Enter'
    if (event.key === 'Enter') {
        iniciarBusca();
    }
});

let dados = [];

async function iniciarBusca() {
    // 1. Pega o valor do input de busca e converte para minúsculas
    const termoBusca = document.querySelector('input[type="search"]').value.toLowerCase();

    let resposta = await fetch("data.json");
    dados = await resposta.json();

    // 2. Filtra os dados com base no nome, descrição ou tags
    const dadosFiltrados = dados.filter(dado => {
        const temNaTag = dado.tags.some(tag => tag.toLowerCase().includes(termoBusca));
        return dado.nome.toLowerCase().includes(termoBusca) || 
               dado.descricao.toLowerCase().includes(termoBusca) ||
               temNaTag;
    });

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards anteriores
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.ano}</p>
            <p>${dado.descricao}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                <a href="${dado.link}" target="_blank">Saiba mais</a>
                <span>${dado.tags.join(', ')}</span>
            </div>
        `;
        cardContainer.appendChild(article);
    }
}
