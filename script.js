// KMS Holman's Legacy Lending - 3D Bank Counter Interactive Script
// Complete functionality for wallet connection, modals, and interactive windows

console.log('KMS Holman\'s Legacy Lending - Interactive Banking Experience Loaded');

// Global state management
let walletConnected = false;
let connectedAddress = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('3D Bank Counter Interface Initialized');
    console.log('Powered by innovation, driven by integrity.');
    
    // Add 3D hover effects to window cards
    initializeWindowEffects();
    
    // Add click listeners to close modals on outside click
    initializeModalCloseListeners();
    
    // Initialize wallet button
    const walletBtn = document.getElementById('walletBtn');
    if (walletBtn) {
        walletBtn.addEventListener('click', function() {
            openModal('walletModal');
        });
    }
});

// Initialize 3D effects for window cards
function initializeWindowEffects() {
    const windowCards = document.querySelectorAll('.window-card');
    
    windowCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
    });
}

// Open specific window modal
function openWindow(windowType) {
    switch(windowType) {
        case 'loan':
            openModal('loanModal');
            break;
        case 'account':
            if (!walletConnected) {
                alert('Please connect your wallet first to view account details.');
                openModal('walletModal');
            } else {
                openModal('accountModal');
            }
            break;
        case 'investment':
            openModal('investmentModal');
            break;
        default:
            console.log('Unknown window type:', windowType);
    }
}

// Open modal by ID
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        // Add animation
        setTimeout(() => {
            modal.classList.add('modal-active');
        }, 10);
    }
}

// Close modal by ID
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal-active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Initialize modal close listeners (click outside to close)
function initializeModalCloseListeners() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                const modalId = this.getAttribute('id');
                closeModal(modalId);
            }
        });
    });
}

// Wallet connection functions
function connectWalletType(walletType) {
    console.log('Attempting to connect:', walletType);
    
    switch(walletType) {
        case 'metamask':
            connectMetaMask();
            break;
        case 'coinbase':
            connectCoinbase();
            break;
        case 'walletconnect':
            connectWalletConnect();
            break;
        default:
            alert('Wallet type not supported yet.');
    }
}

// MetaMask connection
function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                walletConnected = true;
                connectedAddress = accounts[0];
                
                const shortAddress = connectedAddress.substring(0, 6) + '...' + connectedAddress.substring(38);
                
                // Update wallet button
                const walletBtn = document.getElementById('walletBtn');
                if (walletBtn) {
                    walletBtn.textContent = shortAddress;
                    walletBtn.style.background = 'linear-gradient(135deg, #00d4ff, #7b2ff7)';
                }
                
                closeModal('walletModal');
                
                alert('MetaMask connected successfully!\nAddress: ' + shortAddress);
                console.log('Connected to MetaMask:', connectedAddress);
            })
            .catch(error => {
                console.error('MetaMask connection error:', error);
                alert('Failed to connect to MetaMask. Please try again.');
            });
    } else {
        alert('MetaMask is not installed. Please install MetaMask extension to continue.');
        window.open('https://metamask.io/download/', '_blank');
    }
}

// Coinbase Wallet connection (placeholder)
function connectCoinbase() {
    alert('Coinbase Wallet integration coming soon!\nPlease use MetaMask for now.');
}

// WalletConnect connection (placeholder)
function connectWalletConnect() {
    alert('WalletConnect integration coming soon!\nPlease use MetaMask for now.');
}

// Submit form handler
function submitForm(formType) {
    switch(formType) {
        case 'loan':
            alert('Loan application submitted!\n\nThank you for your interest. Our team will review your application and contact you within 24-48 hours.');
            closeModal('loanModal');
            break;
        default:
            alert('Form submitted successfully!');
    }
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Console signature
console.log('%c KMS Holman\'s Legacy Lending ', 'background: linear-gradient(135deg, #00d4ff, #7b2ff7, #fe63e0, #fd36c5); color: white; font-size: 16px; padding: 10px; font-weight: bold;');
console.log('%c Built with dedication and innovation ', 'color: #fe63e0; font-size: 12px;');
console.log('%c Signed by John Holman, in honor of Kiara Jink Holman (07/02/23 - 01/18/24) ', 'color: #7b2ff7; font-style: italic; font-size: 11px;');
console.log('%c Where tradition meets innovation in digital banking ', 'color: #00d4ff; font-size: 10px;');

// Export functions for inline onclick handlers
window.openWindow = openWindow;
window.closeModal = closeModal;
window.connectWalletType = connectWalletType;
window.submitForm = submitForm;
