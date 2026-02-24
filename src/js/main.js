// Dados das músicas - CORRIGIDO: Agora aceita link ou apenas o ID
const songs = [
    { 
        id: '1', title: 'Eu so de Jesus', artist: 'Irmão Lazaro', 
        youtubeId: 'https://youtu.be/_kxqoo6QInM?si=aZIR7BpMDG-AR6wB', cover: '🎵' 
    },
    { 
        id: '2', title: 'Efesio 6', artist: 'Anderson Freire', 
        youtubeId: 'https://youtu.be/zJOINygRqtQ?si=zG5kk6LCJMFX__C6', cover: '🎵' 
    },
    { 
        id: '3', title: 'Efesio 6 (Versão Rock)', artist: 'Erion Sounds', 
        youtubeId: 'https://youtu.be/B_m5vhUjPVA?si=ZaCb-wQngOiBzNmo', cover: '🎵' 
    },
    { 
        id: '4', title: 'Todavia Me Alegrarei', artist: 'Leandro Borges', 
        youtubeId: '6C0fndA7fV0', cover: '🎵' 
    },
    { 
        id: '5', title: 'Bondade de Deus', artist: 'Isaias Saad', 
        youtubeId: '6mO4o6_S9u8', cover: '🎵' 
    },
    { 
        id: '6', title: 'Raridade', artist: 'Anderson Freire', 
        youtubeId: 'm4I9m_9X0vM', cover: '🎵' 
    },
    { 
        id: '7', title: 'Raridade', artist: 'Anderson Freire', 
        youtubeId: 'm4I9m_9X0vM', cover: '🎵' 
    },
    { 
        id: '8', title: 'Raridade', artist: 'Anderson Freire', 
        youtubeId: 'm4I9m_9X0vM', cover: '🎵' 
    },
    { 
        id: '9', title: 'Raridade', artist: 'Anderson Freire', 
        youtubeId: 'm4I9m_9X0vM', cover: '🎵' 
    },
    { 
        id: '10', title: 'Raridade', artist: 'Anderson Freire', 
        youtubeId: 'm4I9m_9X0vM', cover: '🎵' 
    },
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderSongs('latest-grid', songs.slice(0, 4));
    renderSongs('all-songs-grid', songs);
});

// Função para extrair o ID do vídeo caso o usuário cole a URL inteira
function extractVideoID(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : url;
}

// Função para renderizar cards
function renderSongs(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return; // Evita erro se o container não existir na página

    container.innerHTML = data.map(song => `
    <div class="card" onclick="playVideo('${song.youtubeId}')">
        <div class="card-img">${song.cover}</div>
        <div class="card-body">
            <div class="card-title">${song.title}</div>
            <div class="card-artist">${song.artist}</div>
        </div>
    </div>
`).join('');
}

// Função para tocar vídeo no Iframe - CORRIGIDA
function playVideo(videoInput) {
    const videoId = extractVideoID(videoInput); // Limpa o link para pegar só o ID
    const playerContainer = document.getElementById('video-player-container');

    playerContainer.style.display = 'block';
    // O segredo está no link /embed/
    playerContainer.innerHTML = `
    <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
    </iframe>
`;
    // Scroll suave até o vídeo
    playerContainer.scrollIntoView({ behavior: 'smooth' });
}

// Navegação simples entre páginas
function showPage(pageId) {
    const home = document.getElementById('page-home');
    const musicas = document.getElementById('page-musicas');
    const hero = document.getElementById('hero-section');

    if (home) home.classList.add('hidden');
    if (musicas) musicas.classList.add('hidden');

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.remove('hidden');
    if (hero) hero.classList.toggle('hidden', pageId !== 'home');
}

// Filtro de Busca
const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = songs.filter(s =>
            s.title.toLowerCase().includes(term) ||
            s.artist.toLowerCase().includes(term)
        );
        showPage('musicas');
        renderSongs('all-songs-grid', filtered);
    });
}