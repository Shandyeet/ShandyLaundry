const body = document.body;

const toggle =
document.getElementById("themeToggle");

// DARK MODE
if(localStorage.getItem("theme") === "dark"){

  body.classList.add("dark");

  toggle.innerHTML =
    '<i class="fas fa-sun"></i>';
}

if(toggle){

  toggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    if(body.classList.contains("dark")){

      localStorage.setItem(
        "theme",
        "dark"
      );

      toggle.innerHTML =
        '<i class="fas fa-sun"></i>';

    }else{

      localStorage.setItem(
        "theme",
        "light"
      );

      toggle.innerHTML =
        '<i class="fas fa-moon"></i>';
    }

  });

}

// FORM
const layananPakaian =
document.getElementById("layananPakaian");

const berat =
document.getElementById("berat");

const setrika =
document.getElementById("setrika");

const layananSpesial =
document.getElementById("layananSpesial");

const jumlahSpesial =
document.getElementById("jumlahSpesial");

const estimasiHarga =
document.getElementById("estimasiHarga");

const estimasiWaktu =
document.getElementById("estimasiWaktu");

// HITUNG ESTIMASI
function hitungEstimasi(){

  let total = 0;

  let waktu = [];

  // PAKAIAN
  if(
    layananPakaian.value &&
    berat.value > 0
  ){

    const data =
      layananPakaian.value.split("|");

    const harga =
      parseInt(data[0]);

    const beratLaundry =
      parseInt(berat.value);

    total +=
      harga * beratLaundry;

    waktu.push(data[1]);

    // SETRIKA
    if(setrika.checked){

      total +=
        3500 * beratLaundry;

      waktu.push("+6 Jam");
    }

  }

  // SPESIAL
  if(
    layananSpesial.value &&
    jumlahSpesial.value > 0
  ){

    const data2 =
      layananSpesial.value.split("|");

    const harga2 =
      parseInt(data2[0]);

    total +=
      harga2 *
      parseInt(jumlahSpesial.value);

    waktu.push(data2[1]);

  }

  estimasiHarga.innerText =
    "Estimasi Harga: Rp " +
    total.toLocaleString("id-ID");

  estimasiWaktu.innerText =
    "Estimasi Waktu: " +
    (waktu.length
      ? waktu.join(" & ")
      : "-");

}

// EVENT
layananPakaian.addEventListener(
  "change",
  hitungEstimasi
);

berat.addEventListener(
  "input",
  hitungEstimasi
);

setrika.addEventListener(
  "change",
  hitungEstimasi
);

layananSpesial.addEventListener(
  "change",
  hitungEstimasi
);

jumlahSpesial.addEventListener(
  "input",
  hitungEstimasi
);

// SUBMIT
const form =
document.getElementById("orderForm");

form.addEventListener("submit", function(e){

  e.preventDefault();

  const nama =
    document.getElementById("nama").value;

  const wa =
    document.getElementById("wa").value;

  const alamat =
    document.getElementById("alamat").value;

  if(wa.length < 10){

    alert(
      "Nomor WhatsApp tidak valid!"
    );

    return;
  }

  const layanan1 =
    layananPakaian.options[
      layananPakaian.selectedIndex
    ].text;

  const layanan2 =
    layananSpesial.options[
      layananSpesial.selectedIndex
    ].text;

  const tambahanSetrika =
    setrika.checked
      ? "Ya"
      : "Tidak";

  const pesan = `
Halo LaundrySatSet!

Nama: ${nama}
WhatsApp: ${wa}
Alamat: ${alamat}

Laundry Pakaian: ${layanan1}
Berat: ${berat.value || '-'} kg
Tambah Setrika: ${tambahanSetrika}

Laundry Spesial: ${layanan2}
Jumlah: ${jumlahSpesial.value || '-'}

${estimasiHarga.innerText}
${estimasiWaktu.innerText}
`;

  alert(
    "Pesanan berhasil dibuat!"
  );

  window.open(
    `https://wa.me/6281234567890?text=${encodeURIComponent(pesan)}`
  );

  form.reset();

  estimasiHarga.innerText =
    "Estimasi Harga: Rp 0";

  estimasiWaktu.innerText =
    "Estimasi Waktu: -";

});