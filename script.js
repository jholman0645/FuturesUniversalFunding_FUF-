console.log("FUF Beta App Loaded");

// Wallet connection functionality
function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        console.log('Connected account:', accounts[0]);
        alert('Wallet connected successfully! Account: ' + accounts[0].substring(0, 6) + '...' + accounts[0].substring(38));
      })
      .catch(error => {
        console.error('Error connecting wallet:', error);
        alert('Please install MetaMask or another Web3 wallet to connect.');
      });
  } else {
    alert('Please install MetaMask or another Web3 wallet to use this feature.');
  }
}

// Demo view functionality
function viewDemo() {
  alert('Demo Mode: This beta showcases FUF\'s cross-chain futures platform.\n\nFeatures:\n• Multi-chain support\n• Real-time oracle pricing\n• Instant lending with crypto collateral\n• Low transaction fees with FUF tokens\n\nConnect your wallet to explore live functionality!');
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('FUF Beta initialized');
});
