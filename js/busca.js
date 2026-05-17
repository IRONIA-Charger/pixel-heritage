// js/busca.js

document.getElementById('btnBuscar').addEventListener('click', () => {
    const input = document.getElementById('inputPedido').value.trim().toUpperCase();
    const resultado = document.getElementById('resultadoBusca');

    // Limpa o resultado anterior
    resultado.innerHTML = '';

    if (input.startsWith("PX-")) {
        resultado.innerHTML = `
            <div class="produto-card" style="border: 2px solid var(--cor-principal); padding: 20px;">
                <h3>📦 Pedido: ${input}</h3>
                <p>Status: <span style="color: #00ff00;">Em Processamento</span></p>
                <p>Local: Centro de Distribuição - Teresina/PI</p>
                <hr>
                <button class="btn-detalhes" onclick="baixarRecibo('${input}')">Baixar Recibo (.txt)</button>
            </div>
        `;
    } else if (input === "") {
        resultado.innerHTML = `<p style="color: yellow;">⚠️ Digite um código (Ex: PX-001)</p>`;
    } else {
        resultado.innerHTML = `<p style="color: red;">❌ Pedido não encontrado na base de dados.</p>`;
    }
});

// Função para gerar o arquivo .txt que o professor pediu (implícito na interatividade)
function baixarRecibo(id) {
    const texto = `RELATÓRIO DE PEDIDO - PIXELHERITAGE\n\nID: ${id}\nData: ${new Date().toLocaleDateString()}\nStatus: Confirmado\n\nObrigado por fortalecer a cultura retro!`;
    const blob = new Blob([texto], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `recibo-${id}.txt`;
    link.click();
}