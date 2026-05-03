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
	var alertContainer = document.getElementById("alertContainer");

	var btnTambah = document.getElementById("btnTambahStok");
	var formTambah = document.getElementById("addStokForm");
	var btnSimpan = document.getElementById("btnSimpanStok");
	var btnBatal = document.getElementById("btnBatalStok");

	var inputCari = document.getElementById("inputCariStok");
	var stokCount = document.getElementById("stokCount");

	btnTambah.addEventListener("click", function () {
		formTambah.classList.add("active");
		btnTambah.style.display = "none";
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
		var kodeBarang = document.getElementById("inputKodeBarang").value.trim();
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

		renderTable(dataStok);
		formTambah.classList.remove("active");
		btnTambah.style.display = "inline-flex";
		resetForm();
		showAlert("Data bahan ajar berhasil ditambahkan!", "success");
	});

	inputCari.addEventListener("input", function () {
		var keyword = inputCari.value.trim().toLowerCase();
		if (!keyword) {
			renderTable(dataStok);
			return;
		}
		var filtered = [];
		for (var i = 0; i < dataStok.length; i++) {
			var item = dataStok[i];
			if (
				item.namaBarang.toLowerCase().indexOf(keyword) !== -1 ||
				item.kodeBarang.toLowerCase().indexOf(keyword) !== -1 ||
				item.kodeLokasi.toLowerCase().indexOf(keyword) !== -1
			) {
				filtered.push(item);
			}
		}
		renderTable(filtered);
	});

	function renderTable(data) {
		tableBody.innerHTML = "";
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			var row = document.createElement("tr");

			var noCell = document.createElement("td");
			noCell.textContent = i + 1;
			row.appendChild(noCell);

			var klCell = document.createElement("td");
			klCell.textContent = item.kodeLokasi;
			row.appendChild(klCell);

			var kbCell = document.createElement("td");
			kbCell.textContent = item.kodeBarang;
			row.appendChild(kbCell);

			var nbCell = document.createElement("td");
			nbCell.textContent = item.namaBarang;
			row.appendChild(nbCell);

			var jbCell = document.createElement("td");
			jbCell.textContent = item.jenisBarang;
			row.appendChild(jbCell);

			var edCell = document.createElement("td");
			edCell.textContent = item.edisi;
			row.appendChild(edCell);

			var stCell = document.createElement("td");
			stCell.textContent = item.stok;
			if (item.stok < 20) {
				stCell.style.color = "#e53935";
				stCell.style.fontWeight = "bold";
			}
			row.appendChild(stCell);

			var aksiCell = document.createElement("td");
			var btnHapus = document.createElement("button");
			btnHapus.className = "btn btn-danger btn-sm";
			btnHapus.textContent = "Hapus";
			btnHapus.style.padding = "0.25rem 0.6rem";
			btnHapus.style.fontSize = "0.75rem";
			btnHapus.addEventListener("click", (function (idx) {
				return function () {
					if (confirm("Hapus data " + data[idx].namaBarang + "?")) {
						var originalIdx = dataStok.indexOf(data[idx]);
						if (originalIdx !== -1) dataStok.splice(originalIdx, 1);
						var keyword = inputCari.value.trim().toLowerCase();
						if (keyword) {
							var filtered = [];
							for (var j = 0; j < dataStok.length; j++) {
								if (
									dataStok[j].namaBarang.toLowerCase().indexOf(keyword) !== -1 ||
									dataStok[j].kodeBarang.toLowerCase().indexOf(keyword) !== -1 ||
									dataStok[j].kodeLokasi.toLowerCase().indexOf(keyword) !== -1
								) {
									filtered.push(dataStok[j]);
								}
							}
							renderTable(filtered);
						} else {
							renderTable(dataStok);
						}
						showAlert("Data berhasil dihapus", "success");
					}
				};
			})(i));
			aksiCell.appendChild(btnHapus);
			row.appendChild(aksiCell);

			tableBody.appendChild(row);
		}
		stokCount.textContent = "Menampilkan " + data.length + " data";
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

	renderTable(dataStok);

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
