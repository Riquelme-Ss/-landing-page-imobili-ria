// ==========================================
// 1. Lógica do Menu Mobile e Filtros 
// ==========================================
const btnMobile = document.getElementById('btn-mobile');
const menuMobile = document.getElementById('menu-mobile');

btnMobile.addEventListener('click', () => {
    menuMobile.classList.toggle('hidden');
});

const linksMobile = menuMobile.querySelectorAll('a');
linksMobile.forEach(link => {
    link.addEventListener('click', () => {
        menuMobile.classList.add('hidden');
    });
});

function filtrarCategoria(categoria) {
    const cards = document.querySelectorAll('.card-imovel');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => {
        tab.classList.remove('active-tab');
        tab.classList.add('inactive-tab');
        if (tab.id === `tab-${categoria}`) {
            tab.classList.remove('inactive-tab');
            tab.classList.add('active-tab');
        }
    });

    cards.forEach(card => {
        const catImovel = card.getAttribute('data-categoria');
        if (categoria === 'todos' || categoria === catImovel) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 50); 
        } else {
            card.style.opacity = '0'; 
            setTimeout(() => card.style.display = 'none', 300); 
        }
    });
}


// ==========================================
// 2. LÓGICA DA GALERIA DE IMAGENS (CARROSSEL)
// ==========================================
let imagensAtuais = [];
let indiceAtual = 0;

const modal = document.getElementById('modal-galeria');
const imgModal = document.getElementById('imagem-modal');
const contadorModal = document.getElementById('contador-modal');

// Função para Abrir o Modal recebendo o array de imagens
function abrirModal(listaDeImagens) {
    imagensAtuais = listaDeImagens;
    indiceAtual = 0; // Sempre abre na primeira foto
    
    // Atualiza a imagem e o contador
    atualizarImagemModal();
    
    // Mostra o modal (Remove o hidden e aplica o fade in)
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
    }, 10);
    
    // Trava a rolagem da página por trás
    document.body.style.overflow = 'hidden';
}

// Função para Fechar o Modal
function fecharModal() {
    // Efeito de fade out
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    
    // Esconde a div após a animação e destrava a rolagem
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Função para avançar ou voltar as imagens (+1 ou -1)
function mudarImagem(direcao) {
    indiceAtual += direcao;

    // Se passou da última foto, volta para a primeira
    if (indiceAtual >= imagensAtuais.length) {
        indiceAtual = 0;
    }
    // Se voltou antes da primeira foto, vai para a última
    if (indiceAtual < 0) {
        indiceAtual = imagensAtuais.length - 1;
    }

    atualizarImagemModal();
}

// Função que apenas atualiza o SRC da imagem e o texto do contador
function atualizarImagemModal() {
    imgModal.src = imagensAtuais[indiceAtual];
    contadorModal.innerText = `${indiceAtual + 1} / ${imagensAtuais.length}`;
}

// Fechar modal ao apertar a tecla ESC do teclado
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && !modal.classList.contains('hidden')) {
        fecharModal();
    }
    // Suporte para setas do teclado (Esquerda / Direita)
    if (event.key === "ArrowRight" && !modal.classList.contains('hidden')) {
        mudarImagem(1);
    }
    if (event.key === "ArrowLeft" && !modal.classList.contains('hidden')) {
        mudarImagem(-1);
    }
});

// ==========================================
// 4. ENVIO DE FORMULÁRIO PARA O WHATSAPP
// ==========================================
const form = document.getElementById('form-contato');

form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const nome = document.getElementById('nome-cliente').value.trim();
    const telefone = document.getElementById('telefone-cliente').value.trim();
    const interesse = document.getElementById('interesse-cliente').value;

    let interesseTexto = "";
    if (interesse === 'caixa') interesseTexto = "Primeiro Imóvel (Caixa/MCMV)";
    if (interesse === 'solta') interesseTexto = "Casas Soltas / Mais Espaço";
    if (interesse === 'duvida') interesseTexto = "Fazer uma simulação";

    const mensagem = `Olá! Meu nome é *${nome}* e vim pelo site.\n\nTenho interesse em: *${interesseTexto}*.\nMeu contato atual é: ${telefone}`;

    const seuNumero = "55819875099"; 

    const url = `https://wa.me/${seuNumero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    
    form.reset();
});