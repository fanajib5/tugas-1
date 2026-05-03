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
		var kodeLokasi = document.getElementById("inputKodeLokasi").value.trim();
		var kodeBarang = document.getElementById("inputKodeBarang").value.trim();
		var namaBarang = document.getElementById("inputNamaBarang").value.trim();
		var jenisBarang = document.getElementById("inputJenisBarang").value;
		var edisi = parseInt(document.getElementById("inputEdisi").value);
		var stok = parseInt(document.getElementById("inputStok").value);

		alertContainer.innerHTML = "";

		if (!kodeLokasi) {
			showAlert("Kode Lokasi tidak boleh kosong", "danger");
			return;
		}
		if (!kodeBarang) {
			showAlert("Kode Barang tidak boleh kosong", "danger");
			return;
		}
		if (!namaBarang) {
			showAlert("Nama Barang tidak boleh kosong", "danger");
			return;
		}
		if (!edisi || edisi < 1) {
			showAlert("Edisi harus diisi dengan angka minimal 1", "danger");
			return;
		}
		if (isNaN(stok) || stok < 0) {
			showAlert("Stok harus diisi dengan angka minimal 0", "danger");
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

		renderTable();
		formTambah.classList.remove("active");
		btnTambah.style.display = "inline-flex";
		resetForm();
		showAlert("Data bahan ajar berhasil ditambahkan!", "success");
	});

	function renderTable() {
		tableBody.innerHTML = "";
		for (var i = 0; i < dataStok.length; i++) {
			var item = dataStok[i];
			var row = document.createElement("tr");
			row.innerHTML =
				"<td>" +
				(i + 1) +
				"</td>" +
				"<td>" +
				item.kodeLokasi +
				"</td>" +
				"<td>" +
				item.kodeBarang +
				"</td>" +
				"<td>" +
				item.namaBarang +
				"</td>" +
				"<td>" +
				item.jenisBarang +
				"</td>" +
				"<td>" +
				item.edisi +
				"</td>" +
				"<td>" +
				item.stok +
				"</td>";
			tableBody.appendChild(row);
		}
	}

	function resetForm() {
		document.getElementById("inputKodeLokasi").value = "";
		document.getElementById("inputKodeBarang").value = "";
		document.getElementById("inputNamaBarang").value = "";
		document.getElementById("inputJenisBarang").value = "BMP";
		document.getElementById("inputEdisi").value = "";
		document.getElementById("inputStok").value = "";
	}

	function showAlert(message, type) {
		alertContainer.innerHTML =
			'<div class="alert alert-' + type + '">' + message + "</div>";
		setTimeout(function () {
			alertContainer.innerHTML = "";
		}, 4000);
	}

	renderTable();
});
