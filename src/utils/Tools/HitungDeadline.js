export default function deadlineTugas(date){
	const hariIni = new Date();

	// 2. Variabel Tanggal Lain (contoh: 25 Desember 2025)
	const tanggalTujuan = new Date(date);

	// 3. Hitung selisih waktu dalam milidetik
	const selisihWaktu = tanggalTujuan.getTime() - hariIni.getTime();

	// 4. Konversi milidetik ke hari (1000ms * 60s * 60m * 24h)
	const selisihHari = Math.ceil(selisihWaktu / (1000 * 3600 * 24));
	if (selisihHari) {
		return selisihHari;
	}else{
		return 0;
	}
}