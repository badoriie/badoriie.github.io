// Get system theme preference
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

// Apply theme to the page
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  }
}

// Copy to clipboard function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// Generate QR code
function generateQRCode() {
  const qrContainer = document.getElementById('github-qr');
  if (!qrContainer || typeof QRCode === 'undefined') return;

  qrContainer.innerHTML = '';

  const isDark = document.body.classList.contains('dark-mode');

  new QRCode(qrContainer, {
    text: 'https://github.com/Badoriie',
    width: 80,
    height: 80,
    colorDark: isDark ? '#ffffff' : '#000000',
    colorLight: isDark ? '#2a2a2a' : '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });

  qrContainer.onclick = () => window.open('https://github.com/Badoriie', '_blank');
}

// Apply system theme on page load
window.onload = function() {
  applyTheme(getSystemTheme());
  generateQRCode();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    applyTheme(e.matches ? 'dark' : 'light');
    generateQRCode();
  });
};
