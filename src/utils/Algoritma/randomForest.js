const data = [
  // 🔴 Tinggi (deadline 0–1) — 20 sampel
  [0,10,0],
  [1,20,1],
  [2,30,0],
  [3,45,1],
  [4,15,0],
  [2,40,1],
  [0,25,0],
  [1,35,1],
  [3,12,0],
  [4,48,1],
  [0,5,0],
  [2,22,0],
  [1,38,1],
  [3,18,1],
  [4,42,0],
  [0,30,1],
  [1,8,0],
  [2,47,1],
  [3,28,0],
  [4,33,1],

  // 🟡 Warning (deadline 2–3) — 20 sampel
  [0,10,2],
  [1,25,3],
  [2,35,2],
  [3,40,3],
  [4,15,2],
  [2,45,3],
  [0,20,2],
  [1,55,3],
  [3,30,2],
  [4,60,3],
  [0,50,3],
  [2,70,2],
  [1,65,3],
  [3,75,2],
  [4,80,3],
  [0,38,2],
  [2,42,3],
  [1,28,2],
  [3,58,3],
  [4,22,2],

  // 🟢 Rendah (deadline > 3) — 20 sampel
  [0,10,5],
  [1,60,7],
  [2,80,10],
  [3,30,14],
  [4,100,20],
  [0,5,30],
  [2,45,6],
  [1,70,8],
  [3,90,12],
  [4,55,9],
  [0,120,15],
  [2,200,25],
  [1,85,11],
  [3,40,18],
  [4,150,7],
  [0,65,5],
  [2,110,22],
  [1,95,16],
  [3,75,13],
  [4,180,30],
];

// Label: 0 = Rendah, 1 = Warning, 2 = Tinggi
const labels = [
  ...Array(20).fill(2), // Tinggi
  ...Array(20).fill(1), // Warning
  ...Array(20).fill(0), // Rendah
];


// Fungsi untuk menghitung entropi dari array label y
function entropy(arr) {
  const counts = {};
  // Hitung frekuensi tiap kelas (label)
  arr.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
  const n = arr.length;
  let ent = 0;
  // Hitung entropi menggunakan rumus sum(-p * log2(p))
  for (let key in counts) {
    const p = counts[key] / n;
    ent -= p * Math.log2(p);
  }
  return ent; // Kembalikan nilai entropi
}

// Fungsi untuk membagi dataset berdasarkan fitur dan nilai threshold
function splitDataset(X, y, featureIdx, value) {
  const leftX = [], leftY = [];
  const rightX = [], rightY = [];
  // Pisahkan data yang nilai fiturnya <= value ke kiri, sisanya ke kanan
  for (let i = 0; i < X.length; i++) {
    if (X[i][featureIdx] <= value) {
      leftX.push(X[i]);
      leftY.push(y[i]);
    } else {
      rightX.push(X[i]);
      rightY.push(y[i]);
    }
  }
  // Kembalikan data terpisah
  return { leftX, leftY, rightX, rightY };
}

// Fungsi mencari split terbaik berdasarkan informasi gain terbesar
function bestSplit(X, y) {
  const nFeatures = X[0].length; // Jumlah fitur (3)
  const baseEntropy = entropy(y); // Entropi awal sebelum split
  let bestGain = -Infinity;       // Variabel simpan gain terbaik
  let bestFeature = null;          // Simpan indeks fitur terbaik
  let bestValue = null;            // Simpan nilai split terbaik

  // Loop setiap fitur
  for (let featureIdx = 0; featureIdx < nFeatures; featureIdx++) {
    // Ambil nilai unik dari fitur itu
    const values = [...new Set(X.map((row) => row[featureIdx]))];
    for (let val of values) {
      // Bagi dataset berdasarkan nilai fitur
      const { leftY, rightY } = splitDataset(X, y, featureIdx, val);
      // Abaikan jika salah satu sisi kosong
      if (leftY.length === 0 || rightY.length === 0) continue;
      // Hitung entropi untuk masing-masing sisi
      const leftEnt = entropy(leftY);
      const rightEnt = entropy(rightY);
      // Hitung entropi rata-rata berbobot
      const weightedEnt = (leftY.length / y.length) * leftEnt + (rightY.length / y.length) * rightEnt;
      // Hitung informasi gain (pengurangan entropi)
      const infoGain = baseEntropy - weightedEnt;
      // Simpan split terbaik jika gain lebih besar
      if (infoGain > bestGain) {
        bestGain = infoGain;
        bestFeature = featureIdx;
        bestValue = val;
      }
    }
  }
  // Kembalikan split terbaik
  return { bestFeature, bestValue };
}

// Fungsi rekursif membangun pohon keputusan
function buildTree(X, y, maxDepth = 3, minSamplesSplit = 2, depth = 0) {
  // Jika semua label sama, buat leaf node
  const uniqueLabels = [...new Set(y)];
  if (uniqueLabels.length === 1) {
    return { label: uniqueLabels[0] };
  }
  // Jika mencapai kedalaman maksimal atau data terlalu sedikit
  if (depth >= maxDepth || y.length < minSamplesSplit) {
    // Kembalikan label mayoritas (kelas terbanyak)
    const counts = {};
    y.forEach((label) => (counts[label] = (counts[label] || 0) + 1));
    let maxCount = -1, majorityLabel = null;
    for (let key in counts) {
      if (counts[key] > maxCount) {
        maxCount = counts[key];
        majorityLabel = parseInt(key);
      }
    }
    return { label: majorityLabel };
  }
  // Cari split terbaik untuk node ini
  const { bestFeature, bestValue } = bestSplit(X, y);
  // Jika tidak ada split yang bagus, buat leaf dengan label mayoritas
  if (bestFeature === null) {
    const counts = {};
    y.forEach((label) => (counts[label] = (counts[label] || 0) + 1));
    let maxCount = -1, majorityLabel = null;
    for (let key in counts) {
      if (counts[key] > maxCount) {
        maxCount = counts[key];
        majorityLabel = parseInt(key);
      }
    }
    return { label: majorityLabel };
  }
  // Pisahkan data berdasarkan split terbaik
  const { leftX, leftY, rightX, rightY } = splitDataset(X, y, bestFeature, bestValue);
  // Bangun subtree kiri dan kanan secara rekursif dengan depth bertambah
  const leftTree = buildTree(leftX, leftY, maxDepth, minSamplesSplit, depth + 1);
  const rightTree = buildTree(rightX, rightY, maxDepth, minSamplesSplit, depth + 1);
  // Kembalikan node pohon dengan informasi split dan subtree
  return { featureIdx: bestFeature, value: bestValue, left: leftTree, right: rightTree };
}

// Fungsi prediksi menggunakan pohon keputusan tunggal
function predictTree(tree, sample) {
  // Jika node adalah leaf, kembalikan label
  if (tree.label !== undefined) {
    return tree.label;
  }
  // Jika nilai fitur <= threshold, turun ke subtree kiri
  if (sample[tree.featureIdx] <= tree.value) {
    return predictTree(tree.left, sample);
  } else {
    // Jika lebih, turun ke subtree kanan
    return predictTree(tree.right, sample);
  }
}

// Fungsi membangun random forest (sekumpulan pohon keputusan)
function randomForest(X, y, nTrees = 5, maxDepth = 3, minSamplesSplit = 2) {
  const trees = [];
  for (let i = 0; i < nTrees; i++) {
    // Bootstrap sampling: ambil sampel dengan pengulangan
    const sampleIndices = [];
    for (let j = 0; j < X.length; j++) {
      sampleIndices.push(Math.floor(Math.random() * X.length));
    }
    // Ambil sampel data dan label berdasarkan indeks bootstrap
    const Xsample = sampleIndices.map((idx) => X[idx]);
    const ysample = sampleIndices.map((idx) => y[idx]);
    // Bangun pohon keputusan dari sampel bootstrap
    const tree = buildTree(Xsample, ysample, maxDepth, minSamplesSplit);
    trees.push(tree);
  }
  return trees; // Kembalikan array pohon (random forest)
}

// Fungsi prediksi dengan random forest menggunakan voting mayoritas
function predictForest(trees, sample) {
  // Prediksi tiap pohon
  const predictions = trees.map((tree) => predictTree(tree, sample));
  // Hitung jumlah voting tiap kelas
  const counts = {};
  predictions.forEach((p) => (counts[p] = (counts[p] || 0) + 1));
  // Cari kelas dengan suara terbanyak
  let maxCount = -1, predLabel = null;
  for (let key in counts) {
    if (counts[key] > maxCount) {
      maxCount = counts[key];
      predLabel = parseInt(key);
    }
  }
  return predLabel; // Kembalikan label hasil voting mayoritas
}

// Melatih random forest dengan data contoh
const forest = randomForest(data, labels, 5, 3);

// Contoh data tugas baru yang ingin diprediksi prioritasnya
const tugasBaru = [1, 60, 3]; // 1 lampiran, deskripsi 60 karakter, deadline 3 hari

// Prediksi prioritas tugas baru dengan random forest
const prediksiPrioritas = predictForest(forest, tugasBaru);

// Tampilkan hasil prediksi
// console.log(Prediksi prioritas tugas baru: ${prediksiPrioritas});
// Label: 0 = Rendah, 1 = Sedang, 2 = Tinggi

export default function prediksiPrioritasTugas(tugasBaru){
  const check =  predictForest(forest,tugasBaru);
  console.log(tugasBaru)
  if (check === 1) {
    // Warning
    return 'yellow400';
  }else if(check === 2){
    // Tinggi
    return 'red500';
  }else{
    // Hijau
    return 'green400';
  }  
}