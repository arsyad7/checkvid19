// const { JSON_SCHEMA } = require("js-yaml")

const db_gejala = [
    "lemas-1",
    "sesak nafas-3",
    "ngilu-4",
    "tidak enak badan",
    "mual",
    "diare",
    "demam",
    "nyeri otot",
    "batuk kering",
    "gangguan pernafasan akut",
    "cairan di paru-paru",
    "sakit bagian abdominal",
    "tidak nafsu makan",
    "Sakit tenggorokan",
    "sulit bernafas",
    "tidak nyaman di dada",
    "nyeri saat menelan",
    "batuk darah",
]

let users = []


function daftar(nama, usia, gejala, hasilSwab){ //CREATE
    let frontNumber = ''
    let obj = {
        ID : 0,
        name: nama,
        umur: usia,
        status: '',
        saran: '',
        keluhan: gejala,
        Swab: hasilSwab
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
    if (!hasilSwab){
        obj.Swab = 'Belum pernah swab test'
    }
    if (gejala.length === 0){
        obj.keluhan = 'Tidak ada keluhan'
    }
    users.push(obj)
    return users
}

function cekPerawatan(nama, usia, gejala, database, hasilSwab){ //UPDATE
    let pasien = daftar(nama, usia, gejala, hasilSwab)
    for (let i = 0; i < pasien.length; i++){
        let count = 0;
        for (let j = 0; j < database.length; j++){
            for (let k = 0; k < pasien[i].keluhan.length; k++){
                if (pasien[i].keluhan[k] === database[j]){
                    count++
                }
            }
        }

        //OTG - GEJALA RINGAN
        //ODP - GEJALA SEDANG
        //PDP - GEJALA BERAT

        if (count < 1){
            if (hasilSwab === 'negatif'){
                pasien[i].status = 'Negatif'
                pasien[i].saran= 'Tidak perlu tindakan'
            }
            else if (hasilSwab = 'Belum pernah swab test'){
                pasien[i].status = 'Negatif atau OTG (Orang Tanpa Gejala)'
                pasien[i].saran= 'Perlu hasil swab!'
            }    
            else if(hasilSwab === 'positif'){
                pasien[i].status = 'OTG (Orang Tanpa Gejala)'
                pasien[i].saran= 'Perlu isolasi mandiri minimal 1 minggu'
            }        
        }
        else if (count > 0 && count < 3 ){
            pasien[i].status = 'ODP (Orang Dalam Pemantauan)'
            pasien[i].saran= 'Perlu isolasi mandiri minimal 2 minggu'
        }
        else if (count > 2){
            pasien[i].status ='PDP (Pasien Dalam Pengawasan)'
            pasien[i].saran= "Perlu perawatan rumah sakit"
        }
    }
    return pasien
}

function displayStatus(){

}

let bioPasien = [
    {
        nama: 'Joe'

    },

]


console.log(cekPerawatan('Joe', 24, ['demam'], db_gejala, 'positif'))
console.log(cekPerawatan('Kopi', 24, ['demam', 'mual', 'batuk darah'], db_gejala))
console.log(cekPerawatan('Asia', 24, ['demam'], db_gejala))
console.log(cekPerawatan('Benua', 24, [], db_gejala))
console.log(cekPerawatan('Charlie', 24, [], db_gejala, 'negatif'))
console.log(cekPerawatan('Dono', 24, ['mual'], db_gejala, 'negatif'))

console.log(cekPerawatan({

}))