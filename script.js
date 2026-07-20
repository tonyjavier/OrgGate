/**
 * AURA Private Brokerage - Comportamento Interativo (Framer Style)
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollHeader();
    initRevealAnimations();
    initSearchFilters();
});

/* ==========================================================================
   1. CONTROLE DO CABEÇALHO AO ROLAR (SCROLL)
   ========================================================================== */
function initScrollHeader() {
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Execução inicial preventiva
    handleScroll();
}

/* ==========================================================================
   2. MENU MOBILE (TOGGLE)
   ========================================================================== */
function toggleMobileMenu() {
    const menu = document.getElementById('nav-menu');
    const toggle = document.getElementById('menu-toggle');
    
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Fechar menu mobile ao clicar em algum link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('nav-menu');
        const toggle = document.getElementById('menu-toggle');
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
});

/* ==========================================================================
   3. FILTRAGEM LOCAL DE PROPRIEDADES (SHOWCASE)
   ========================================================================== */
let activeLocationTab = 'all';

function initSearchFilters() {
    // Escutar pressionamento de teclas no campo de busca para filtragem instantânea
    const searchInput = document.getElementById('property-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyFilters();
        });
    }
}

// Manipulação do filtro das abas rápidas
function filterShowcase(buttonEl, location) {
    activeLocationTab = location;
    
    // Atualizar classe ativa nas abas do Showcase
    if (buttonEl) {
        const tabs = document.querySelectorAll('.filter-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        buttonEl.classList.add('active');
    } else {
        // Se disparado pelo footer, alinhar visualmente a aba correspondente
        const tabs = document.querySelectorAll('.filter-tab');
        tabs.forEach(tab => {
            if (tab.getAttribute('data-filter') === location) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
    
    // Sincronizar o dropdown de localização
    const locationSelect = document.getElementById('filter-location');
    if (locationSelect) {
        locationSelect.value = location;
    }
    
    applyFilters();
}

// Função principal de filtragem unificada (Abas + Dropdowns + Busca por palavra-chave)
function applyFilters() {
    const selectedLocation = document.getElementById('filter-location').value;
    const selectedType = document.getElementById('filter-type').value;
    const selectedPrice = document.getElementById('filter-price').value;
    const searchKeyword = document.getElementById('property-search-input').value.toLowerCase().trim();
    
    const cards = document.querySelectorAll('.property-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const cardLocation = card.getAttribute('data-location');
        const cardType = card.getAttribute('data-type');
        const cardPrice = card.getAttribute('data-price');
        const cardKeywords = card.getAttribute('data-keywords').toLowerCase();
        const cardTitle = card.querySelector('.property-title').textContent.toLowerCase();
        
        // Regras de validação
        const matchesLocation = (selectedLocation === 'all' || cardLocation === selectedLocation);
        const matchesType = (selectedType === 'all' || cardType === selectedType);
        const matchesPrice = (selectedPrice === 'all' || cardPrice === selectedPrice);
        const matchesKeyword = !searchKeyword || 
                                cardKeywords.includes(searchKeyword) || 
                                cardTitle.includes(searchKeyword);
        
        if (matchesLocation && matchesType && matchesPrice && matchesKeyword) {
            card.style.display = 'flex';
            // Efeito de fade-in sutil ao reexibir
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
        }
    });
    
    // Gerenciamento da mensagem de "Nenhum imóvel encontrado"
    const noPropsMsg = document.getElementById('no-properties-message');
    if (visibleCount === 0) {
        noPropsMsg.style.display = 'block';
    } else {
        noPropsMsg.style.display = 'none';
    }
}

// Resetar todos os filtros para o estado original
function resetFilters() {
    document.getElementById('filter-location').value = 'all';
    document.getElementById('filter-type').value = 'all';
    document.getElementById('filter-price').value = 'all';
    document.getElementById('property-search-input').value = '';
    
    filterShowcase(document.querySelector('.filter-tab[data-filter="all"]'), 'all');
}

/* ==========================================================================
   4. VISITA VIRTUAL (CONTROLE DE CENAS/ABAS)
   ========================================================================== */
function switchTourScene(buttonEl, sceneId) {
    // 1. Atualizar classe ativa nos botões da aba do Tour
    const buttons = document.querySelectorAll('.tour-tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttonEl.classList.add('active');
    
    // 2. Transicionar imagem da cena correspondente
    const scenes = document.querySelectorAll('.tour-scene');
    scenes.forEach(scene => {
        if (scene.id === sceneId) {
            scene.classList.add('active');
        } else {
            scene.classList.remove('active');
        }
    });
}

/* ==========================================================================
   5. DIALOG MODAL (AGENDAMENTO DE VISITA)
   ========================================================================== */
const modal = document.getElementById('booking-modal');

function openBookingModal(propertyName = 'Geral') {
    const propertyInput = document.getElementById('booking-property');
    const modalTitle = modal.querySelector('.modal-title');
    
    // Pre-encher o campo oculto com o nome do imóvel
    if (propertyInput) {
        propertyInput.value = propertyName;
    }
    
    // Adaptar o título caso o usuário clique em um imóvel específico
    if (propertyName !== 'Geral') {
        modalTitle.textContent = `Apresentação: ${propertyName}`;
    } else {
        modalTitle.textContent = 'Agendar Visita Particular';
    }
    
    modal.showModal();
}

function closeBookingModal() {
    modal.close();
    // Resetar formulário após fechar
    document.getElementById('modal-booking-form').reset();
}

// Fechar modal ao clicar fora da caixa (no backdrop)
modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );
    if (!isInDialog) {
        closeBookingModal();
    }
});

/* ==========================================================================
   6. SUBMISSÃO DE FORMULÁRIOS (SIMULAÇÃO PREMIUM)
   ========================================================================== */
function handleBookingSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('booking-name').value;
    const property = document.getElementById('booking-property').value;
    
    // Simular feedback sofisticado (Toast)
    showToast(`Obrigado, ${name}. Solitação de agendamento enviada para: ${property}.`);
    
    closeBookingModal();
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    
    showToast(`E-mail cadastrado com sucesso. Seja bem-vindo ao clube off-market!`);
    document.getElementById('newsletter-form-id').reset();
}

// Sistema simples de notificação Toast
function showToast(message) {
    // Remover toast anterior se existir
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Criar elemento do Toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification glass-card';
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" width="20" height="20" style="flex-shrink: 0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <p style="font-size: 0.85rem; line-height: 1.4; color: #fff; font-weight: 500;">${message}</p>
        </div>
    `;
    
    // Estilos dinâmicos rápidos para o Toast
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: '9999',
        padding: '16px 24px',
        borderRadius: '8px',
        maxWidth: '380px',
        borderLeft: '4px solid #d4af37',
        animation: 'slideUpToast 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    });
    
    // Inserir animação CSS do toast na página se não existir
    if (!document.getElementById('toast-animation-style')) {
        const style = document.createElement('style');
        style.id = 'toast-animation-style';
        style.textContent = `
            @keyframes slideUpToast {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Autodestruir após 5 segundos
    setTimeout(() => {
        toast.style.animation = 'slideUpToast 0.5s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards';
        setTimeout(() => toast.remove(), 500);
    }, 4500);
}

/* ==========================================================================
   7. REVEAL ANIMATIONS (SURGIMENTO AO SCROLLAR)
   ========================================================================== */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Parar de observar o elemento após a animação
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12, // Elemento deve estar 12% visível para disparar
        rootMargin: '0px 0px -50px 0px' // Disparar ligeiramente antes de entrar totalmente na tela
    });
    
    revealElements.forEach(el => observer.observe(el));
}
