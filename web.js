function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ================================= */
/* ⏰ JAM + TANGGAL REALTIME */
/* ================================= */

function updateJam() {

    const sekarang = new Date();

    const namaHari = [
        "Minggu", "Senin", "Selasa",
        "Rabu", "Kamis", "Jumat", "Sabtu"
    ];

    const hari = namaHari[sekarang.getDay()];

    const tanggal = sekarang.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const jam = sekarang.toLocaleTimeString("id-ID", {
        hour12: false
    });

    let elHari = document.getElementById("hari");
    let elTanggal = document.getElementById("tanggal");
    let elJam = document.getElementById("jam");

    if (elHari) elHari.innerHTML = "📅 " + hari;
    if (elTanggal) elTanggal.innerHTML = tanggal;
    if (elJam) elJam.innerHTML = "🕒 " + jam;
}

setInterval(updateJam, 1000);
updateJam();


/* ================================= */
/* 📊 SENSOR DASHBOARD */
/* ================================= */

setInterval(() => {

    // 🌡️ SUHU
    let suhu = rand(24, 35);
    let suhuEl = document.getElementById("suhu");

    if (suhuEl) {
        suhuEl.innerText = suhu + "°C";

        if (suhu <= 28) suhuEl.style.color = "#16a34a";
        else if (suhu <= 32) suhuEl.style.color = "#f59e0b";
        else suhuEl.style.color = "#dc2626";
    }

    // 💡 CAHAYA
    let cahaya = rand(0, 100);
    let cahayaEl = document.getElementById("cahaya");

    if (cahayaEl) {
        if (cahaya < 30) {
            cahayaEl.innerText = "Gelap";
            cahayaEl.style.color = "#dc2626";
        } else if (cahaya > 80) {
            cahayaEl.innerText = "Terang";
            cahayaEl.style.color = "#f59e0b";
        } else {
            cahayaEl.innerText = "Normal";
            cahayaEl.style.color = "#16a34a";
        }
    }

    // 🌫️ KELEMBAPAN
    let lembapEl = document.getElementById("lembap");
    if (lembapEl) {
        lembapEl.innerText = rand(45, 80) + "%";
    }

    // 🔊 NOISE
    let noise = rand(10, 100);
    let noiseEl = document.getElementById("noise");

    if (noiseEl) {
        if (noise > 70) {
            noiseEl.innerText = "Bising";
            noiseEl.style.color = "#dc2626";
        } else if (noise > 40) {
            noiseEl.innerText = "Sedang";
            noiseEl.style.color = "#f59e0b";
        } else {
            noiseEl.innerText = "Rendah";
            noiseEl.style.color = "#16a34a";
        }
    }

    // 🌬️ CO2
    let co2 = rand(300, 1200);
    let co2El = document.getElementById("co2");

    if (co2El) {
        if (co2 > 900) {
            co2El.innerText = "Buruk";
            co2El.style.color = "#dc2626";
        } else if (co2 > 600) {
            co2El.innerText = "Sedang";
            co2El.style.color = "#f59e0b";
        } else {
            co2El.innerText = "Baik";
            co2El.style.color = "#16a34a";
        }
    }

    // 🚶 MOTION
    let motionEl = document.getElementById("motion");

    if (motionEl) {
        let motion = Math.random() > 0.5;
        motionEl.innerText = motion ? "Ada Gerakan" : "Aman";
        motionEl.style.color = motion ? "#f59e0b" : "#16a34a";
    }

}, 2000);


/* ================================= */
/* 🏫 DETAIL RUANGAN */
/* ================================= */

function detailKelas(
    ruangan,
    prodi,
    semester,
    kelas,
    matkul,
    dosen,
    mahasiswa,
    jam,
    status
) {

    const detail = document.getElementById("detail");
    if (!detail) return;

    let warnaStatus = "#198754";

    if (status === "Digunakan") {
        warnaStatus = "#dc2626";
    } else if (status === "Booking") {
        warnaStatus = "#facc15";
    }

    detail.innerHTML = `
        <div style="padding:20px;">
            <h2>🏫 Detail Ruangan ${ruangan}</h2>
            <hr>

            <p><b>🎓 Program Studi :</b> ${prodi}</p>
            <p><b>📖 Semester :</b> ${semester}</p>
            <p><b>👥 Kelas :</b> ${kelas}</p>
            <p><b>📚 Mata Kuliah :</b> ${matkul}</p>
            <p><b>👨‍🏫 Dosen :</b> ${dosen}</p>
            <p><b>👨‍🎓 Mahasiswa :</b> ${mahasiswa}</p>
            <p><b>🕒 Jam :</b> ${jam}</p>

            <p>
                <b>📍 Status :</b>
                <span style="
                    background:${warnaStatus};
                    padding:6px 12px;
                    border-radius:8px;
                    color:white;
                    font-weight:bold;
                ">
                    ${status}
                </span>
            </p>
        </div>
    `;
}


/* ================================= */
/* 🔍 PENCARIAN RUANGAN */
/* ================================= */

function cariRuangan() {

    let input = document.getElementById("cariRuangan");
    if (!input) return;

    let filter = input.value.toUpperCase();
    let rooms = document.querySelectorAll(".room-card");

    rooms.forEach(room => {

        let text = room.innerText.toUpperCase();

        room.style.display = text.indexOf(filter) > -1
            ? ""
            : "none";
    });
}


/* ================================= */
/* 📝 BOOKING */
/* ================================= */

function bookingBerhasil(event) {
    event.preventDefault();
    alert("✅ Booking berhasil diajukan!");

}

function detailSensor(ruang){

const detail = document.getElementById("detailSensor");

detail.innerHTML = `
<h2>🏫 Detail Sensor ${ruang}</h2>

<p>🌡️ Suhu : ${rand(24,30)}°C</p>
<p>💡 Cahaya : Normal</p>
<p>🌫️ Kelembapan : ${rand(50,70)}%</p>
<p>🔊 Kebisingan : Rendah</p>
<p>🌬️ CO₂ : Baik</p>
<p>🚶 Aktivitas : Aman</p>

<hr style="margin:20px 0;">

<h3>📈 Grafik Monitoring ${ruang}</h3>

<canvas id="chartRuang" height="120"></canvas>
`;

const ctx = document.getElementById('chartRuang');

new Chart(ctx,{
type:'line',
data:{
labels:['08','09','10','11','12','13'],
datasets:[{
label:'Suhu',
data:[
rand(24,30),
rand(24,30),
rand(24,30),
rand(24,30),
rand(24,30),
rand(24,30)
],
borderColor:'#dc2626',
backgroundColor:'rgba(220,38,38,0.1)',
fill:true,
tension:0.4
}]
}
});
}