function salvarContato(dados) {

    const data = new Date().toLocaleString();

    const conteudo = `Nome: ${dados.nome}\nEmail: ${dados.email}\nMensagem: ${dados.mensagem}\nData: ${data}\n\n`;

    const blob = new Blob([conteudo, {type: 'text/plain'}]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `contato_${dados.nome.replace(/\s+/g, '_')}.txt`;
    link.click();

    window.URL.revokeObjectURL(link.href);
}
    

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Bem Vindo ao PixelHeritage! Carregando temas e jogos...");

    const consolesDados = await carregarConsolesLocais();

    if (consolesDados && consolesDados.length > 0) {
        renderizarConsoles(consolesDados);
    } else {
        console.warn("⚠️ Nenhum console encontrado em consoles.json");
    }

    const jogosIniciais = await buscarJogosRawg('GodofWar', 10);
    renderizarProdutos(jogosIniciais);
});

document.addEventListener('DOMContentLoaded', async() => {
    const consolesParaRenderizar = obterTemasOrdenados();// Pega os 4 primeiros temas
    renderizarConsoles(consolesParaRenderizar);

    const consolePadrao = 'Sony'; // Defina o console padrão que deseja mostrar
    aplicarTema(consolePadrao);
    try {
        const dadosConsole = obterTema(consolePadrao);
        const jogos = await buscarJogosRawg(dadosConsole);
        renderizarProdutos(jogos);
    } catch (error) {
        console.error("Erro ao buscar jogos para o console padrão:", error);
    } 
});

