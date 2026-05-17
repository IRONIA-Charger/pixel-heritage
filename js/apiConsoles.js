let consolesLocais = [];

async function carregarConsolesLocais() {
    try {
        const response = await fetch('consoles.json');
        if (!response.ok) throw new Error(`Erro ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Erro consoles.json:", error);
        return [];
    }
}