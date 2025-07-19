// Fungsi popup preview sederhana dengan tombol download dan edit
function showImagePreviewPopup(imageUrl, prompt = '') {
    // Hapus popup sebelumnya jika ada
    const oldPopup = document.getElementById('image-preview-popup');
    if (oldPopup) oldPopup.remove();

    // Buat popup baru
    const popup = document.createElement('div');
    popup.id = 'image-preview-popup';
    popup.className = 'image-preview-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-header">
                <h3>Preview Gambar</h3>
                <button class="close-btn" onclick="closeImagePreviewPopup()">&times;</button>
            </div>
            <div class="popup-body">
                <img src="${imageUrl}" alt="Preview Image" class="preview-image">
                <div class="image-info">
                    <p class="prompt-text">${prompt || 'Tidak ada deskripsi'}</p>
                </div>
            </div>
            <div class="popup-actions">
                <button class="action-btn download-btn" onclick="downloadImageFromPopup('${imageUrl}')">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="action-btn edit-btn" onclick="editImageFromPopup('${imageUrl}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </div>
        </div>
        <div class="popup-overlay" onclick="closeImagePreviewPopup()"></div>
    `;
    
    document.body.appendChild(popup);
    
    // Tampilkan popup dengan animasi
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
    
    // Disable scroll pada body
    document.body.style.overflow = 'hidden';
}

// Fungsi untuk menutup popup
function closeImagePreviewPopup() {
    const popup = document.getElementById('image-preview-popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Fungsi download dari popup
function downloadImageFromPopup(imageUrl) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `tkk-image-${Date.now()}.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Tampilkan notifikasi
    if (typeof globalNotif !== 'undefined') {
        globalNotif.success('Gambar berhasil diunduh!');
    }
}

// Fungsi edit dari popup (menggunakan fungsi previewHistoryImage yang sudah ada)
function editImageFromPopup(imageUrl) {
    // Tutup popup preview terlebih dahulu
    closeImagePreviewPopup();
    
    // Buka editor dengan fungsi yang sudah ada
    if (typeof previewHistoryImage === 'function') {
        previewHistoryImage(imageUrl);
    } else {
        console.error('Fungsi previewHistoryImage tidak ditemukan');
        if (typeof globalNotif !== 'undefined') {
            globalNotif.error('Fitur edit tidak tersedia');
        }
    }
}