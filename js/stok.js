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

	var dataStok = dataBahanAjar.slice();
	var tableBody = document.getElementById("tableBody");
	var catalogView = document.getElementById("catalogViewSection");
	var tableView = document.getElementById("tableViewSection");
	var alertContainer = document.getElementById("alertContainer");

	var btnTambah = document.getElementById("btnTambahStok");
	var formTambah = document.getElementById("addStokForm");
	var btnSimpan = document.getElementById("btnSimpanStok");
	var btnBatal = document.getElementById("btnBatalStok");

	var inputCari = document.getElementById("inputCariStok");
	var filterJenis = document.getElementById("filterJenis");
	var sortStok = document.getElementById("sortStok");
	var stokCount = document.getElementById("stokCount");

	var btnViewTable = document.getElementById("btnViewTable");
	var btnViewCatalog = document.getElementById("btnViewCatalog");

	var currentViewMode = "table"; // 'table' or 'catalog'

	// View Toggle Listeners
	btnViewTable.addEventListener("click", function () {
		currentViewMode = "table";
		btnViewTable.classList.add("active");
		btnViewCatalog.classList.remove("active");
		tableView.style.display = "block";
		catalogView.style.display = "none";
	});

	btnViewCatalog.addEventListener("click", function () {
		currentViewMode = "catalog";
		btnViewCatalog.classList.add("active");
		btnViewTable.classList.remove("active");
		tableView.style.display = "none";
		catalogView.style.display = "grid";
	});

	btnTambah.addEventListener("click", function () {
		formTambah.classList.add("active");
		btnTambah.style.display = "none";
		formTambah.scrollIntoView({ behavior: "smooth", block: "nearest" });
	});

	btnBatal.addEventListener("click", function () {
		formTambah.classList.remove("active");
		btnTambah.style.display = "inline-flex";
		resetForm();
	});

	btnSimpan.addEventListener("click", function () {
		document.getElementById("kodeLokasiError").textContent = "";
		document.getElementById("kodeBarangError").textContent = "";
		document.getElementById("namaBarangError").textContent = "";
		document.getElementById("edisiError").textContent = "";
		document.getElementById("stokError").textContent = "";
		alertContainer.innerHTML = "";

		var kodeLokasi = document.getElementById("inputKodeLokasi").value.trim();
		var kodeBarang = document.getElementById("inputKodeBarang").value.trim().toUpperCase();
		var namaBarang = document.getElementById("inputNamaBarang").value.trim();
		var jenisBarang = document.getElementById("inputJenisBarang").value;
		var edisi = parseInt(document.getElementById("inputEdisi").value);
		var stok = parseInt(document.getElementById("inputStok").value);

		if (!kodeLokasi) {
			document.getElementById("kodeLokasiError").textContent = "Kode Lokasi tidak boleh kosong";
			return;
		}
		if (!kodeBarang) {
			document.getElementById("kodeBarangError").textContent = "Kode Barang tidak boleh kosong";
			return;
		}
		if (kodeBarang.length < 5) {
			document.getElementById("kodeBarangError").textContent = "Kode Barang minimal 5 karakter";
			return;
		}
		if (!namaBarang) {
			document.getElementById("namaBarangError").textContent = "Nama Barang tidak boleh kosong";
			return;
		}
		if (!edisi || edisi < 1) {
			document.getElementById("edisiError").textContent = "Edisi harus angka minimal 1";
			return;
		}
		if (isNaN(stok) || stok < 0) {
			document.getElementById("stokError").textContent = "Stok harus angka minimal 0";
			return;
		}

		dataStok.push({
			kodeLokasi: kodeLokasi,
			kodeBarang: kodeBarang,
			namaBarang: namaBarang,
			jenisBarang: jenisBarang,
			edisi: edisi,
			stok: stok,
		});

		applyFilterAndRender();
		formTambah.classList.remove("active");
		btnTambah.style.display = "inline-flex";
		resetForm();
		showAlert("Bahan ajar '" + namaBarang + "' berhasil ditambahkan ke sistem!", "success");
	});

	// Search, Filter & Sort event listeners
	inputCari.addEventListener("input", applyFilterAndRender);
	filterJenis.addEventListener("change", applyFilterAndRender);
	sortStok.addEventListener("change", applyFilterAndRender);

	function applyFilterAndRender() {
		var keyword = inputCari.value.trim().toLowerCase();
		var jenis = filterJenis.value;
		var sortMode = sortStok.value;

		var filtered = dataStok.filter(function (item) {
			var matchKeyword = !keyword ||
				item.namaBarang.toLowerCase().indexOf(keyword) !== -1 ||
				item.kodeBarang.toLowerCase().indexOf(keyword) !== -1 ||
				item.kodeLokasi.toLowerCase().indexOf(keyword) !== -1;

			var matchJenis = (jenis === "ALL") || (item.jenisBarang === jenis);
			return matchKeyword && matchJenis;
		});

		// Sorting
		if (sortMode === "namaAsc") {
			filtered.sort(function (a, b) { return a.namaBarang.localeCompare(b.namaBarang); });
		} else if (sortMode === "stokDesc") {
			filtered.sort(function (a, b) { return b.stok - a.stok; });
		} else if (sortMode === "stokAsc") {
			filtered.sort(function (a, b) { return a.stok - b.stok; });
		}

		renderData(filtered);
		updateMetrics();
	}

	function updateMetrics() {
		var totalJudul = dataStok.length;
		var totalStok = 0;
		var stokKritis = 0;

		for (var i = 0; i < dataStok.length; i++) {
			totalStok += dataStok[i].stok;
			if (dataStok[i].stok < 100) stokKritis++;
		}

		document.getElementById("metricTotalJudul").textContent = totalJudul + " Modul";
		document.getElementById("metricTotalStok").textContent = formatRibuan(totalStok) + " Eks";
		document.getElementById("metricStokKritis").textContent = stokKritis + " Perlu Restok";
	}

	function renderData(data) {
		renderTable(data);
		renderCatalog(data);
		stokCount.textContent = "Menampilkan " + data.length + " dari " + dataStok.length + " bahan ajar";
	}

	function renderTable(data) {
		tableBody.innerHTML = "";
		if (data.length === 0) {
			var emptyRow = document.createElement("tr");
			emptyRow.innerHTML = '<td colspan="8" style="text-align:center;padding:2.5rem;color:var(--text-muted);">' +
				'<div style="font-size:2rem;margin-bottom:0.5rem;">🔍</div>' +
				'<strong>Tidak ada data bahan ajar yang sesuai kriteria pencarian.</strong>' +
			'</td>';
			tableBody.appendChild(emptyRow);
			return;
		}

		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			var row = document.createElement("tr");

			var noCell = document.createElement("td");
			noCell.textContent = i + 1;
			noCell.style.fontWeight = "600";
			noCell.style.color = "var(--text-muted)";
			row.appendChild(noCell);

			var klCell = document.createElement("td");
			klCell.innerHTML = '<span style="background:#f1f5f9;padding:0.2rem 0.5rem;border-radius:6px;font-weight:600;font-size:0.8rem;border:1px solid #cbd5e1;">' + item.kodeLokasi + '</span>';
			row.appendChild(klCell);

			var kbCell = document.createElement("td");
			kbCell.innerHTML = '<strong style="color:#0b4387;">' + item.kodeBarang + '</strong>';
			row.appendChild(kbCell);

			var nbCell = document.createElement("td");
			nbCell.textContent = item.namaBarang;
			nbCell.style.fontWeight = "600";
			row.appendChild(nbCell);

			var jbCell = document.createElement("td");
			jbCell.innerHTML = '<span style="font-size:0.8rem;background:#e0f2fe;color:#0369a1;padding:0.2rem 0.55rem;border-radius:6px;font-weight:600;">' + item.jenisBarang + '</span>';
			row.appendChild(jbCell);

			var edCell = document.createElement("td");
			edCell.textContent = "Ed. " + item.edisi;
			row.appendChild(edCell);

			var stCell = document.createElement("td");
			var badgeColor = "stock-safe";
			var statusText = "Aman";
			if (item.stok < 20) {
				badgeColor = "stock-critical";
				statusText = "Kritis";
			} else if (item.stok < 100) {
				badgeColor = "stock-warning";
				statusText = "Terbatas";
			}
			stCell.innerHTML = '<div style="display:flex;align-items:center;gap:8px;">' +
				'<strong style="font-size:0.95rem;">' + formatRibuan(item.stok) + '</strong>' +
				'<span class="stock-pill ' + badgeColor + '">' + statusText + '</span>' +
			'</div>';
			row.appendChild(stCell);

			var aksiCell = document.createElement("td");
			aksiCell.style.textAlign = "center";
			var btnHapus = document.createElement("button");
			btnHapus.className = "btn btn-danger btn-sm";
			btnHapus.innerHTML = "🗑️ Hapus";
			btnHapus.style.padding = "0.3rem 0.65rem";
			btnHapus.style.fontSize = "0.78rem";
			btnHapus.addEventListener("click", (function (targetItem) {
				return function () {
					hapusData(targetItem);
				};
			})(item));
			aksiCell.appendChild(btnHapus);
			row.appendChild(aksiCell);

			tableBody.appendChild(row);
		}
	}

	function renderCatalog(data) {
		catalogView.innerHTML = "";
		if (data.length === 0) {
			catalogView.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">' +
				'<div style="font-size:2.5rem;margin-bottom:0.5rem;">📚</div>' +
				'<strong>Tidak ada bahan ajar yang ditemukan.</strong>' +
			'</div>';
			return;
		}

		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			var card = document.createElement("article");
			card.className = "book-card";

			var badgeColor = "stock-safe";
			var statusText = "Stok Aman";
			var meterColor = "#10b981";
			if (item.stok < 20) {
				badgeColor = "stock-critical";
				statusText = "Stok Kritis";
				meterColor = "#ef4444";
			} else if (item.stok < 100) {
				badgeColor = "stock-warning";
				statusText = "Terbatas";
				meterColor = "#f59e0b";
			}

			var meterPct = Math.min(100, Math.round((item.stok / 500) * 100));

			card.innerHTML =
				'<div class="book-cover">' +
					'<span class="book-cover-code">' + item.kodeBarang + '</span>' +
					'<h4 class="book-cover-title">' + item.namaBarang + '</h4>' +
					'<div style="font-size:0.75rem;opacity:0.85;display:flex;justify-content:space-between;z-index:1;">' +
						'<span>UNIVERSITAS TERBUKA</span>' +
						'<span>Edisi ' + item.edisi + '</span>' +
					'</div>' +
				'</div>' +
				'<div class="book-body">' +
					'<div class="book-meta">' +
						'<span>📍 Gudang: <strong>' + item.kodeLokasi + '</strong></span>' +
						'<span>📑 Jenis: <strong>' + item.jenisBarang + '</strong></span>' +
					'</div>' +
					'<div class="book-stock-section">' +
						'<div class="book-stock-header">' +
							'<span>Ketersediaan Fisik</span>' +
							'<span class="stock-pill ' + badgeColor + '">' + statusText + '</span>' +
						'</div>' +
						'<div class="book-stock-number">' + formatRibuan(item.stok) + ' <span style="font-size:0.8rem;font-weight:500;color:var(--text-muted);">eksemplar</span></div>' +
						'<div class="stock-meter">' +
							'<div class="stock-meter-fill" style="width:' + meterPct + '%;background:' + meterColor + ';"></div>' +
						'</div>' +
					'</div>' +
					'<div class="book-card-actions">' +
						'<button type="button" class="btn btn-danger btn-sm btn-hapus-card" style="padding:0.3rem 0.75rem;font-size:0.78rem;">🗑️ Hapus Modul</button>' +
					'</div>' +
				'</div>';

			var btnHapusCard = card.querySelector(".btn-hapus-card");
			btnHapusCard.addEventListener("click", (function (targetItem) {
				return function () {
					hapusData(targetItem);
				};
			})(item));

			catalogView.appendChild(card);
		}
	}

	function hapusData(item) {
		if (confirm("Apakah Anda yakin ingin menghapus data bahan ajar: \n\"" + item.namaBarang + " (" + item.kodeBarang + ")\"?")) {
			var idx = dataStok.indexOf(item);
			if (idx !== -1) {
				dataStok.splice(idx, 1);
				applyFilterAndRender();
				showAlert("Bahan ajar '" + item.namaBarang + "' berhasil dihapus.", "success");
			}
		}
	}

	function resetForm() {
		document.getElementById("inputKodeLokasi").value = "";
		document.getElementById("inputKodeBarang").value = "";
		document.getElementById("inputNamaBarang").value = "";
		document.getElementById("inputJenisBarang").value = "BMP";
		document.getElementById("inputEdisi").value = "";
		document.getElementById("inputStok").value = "";
		document.getElementById("kodeLokasiError").textContent = "";
		document.getElementById("kodeBarangError").textContent = "";
		document.getElementById("namaBarangError").textContent = "";
		document.getElementById("edisiError").textContent = "";
		document.getElementById("stokError").textContent = "";
	}

	function showAlert(message, type) {
		alertContainer.innerHTML = '<div class="alert alert-' + type + '">' + message + "</div>";
		setTimeout(function () { alertContainer.innerHTML = ""; }, 4000);
	}

	function formatRibuan(angka) {
		return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}

	applyFilterAndRender();

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
