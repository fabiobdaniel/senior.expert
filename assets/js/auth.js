/* ===== AUTH JAVASCRIPT ===== */

// Objeto global para funcionalidades de autenticação
window.Auth = {
    
    // Inicializar página de login
    initLogin() {
        const form = document.getElementById('loginForm');
        if (!form) return;
        
        form.addEventListener('submit', this.handleLogin.bind(this));
        this.setupFormValidation(form);
    },
    
    // Inicializar página de cadastro
    initSignup() {
        const form = document.getElementById('signupForm');
        if (!form) return;
        
        form.addEventListener('submit', this.handleSignup.bind(this));
        this.setupFormValidation(form);
        this.setupPasswordConfirmation();
    },
    
    // Inicializar página de recuperação
    initForgot() {
        const form = document.getElementById('forgotForm');
        if (!form) return;
        
        form.addEventListener('submit', this.handleForgot.bind(this));
        this.setupFormValidation(form);
    },
    
    // Configurar validação de formulário
    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    },
    
    // Configurar confirmação de senha
    setupPasswordConfirmation() {
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('confirmPassword');
        
        if (passwordInput && confirmInput) {
            confirmInput.addEventListener('input', () => {
                this.validatePasswordMatch(passwordInput, confirmInput);
            });
        }
    },
    
    // Validar campo individual
    validateField(input) {
        const value = input.value.trim();
        const fieldName = input.name;
        let isValid = true;
        let message = '';
        
        // Validações específicas por campo
        switch (fieldName) {
            case 'email':
                if (!this.emailOk(value)) {
                    isValid = false;
                    message = 'Digite um email válido';
                }
                break;
                
            case 'password':
                if (value.length < 6) {
                    isValid = false;
                    message = 'A senha deve ter pelo menos 6 caracteres';
                }
                break;
                
            case 'confirmPassword':
                const password = document.getElementById('password')?.value;
                if (value !== password) {
                    isValid = false;
                    message = 'As senhas não coincidem';
                }
                break;
                
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    message = 'O nome deve ter pelo menos 2 caracteres';
                }
                break;
                
            case 'terms':
                if (!input.checked) {
                    isValid = false;
                    message = 'Você deve aceitar os termos e LGPD';
                }
                break;
        }
        
        // Aplicar validação
        if (!isValid) {
            this.showFieldError(input, message);
        } else {
            this.clearFieldError(input);
        }
        
        return isValid;
    },
    
    // Validar se senhas coincidem
    validatePasswordMatch(passwordInput, confirmInput) {
        if (confirmInput.value && passwordInput.value !== confirmInput.value) {
            this.showFieldError(confirmInput, 'As senhas não coincidem');
            return false;
        } else {
            this.clearFieldError(confirmInput);
            return true;
        }
    },
    
    // Mostrar erro no campo
    showFieldError(input, message) {
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        
        // Remover mensagem anterior se existir
        const existingMessage = input.parentNode.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Criar nova mensagem
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-message error';
        errorMessage.setAttribute('role', 'alert');
        errorMessage.setAttribute('aria-live', 'polite');
        errorMessage.textContent = message;
        
        input.parentNode.appendChild(errorMessage);
    },
    
    // Limpar erro do campo
    clearFieldError(input) {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        
        const message = input.parentNode.querySelector('.form-message');
        if (message) {
            message.remove();
        }
    },
    
    // Validar email
    emailOk(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Verificar se é bot (honeypot)
    isBot(form) {
        const honeypot = form.querySelector('input[name="website"]');
        return honeypot && honeypot.value.trim() !== '';
    },
    
    // Definir estado de loading do botão
    setLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.classList.add('btn--loading');
            button.textContent = 'Processando...';
        } else {
            button.disabled = false;
            button.classList.remove('btn--loading');
            // Restaurar texto original baseado no tipo de formulário
            const form = button.closest('form');
            if (form.id === 'loginForm') {
                button.textContent = 'Entrar';
            } else if (form.id === 'signupForm') {
                button.textContent = 'Cadastrar';
            } else if (form.id === 'forgotForm') {
                button.textContent = 'Enviar link de recuperação';
            }
        }
    },
    
    // Mostrar toast
    toast(message, type = 'info') {
        // Remover toast existente
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Criar novo toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Mostrar toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remover toast após 5 segundos
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    },
    
    // Validar formulário completo
    validateForm(form) {
        const requiredInputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        // Validação específica para confirmação de senha
        if (form.id === 'signupForm') {
            const password = form.querySelector('#password');
            const confirmPassword = form.querySelector('#confirmPassword');
            if (password && confirmPassword && !this.validatePasswordMatch(password, confirmPassword)) {
                isValid = false;
            }
        }
        
        return isValid;
    },
    
    // Handler para login
    async handleLogin(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Verificar honeypot
        if (this.isBot(form)) {
            this.toast('Acesso negado', 'error');
            return;
        }
        
        // Validar formulário
        if (!this.validateForm(form)) {
            this.toast('Por favor, corrija os erros no formulário', 'error');
            return;
        }
        
        // Simular envio
        this.setLoading(submitButton, true);
        
        try {
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simular sucesso
            this.toast('Login realizado com sucesso! (Simulado)', 'success');
            
            // TODO: Redirecionar para dashboard ou página principal
            // window.location.href = '/dashboard';
            
        } catch (error) {
            this.toast('Erro ao fazer login. Tente novamente.', 'error');
        } finally {
            this.setLoading(submitButton, false);
        }
    },
    
    // Handler para cadastro
    async handleSignup(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Verificar honeypot
        if (this.isBot(form)) {
            this.toast('Acesso negado', 'error');
            return;
        }
        
        // Validar formulário
        if (!this.validateForm(form)) {
            this.toast('Por favor, corrija os erros no formulário', 'error');
            return;
        }
        
        // Simular envio
        this.setLoading(submitButton, true);
        
        try {
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            // Simular sucesso
            this.toast('Conta criada com sucesso! (Simulado - confirmação por email)', 'success');
            
            // TODO: Redirecionar para confirmação ou login
            // window.location.href = '/confirm-email';
            
        } catch (error) {
            this.toast('Erro ao criar conta. Tente novamente.', 'error');
        } finally {
            this.setLoading(submitButton, false);
        }
    },
    
    // Handler para recuperação de senha
    async handleForgot(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Verificar honeypot
        if (this.isBot(form)) {
            this.toast('Acesso negado', 'error');
            return;
        }
        
        // Validar formulário
        if (!this.validateForm(form)) {
            this.toast('Por favor, corrija os erros no formulário', 'error');
            return;
        }
        
        // Simular envio
        this.setLoading(submitButton, true);
        
        try {
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Simular sucesso
            this.toast('Se o email existir, enviaremos o link de recuperação. (Simulado)', 'info');
            
            // TODO: Redirecionar para confirmação
            // window.location.href = '/check-email';
            
        } catch (error) {
            this.toast('Erro ao enviar link. Tente novamente.', 'error');
        } finally {
            this.setLoading(submitButton, false);
        }
    }
};

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Detectar qual página estamos e inicializar apropriadamente
    const path = window.location.pathname;
    
    if (path.includes('login.html') || path.endsWith('/login')) {
        Auth.initLogin();
    } else if (path.includes('signup.html') || path.endsWith('/signup')) {
        Auth.initSignup();
    } else if (path.includes('forgot.html') || path.endsWith('/forgot')) {
        Auth.initForgot();
    }
    
    console.log('Auth system initialized for:', path);
});
