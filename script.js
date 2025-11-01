// KMS Holman's Legacy Lending - Full Token & Wallet Integration
// Enhanced DeFi Platform with Cross-Chain Support

// Global variables
let web3Provider = null;
let userAccount = null;
let kmsTokenBalance = 0;
const KMS_TOKEN_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
const KMS_TOKEN_DECIMALS = 18;

// Simulated token price (in production, fetch from oracle/API)
let tokenPrice = 1.00;

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('KMS Holman\'s Legacy Lending App Loaded');
  initializeApp();
  setupEventListeners();
});

function initializeApp() {
  // Check if user has MetaMask or Web3 wallet
  if (typeof window.ethereum !== 'undefined') {
    console.log('Web3 wallet detected');
    web3Provider = window.ethereum;
  } else {
    console.log('No Web3 wallet detected. Please install MetaMask.');
  }
  
  // Update UI
  updateTokenPrice();
}

function setupEventListeners() {
  // Wallet connection
  const connectWalletBtn = document.getElementById('connectWallet');
  if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', connectWallet);
  }
  
  // Token balance refresh
  const refreshBalanceBtn = document.getElementById('refreshBalance');
  if (refreshBalanceBtn) {
    refreshBalanceBtn.addEventListener('click', refreshTokenBalance);
  }
  
  // Lending actions
  const supplyBtn = document.getElementById('supplyBtn');
  if (supplyBtn) {
    supplyBtn.addEventListener('click', handleSupply);
  }
  
  const borrowBtn = document.getElementById('borrowBtn');
  if (borrowBtn) {
    borrowBtn.addEventListener('click', handleBorrow);
  }
  
  // Futures trading
  const openLongBtn = document.getElementById('openLong');
  if (openLongBtn) {
    openLongBtn.addEventListener('click', () => handleFuturesPosition('long'));
  }
  
  const openShortBtn = document.getElementById('openShort');
  if (openShortBtn) {
    openShortBtn.addEventListener('click', () => handleFuturesPosition('short'));
  }
  
  // Wallet settings
  const walletSettingsBtn = document.getElementById('walletSettings');
  if (walletSettingsBtn) {
    walletSettingsBtn.addEventListener('click', openWalletSettings);
  }
}

async function connectWallet() {
  if (!web3Provider) {
    alert('Please install MetaMask or another Web3 wallet to connect.');
    window.open('https://metamask.io/download/', '_blank');
    return;
  }
  
  try {
    // Request account access
    const accounts = await web3Provider.request({ method: 'eth_requestAccounts' });
    userAccount = accounts[0];
    
    // Get network information
    const chainId = await web3Provider.request({ method: 'eth_chainId' });
    const networkName = getNetworkName(chainId);
    
    // Update UI
    document.getElementById('connectWallet').classList.add('hidden');
    const walletAddressEl = document.getElementById('walletAddress');
    walletAddressEl.textContent = `${userAccount.substring(0, 6)}...${userAccount.substring(38)}`;
    walletAddressEl.classList.remove('hidden');
    
    document.getElementById('network').textContent = networkName;
    
    // Load token balance
    await loadTokenBalance();
    
    console.log('Wallet connected:', userAccount);
    
    // Listen for account changes
    web3Provider.on('accountsChanged', handleAccountsChanged);
    web3Provider.on('chainChanged', handleChainChanged);
    
  } catch (error) {
    console.error('Error connecting wallet:', error);
    alert('Failed to connect wallet. Please try again.');
  }
}

function getNetworkName(chainId) {
  const networks = {
    '0x1': 'Ethereum Mainnet',
    '0x38': 'Binance Smart Chain',
    '0x89': 'Polygon',
    '0xaa36a7': 'Sepolia Testnet',
    '0x5': 'Goerli Testnet'
  };
  return networks[chainId] || `Chain ID: ${chainId}`;
}

async function loadTokenBalance() {
  if (!userAccount) {
    console.log('No wallet connected');
    return;
  }
  
  try {
    // In production, call actual ERC-20 contract
    // For demo, simulate balance
    kmsTokenBalance = Math.random() * 1000;
    
    // Update UI
    document.getElementById('tokenBalance').textContent = `${kmsTokenBalance.toFixed(2)} KMST`;
    
  } catch (error) {
    console.error('Error loading token balance:', error);
  }
}

async function refreshTokenBalance() {
  if (!userAccount) {
    alert('Please connect your wallet first.');
    return;
  }
  
  const refreshBtn = document.getElementById('refreshBalance');
  const originalText = refreshBtn.textContent;
  refreshBtn.textContent = 'Refreshing...';
  refreshBtn.disabled = true;
  
  await loadTokenBalance();
  
  setTimeout(() => {
    refreshBtn.textContent = originalText;
    refreshBtn.disabled = false;
  }, 1000);
}

function updateTokenPrice() {
  // Simulate price fluctuation (in production, fetch from oracle)
  tokenPrice = (0.95 + Math.random() * 0.1).toFixed(2);
  document.getElementById('tokenPrice').textContent = `$${tokenPrice}`;
  
  // Update every 10 seconds
  setTimeout(updateTokenPrice, 10000);
}

async function handleSupply() {
  if (!userAccount) {
    alert('Please connect your wallet first.');
    return;
  }
  
  const amount = document.getElementById('supplyAmount').value;
  
  if (!amount || amount <= 0) {
    alert('Please enter a valid amount to supply.');
    return;
  }
  
  // Simulate supply transaction
  const confirmSupply = confirm(`Supply ${amount} KMST to the lending pool?\n\nThis is a demo. In production, this would execute a smart contract transaction.`);
  
  if (confirmSupply) {
    alert(`Success! Supplied ${amount} KMST to lending pool.\n\nTransaction hash: 0x${Math.random().toString(16).substring(2, 66)}`);
    document.getElementById('supplyAmount').value = '';
  }
}

async function handleBorrow() {
  if (!userAccount) {
    alert('Please connect your wallet first.');
    return;
  }
  
  const amount = document.getElementById('borrowAmount').value;
  
  if (!amount || amount <= 0) {
    alert('Please enter a valid amount to borrow.');
    return;
  }
  
  // Simulate borrow transaction
  const confirmBorrow = confirm(`Borrow ${amount} KMST from the lending pool?\n\nThis is a demo. In production, this would execute a smart contract transaction.`);
  
  if (confirmBorrow) {
    alert(`Success! Borrowed ${amount} KMST from lending pool.\n\nTransaction hash: 0x${Math.random().toString(16).substring(2, 66)}`);
    document.getElementById('borrowAmount').value = '';
  }
}

function handleFuturesPosition(positionType) {
  if (!userAccount) {
    alert('Please connect your wallet first.');
    return;
  }
  
  const tradingPair = document.getElementById('tradingPair').value;
  
  alert(`Opening ${positionType.toUpperCase()} position on ${tradingPair}\n\nFutures trading features coming soon!\n\nStay tuned for advanced trading capabilities.`);
}

function openWalletSettings() {
  if (!userAccount) {
    alert('Please connect your wallet first.');
    return;
  }
  
  alert(`KMS Wallet Settings\n\nConnected Account: ${userAccount}\nToken Balance: ${kmsTokenBalance.toFixed(2)} KMST\n\nAdvanced settings coming soon!`);
}

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // User disconnected wallet
    userAccount = null;
    document.getElementById('connectWallet').classList.remove('hidden');
    document.getElementById('walletAddress').classList.add('hidden');
    document.getElementById('tokenBalance').textContent = '0.00 KMST';
    document.getElementById('network').textContent = 'Not Connected';
  } else {
    // User switched accounts
    userAccount = accounts[0];
    const walletAddressEl = document.getElementById('walletAddress');
    walletAddressEl.textContent = `${userAccount.substring(0, 6)}...${userAccount.substring(38)}`;
    loadTokenBalance();
  }
}

function handleChainChanged(chainId) {
  // Reload page when chain changes
  window.location.reload();
}

// Error handling for Web3
window.addEventListener('error', function(event) {
  console.error('Global error:', event.error);
});

// Log initialization
console.log('KMS Holman Legacy Lending - Initialized');
console.log('Token Address:', KMS_TOKEN_ADDRESS);
console.log('Ready for Web3 integration');
