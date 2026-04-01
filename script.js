// Data pendaftar
let registrants = JSON.parse(localStorage.getItem('basketRegistrants')) || [];
const ADMIN_PASSWORD = 'admin123';

// Tombol daftar
document.getElementById('registrationForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    const nama = document.getElementById('nama').value.trim();
    const telepon = document.getElementById('telepon').value.trim();
    if(!nama || !telepon){
        alert('Nama dan Telepon wajib diisi!');
        return;
    }
    const newRegistrant = {id: Date.now(), nama, telepon, tanggal: new Date().toLocaleString()};
    registrants.unshift(newRegistrant);
    localStorage.setItem('basketRegistrants', JSON.stringify(registrants));

    // Show success
    document.getElementById('successMessage').style.display = 'block';
    this.reset();
    setTimeout(()=>{document.getElementById('successMessage').style.display='none';}, 4000);
});

// Admin login
function showAdminLogin(){document.getElementById('adminModal').style.display='block';}
function closeAdminLogin(){document.getElementById('adminModal').style.display='none';}
function closeAdminPanel(){document.getElementById('adminPanel').style.display='none';}

document.getElementById('adminForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    if(password === ADMIN_PASSWORD){
        closeAdminLogin();
        document.getElementById('adminPanel').style.display='block';
        loadRegistrantsTable();
    } else alert('❌ Password salah!');
});

// Load registrants table
function loadRegistrantsTable(){
    const tbody = document.getElementById('registrantsTableBody');
    tbody.innerHTML='';
    registrants.forEach((reg,index)=>{
        const row = tbody.insertRow();
        row.innerHTML=`<td>${index+1}</td><td>${reg.nama}</td><td>${reg.telepon}</td><td>${reg.tanggal}</td>
        <td><button onclick="deleteRegistrant(${reg.id})" style="background:#e74c3c; color:#fff; border:none; border-radius:5px; padding:4px 8px; cursor:pointer;"><i class="fas fa-trash"></i></button></td>`;
    });
}

// Search
function searchRegistrants(){
    const input = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('#registrantsTableBody tr').forEach(row=>{
        row.style.display = row.cells[1].textContent.toLowerCase().includes(input) ? '' : 'none';
    });
}

// Delete
function deleteRegistrant(id){
    if(confirm('Hapus data ini?')){
        registrants = registrants.filter(r=>r.id!==id);
        localStorage.setItem('basketRegistrants', JSON.stringify(registrants));
        loadRegistrantsTable();
    }
}

// Clear all
function clearAllData(){
    if(confirm('HAPUS SEMUA DATA?')){
        registrants=[];
        localStorage.removeItem('basketRegistrants');
        loadRegistrantsTable();
    }
}