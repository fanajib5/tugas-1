document.addEventListener('DOMContentLoaded', function () {
  // ===== ELEMENTS =====
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const alertContainer = document.getElementById('alertContainer');

  const modalLupa = document.getElementById('modalLupaPassword');
  const modalDaftar = document.getElementById('modalDaftar');
  const btnLupa = document.getElementById('btnLupaPassword');
  const btnDaftar = document.getElementById('btnDaftar');
  const closeLupa = document.getElementById('closeLupaPassword');
  const closeDaftar = document.getElementById('closeDaftar');
  const formLupa = document.getElementById('formLupaPassword');
  const formDaftar = document.getElementById('formDaftar');

  // ===== VALIDASI & LOGIN =====
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');

    if (!email) {
      showAlert('Email tidak boleh kosong', 'danger');
      emailInput.classList.add('error');
      emailInput.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showAlert('Format email tidak valid', 'danger');
      emailInput.classList.add('error');
      emailInput.focus();
      return;
    }

    if (!password) {
      showAlert('Password tidak boleh kosong', 'danger');
      passwordInput.classList.add('error');
      passwordInput.focus();
      return;
    }

    const user = users.find(function (u) {
      return u.email === email && u.password === password;
    });

    if (user) {
      localStorage.setItem('sitta_user', JSON.stringify({ nama: user.nama, email: user.email }));
      window.location.href = 'dashboard.html';
    } else {
      showAlert('Email/password yang anda masukkan salah', 'danger');
      emailInput.classList.add('error');
      passwordInput.classList.add('error');
    }
  });

  // ===== MODAL LUPA PASSWORD =====
  btnLupa.addEventListener('click', function () {
    modalLupa.classList.add('active');
  });

  closeLupa.addEventListener('click', function () {
    modalLupa.classList.remove('active');
  });

  modalLupa.addEventListener('click', function (e) {
    if (e.target === modalLupa) modalLupa.classList.remove('active');
  });

  formLupa.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('emailLupa').value.trim();

    if (!email) {
      alert('Masukkan email terlebih dahulu');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Format email tidak valid');
      return;
    }

    alert('Link reset password telah dikirim ke email anda');
    modalLupa.classList.remove('active');
    document.getElementById('emailLupa').value = '';
  });

  // ===== MODAL DAFTAR =====
  btnDaftar.addEventListener('click', function () {
    modalDaftar.classList.add('active');
  });

  closeDaftar.addEventListener('click', function () {
    modalDaftar.classList.remove('active');
  });

  modalDaftar.addEventListener('click', function (e) {
    if (e.target === modalDaftar) modalDaftar.classList.remove('active');
  });

  formDaftar.addEventListener('submit', function (e) {
    e.preventDefault();

    const nama = document.getElementById('namaDaftar').value.trim();
    const email = document.getElementById('emailDaftar').value.trim();
    const password = document.getElementById('passwordDaftar').value;
    const confirm = document.getElementById('passwordDaftarConfirm').value;

    if (!nama) {
      alert('Nama lengkap tidak boleh kosong');
      return;
    }

    if (!email) {
      alert('Email tidak boleh kosong');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Format email tidak valid');
      return;
    }

    if (!password) {
      alert('Password tidak boleh kosong');
      return;
    }

    if (password.length < 6) {
      alert('Password minimal 6 karakter');
      return;
    }

    if (password !== confirm) {
      alert('Konfirmasi password tidak cocok');
      return;
    }

    alert('Pendaftaran berhasil! Silahkan login dengan akun baru anda');
    modalDaftar.classList.remove('active');
    document.getElementById('namaDaftar').value = '';
    document.getElementById('emailDaftar').value = '';
    document.getElementById('passwordDaftar').value = '';
    document.getElementById('passwordDaftarConfirm').value = '';
  });

  // ===== HELPER =====
  function showAlert(message, type) {
    alertContainer.innerHTML = '<div class="alert alert-' + type + '">' + message + '</div>';
    setTimeout(function () {
      alertContainer.innerHTML = '';
    }, 4000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
