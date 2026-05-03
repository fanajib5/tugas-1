document.addEventListener('DOMContentLoaded', function () {
  var userData = JSON.parse(localStorage.getItem('sitta_user'));

  if (!userData) {
    window.location.href = 'index.html';
    return;
  }

  var now = new Date();
  var hour = now.getHours();
  var greeting;

  if (hour >= 5 && hour < 12) greeting = 'Selamat Pagi';
  else if (hour >= 12 && hour < 15) greeting = 'Selamat Siang';
  else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore';
  else greeting = 'Selamat Malam';

  document.getElementById('greetingText').textContent = greeting + ', ' + userData.nama;
  document.getElementById('displayNama').textContent = userData.nama;

  document.getElementById('btnLogout').addEventListener('click', function () {
    localStorage.removeItem('sitta_user');
    window.location.href = 'index.html';
  });

  var menuLaporan = document.getElementById('menuLaporan');
  var submenu = document.getElementById('submenuLaporan');

  menuLaporan.addEventListener('click', function (e) {
    if (!e.target.closest('a')) {
      submenu.classList.toggle('active');
    }
  });

  initDarkMode();

  function initDarkMode() {
    var btn = document.getElementById('btnDarkMode');
    if (!btn) return;

    var saved = localStorage.getItem('sitta_darkmode');
    if (saved === 'true') {
      document.body.classList.add('dark-mode');
      btn.textContent = '☀️';
      btn.title = 'Mode Terang';
    }

    btn.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      var isDark = document.body.classList.contains('dark-mode');
      btn.textContent = isDark ? '☀️' : '🌙';
      btn.title = isDark ? 'Mode Terang' : 'Mode Gelap';
      localStorage.setItem('sitta_darkmode', isDark);
    });
  }
});
