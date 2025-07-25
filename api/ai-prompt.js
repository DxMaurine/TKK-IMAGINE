// AI Prompt Generator untuk TKK-IMAGINE

// Token API disimpan sebagai konstanta
// AI Prompt Generator untuk TKK-IMAGINE

// Token API disimpan dengan cara yang lebih aman
// Token API disimpan dengan cara yang lebih aman untuk Vercel
const API_TOKEN = (function() {
    // Cek apakah berjalan di browser atau di Vercel
    if (typeof process !== 'undefined' && process.env && process.env.POLLINATIONS_API_TOKEN) {
        return process.env.POLLINATIONS_API_TOKEN;
    }
    // Fallback untuk pengembangan lokal
    return ;
})();

// Daftar kategori untuk prompt acak
const promptCategories = [
    "pemandangan alam",
    "potret karakter fantasi",
    "hewan mitologi",
    "kota futuristik",
    "makanan eksotis",
    "dunia bawah laut",
    "ruang angkasa",
    "robot dan cyborg",
    "arsitektur unik",
    "karakter anime",
    "monster dan makhluk",
    "dunia post-apocalyptic",
    "steampunk",
    "cyberpunk",
    "dunia mimpi",
    "surealisme"
];

// Daftar gaya seni untuk variasi
const aiPromptArtStyles = [
    "fotorealistik",
    "lukisan minyak",
    "watercolor",
    "digital art",
    "pixel art",
    "ukiyo-e",
    "impressionism",
    "pop art",
    "concept art",
    "3D render",
    "anime",
    "manga",
    "comic book",
    "graffiti",
    "minimalist",
    "abstract"
];

// Fungsi untuk menghasilkan prompt otomatis dari AI dengan nama yang berbeda
async function aiPromptGenerator() {
    const aiPromptBtn = document.getElementById('aiPromptBtn');
    const promptInput = document.getElementById('promptInput');
    
    // Tampilkan status loading
    aiPromptBtn.classList.add('loading');
    aiPromptBtn.innerHTML = '<i class="fas fa-spinner"></i>';
    
    try {
        // Pilih kategori dan gaya acak untuk memastikan variasi
        const randomCategory = promptCategories[Math.floor(Math.random() * promptCategories.length)];
        const randomStyle = aiPromptArtStyles[Math.floor(Math.random() * aiPromptArtStyles.length)];
        const randomSeed = Math.floor(Math.random() * 10000);
        
        // Data untuk dikirim ke API dengan variasi di setiap permintaan
        const data = {
            messages: [
                {
                    role: "system",
                    content: `Kamu adalah asisten yang membantu membuat prompt untuk generator gambar AI. Buatkan prompt acak yang kreatif dan detail tentang ${randomCategory} dengan gaya ${randomStyle}. Prompt harus kompatibel dengan model flux, gptimage, dan turbo. Jangan berikan penjelasan atau respon, langsung berikan promptnya saja. Buat prompt yang berbeda dan unik.`
                },
                {
                    role: "user",
                    content: `Buatkan prompt acak untuk generator gambar AI tentang ${randomCategory} dengan gaya ${randomStyle}. Prompt harus detail dan kreatif. Seed: ${randomSeed}`
                }
            ]
        };
        
        // Konfigurasi untuk fetch API
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        
        // Tambahkan parameter acak ke URL untuk menghindari caching
        const timestamp = new Date().getTime();
        const apiUrl = `https://text.pollinations.ai/openai?token=${API_TOKEN}&random=${timestamp}&seed=${randomSeed}`;
        const response = await fetch(apiUrl, options);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Ambil teks prompt dari respons
        const generatedPrompt = result.choices[0].message.content;
        
        // Masukkan prompt ke textarea
        promptInput.value = generatedPrompt;
        
        // Update preview prompt jika fungsi tersedia
        if (typeof updateFinalPromptPreview === 'function') {
            updateFinalPromptPreview();
        }
        
        // Tampilkan notifikasi sukses
        if (typeof globalNotif !== 'undefined' && globalNotif.success) {
            globalNotif.success("Prompt AI berhasil dibuat!");
        }
        
    } catch (error) {
        console.error('Error generating AI prompt:', error);
        
        if (typeof globalNotif !== 'undefined' && globalNotif.error) {
            globalNotif.error("Gagal membuat prompt AI. Silakan coba lagi.");
        } else {
            alert("Gagal membuat prompt AI. Silakan coba lagi.");
        }
    } finally {
        // Kembalikan tombol ke keadaan semula
        aiPromptBtn.classList.remove('loading');
        aiPromptBtn.innerHTML = '<i class="fas fa-lightbulb"></i>';
    }
}

// Inisialisasi tombol saat dokumen dimuat
document.addEventListener("DOMContentLoaded", () => {
    // Tambahkan event listener untuk tombol AI prompt
    const aiPromptBtn = document.getElementById('aiPromptBtn');
    if (aiPromptBtn) {
        // Hapus event listener yang mungkin sudah ada
        aiPromptBtn.removeEventListener('click', generateAiPrompt);
        // Tambahkan event listener baru dengan fungsi yang sudah diubah namanya
        aiPromptBtn.addEventListener('click', aiPromptGenerator);
    }
});
