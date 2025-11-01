// KMS Holman's Legacy Lending - UI loaded

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.window').forEach((win, idx) => {
    win.style.cursor = 'pointer';
    win.onclick = function () {
      alert('Window ' + (idx + 1) + ' clicked! (Features coming soon)');
    };
  });
});
