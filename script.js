// KMS Holman's Legacy Lending - Universal DeFi Highway Interactions
// Make all buttons/connect actions interactive with graceful fallbacks

let web3Provider = null;
let userAccount = null;
let kmsTokenBalance = 0;
let apy = 15.7;

// Init
document.addEventListener('DOMContentLoaded', () => {
  detectWallet();
  wireUI();
  animateStats();
});

function detectWallet(){
  if (typeof window.ethereum !== 'undefined') {
    web3Provider = window.ethereum;
    console.log('Web3 wallet detected');
  } else {
    console.log('No Web3 wallet detected');
  }
}

function wireUI(){
  onClick('connectWallet', connectWallet);
  onClick('disconnectWallet', disconnectWallet);
  onClick('lendBtn', () => handleBridgeAction('lend'));
  onClick('borrowBtn', () => handleBridgeAction('borrow'));
  onClick('stakeBtn', handleStake);
  onClick('unstakeBtn', handleUnstake);
  onClick('claimRewards', handleClaimRewards);
  // Hover interactions for chips
  document.querySelectorAll('.token-chip,.exchange-node,.reactive-btn').forEach(el => {
    el.addEventListener('mouseenter', () => el.classList.add('hovered'));
    el.addEventListener('mouseleave', () => el.classList.remove('hovered'));
  });
}

function onClick(id, handler){
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', handler);
}

async function connectWallet(){
  if (!web3Provider){
    alert('No Web3 wallet found. Opening MetaMask download page...');
    window.open('https://metamask.io/download/', '_blank');
    return;
  }
  try{
    const accounts = await web3Provider.request({ method: 'eth_requestAccounts' });
    userAccount = accounts[0];
    document.getElementById('wallet-status')?.style && (document.getElementById('wallet-status').style.display = 'block');
    const addrEl = document.getElementById('walletAddress');
    if (addrEl) addrEl.textContent = `${userAccount.slice(0,6)}...${userAccount.slice(-4)}`;
    await refreshBalances();
    web3Provider.on?.('accountsChanged', handleAccountsChanged);
    web3Provider.on?.('chainChanged', () => window.location.reload());
  }catch(err){
    console.error(err);
    alert('Wallet connection was rejected or failed.');
  }
}

function disconnectWallet(){
  userAccount = null;
  const ws = document.getElementById('wallet-status');
  if (ws) ws.style.display = 'none';
  alert('Wallet disconnected locally.');
}

async function refreshBalances(){
  // Demo balances
  const eth = (Math.random()*0.5).toFixed(4);
  const kmst = (Math.random()*1000).toFixed(2);
  const usdc = (Math.random()*500).toFixed(2);
  setText('ethBalance', eth);
  setText('tokenBalance', `${kmst} KMST`);
  setText('usdcBalance', usdc);
}

function setText(id, value){
  const el = document.getElementById(id); if (el) el.textContent = value;
}

async function handleBridgeAction(type){
  const asset = valueOf('lendingAsset');
  const amount = parseFloat(valueOf('lendAmount'));
  if (!asset || !amount || amount <= 0){
    return alert('Enter a valid amount and asset.');
  }
  const verb = type === 'lend' ? 'Bridge & Lend' : 'Cross-Chain Borrow';
  simulateTx(`${verb} ${amount} ${asset}`, 2000, () => {
    // update displayed APY/borrow capacity demo
    apy = (15 + Math.random()*2).toFixed(1);
    setText('currentAPY', `${apy}%`);
  });
}

function valueOf(id){
  const el = document.getElementById(id); return el ? el.value : '';
}

function simulateTx(label, ms, onDone){
  const btns = document.querySelectorAll('.action-btn');
  btns.forEach(b => b.disabled = true);
  const original = label;
  const loading = document.createElement('div');
  loading.className = 'window';
  loading.textContent = `${label} in progress...`;
  document.body.appendChild(loading);
  setTimeout(() => {
    document.body.removeChild(loading);
    alert(`${original} successful (demo).`);
    btns.forEach(b => b.disabled = false);
    onDone && onDone();
  }, ms);
}

function handleStake(){
  const amt = parseFloat(valueOf('stakeAmount'));
  if (!amt || amt <= 0) return alert('Enter a valid stake amount.');
  simulateTx(`Stake ${amt} KMST`, 1500, () => {
    incrementDisplay('userStake', amt, ' KMST');
    incrementDisplay('userRewards', Math.max(0.01*amt, 0.1), ' KMST');
  });
}
function handleUnstake(){
  const current = getNumeric('userStake');
  if (current <= 0) return alert('Nothing to unstake.');
  simulateTx(`Unstake ${current} KMST`, 1200, () => {
    setText('userStake', '0 KMST');
  });
}
function handleClaimRewards(){
  const rewards = getNumeric('userRewards');
  if (rewards <= 0) return alert('No rewards to claim yet.');
  simulateTx(`Claim ${rewards} KMST`, 1000, () => setText('userRewards', '0 KMST'));
}

function getNumeric(id){
  const el = document.getElementById(id); if (!el) return 0;
  const num = parseFloat((el.textContent||'0').replace(/[^0-9.]/g,''));
  return isNaN(num) ? 0 : num;
}

function incrementDisplay(id, delta, suffix=''){
  const current = getNumeric(id);
  const next = (current + delta).toFixed(2) + suffix;
  setText(id, next);
}

// Fun: animate hero stats on load
function animateStats(){
  const tvlEl = document.getElementById('tvl');
  const apyEl = document.getElementById('apy');
  const usersEl = document.getElementById('users');
  if (!tvlEl || !apyEl || !usersEl) return;
  countUp(tvlEl, 0, 2847392, 1600, v => `$${v.toLocaleString()}`);
  countUp(apyEl, 0, 15.7, 1200, v => `${v.toFixed(1)}%`);
  countUp(usersEl, 0, 1247, 1300, v => `${Math.floor(v)}`);
}

function countUp(el, from, to, duration, fmt){
  const start = performance.now();
  function frame(now){
    const t = Math.min(1, (now - start)/duration);
    const val = from + (to - from) * easeOutCubic(t);
    el.textContent = fmt(val);
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

console.log('Universal DeFi Highway script loaded');
