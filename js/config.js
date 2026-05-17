const temasConsoles = {
    Sony: {
        ordem: 1,
        idRawg:18,
        nome: "Sony",
        anoFundacao: 1994,
        corPrincipal: "#003087",
        corSecundaria: "#FFFFFF",
        corFundo: "#001f3f",
        logo: "assets/img/logo/PlayStation_logo.svg.png",
        banner: "assets/img/playstation-banner.png",
        titulo: "PlayStation - O Poder do Entretenimento",
        descricao: "Explore o universo do PlayStation, onde a inovação e a diversão se encontram. Descubra jogos exclusivos, gráficos impressionantes e uma comunidade apaixonada. Seja parte da revolução do entretenimento com o PlayStation.",
        historia: "Desde o lançamento do primeiro PlayStation em 1994, a Sony tem sido uma força dominante na indústria de jogos. Com cada nova geração, a marca tem se reinventado, oferecendo experiências de jogo imersivas e inovadoras. O PlayStation é sinônimo de qualidade, diversidade e inovação, conquistando milhões de fãs ao redor do mundo.",
    },
    Nintendo: {
        ordem: 2,
        idRawg:7,
        nome: "Nintendo",
        anoFundacao: 1889,
        corPrincipal: "#E60012",
        corSecundaria: "#FFFFFF",
        corFundo: "#400e0e",
        logo: "assets/img/logo/nintendo-logo.png",
        banner: "assets/img/nintendo-banner.png",
        titulo: "Nintendo - A Magia dos Jogos",
        descricao: "Mergulhe no mundo encantado da Nintendo, onde a criatividade e a diversão se unem. Descubra personagens icônicos, jogos inovadores e uma comunidade apaixonada. Com a Nintendo, a magia dos jogos ganha vida de maneira única e inesquecível.",
        historia: "Desde a sua fundação em 1889, a Nintendo tem sido uma força inovadora na indústria de jogos. Com o lançamento do Nintendo Entertainment System (NES) em 1985, a empresa revolucionou o mercado de jogos domésticos. A Nintendo continuou a inovar com consoles como o Super Nintendo, Nintendo 64, Wii e Switch, conquistando fãs de todas as idades com suas experiências de jogo únicas e criativas.",
    },
    Xbox: {
        ordem: 3,
        idRawg:1,
        nome: "Xbox",
        anoFundacao: 2001,
        corPrincipal: "#107C10",
        corSecundaria: "#FFFFFF",
        corFundo: "#0D3B0D",
        logo: "assets/img/logo/xbox-logo.png",
        banner: "assets/img/xbox-banner.png",
        titulo: "Xbox - A Revolução do Jogo",
        descricao: "Descubra o poder do Xbox, onde a inovação e a diversão se encontram. Explore jogos exclusivos, gráficos impressionantes e uma comunidade apaixonada. Com o Xbox, a revolução do jogo está ao seu alcance.",
        historia: "Desde o lançamento do primeiro Xbox em 2001, a Microsoft tem sido uma força inovadora na indústria de jogos. Com cada nova geração, a marca tem se reinventado, oferecendo experiências de jogo imersivas e inovadoras. O Xbox é sinônimo de qualidade, diversidade e inovação, conquistando milhões de fãs ao redor do mundo.",
    },
    Sega: {
        ordem: 4,
        idRawg:16,
        nome: "Sega",
        anoFundacao: 1985,
        corPrincipal: "#0051BA",
        corSecundaria: "#FFF200",
        corFundo: "#003D7A",
        logo: "assets/img/logo/sega-logo.png",
        banner: "assets/img/sega-banner.png",
        titulo: "Sega - Velocidade e Ação",
        descricao: "Experimente a velocidade e adrenalina do Sega, onde a ação nunca para. Descubra clássicos icônicos, jogos inovadores e uma comunidade dedicada. Com o Sega, a revolução arcade chega ao lar.",
        historia: "A Sega foi pioneira na indústria de arcade e consoles domésticos. Com o lançamento do Sega Genesis em 1988, a empresa desafiou a supremacia da Nintendo e ofereceu jogos de alta qualidade e inovadores. O Sega Dreamcast foi revolucionário com seus jogos em rede, deixando um legado eterno na história dos videogames.",
    }
};

function aplicarTema(consoleNome) {
    const tema = temasConsoles[consoleNome];
    if (!tema) {
        console.error(`❌ Tema "${consoleNome}" não encontrado`);
        return;
    }

    // Aplicar variáveis CSS
    document.documentElement.style.setProperty('--cor-principal', tema.corPrincipal);
    document.documentElement.style.setProperty('--cor-secundaria', tema.corSecundaria);
    document.documentElement.style.setProperty('--cor-fundo', tema.corFundo);

    // Preencher elementos HTML (se existirem)
    const logoElement = document.getElementById('logoTema');
    const bannerElement = document.getElementById('bannerTema');
    const tituloElement = document.getElementById('tituloTema');
    const descricaoElement = document.getElementById('descricaoTema');
    const historiaElement = document.getElementById('historiaTema');
    const anoElement = document.getElementById('anoFundacao');

    if (logoElement) logoElement.src = tema.logo;
    if (bannerElement) bannerElement.src = tema.banner;
    if (tituloElement) tituloElement.textContent = tema.titulo;
    if (descricaoElement) descricaoElement.textContent = tema.descricao;
    if (historiaElement) historiaElement.textContent = tema.historia;
    if (anoElement) anoElement.textContent = tema.anoFundacao;

    console.log(`✅ Tema "${consoleNome}" aplicado com sucesso`);
}

// ===============================================
// FUNÇÃO PARA OBTER TODOS OS TEMAS ORDENADOS
// ===============================================
function obterTemasOrdenados() {
    return Object.entries(temasConsoles)
        .map(([chave, valor]) => ({ chave, ...valor }))
        .sort((a, b) => a.ordem - b.ordem);
}

// ===============================================
// FUNÇÃO PARA OBTER UM TEMA ESPECÍFICO
// ===============================================
function obterTema(consoleNome) {
    return temasConsoles[consoleNome] || null;
}

function renderizarMenuConsoles() {
    const container = document.getElementById('consolesDestaque');
    if (!container) return;

    const temas = obterTemasOrdenados();
    
    container.innerHTML = temas.map(tema => `
        <button class="btn-console" onclick="selecionarPlataforma('${tema.chave}')">
            ${tema.nome}
        </button>
    `).join('');
}

// Essa função faz o "meio de campo"
function selecionarPlataforma(nome) {
    aplicarTema(nome); // Muda as cores e textos
    
    // Aqui você chama a sua função da API RAWG
    // Exemplo: carregarJogos(nome); 
}

document.addEventListener('DOMContentLoaded', renderizarMenuConsoles);