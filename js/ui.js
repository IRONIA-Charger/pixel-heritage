function renderizarConsoles(consoles) {
    const container = document.getElementById('consolesDestaque'); 
    if (!container) return;
    container.innerHTML = ''; 

    consoles.forEach(consoleItem => {
        const button = document.createElement('button');
        button.className = 'console-button';
        button.textContent = consoleItem.nome;

        button.addEventListener('click', async () => {
            console.log("🎯 Alvo selecionado:", consoleItem.nome);
            
            aplicarTema(consoleItem.nome); 
            
            // Feedback visual de carregamento
            const grid = document.getElementById('lista-produtos');
            grid.innerHTML = '<p class="loading">Buscando clássicos no banco de dados...</p>';
            
            try {
                const jogos = await buscarJogosRawg(consoleItem);
                renderizarProdutos(jogos);
            } catch (error) {
                grid.innerHTML = '<p class="error">Erro na conexão. Verifique o firewall ou a rede.</p>';
            }
        });

        container.appendChild(button);
    });
}

function renderizarProdutos(jogos) {
    const container = document.getElementById('lista-produtos');
    container.innerHTML = '';

    if (jogos.length === 0) {
        container.innerHTML = '<p>Nenhum jogo encontrado para esta plataforma.</p>';
        return;
    }

    jogos.forEach(jogo => {
    const card = document.createElement('div');
    card.className = 'produto-card';
    
    // Fallback: se o jogo não tiver imagem, usamos uma cor sólida ou placeholder
    const imagemJogo = jogo.background_image || 'https://via.placeholder.com/600x400?text=Sem+Imagem';

    const notaAPI = jogo.rating ? jogo.rating : "N/A";

    card.innerHTML = `
        <div class="card-image-container">
            <img src="${imagemJogo}" alt="${jogo.name}" class="produto-imagem" loading="lazy">
        </div>
        <div class="card-body">
            <h3 class="produto-titulo"></h3>
            <div class="card-meta">
                <span class="badge-plataforma">${jogo.platforms[0]?.platform.name || 'Retro'}</span>
                <span class="lancamento">${jogo.released ? jogo.released.split('-')[0] : 'N/A'}</span>
            </div>
            
            <div style="margin: 10px 0; font-size: 0.8rem;">
                <p>📊 Avaliação Global: <strong style="color: gold;">⭐ ${notaAPI}/5</strong></p>
                <p>Deixe sua nota: 
                    <span style="cursor:pointer; color:gold;" onclick="alert('Obrigado por avaliar com 1 estrela!')">⭐</span>
                    <span style="cursor:pointer; color:gold;" onclick="alert('Obrigado por avaliar com 2 estrelas!')">⭐</span>
                    <span style="cursor:pointer; color:gold;" onclick="alert('Obrigado por avaliar com 3 estrelas!')">⭐</span>
                </p>
            </div>

            <button class="btn-detalhes" style="background-color: #28a745; border-color: #28a745; width: 100%; margin-bottom: 5px;" onclick="alert('🎮 ${jogo.name.replace(/'/g, "\\'")} adicionado ao seu carrinho!')">
                🛒 Comprar Agora
            </button>
            <button class="btn-detalhes">Ver detalhes</button>
        </div>
    `;

    // Segurança contra XSS
    card.querySelector('.produto-titulo').textContent = jogo.name;
    
    container.appendChild(card);
}); 
}

document.addEventListener('DOMContentLoaded', () => {
    const consolesParaRenderizar = obterTemasOrdenados();
    renderizarConsoles(consolesParaRenderizar);
});