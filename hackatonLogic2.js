const db_gejala = [
    "Demam",
    "Batuk Kering",
    "Kelelahan",
    "Perasaan Khawatir/Tidak Aman",
    "Nyeri Tenggorokan",
    "Diare",
    "Konjungtivitis",
    "Sakit Kepala",
    "Hilang Indera Perasa/Penciuman",
    "Perubahan Warna Pada Jari",
    "Kesulitan Bernafas",
    "Nyeri Dada",
    "Hilangnya Kemampuan Berbicara",
]

let users = []


function daftar(bioPasien){ //CREATE
    let frontNumber = ''
    
    for (let i = 0; i < bioPasien.length; i++) {
        let obj = {
            ID : 0,
            name: bioPasien[i].nama,
            umur: bioPasien[i].usia,
            jenisKelamin: bioPasien[i].jenisKelamin,
            keluhan: bioPasien[i].gejala,
            swab: bioPasien[i].hasilSwab,
            status: '',
            saran: ''
        }

        if (users.length === 0 || (String(users.length).length) === 1){
            frontNumber = '0000'
        }
        else if ((String(users.length).length) === 2){
            frontNumber = '000'
        }
        else if ((String(users.length).length) === 3){
            frontNumber = '00'
        }
        else if ((String(users.length).length) === 4){
            frontNumber = '0'
        }
        else if ((String(users.length).length) === 5){
            frontNumber = ''
        }
        obj.ID = frontNumber+(users.length + 1)
        if (!bioPasien[i].hasilSwab){
            obj.swab = 'Belum pernah swab test'
        }
        if (bioPasien[i].gejala.length === 0){
            obj.keluhan = 'Tidak ada keluhan'
        }
        users.push(obj)
    }

    return users
}

function cekPerawatan(bioPasien, database){ //UPDATE
    let pasien = daftar(bioPasien)

    for (let i = 0; i < pasien.length; i++){
        let count = 0;
        let counterPDP = 0
        for (let j = 0; j < database.length; j++){
            for (let k = 0; k < pasien[i].keluhan.length; k++){
                if (pasien[i].keluhan[k] === database[j]){
                    count++
                }
                if (pasien[i].keluhan[k] === "Nyeri Dada" || pasien[i].keluhan[k] === "Hilangnya Kemampuan Berbicara") {
                    counterPDP++
                }
                
            }
        }

        //OTG - GEJALA RINGAN
        //ODP - GEJALA SEDANG
        //PDP - GEJALA BERAT
        
        if (count < 1){
            if (pasien[i].swab === 'negatif'){
                pasien[i].status = 'Negatif'
                pasien[i].saran= 'Tidak perlu tindakan'
            }
            else if (pasien[i].swab = 'Belum pernah swab test'){
                pasien[i].status = 'Negatif atau OTG (Orang Tanpa Gejala)'
                pasien[i].saran= 'Perlu hasil swab!'
            }    
            else if(pasien[i].swab === 'positif'){
                pasien[i].status = 'OTG (Orang Tanpa Gejala)'
                pasien[i].saran= 'Perlu isolasi mandiri minimal 1 minggu'
            }        
        } else if (count > 2 || counterPDP >= 1) {
            pasien[i].status ='PDP (Pasien Dalam Pengawasan)'
            pasien[i].saran= "Perlu perawatan rumah sakit"
        } else if (count > 0 && count < 3 ) {
            pasien[i].status = 'ODP (Orang Dalam Pemantauan)'
            pasien[i].saran= 'Perlu isolasi mandiri minimal 2 minggu'
        }
        
        
    }
    return pasien
}

// function displayStatus(){

// }

let bioPasien = [
    {
        nama: 'Joe',
        usia: 24,
        jenisKelamin: 'Pria',
        gejala: ['Demam'],
        hasilSwab: 'positif'
    },
    {
        nama: 'Kopi',
        usia: 25,
        jenisKelamin: 'Pria',
        gejala: ['Batuk Kering', 'Perasaan Khawatir/Tidak Aman', 'Sakit Kepala'],
        hasilSwab: ''
    },
    {
        nama: 'Asia',
        usia: 26,
        jenisKelamin: 'Wanita',
        gejala: ['Kesulitan Bernafas', 'Konjungtivitis'],
        hasilSwab: ''
    },
    {
        nama: 'Benua',
        usia: 27,
        jenisKelamin: 'Pria',
        gejala: ['Nyeri Dada'],
        hasilSwab: ''
    },
    {
        nama: 'Charlie',
        usia: 28,
        jenisKelamin: 'Pria',
        gejala: ['Hilangnya Kemampuan Berbicara'],
        hasilSwab: 'negatif'
    },
    {
        nama: 'Dono',
        usia: 29,
        jenisKelamin: 'Pria',
        gejala: ['Diare'],
        hasilSwab: 'negatif'
    },
    {
        nama: 'Angel',
        usia: 30,
        jenisKelamin: 'Wanita',
        gejala: ['Nyeri Tenggorokan' , 'Perasaan Khawatir/Tidak Aman'],
        hasilSwab: ''
    }
]

console.log(cekPerawatan(bioPasien, db_gejala))
// console.log(cekPerawatan('Kopi', 24, ['demam', 'mual', 'batuk darah'], db_gejala))
// console.log(cekPerawatan('Asia', 24, ['demam'], db_gejala))
// console.log(cekPerawatan('Benua', 24, [], db_gejala))
// console.log(cekPerawatan('Charlie', 24, [], db_gejala, 'negatif'))
// console.log(cekPerawatan('Dono', 24, ['mual'], db_gejala, 'negatif'))
// console.log(cekPerawatan('Charlie', 24, ["sulit bernafas" , "sakit di bagian dada"], db_gejala))

