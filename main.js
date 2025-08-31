/**
 * Senior Expert - Main JavaScript File
 * 
 * Funcionalidades implementadas:
 * - Navegação mobile responsiva
 * - Header com efeito de scroll
 * - Navegação suave por âncoras
 * - Validação de formulário
 * - Botão "Voltar ao topo"
 * - Animações de fade-in nas seções
 * - Intersection Observer para animações
 */

// ===== VARIÁVEIS GLOBAIS =====
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const backToTopBtn = document.getElementById('backToTop');
const contatoForm = document.getElementById('contatoForm');

// ===== NAVEGAÇÃO MOBILE =====
function toggleMobileMenu() {
    navMenu.classList.toggle('show-menu');
    
    // Adiciona/remove classe para prevenir scroll do body
    document.body.classList.toggle('no-scroll');
}

function closeMobileMenu() {
    navMenu.classList.remove('show-menu');
    document.body.classList.remove('no-scroll');
}

// Event listeners para navegação mobile
if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
}

if (navClose) {
    navClose.addEventListener('click', closeMobileMenu);
}

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Fechar menu ao clicar fora dele
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileMenu();
    }
});

// ===== HEADER SCROLL EFFECT =====
function handleHeaderScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Event listener para scroll do header
window.addEventListener('scroll', handleHeaderScroll);

// ===== NAVEGAÇÃO SUAVE POR ÂNCORAS =====
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        // Verificar se o navegador suporta scroll suave
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            // Fallback para navegadores antigos
            window.scrollTo(0, targetPosition);
        }
        
        // Log para debug
        console.log(`Navegando para: ${targetId}, posição: ${targetPosition}`);
    } else {
        console.warn(`Elemento com ID '${targetId}' não encontrado`);
    }
}

// Event listeners para links de navegação
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            smoothScrollTo(targetId);
        }
    });
});

// Adicionar event listeners para botões do Hero também
document.addEventListener('DOMContentLoaded', function() {
    const heroButtons = document.querySelectorAll('.hero__buttons .btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                smoothScrollTo(targetId);
            }
        });
    });
});

// ===== BOTÃO VOLTAR AO TOPO =====
function handleBackToTop() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event listeners para botão voltar ao topo
window.addEventListener('scroll', handleBackToTop);

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', scrollToTop);
}

// ===== ANIMAÇÕES DE FADE-IN =====
function createIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Para de observar após animar
            }
        });
    }, observerOptions);
    
    return observer;
}

// Aplicar observer nas seções
function initializeAnimations() {
    const sections = document.querySelectorAll('.section');
    const observer = createIntersectionObserver();
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== VALIDAÇÃO DE FORMULÁRIO =====
function validateForm(formData) {
    const errors = [];
    
    // Validar nome
    if (!formData.nome || formData.nome.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push('Email deve ser válido');
    }
    
    // Validar mensagem
    if (!formData.mensagem || formData.mensagem.trim().length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    // Validar checkbox LGPD
    if (!formData.lgpd) {
        errors.push('Você deve aceitar os termos de privacidade');
    }
    
    return errors;
}

function showFormErrors(errors) {
    // Limpar erros anteriores
    clearFormErrors();
    
    // Mostrar novos erros
    errors.forEach(error => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form__error';
        errorDiv.textContent = error;
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            padding: 0.5rem;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 5px;
        `;
        
        // Adicionar erro após o formulário
        contatoForm.appendChild(errorDiv);
    });
}

function clearFormErrors() {
    const existingErrors = contatoForm.querySelectorAll('.form__error');
    existingErrors.forEach(error => error.remove());
}

function showFormSuccess() {
    // Limpar erros
    clearFormErrors();
    
    // Mostrar mensagem de sucesso
    const successDiv = document.createElement('div');
    successDiv.className = 'form__success';
    successDiv.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
    successDiv.style.cssText = `
        color: #155724;
        font-size: 1rem;
        margin-top: 1rem;
        padding: 1rem;
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        border-radius: 5px;
        text-align: center;
    `;
    
    contatoForm.appendChild(successDiv);
    
    // Limpar formulário
    contatoForm.reset();
    
    // Remover mensagem de sucesso após 5 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// ===== ENVIO DE FORMULÁRIO =====
async function sendForm(formData) {
    // TODO: Implementar integração com API real
    // Por enquanto, simula envio bem-sucedido
    
    console.log('Dados do formulário:', formData);
    
    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular resposta de sucesso
    return { success: true, message: 'Formulário enviado com sucesso!' };
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Obter dados do formulário
    const formData = new FormData(contatoForm);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        mensagem: formData.get('mensagem'),
        lgpd: formData.get('lgpd') === 'on'
    };
    
    // Validar formulário
    const errors = validateForm(data);
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return;
    }
    
    // Limpar erros
    clearFormErrors();
    
    // Desabilitar botão de envio
    const submitBtn = contatoForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    // Enviar formulário
    sendForm(data)
        .then(response => {
            if (response.success) {
                showFormSuccess();
            } else {
                throw new Error(response.message || 'Erro ao enviar formulário');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            showFormErrors(['Erro ao enviar formulário. Tente novamente.']);
        })
        .finally(() => {
            // Reabilitar botão
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
}

// Event listener para envio do formulário
if (contatoForm) {
    contatoForm.addEventListener('submit', handleFormSubmit);
}

// ===== UTILITÁRIOS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce para eventos de scroll
const debouncedScrollHandler = debounce(handleHeaderScroll, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// ===== INICIALIZAÇÃO =====
function initializeApp() {
    // Inicializar animações
    initializeAnimations();
    
    // Aplicar classe inicial ao header
    handleHeaderScroll();
    
    // Log de inicialização
    console.log('Senior Expert - Aplicação inicializada com sucesso!');
    console.log('Funcionalidades disponíveis:');
    console.log('- Navegação mobile responsiva');
    console.log('- Header com efeito de scroll');
    console.log('- Navegação suave por âncoras');
    console.log('- Validação de formulário');
    console.log('- Botão "Voltar ao topo"');
    console.log('- Animações de fade-in nas seções');
}

// ===== EVENT LISTENERS GLOBAIS =====
document.addEventListener('DOMContentLoaded', initializeApp);

// Prevenir comportamento padrão de links âncora
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
    }
});

// ===== TRATAMENTO DE ERROS =====
window.addEventListener('error', (e) => {
    console.error('Erro JavaScript:', e.error);
});

// ===== PERFORMANCE & ACCESSIBILITY =====
// Adicionar suporte para teclado na navegação mobile
if (navToggle) {
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });
}

// Melhorar acessibilidade do botão voltar ao topo
if (backToTopBtn) {
    backToTopBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
}

// ===== EXPORTAÇÕES PARA USO EXTERNO =====
// TODO: Remover em produção se não for necessário
window.SeniorExpert = {
    toggleMobileMenu,
    closeMobileMenu,
    smoothScrollTo,
    scrollToTop,
    validateForm,
    sendForm
};

// ===== DEBUG & DESENVOLVIMENTO =====
if (process?.env?.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
    console.log('Modo de desenvolvimento ativo');
    console.log('Funções disponíveis:', Object.keys(window.SeniorExpert));
}

