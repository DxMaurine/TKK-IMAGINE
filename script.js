function validateAccess() {
    const accessKey = document.getElementById('accessKey').value;
    const correctKey = "20250505"; // Ganti dengan akses key rahasia kamu

    if (accessKey === correctKey) {
        alert("Akses diterima!");
        sessionStorage.setItem("accessKey", accessKey); // Simpan akses key di sessionStorage
        window.location.href = "index.html"; // Redirect ke halaman utama
    } else {
        alert("Akses key salah!");
    }
}


