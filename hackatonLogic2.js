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
    
        let obj = {
            ID : 0,
            nama: bioPasien.nama,
            umur: bioPasien.umur,
            jenisKelamin: bioPasien.jenisKelamin,
            gejala: bioPasien.gejala,
            swab: bioPasien.hasilSwab,
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
        if (!bioPasien.hasilSwab){
            obj.swab = 'Belum pernah swab test'
        }
        if (bioPasien.gejala.length === 0){
            obj.keluhan = 'Tidak ada keluhan'
        }
        users.push(obj)

    return users
}

function cekPerawatan(bioPasien, database){ //UPDATE
    let pasien = bioPasien //{}

    // for (let i = 0; i < pasien.length; i++){
        let count = 0;
        let counterPDP = 0
        for (let j = 0; j < database.length; j++){
            for (let k = 0; k < pasien.gejala.length; k++){
                if (pasien.gejala[k] === database[j]){
                    count++
                }
                if (pasien.gejala[k] === "Nyeri Dada" || pasien.gejala[k] === "Hilangnya Kemampuan Berbicara") {
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
        
        
    // }
    return pasien
}

// function displayStatus(){

// }

let bioPasien = 
    {
        nama: 'Joe',
        umur: 24,
        jenisKelamin: 'Pria',
        gejala: ['Demam'],
        hasilSwab: 'positif'
    }

// console.log(cekPerawatan(bioPasien, db_gejala))
// console.log(cekPerawatan('Kopi', 24, ['demam', 'mual', 'batuk darah'], db_gejala))
// console.log(cekPerawatan('Asia', 24, ['demam'], db_gejala))
// console.log(cekPerawatan('Benua', 24, [], db_gejala))
// console.log(cekPerawatan('Charlie', 24, [], db_gejala, 'negatif'))
// console.log(cekPerawatan('Dono', 24, ['mual'], db_gejala, 'negatif'))
// console.log(cekPerawatan('Charlie', 24, ["sulit bernafas" , "sakit di bagian dada"], db_gejala))

//CHECKVID19

let formUser = document.getElementById("formUser")

//function eventListener "Tambahkan Data"

formUser.addEventListener('submit', function(event){
    event.preventDefault() //biar ga ke refresh
    // alert("jdwijwnj")

    let namaResponden = document.getElementById("inputNama").value
    let umurResponden = document.getElementById("inputUsia").value
    let genderResponden = document.getElementById("radioButtonLaki").checked ? ("Laki-laki") : ("Perempuan")
    // alert(genderResponden)

    let arrayGejala = []
    let checkboxGejala = document.querySelectorAll('input[name=gejala]:checked')

    for (let i = 0; i < checkboxGejala.length; i++) {
    arrayGejala.push(checkboxGejala[i].value)
    }
    // alert(arrayGejala)

    // let gejalaResponden = document.getElementById("custom-control-label white")
    // let hasilGejala = document.querySelector('.custom-control-input').checked

    // let namaPeriksa = document.getElementById("namaPeriksa")
    // let umurPeriksa = document.getElementById("umurPeriksa")

    // namaPeriksa.innerHTML = namaResponden
    // umurPeriksa.innerHTML = umurResponden.value
    // gejalaPeriksa.innerHTML = arrayGejala

    daftar({
        nama: namaResponden,
        umur: umurResponden,
        jenisKelamin: genderResponden,
        gejala: arrayGejala
    })

    rendertable()
})



function rendertable() {
    // let namaHasil = document.getElementById("namaHasil")
    // namaHasil.innerHTML = `Nama: ${namaResponden.value}`
    
    let containerGejala = document.getElementById("tabel-gejala-container")
    containerGejala.innerHTML = ""
    for (let i = 0; i < users.length; i++){
        containerGejala.innerHTML += `<tr class="text-center">
        <td id="namaPeriksa"> ${users[i].nama} </td>
        <td id="umurPeriksa"> ${users[i].umur} </td>
        <td id="gejalaPeriksa"> ${users[i].gejala} </td>
        <td> 
            <a href="#" class="edit" style="margin-right: 20px; font-size: 22px;"><b>Delete</b></a>
            <a href="#part4" style="font-size: 22px;" onclick="myFunction()"><b>Cek Hasil</b></a>
        </td>
        </tr> `
    }
}


//function eventListener cekHasil
for
<button onclick="myFunction()">Click me</button>

// let namaPeriksa = document.getElementById("namaPeriksa")

// namaPeriksa.addEventListener('submit', function(event){
//     event.preventDefault()

    
// }

/* <tr class="text-center">
<td id="namaPeriksa">Andrew Mike</td>
<td id="umurPeriksa">22 th</td>
<td id="gejalaPeriksa">Sakit Kepala, Batuk, Pilek</td>
</tr> */
//function eventListener delete


// Calorie Tracker
// const menuList = document.querySelector('.food-list');
// const highCal = document.querySelector("#highCount");
// const midCal = document.querySelector("#mediumCount");
// const lowCal = document.querySelector("#lowCount");
// let statsFoods = statisticFood(foods);

// highCal.textContent = statsFoods.high;
// midCal.textContent = statsFoods.medium;
// lowCal.textContent = statsFoods.low;

// ABAIKAN code dibawah ini
// function render() {
//   // get todo list
//   let foodObject = generateFoodCalorie(foods)
//   // put all task to html
//   for (let i = 0; i < foodObject.foods.length; i++) {
//     // create div
//     const menu = document.createElement('div')
//     menu.classList.add('food')
//     // create list
//     const newMenu = document.createElement('li')
//     newMenu.innerText = `${foodObject.foods[i].name} -- ${foodObject.foods[i].totalCalorie}`
//     newMenu.classList.add('food-item')
//     menu.appendChild(newMenu)

//     // create completed button
//     const infoButton = document.createElement('button')
//     infoButton.innerHTML = foodObject.foods[i].status[0].toUpperCase() + foodObject.foods[i].status.substring(1)
//     if (infoButton.innerHTML === 'High') {
//       infoButton.classList.add('high-btn')
//     } else if (infoButton.innerHTML === 'Medium') {
//       infoButton.classList.add('medium-btn')
//     } else {
//       infoButton.classList.add('low-btn')
//     }
//     menu.appendChild(infoButton)
//     menuList.appendChild(menu)
//   }
// }
// render()