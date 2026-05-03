document.addEventListener('DOMContentLoaded', function () {
  const userData = JSON.parse(localStorage.getItem('sitta_user'));

  if (!userData) {
    window.location.href = 'index.html';
    return;
  }

  const now = new Date();
  const hour = now.getHours();

  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = 'Selamat Pagi';
  } else if (hour >= 12 && hour < 15) {
    greeting = 'Selamat Siang';
  } else if (hour >= 15 && hour < 18) {
    greeting = 'Selamat Sore';
  } else {
    greeting = 'Selamat Malam';
  }

  document.getElementById('greetingText').textContent = greeting + ', ' + userData.nama;
  document.getElementById('greetingNama').textContent =
    'Selamat datang di Sistem Informasi Tiras dan Transaksi Bahan Ajar';
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
});
