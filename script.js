function validateAccess() {
    const accessKey = document.getElementById('accessKey').value;
    const correctKey = "12345"; // Ganti dengan akses key rahasia kamu

    if (accessKey === correctKey) {
        alert("Akses diterima!");
        window.location.href = "index.html"; // Redirect ke halaman utama
    } else {
        alert("Akses key salah!");
    }
}
