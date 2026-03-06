// Dados das músicas - CORRIGIDO: Agora aceita link ou apenas o ID
import { songs } from "./songs.js";

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

// MENU MOBILE
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Fecha menu ao clicar em um link
document.querySelectorAll('#nav-links li').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

window.playVideo = playVideo;
window.showPage = showPage;

//Modal de Add music
// --- LÓGICA DO MODAL DE SUGESTÃO ---
function initModal() {
    const modal = document.getElementById('modal-sugestao');
    const btnAbrir = document.getElementById('btn-abrir-sugestao');
    const btnCancelar = document.getElementById('btn-cancelar-sugestao');
    const btnEnviar = document.getElementById('btn-enviar-sugestao');

    if (!btnAbrir || !modal) {
        console.error("Elementos do modal não encontrados!");
        return;
    }

    // Abre o modal
    btnAbrir.onclick = () => {
        modal.showModal();
    };

    // Fecha o modal
    btnCancelar.onclick = () => {
        modal.close();
    };

    // Fecha ao clicar fora
    modal.onclick = (e) => {
        if (e.target === modal) modal.close();
    };

    // Envio para WhatsApp
    btnEnviar.onclick = () => {
        const titulo = document.getElementById('input-titulo').value;
        const artista = document.getElementById('input-artista').value;
        const url = document.getElementById('input-url').value;

        if (!titulo || !artista || !url) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        const numero = "5587981443129";
        const msg = `*Sugestão LouvorPlay*%0A🎵 Música: ${titulo}%0A👤 Artista: ${artista}%0A🔗 Link: ${url}`;

        window.open(`https://wa.me/${numero}?text=${msg}`, "_blank");
        modal.close();
    };
}

// Chame a função quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    // ... suas funções de renderizar músicas ...
    initModal();
});