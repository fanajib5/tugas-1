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
			showAlert('Nomor DO "' + noDO + '" tidak ditemukan', "danger");
			trackingResult.classList.remove("active");
			return;
		}

		showResult(data);
	}

	function showResult(data) {
		document.getElementById("infoNama").textContent = data.nama;
		document.getElementById("infoNik").textContent = data.nik;
		document.getElementById("infoTgl").textContent = data.tglKirim;
		document.getElementById("infoStatus").textContent = data.status;
		document.getElementById("infoRute").textContent = data.asal + " -> " + data.tujuan;

		document.getElementById("locAsal").textContent = data.asal;
		document.getElementById("locTujuan").textContent = data.tujuan;

		var statusClass = "";
		if (data.status === "Diproses") statusClass = "badge-diproses";
		else if (data.status === "Dikirim") statusClass = "badge-dikirim";
		else if (data.status === "Sampai") statusClass = "badge-sampai";
		document.getElementById("statusBadge").innerHTML =
			'<span class="badge ' + statusClass + '">' + data.status + "</span>";

		var progressFill = document.getElementById("progressFill");
		progressFill.className = "progress-fill";
		if (data.status === "Diproses") {
			progressFill.style.width = "33%";
			progressFill.classList.add("progress-diproses");
		} else if (data.status === "Dikirim") {
			progressFill.style.width = "66%";
			progressFill.classList.add("progress-dikirim");
		} else if (data.status === "Sampai") {
			progressFill.style.width = "100%";
			progressFill.classList.add("progress-sampai");
		}

		var label1 = document.getElementById("label1");
		var label2 = document.getElementById("label2");
		var label3 = document.getElementById("label3");
		label1.classList.remove("active");
		label2.classList.remove("active");
		label3.classList.remove("active");
		if (data.status === "Diproses") label1.classList.add("active");
		else if (data.status === "Dikirim") { label1.classList.add("active"); label2.classList.add("active"); }
		else if (data.status === "Sampai") { label1.classList.add("active"); label2.classList.add("active"); label3.classList.add("active"); }

		var timeline = document.getElementById("timeline");
		timeline.innerHTML = "";
		for (var i = 0; i < data.timeline.length; i++) {
			var t = data.timeline[i];
			var node = document.createElement("div");
			node.className = "timeline-item";
			if (i === 0) node.classList.add("active");

			var dot = document.createElement("div");
			dot.className = "timeline-dot";
			node.appendChild(dot);

			var content = document.createElement("div");
			content.className = "timeline-content";
			content.innerHTML =
				'<div class="timeline-lokasi">' + t.lokasi + "</div>" +
				'<div class="timeline-waktu">' + t.waktu + "</div>";
			node.appendChild(content);
			timeline.appendChild(node);
		}

		var detailGrid = document.getElementById("detailGrid");
		detailGrid.innerHTML =
			'<div class="detail-item"><div class="label">Ekspedisi</div><div class="value">' + data.ekspedisi + "</div></div>" +
			'<div class="detail-item"><div class="label">Tanggal Kirim</div><div class="value">' + data.tglKirim + "</div></div>" +
			'<div class="detail-item"><div class="label">Jenis Paket</div><div class="value">' + data.jenisPaket + "</div></div>" +
			'<div class="detail-item"><div class="label">Total Pembayaran</div><div class="value">Rp ' + formatRupiah(data.totalBayar) + "</div></div>";

		trackingResult.classList.add("active");
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
