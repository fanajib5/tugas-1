document.addEventListener("DOMContentLoaded", function () {
	var userData = JSON.parse(localStorage.getItem("sitta_user"));
	if (!userData) {
		window.location.href = "index.html";
		return;
	}
	document.getElementById("displayNama").textContent = userData.nama;
	document.getElementById("btnLogout").addEventListener("click", function () {
		localStorage.removeItem("sitta_user");
		window.location.href = "index.html";
	});

	var inputDO = document.getElementById("inputNoDO");
	var btnCari = document.getElementById("btnCari");
	var alertContainer = document.getElementById("alertContainer");
	var trackingResult = document.getElementById("trackingResult");

	btnCari.addEventListener("click", cariTracking);
	inputDO.addEventListener("keyup", function (e) {
		if (e.key === "Enter") cariTracking();
	});

	// Quick chips listener
	var chips = document.querySelectorAll(".chip-btn");
	for (var c = 0; c < chips.length; c++) {
		chips[c].addEventListener("click", function () {
			inputDO.value = this.getAttribute("data-dono");
			cariTracking();
		});
	}

	function cariTracking() {
		var noDO = inputDO.value.trim().toUpperCase();
		alertContainer.innerHTML = "";

		if (!noDO) {
			showAlert("Masukkan Nomor Delivery Order terlebih dahulu", "danger");
			inputDO.focus();
			return;
		}

		if (noDO.length < 3) {
			showAlert("Nomor DO minimal 3 karakter", "danger");
			return;
		}

		var data = null;
		for (var i = 0; i < dataTracking.length; i++) {
			if (dataTracking[i].noDO.toUpperCase() === noDO) {
				data = dataTracking[i];
				break;
			}
		}

		if (!data) {
			showAlert('Nomor DO "' + noDO + '" tidak ditemukan dalam sistem SITTA', "danger");
			trackingResult.classList.remove("active");
			return;
		}

		showResult(data);
	}

	function showResult(data) {
		document.getElementById("displayNoDO").textContent = data.noDO;
		document.getElementById("infoNama").textContent = data.nama;
		document.getElementById("infoNik").textContent = data.nik;
		document.getElementById("infoTgl").textContent = data.tglKirim;
		document.getElementById("locAsal").textContent = data.asal;
		document.getElementById("locTujuan").textContent = data.tujuan;

		var statusClass = "";
		var statusDot = "";
		if (data.status === "Diproses") {
			statusClass = "badge-diproses";
			statusDot = "🟡";
		} else if (data.status === "Dikirim") {
			statusClass = "badge-dikirim";
			statusDot = "🔵";
		} else if (data.status === "Sampai") {
			statusClass = "badge-sampai";
			statusDot = "🟢";
		}
		document.getElementById("statusBadge").innerHTML =
			'<span class="badge ' + statusClass + '">' + statusDot + " " + data.status + "</span>";

		// Stepper handling
		var progressFill = document.getElementById("progressFill");
		var step1 = document.getElementById("step1");
		var step2 = document.getElementById("step2");
		var step3 = document.getElementById("step3");
		var statusSubtext = document.getElementById("statusSubtext");

		step1.className = "step-node";
		step2.className = "step-node";
		step3.className = "step-node";

		if (data.status === "Diproses") {
			progressFill.style.width = "0%";
			step1.classList.add("current");
			statusSubtext.textContent = "Tahap 1 dari 3: Pesanan Sedang Diproses di Gudang";
		} else if (data.status === "Dikirim") {
			progressFill.style.width = "50%";
			step1.classList.add("completed");
			step2.classList.add("current");
			statusSubtext.textContent = "Tahap 2 dari 3: Paket Sedang Dalam Perjalanan Ekspedisi";
		} else if (data.status === "Sampai") {
			progressFill.style.width = "100%";
			step1.classList.add("completed");
			step2.classList.add("completed");
			step3.classList.add("completed");
			statusSubtext.textContent = "Tahap 3 dari 3: Paket Telah Diterima oleh Mahasiswa";
		}

		// Detail Grid Cards
		var detailGrid = document.getElementById("detailGrid");
		detailGrid.innerHTML =
			'<div class="detail-item">' +
				'<div class="detail-icon-box">🚚</div>' +
				'<div><div class="label">Mitra Ekspedisi</div><div class="value">' + data.ekspedisi + '</div></div>' +
			'</div>' +
			'<div class="detail-item">' +
				'<div class="detail-icon-box">📅</div>' +
				'<div><div class="label">Tanggal Pengiriman</div><div class="value">' + data.tglKirim + '</div></div>' +
			'</div>' +
			'<div class="detail-item">' +
				'<div class="detail-icon-box">📦</div>' +
				'<div><div class="label">Jenis Paket</div><div class="value">' + data.jenisPaket + '</div></div>' +
			'</div>' +
			'<div class="detail-item">' +
				'<div class="detail-icon-box" style="background:#fef3c7;color:#b45309;">💰</div>' +
				'<div><div class="label">Total Pembayaran</div><div class="value" style="color:#0b4387;">Rp ' + formatRupiah(data.totalBayar) + '</div></div>' +
			'</div>';

		// Timeline items
		var timeline = document.getElementById("timeline");
		timeline.innerHTML = "";
		for (var i = 0; i < data.timeline.length; i++) {
			var t = data.timeline[i];
			var node = document.createElement("div");
			node.className = "timeline-item";

			var dot = document.createElement("div");
			dot.className = "timeline-dot";
			node.appendChild(dot);

			var content = document.createElement("div");
			content.className = "timeline-content";
			var labelStatus = i === 0 ? '<span style="font-size:0.7rem;background:#10b981;color:white;padding:2px 6px;border-radius:4px;margin-left:6px;font-weight:700;">TERKINI</span>' : '';
			content.innerHTML =
				'<div class="timeline-lokasi">' + t.lokasi + labelStatus + '</div>' +
				'<div class="timeline-waktu">⏱️ ' + t.waktu + ' WIB</div>';
			node.appendChild(content);
			timeline.appendChild(node);
		}

		trackingResult.classList.add("active");
		trackingResult.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	function showAlert(message, type) {
		alertContainer.innerHTML = '<div class="alert alert-' + type + '">' + message + "</div>";
		setTimeout(function () { alertContainer.innerHTML = ""; }, 5000);
	}

	function formatRupiah(angka) {
		return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}

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
