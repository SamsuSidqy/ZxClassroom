export function deadlineTugas(date) {
	const nowUtc = new Date();

  // Konversi ke WIB (UTC+7)
  const nowWIB = new Date(nowUtc.getTime() + (7 * 60 * 60 * 1000));

  // Target tetap UTC (karena ada "Z")
  const target = new Date(date);

  // Samakan basis: ubah target ke WIB juga
  const targetWIB = new Date(target.getTime() + (7 * 60 * 60 * 1000));

  const diffMs = targetWIB - nowWIB;

  if (diffMs <= 0) return 0;

  const hari = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const jam = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const menit = Math.floor((diffMs / (1000 * 60)) % 60);

  return hari
}

export function showDeadline(date){
	const nowUtc = new Date();

  // Konversi ke WIB (UTC+7)
  const nowWIB = new Date(nowUtc.getTime() + (7 * 60 * 60 * 1000));

  // Target tetap UTC (karena ada "Z")
  const target = new Date(date);

  // Samakan basis: ubah target ke WIB juga
  const targetWIB = new Date(target.getTime() + (7 * 60 * 60 * 1000));

  const diffMs = targetWIB - nowWIB;

  if (diffMs <= 0) return "Berakhir";

  const hari = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const jam = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const menit = Math.floor((diffMs / (1000 * 60)) % 60);
  if (hari >= 1) {
  	return `${hari} Hari`
  }else{
  	if (jam >= 1) {
  		return `${jam} Jam`
  	}else{
  		return `${menit} Menit`
  	}
  }
}