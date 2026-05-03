document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const alertContainer = document.getElementById('alertContainer');

  const modalLupa = document.getElementById('modalLupaPassword');
  const modalDaftar = document.getElementById('modalDaftar');
  const btnLupa = document.getElementById('btnLupaPassword');
  const btnDaftar = document.getElementById('btnDaftar');
  const closeLupa = document.getElementById('closeLupaPassword');
  const closeDaftar = document.getElementById('closeDaftar');
  const formLupa = document.getElementById('formLupaPassword');
  const formDaftar = document.getElementById('formDaftar');

  function clearErrors() {
    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');
    emailError.textContent = '';
    passwordError.textContent = '';
  }

  function setError(input, errorEl, message) {
    input.classList.add('error');
    errorEl.textContent = message;
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();
    alertContainer.innerHTML = '';

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email) {
      setError(emailInput, emailError, 'Email tidak boleh kosong');
      emailInput.focus();
      return;
    }
    if (!isValidEmail(email)) {
      setError(emailInput, emailError, 'Format email tidak valid');
      emailInput.focus();
      return;
    }
    if (!password) {
      setError(passwordInput, passwordError, 'Password tidak boleh kosong');
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
      setError(emailInput, emailError, 'Email atau password salah');
      setError(passwordInput, passwordError, 'Email atau password salah');
    }
  });

  emailInput.addEventListener('input', function () {
    emailInput.classList.remove('error');
    emailError.textContent = '';
  });
  passwordInput.addEventListener('input', function () {
    passwordInput.classList.remove('error');
    passwordError.textContent = '';
  });

  btnLupa.addEventListener('click', function () { modalLupa.classList.add('active'); });
  closeLupa.addEventListener('click', function () { modalLupa.classList.remove('active'); });
  modalLupa.addEventListener('click', function (e) {
    if (e.target === modalLupa) modalLupa.classList.remove('active');
  });

  formLupa.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('emailLupa').value.trim();
    const errEl = document.getElementById('emailLupaError');
    errEl.textContent = '';

    if (!email) {
      errEl.textContent = 'Masukkan email terlebih dahulu';
      return;
    }
    if (!isValidEmail(email)) {
      errEl.textContent = 'Format email tidak valid';
      return;
    }

    showModalAlert(modalLupa, 'Link reset password telah dikirim ke email anda', 'success');
    document.getElementById('emailLupa').value = '';
    setTimeout(function () { modalLupa.classList.remove('active'); }, 1500);
  });

  btnDaftar.addEventListener('click', function () { modalDaftar.classList.add('active'); });
  closeDaftar.addEventListener('click', function () { modalDaftar.classList.remove('active'); });
  modalDaftar.addEventListener('click', function (e) {
    if (e.target === modalDaftar) modalDaftar.classList.remove('active');
  });

  formDaftar.addEventListener('submit', function (e) {
    e.preventDefault();

    const nama = document.getElementById('namaDaftar').value.trim();
    const email = document.getElementById('emailDaftar').value.trim();
    const password = document.getElementById('passwordDaftar').value;
    const confirm = document.getElementById('passwordDaftarConfirm').value;

    document.getElementById('namaDaftarError').textContent = '';
    document.getElementById('emailDaftarError').textContent = '';
    document.getElementById('passwordDaftarError').textContent = '';
    document.getElementById('passwordDaftarConfirmError').textContent = '';

    if (!nama) {
      document.getElementById('namaDaftarError').textContent = 'Nama lengkap tidak boleh kosong';
      return;
    }
    if (!email) {
      document.getElementById('emailDaftarError').textContent = 'Email tidak boleh kosong';
      return;
    }
    if (!isValidEmail(email)) {
      document.getElementById('emailDaftarError').textContent = 'Format email tidak valid';
      return;
    }
    if (!password) {
      document.getElementById('passwordDaftarError').textContent = 'Password tidak boleh kosong';
      return;
    }
    if (password.length < 6) {
      document.getElementById('passwordDaftarError').textContent = 'Password minimal 6 karakter';
      return;
    }
    if (password !== confirm) {
      document.getElementById('passwordDaftarConfirmError').textContent = 'Konfirmasi password tidak cocok';
      return;
    }

    showModalAlert(modalDaftar, 'Pendaftaran berhasil! Silahkan login', 'success');
    document.getElementById('namaDaftar').value = '';
    document.getElementById('emailDaftar').value = '';
    document.getElementById('passwordDaftar').value = '';
    document.getElementById('passwordDaftarConfirm').value = '';
    setTimeout(function () { modalDaftar.classList.remove('active'); }, 1500);
  });

  function showAlert(message, type) {
    alertContainer.innerHTML = '<div class="alert alert-' + type + '">' + message + '</div>';
    setTimeout(function () { alertContainer.innerHTML = ''; }, 4000);
  }

  function showModalAlert(modal, message, type) {
    var box = modal.querySelector('.modal-box');
    var existing = box.querySelector('.alert');
    if (existing) existing.remove();
    var alert = document.createElement('div');
    alert.className = 'alert alert-' + type;
    alert.textContent = message;
    box.insertBefore(alert, box.querySelector('form'));
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
