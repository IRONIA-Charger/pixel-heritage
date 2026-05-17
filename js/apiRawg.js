const RAWG_API_BASE = 'https://api.rawg.io/api';
const RAWG_API_KEY = 'f31641eceb9e4d16ba1bdb08d45f5094';


async function buscarJogosRawg(consoleObj, limite = 50) {
    try {
        const plataformaId = consoleObj.idRawg || consoleObj; 
        
        console.log("DEBUG - Buscando ID:", plataformaId);

        const url = `${RAWG_API_BASE}/games?key=${RAWG_API_KEY}&platforms=${plataformaId}&page_size=${limite}&ordering=-rating`;
        
        console.log("🚀 URL GERADA:", url);

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro ${response.status}`);
        
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(`❌ Erro RAWG:`, error);
        return [];
    }
}
async function buscarDetalheJogo(jogoId) {
    try {
        const url = `${RAWG_API_BASE}/games/${jogoId}?key=${RAWG_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro ${response.status}`);
        const data = await response.json();
        console.log(`✅ Detalhes do jogo carregados:`, data);
        return data;
    } catch (error) {
        console.error(`❌ Erro ao carregar detalhes do jogo:`, error);
        return null;
    }
}