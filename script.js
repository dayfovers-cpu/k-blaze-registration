// EmailJS init
(function(){
emailjs.init("hT8v7fswiKNLW2_uZ");
})();

// data pendaftar dari localStorage
let registrants = JSON.parse(localStorage.getItem("basketRegistrants")) || [];

// FORM SUBMIT
document.getElementById("registrationForm").addEventListener("submit", function(e){

e.preventDefault();

let nama = document.getElementById("nama").value;
let telepon = document.getElementById("telepon").value;
let tanggal = new Date().toLocaleString("id-ID");

// simpan data
let newRegistrant = {
id: Date.now(),
nama: nama,
telepon: telepon,
tanggal: tanggal
};

registrants.unshift(newRegistrant);

localStorage.setItem("basketRegistrants", JSON.stringify(registrants));

// kirim email
emailjs.send("service_124","template_fkl04a6",{
nama: nama,
telepon: telepon,
tanggal: tanggal
})
.then(function(response){

console.log("EMAIL TERKIRIM", response);

// tampilkan notifikasi
document.getElementById("successMessage").style.display = "block";

// hilang setelah 4 detik
setTimeout(function(){
document.getElementById("successMessage").style.display = "none";
},4000);

})
.catch(function(error){

console.log("EMAIL GAGAL", error);

alert("Data tersimpan tapi email gagal dikirim.");

});

// reset form
document.getElementById("registrationForm").reset();

});
