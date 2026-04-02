// EmailJS init
(function(){
emailjs.init("hT8v7fswiKNLW2_uZ");
})();

let registrants = JSON.parse(localStorage.getItem("basketRegistrants")) || [];

document.getElementById("registrationForm").addEventListener("submit", function(e){

e.preventDefault();

let nama = document.getElementById("nama").value;
let telepon = document.getElementById("telepon").value;
let tanggal = new Date().toLocaleString("id-ID");

let newRegistrant = {
id: Date.now(),
nama: nama,
telepon: telepon,
tanggal: tanggal
};

registrants.unshift(newRegistrant);

localStorage.setItem("basketRegistrants", JSON.stringify(registrants));

emailjs.send("service_124","template_fkl04a6",{
nama: nama,
telepon: telepon,
tanggal: tanggal
})
.then(function(response){

console.log("EMAIL TERKIRIM", response);

document.getElementById("successMessage").style.display = "block";

setTimeout(function(){
document.getElementById("successMessage").style.display = "none";
},4000);

})
.catch(function(error){

console.log("EMAIL GAGAL", error);

alert("Pendaftaran berhasil! Terima kasih telah mendaftar. Tim kami akan segera menghubungi Anda untuk informasi selanjutnya.");

})
.finally(function(){

// reset form selalu dijalankan
document.getElementById("registrationForm").reset();

});

});
