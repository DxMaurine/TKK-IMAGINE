// Variabel global yang digunakan di seluruh aplikasi
let isGenerating = false;
let originalPrompt = "";
let currentImageUrls = [];
let generationCount = 0;
let selectedStyle = null;
let selectedFilter = null;
let selectedCyberpunkStyle = null;


// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Initialize theme
  setInitialTheme();
  
});
 
        // Periksa apakah accessKey ada di sessionStorage
        //const accessKey = sessionStorage.getItem("accessKey");
        
        // Jika TIDAK ada (!accessKey), redirect ke login.html
        //if (!accessKey) {
            //window.location.href = "login.html";
        //}

       
function toggleAccordion(button) {
    const item = button.closest('.accordion-item');
    const isActive = item.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}



   
    
    // Fungsi untuk menghasilkan prompt otomatis dari AI
    async function generateAiPrompt() {
        const aiPromptBtn = document.getElementById('aiPromptBtn');
        const promptInput = document.getElementById('promptInput');
        
        // Tampilkan status loading
        aiPromptBtn.classList.add('loading');
        aiPromptBtn.innerHTML = '<i class="fas fa-spinner"></i>';
        
        try {
            // Data untuk dikirim ke API
            const data = {
                messages: [
                    {
                        role: "system",
                        content: "Kamu adalah asisten yang membantu membuat prompt untuk generator gambar AI. Buatkan prompt acak yang kreatif dan detail. Prompt harus kompatibel dengan model flux, gptimage, dan turbo. Jangan berikan penjelasan atau respon, langsung berikan promptnya saja."
                    },
                    {
                        role: "user",
                        content: "Buatkan prompt acak untuk generator gambar AI. Prompt harus detail dan kreatif."
                    }
                ]
            };
            
            // Konfigurasi untuk fetch API
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer IU6OBB-pF3hKZVWC'
                },
                body: JSON.stringify(data)
            };
            
            // Panggil API
            const response = await fetch('https://text.pollinations.ai/openai', options);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            const result = await response.json();
            
            // Ambil teks prompt dari respons
            const generatedPrompt = result.choices[0].message.content;
            
            // Masukkan prompt ke textarea
            promptInput.value = generatedPrompt;
            
            // Update preview prompt
            updateFinalPromptPreview();
            
            // Tampilkan notifikasi sukses
            globalNotif.success("Prompt AI berhasil dibuat!");
            
        } catch (error) {
            console.error('Error generating AI prompt:', error);
            globalNotif.error("Gagal membuat prompt AI. Silakan coba lagi.");
        } finally {
            // Kembalikan tombol ke keadaan semula
            aiPromptBtn.classList.remove('loading');
            aiPromptBtn.innerHTML = '<i class="fas fa-lightbulb"></i>';
        }
    }
    
    // Art style list (60 items)
    const artStyles = [
      "Photorealistic", "Abstract", "Impressionist", "Surrealism", "Minimalist",
      "Pop Art", "Cubism", "Pixel Art", "Anime", "Comic Book",
      "Watercolor", "Oil Painting", "Charcoal", "Pencil Sketch", "Digital Art",
      "Vaporwave", "Steampunk", "Cyberpunk", "Art Nouveau", "Art Deco",
      "Gothic", "Renaissance", "Baroque", "Expressionism", "Futurism",
      "Folk Art", "Cartoon", "3D Rendering", "Pointillism", "Graffiti",
      "Ukiyo-e", "Fauvist", "Dadaism", "Hyperrealism", "Low Poly",
      "Bauhaus", "Rococo", "Neoclassicism", "Mannerism", "Romanticism",
      "Naive Art", "Constructivism", "De Stijl", "Art Brut", "Suprematism",
      "Primitivism", "Tonalism", "Tachisme", "Precisionism", "Color Field",
      "Neo-Expressionism", "Brutalism", "Memphis Design", "Hard Edge", "CoBrA",
      "Shin-hanga", "Neo-Byzantine", "Symbolism", "Classicism", "Naturalism"
    ];
    
    // Camera filter effects (60 items total)
      const cameraFilters = [
        "Vintage", "Noir", "Sepia", "Vivid", "HDR",
        "Blur", "Vignette", "High Contrast", "Low Contrast", "Saturation",
        "Desaturation", "Retro", "Film Grain", "Dreamy", "Infrared",
        "Polaroid", "Dramatic", "Soft Focus", "Tilt-Shift", "Bokeh",
        "Cinematic", "Cross Process", "Negative", "Solarize", "Fisheye",
        "Glitch", "Mosaic", "Double Exposure", "Holga", "Lomo",

        // Tambahan baru
        "Black and White", "Lens Flare", "Color Splash", "Pastel", "Split Tone",
        "Duotone", "Technicolor", "Night Vision", "Thermal Vision", "VHS",
        "Sketch", "Cartoon", "Emboss", "Oil Paint", "Halftone",
        "Motion Blur", "Radial Blur", "Zoom Blur", "Grunge", "Matrix Effect",
        "Cyber Glow", "Neon Pulse", "Digital Noise", "CRT", "Pixel Stretch",
        "Glowing Edges", "Chromatic Aberration", "InfraGlow", "Depth Map", "Anime Glow"
      ];

    
    // Cyberpunk creator styles (50 items)
    
    const cyberpunkCreatorStyles = [
      "Akira Inspired", "Blade Runner Style", "Ghost in the Shell", "Neuromancer Vibes", "Cybernetic Enhanced",
      "Neon Dystopia", "Neo-Tokyo", "Digital Wasteland", "Technoir", "Cyborg Fusion",
      "Neoteric Punk", "Cyber Brutalism", "Synthetic Future", "Holographic Interface", "Megacorp Aesthetic",
      "Cybernetic Implants", "Vaporwave Cyberpunk", "Retrofuturistic Tech", "Glitch Matrix", "Cyberwire",
      "Transhumanist", "Electropunk", "Digital Decay", "Cyber Noir", "Electric Dreams",
      "Chrome and Neon", "Biotech Evolution", "Cyberspace Realm", "Neural Networks", "Digital Urban",
      "Dystopian Metropolis", "Megacity Sprawl", "Tech Noir Film", "Neon Rain", "Android Future",
      "VR Cyberpunk", "Hacktivist Aesthetic", "Cyber Outrun", "Technophile", "Wetware Style",
      "Dark Synthwave", "Hypertech", "Data Confluence", "Cybercrime Scene", "Neurolink Aesthetic",
      "Cyber Rebellion", "AI Sentience", "Post-Cyberpunk", "High-Tech Low-Life", "Synthetic Replicant"
    ];
    
    //bukatombol reset

        function bukaPopupReset() {
        document.getElementById("popupReset").style.display = "flex";
        }

        function konfirmasiReset(setuju) {
        document.getElementById("popupReset").style.display = "none";
        if (setuju) {
            resetSemuaInput(); // panggil fungsi reset
        }
        }



    // resetAll

        function resetSemuaInput() {
        // Reset semua <textarea> dan <input type="text">
        document.querySelectorAll('textarea, input[type="text"]').forEach(el => {
            el.value = '';
        });

        // Reset semua <div contenteditable>
        document.querySelectorAll('[contenteditable="true"]').forEach(el => {
            el.innerText = '';
        });

        // Reset semua <select> (dropdown)
        document.querySelectorAll('select').forEach(el => {
            el.selectedIndex = 0;
        });

        // Reset semua checkbox & radio button
        document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => {
            el.checked = false;
        });

        // Hapus semua isi dari .image-grid (kosongkan gambar)
        document.querySelectorAll('.image-container').forEach(container => {
        const message = container.querySelector('.initialMessage');
        if (message) message.hidden = false;

        const img = container.querySelector('img.resultImage');
         if (img) {
        img.src = "";
        img.hidden = true;
        }

        container.querySelectorAll('.close, .statusMessage, .regenerate-style-btn, .download-image-btn').forEach(el => {
        el.hidden = true;
      });
    });



        // Reset final prompt preview kalau ada
        const preview = document.getElementById("finalPromptDisplay");
        if (preview) {
            preview.innerText = 'Prompt Anda akan muncul di sini...';
        }

        globalNotif.success("Semua pengaturan berhasil direset!");
        }

    
    
    
    // fungsi copy paste
    
      function copyFinalPrompt() {
      const promptText = document.getElementById("finalPromptDisplay").innerText;
      navigator.clipboard.writeText(promptText)
        .then(() => {
          globalNotif.success("Prompt berhasil disalin!");
        })
        .catch(err => {
          console.error("Gagal menyalin teks:", err);
          globalNotif.error("Gagal menyalin teks!");
        });
    }
    // fungsi paste
        function pasteFinalPrompt() {
            navigator.clipboard.readText()
            .then(text => {
            const textarea = document.getElementById("promptInput");
            if (!textarea) return;

            // Tempelkan teks ke posisi kursor, atau ganti seluruh isi jika tidak ada posisi kursor
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const before = textarea.value.substring(0, start);
            const after = textarea.value.substring(end);

            textarea.value = before + text + after;
            document.getElementById("finalPromptDisplay").innerText = textarea.value;

            // Atur kursor ke akhir teks yang dipaste
            const newPos = start + text.length;
            textarea.setSelectionRange(newPos, newPos);
            textarea.focus();

            globalNotif.success("Prompt berhasil ditempel!");
            })
            .catch(err => {
            console.error("Gagal menempelkan teks:", err);
            globalNotif.error("Gagal menempelkan teks. Periksa izin clipboard.");
            });
        }

    
    // Theme switching
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Set the theme from localStorage or default
    function setInitialTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }
    
    // Initialize page elements
    document.addEventListener("DOMContentLoaded", () => {
      // Set initial theme
      setInitialTheme();
      
      // Add event listener to theme switch
      const themeSwitch = document.getElementById("themeSwitch");
      themeSwitch.addEventListener("click", toggleTheme);
      
      // Populate cyberpunk style select dropdown
      const cyberpunkStyleSelect = document.getElementById("cyberpunkStyleSelect");
      cyberpunkCreatorStyles.forEach(style => {
        const option = document.createElement("option");
        option.value = style;
        option.textContent = style;
        cyberpunkStyleSelect.appendChild(option);
      });
      
      // Populate art style select dropdown
      const artStyleSelect = document.getElementById("artStyleSelect");
      artStyles.forEach(style => {
        const option = document.createElement("option");
        option.value = style;
        option.textContent = style;
        artStyleSelect.appendChild(option);
      });
      
      // Populate camera effects select dropdown
      const cameraEffectSelect = document.getElementById("cameraEffectSelect");
      cameraFilters.forEach(filter => {
        const option = document.createElement("option");
        option.value = filter;
        option.textContent = filter;
        cameraEffectSelect.appendChild(option);
      });
      
      // Add event listener to prompt input to update the preview
      const promptInput = document.getElementById("promptInput");
      promptInput.addEventListener("input", updateFinalPromptPreview);
      
      // Initialize the prompt preview
      updateFinalPromptPreview();
      
      // Load image history
      loadImageHistory();
      
    });
    
    // Select cyberpunk creator style from dropdown
    function selectCyberpunkStyle(selectEl) {
      // Get selected style
      const style = selectEl.value;
      
      // If no style is selected (first option)
      if (!style) {
        selectedCyberpunkStyle = null;
      } else {
        selectedCyberpunkStyle = style;
        // Show notification that style was selected
        showNotification(`Gaya cyberpunk "${style}" dipilih`);
      }
      
      // Update the prompt preview
      updateFinalPromptPreview();
    }
    
    // Select art style from dropdown
    function selectArtStyle(selectEl) {
      // Get selected style
      const style = selectEl.value;
      
      // If no style is selected (first option)
      if (!style) {
        selectedStyle = null;
      } else {
        selectedStyle = style;
        // Show notification that style was selected
        showNotification(`Gaya "${style}" dipilih`);
      }
      
      // Update the prompt preview
      updateFinalPromptPreview();
    }
    
    // Select camera effect from dropdown
    function selectCameraEffect(selectEl) {
      // Get selected filter
      const filter = selectEl.value;
      
      // If no filter is selected (first option)
      if (!filter) {
        selectedFilter = null;
      } else {
        selectedFilter = filter;
        // Show notification that filter was selected
        showNotification(`Efek "${filter}" ditambahkan ke prompt Anda`);
      }
      
      // Update the prompt preview
      updateFinalPromptPreview();
    }
    // fungsi hapus
    function hapusText() {
        // Kosongkan textarea
        document.getElementById("promptInput").value = "";
    
        // Kosongkan preview prompt akhir
        document.getElementById("finalPromptDisplay").textContent = "Prompt Anda akan muncul di sini...";
      }
    
    // Select filter option
    function selectOption(element, type, value) {
      // Remove selection from all items of the same type
      const selector = ".filter-item";
      document.querySelectorAll(selector).forEach(item => {
        item.classList.remove("selected");
      });
      
      // If clicking on already selected item, deselect it
      if (element.classList.contains("selected")) {
        element.classList.remove("selected");
        selectedFilter = null;
      } else {
        // Add selection to clicked item
        element.classList.add("selected");
        
        // Save the selected value
        selectedFilter = value;
        // Show a brief notification that the effect was added
        showNotification(`Efek "${value}" ditambahkan ke prompt Anda`);
      }
      
      // Update the prompt preview to show the user what their final prompt will look like
      updateFinalPromptPreview();
    }
    
    // Function to update the final prompt preview
    function updateFinalPromptPreview() {
      const promptInput = document.getElementById("promptInput");
      const finalPromptDisplay = document.getElementById("finalPromptDisplay");
      
      const prompt = promptInput.value.trim();
      let fullPrompt = prompt;
      
      // Add cyberpunk style at the beginning if selected
      if (selectedCyberpunkStyle) {
        fullPrompt = `${selectedCyberpunkStyle}, ${fullPrompt}`;
      }
      
      if (selectedStyle) {
        fullPrompt += `, ${selectedStyle} style`;
      }
      
      if (selectedFilter) {
        fullPrompt += `, ${selectedFilter} filter`;
      }
      
      if (fullPrompt) {
        // Highlight the cyberpunk style part if it exists
        if (selectedCyberpunkStyle) {
          const parts = fullPrompt.split(`${selectedCyberpunkStyle}, `);
          fullPrompt = `<span class="camera-effect-highlight">${selectedCyberpunkStyle},</span> ${parts[1]}`;
        }
        
        // Highlight the camera effect part if it exists
        if (selectedFilter) {
          const filterText = `, ${selectedFilter} filter`;
          if (fullPrompt.includes(filterText)) {
            fullPrompt = fullPrompt.replace(filterText, 
              `<span class="camera-effect-highlight">${filterText}</span>`);
          }
        }
        
        // Highlight the art style part if it exists
        if (selectedStyle) {
          const styleText = `, ${selectedStyle} style`;
          if (fullPrompt.includes(styleText)) {
            fullPrompt = fullPrompt.replace(styleText, 
              `<span class="camera-effect-highlight">${styleText}</span>`);
          }
        }
        
        finalPromptDisplay.innerHTML = fullPrompt;
      } else {
        finalPromptDisplay.textContent = "Prompt Anda akan muncul di sini...";
      }
    }
    
    // Sistem notifikasi global
    const globalNotif = {
        container: null,
        notifCount: 0,
        maxNotifs: 5,
        
        // Inisialisasi sistem notifikasi
        init: function() {
            this.container = document.getElementById('globalNotifContainer');
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.id = 'globalNotifContainer';
                document.body.appendChild(this.container);
            }
        },
        
        // Tampilkan notifikasi
        show: function(message, type = 'info', duration = 3000, isStatusMessage = false, statusElement = null) {
            // Inisialisasi container jika belum
            if (!this.container) this.init();
            
            // Batasi jumlah notifikasi yang ditampilkan
            if (this.container.children.length >= this.maxNotifs) {
                this.container.removeChild(this.container.firstChild);
            }
            
            // Buat elemen notifikasi
            const notifId = 'notif-' + (++this.notifCount);
            const notif = document.createElement('div');
            notif.id = notifId;
            notif.className = `global-notif ${type}`;
            
            // Isi konten notifikasi
            const content = document.createElement('div');
            content.className = 'global-notif-content';
            content.textContent = message;
            
            // Tombol tutup
            const closeBtn = document.createElement('button');
            closeBtn.className = 'global-notif-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = () => this.close(notifId);
            
            // Progress bar
            const progress = document.createElement('div');
            progress.className = 'global-notif-progress';
            progress.style.animationDuration = (duration / 1000) + 's';
            
            // Gabungkan elemen-elemen
            notif.appendChild(content);
            notif.appendChild(closeBtn);
            notif.appendChild(progress);
            
            // Tambahkan ke container
            this.container.appendChild(notif);
            
            // Animasi masuk
            setTimeout(() => notif.classList.add('show'), 10);
            
            // Update status message jika diperlukan
            if (isStatusMessage && statusElement) {
                statusElement.textContent = message;
                statusElement.hidden = false;
            }
            
            // Hapus notifikasi setelah durasi tertentu
            if (duration > 0) {
                setTimeout(() => {
                    if (document.getElementById(notifId)) {
                        this.close(notifId);
                    }
                }, duration);
            }
            
            return notifId;
        },
        
        // Tutup notifikasi
        close: function(notifId) {
            const notif = document.getElementById(notifId);
            if (notif) {
                notif.classList.remove('show');
                setTimeout(() => {
                    if (notif.parentNode) {
                        notif.parentNode.removeChild(notif);
                    }
                }, 300);
            }
        },
        
        // Tampilkan notifikasi sukses
        success: function(message, duration = 3000, isStatusMessage = false, statusElement = null) {
            return this.show(message, 'success', duration, isStatusMessage, statusElement);
        },
        
        // Tampilkan notifikasi error
        error: function(message, duration = 4000, isStatusMessage = false, statusElement = null) {
            return this.show(message, 'error', duration, isStatusMessage, statusElement);
        },
        
        // Tampilkan notifikasi info
        info: function(message, duration = 3000, isStatusMessage = false, statusElement = null) {
            return this.show(message, 'info', duration, isStatusMessage, statusElement);
        },
        
        // Tampilkan notifikasi warning
        warning: function(message, duration = 3500, isStatusMessage = false, statusElement = null) {
            return this.show(message, 'warning', duration, isStatusMessage, statusElement);
        }
    };
    
    // Fungsi showNotification yang lama, sekarang menggunakan sistem baru
    function showNotification(message) {
        globalNotif.info(message);
    }
    
    // Event emitter function to update generation status
    function updateStatus(statusData, containerIndex) {
      const statusMessage = document.querySelectorAll(".statusMessage")[containerIndex];
      
      if (statusData.data.description) {
        statusMessage.textContent = statusData.data.description;
        statusMessage.hidden = false;
        // Hapus notifikasi global di sini, hanya tampilkan teks di status message
        // globalNotif.info(statusData.data.description, 2000, true, statusMessage);
      }
      
      if (statusData.data.done) {
        setTimeout(() => {
          statusMessage.hidden = true;
        }, 3000);
      }
    }
    
    // Function to encode URI component properly
    function encodeURIComponentSafe(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
      });
    }
    
   // Fungsi untuk mendapatkan IP pengguna (untuk identifikasi penyimpanan)
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Gagal mendapatkan IP:", error);
        return "unknown"; // Fallback jika gagal mendapatkan IP
    }
}

// Fungsi untuk menyimpan gambar ke history
async function saveImageToHistory(imageUrl, prompt) {
    try {
        // Dapatkan IP pengguna untuk identifikasi
        const userIP = await getUserIP();
        
        // Ambil history yang sudah ada
        let imageHistory = JSON.parse(localStorage.getItem(`imageHistory_${userIP}`)) || [];
        
        // Tambahkan gambar baru ke history
        const timestamp = new Date().getTime();
        imageHistory.push({
            url: imageUrl,
            prompt: prompt || "Tidak ada deskripsi",
            timestamp: timestamp
        });
        
        // Hapus gambar yang lebih dari 24 jam
        const oneDayAgo = timestamp - (24 * 60 * 60 * 1000);
        imageHistory = imageHistory.filter(item => item.timestamp >= oneDayAgo);
        
        // Simpan kembali ke localStorage
        localStorage.setItem(`imageHistory_${userIP}`, JSON.stringify(imageHistory));
        
        // Perbarui tampilan history
        loadImageHistory();
    } catch (error) {
        console.error("Gagal menyimpan gambar ke history:", error);
        globalNotif.error("Gagal menyimpan gambar ke history");
    }
}

// Fungsi untuk memuat dan menampilkan history gambar
async function loadImageHistory() {
    try {
        const userIP = await getUserIP();
        const imageHistory = JSON.parse(localStorage.getItem(`imageHistory_${userIP}`)) || [];
        const historyGrid = document.getElementById('historyGrid');
        
        // Kosongkan grid sebelum menambahkan item baru
        historyGrid.innerHTML = '';
        
        // Tampilkan pesan jika tidak ada history
        if (imageHistory.length === 0) {
            historyGrid.innerHTML = '<p class="no-history">Belum ada gambar dalam history</p>';
            return;
        }
        
        // Urutkan history dari yang terbaru
        imageHistory.sort((a, b) => b.timestamp - a.timestamp);
        
        // Tambahkan setiap gambar ke grid
        imageHistory.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            // Buat thumbnail gambar
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.prompt;
            img.title = item.prompt;
            img.onclick = () => previewHistoryImage(item.url, item.prompt);
            
            // Buat tombol hapus
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '×';
            deleteBtn.title = 'Hapus dari history';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                deleteHistoryItem(index);
            };
            
            // Tambahkan elemen ke item history
            historyItem.appendChild(img);
            historyItem.appendChild(deleteBtn);
            
            // Tambahkan item ke grid
            historyGrid.appendChild(historyItem);
        });
    } catch (error) {
        console.error("Gagal memuat history gambar:", error);
        globalNotif.error("Gagal memuat history gambar");
    }
}

// Fungsi untuk menghapus item dari history
async function deleteHistoryItem(index) {
    try {
        const userIP = await getUserIP();
        let imageHistory = JSON.parse(localStorage.getItem(`imageHistory_${userIP}`)) || [];
        
        // Hapus item dengan index tertentu
        imageHistory.splice(index, 1);
        
        // Simpan kembali ke localStorage
        localStorage.setItem(`imageHistory_${userIP}`, JSON.stringify(imageHistory));
        
        // Perbarui tampilan
        loadImageHistory();
        globalNotif.success("Gambar berhasil dihapus dari history");
    } catch (error) {
        console.error("Gagal menghapus item history:", error);
        globalNotif.error("Gagal menghapus gambar dari history");
    }
}

// Fungsi untuk menghapus semua history
async function clearHistory() {
    try {
        const userIP = await getUserIP();
        localStorage.removeItem(`imageHistory_${userIP}`);
        loadImageHistory();
        globalNotif.success("History gambar berhasil dihapus");
    } catch (error) {
        console.error("Gagal menghapus history:", error);
        globalNotif.error("Gagal menghapus history gambar");
    }
}

// Fungsi untuk mengunduh semua gambar dari history
async function downloadHistory() {
    try {
        const userIP = await getUserIP();
        const imageHistory = JSON.parse(localStorage.getItem(`imageHistory_${userIP}`)) || [];
        
        if (imageHistory.length === 0) {
            globalNotif.warning("Tidak ada gambar dalam history untuk diunduh");
            return;
        }
        
        globalNotif.info("Mempersiapkan unduhan gambar...");
        
        // Unduh setiap gambar secara berurutan
        for (let i = 0; i < imageHistory.length; i++) {
            const item = imageHistory[i];
            
            // Buat elemen link untuk mengunduh
            const link = document.createElement('a');
            
            try {
                // Coba unduh sebagai blob
                const response = await fetch(item.url);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                
                link.href = url;
                link.download = `ai-image-${new Date(item.timestamp).toISOString().slice(0, 10)}-${i+1}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (fetchError) {
                console.error("Gagal mengunduh gambar:", fetchError);
                // Fallback: gunakan URL langsung
                link.href = item.url;
                link.download = `ai-image-${new Date(item.timestamp).toISOString().slice(0, 10)}-${i+1}.png`;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            
            // Delay antar unduhan
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        globalNotif.success("Semua gambar history berhasil diunduh!");
    } catch (error) {
        console.error("Gagal mengunduh history:", error);
        globalNotif.error("Gagal mengunduh beberapa gambar dari history");
    }
}


// Fungsi untuk preview gambar yang diperbaiki
function previewImage(imgElement) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  
  if (!modal || !modalImg) {
    console.error('Modal elements not found');
    return;
  }
  
  // Simpan URL gambar di localStorage untuk digunakan oleh fungsi download dan share
  localStorage.setItem('currentPreviewImageUrl', imgElement.src);
  
  modalImg.src = imgElement.src;
  modal.style.display = 'block';
  
  // Nonaktifkan scroll pada body saat modal terbuka
  document.body.style.overflow = 'hidden';
}

// Fungsi untuk download gambar dari modal
function downloadModalImage() {
  // Dapatkan URL gambar dari modal langsung, bukan dari localStorage
  const modalImg = document.getElementById('modalImage');
  const imageUrl = modalImg.src;
  
  if (!imageUrl || imageUrl === '') {
    globalNotif.error('Tidak ada gambar untuk diunduh');
    return;
  }
  
  // Tampilkan notifikasi proses
  globalNotif.info('Mempersiapkan unduhan...');
  
  // Metode 1: Gunakan FileSaver.js (metode paling kompatibel)
  try {
    // Buat elemen canvas untuk mengkonversi gambar
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Buat gambar baru untuk mendapatkan dimensi yang benar
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Penting untuk CORS
    
    img.onload = function() {
      // Set ukuran canvas sesuai gambar
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Gambar ke canvas
      ctx.drawImage(img, 0, 0);
      
      // Konversi ke blob dan download
      canvas.toBlob(function(blob) {
        // Buat nama file
        const fileName = 'tkk-imagen-' + new Date().getTime() + '.png';
        
        // Buat link download
        const link = document.createElement('a');
        link.download = fileName;
        link.href = URL.createObjectURL(blob);
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Klik link untuk download
        link.click();
        
        // Bersihkan
        setTimeout(function() {
          URL.revokeObjectURL(link.href);
          document.body.removeChild(link);
          globalNotif.success('Gambar berhasil diunduh!');
        }, 100);
      }, 'image/png');
    };
    
    img.onerror = function() {
      console.error('Error loading image for download');
      globalNotif.error('Gagal memuat gambar untuk diunduh');
      
      // Coba metode fallback
      downloadWithFallback(imageUrl);
    };
    
    // Mulai proses dengan memuat gambar
    img.src = imageUrl;
    
  } catch (error) {
    console.error('Error in canvas download method:', error);
    // Coba metode fallback
    downloadWithFallback(imageUrl);
  }
}

// Fungsi fallback untuk download
function downloadWithFallback(imageUrl) {
  try {
    // Metode 2: Fallback ke metode tradisional
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'tkk-imagen-' + new Date().getTime() + '.png';
    link.target = '_self'; // Penting: gunakan _self bukan _blank
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    globalNotif.success('Gambar berhasil diunduh dengan metode alternatif!');
  } catch (fallbackError) {
    console.error('Fallback download failed:', fallbackError);
    globalNotif.error('Gagal mengunduh gambar. Coba cara lain.');
  }
}


// Fungsi untuk berbagi gambar ke media sosial
function shareImage(platform) {
  const imageUrl = localStorage.getItem('currentPreviewImageUrl');
  if (!imageUrl) {
    showGlobalNotif('Tidak ada gambar untuk dibagikan', 'error');
    return;
  }
  
  let shareUrl = '';
  const text = encodeURIComponent('Gambar yang dibuat dengan TKK IMAGEN');
  
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}&quote=${text}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(imageUrl)}`;
      break;
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${text} ${encodeURIComponent(imageUrl)}`;
      break;
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${encodeURIComponent(imageUrl)}&text=${text}`;
      break;
    default:
      showGlobalNotif('Platform tidak didukung', 'error');
      return;
  }
  
  // Buka jendela baru untuk berbagi
  window.open(shareUrl, '_blank', 'width=600,height=400');
  showGlobalNotif(`Membagikan ke ${platform}`, 'info');
}



// Generate AI image using Pollinations API
async function generateAiImage() {
    if (isGenerating) return;
    
    const promptInput = document.getElementById("promptInput");
    const modelSelect = document.getElementById("modelSelect");
    const formatSelect = document.getElementById("formatSelect");
    const enhanceCheck = document.getElementById("enhanceCheck");
    const downloadAllBtn = document.getElementById("downloadAllBtn");
    const addContainerBtn = document.getElementById("addContainerBtn");
    const generateBtn = document.getElementById("generateBtn");
    const genCount = document.getElementById("genCount");
    
    const prompt = promptInput.value.trim();
    if (!prompt) {
        globalNotif.warning("Silakan masukkan deskripsi untuk gambar Anda");
        return;
    }
    
    // Store the original prompt for regeneration
    originalPrompt = prompt;
    
    // Update UI to loading state
    isGenerating = true;
    generateBtn.disabled = true;
    generateBtn.textContent = "Menghasilkan...";
    
    // Reset current image URLs
    currentImageUrls = [];
    
    // Hide download button while generating
    downloadAllBtn.hidden = true;
    
    // Hanya memproses container yang terlihat di DOM
    const containers = document.querySelectorAll('.image-container');
    const containerCount = containers.length;
    
    // Persiapkan semua container yang ada
    for (let i = 0; i < containerCount; i++) {
        const resultImageContainer = document.getElementById(`resultImageContainer${i}`);
        if (!resultImageContainer) continue; // Skip jika container tidak ada
        
        const initialMessage = resultImageContainer.querySelector(".initialMessage");
        const resultImage = resultImageContainer.querySelector(".resultImage");
        const statusMessage = resultImageContainer.querySelector(".statusMessage");
        const regenerateBtn = resultImageContainer.querySelector(".regenerate-style-btn");
        const downloadBtn = resultImageContainer.querySelector(".download-image-btn");
        
        // Hide regenerate and download buttons
        regenerateBtn.hidden = true;
        downloadBtn.hidden = true;
        
        // Create loading indicator
        const loadingIndicator = document.createElement("div");
        loadingIndicator.className = "loading-indicator";
        resultImageContainer.appendChild(loadingIndicator);
        initialMessage.hidden = true;
        resultImage.hidden = true;
        
        // Tampilkan status message dan notifikasi global
        const statusText = "Pembuatan gambar dimulai";
        statusMessage.textContent = statusText;
        statusMessage.hidden = false;
        globalNotif.info(statusText, 3000, true, statusMessage);
    }
    
    try {
        // Get selected options
        const model = modelSelect.value;
        const imageFormat = formatSelect.value;
        const enhance = enhanceCheck.checked;
        
        // Combine prompt with selected style and filter
        let fullPrompt = prompt;
        
        // Add cyberpunk style at the beginning if selected
        if (selectedCyberpunkStyle) {
            fullPrompt = `${selectedCyberpunkStyle}, ${fullPrompt}`;
        }
        
        if (selectedStyle) {
            fullPrompt += `, ${selectedStyle} style`;
        }
        if (selectedFilter) {
            fullPrompt += `, ${selectedFilter} filter`;
        }
        
        // Create image URLs using the Pollinations.ai Text-To-Image API
        const formats = {
            "default": [1080, 1920],
            "square": [1080, 1080],
            "landscape": [1920, 1080],
            "landscape_large": [2560, 1440],
            "portrait": [1080, 1920],
            "portrait_large": [1440, 2560]
        };
        
        const [width, height] = formats[imageFormat] || formats["default"];
        
        // Generate variations hanya untuk jumlah container yang ada
        const variations = [];
        for (let i = 0; i < containerCount; i++) {
            variations.push({ 
                seed: Math.floor(Math.random() * 1000000), 
                weightingText: `versi ${i+1}` 
            });
        }
        
        // Create URLs for all images
        const urls = variations.map(v => 
            `https://image.pollinations.ai/prompt/${encodeURIComponentSafe(fullPrompt)}?width=${width}&height=${height}&model=${model}&nologo=true&enhance=${enhance}&seed=${v.seed}`
        );
        
        // Store the URLs for download
        currentImageUrls = urls;
        
        // Simulate the event emitter calls for each image
        for (let i = 0; i < containerCount; i++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    updateStatus({
                        data: {
                            description: `Menghasilkan gambar ${i+1}/${containerCount}...`,
                            status: "in_progress",
                            done: false
                        },
                        type: "status"
                    }, i);
                    resolve();
                }, 500);
            });
        }
        
        // Load all images from the Pollinations API
        const loadPromises = urls.map((url, index) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                
                img.onload = () => {
                    const resultImageContainer = document.getElementById(`resultImageContainer${index}`);
                    if (!resultImageContainer) {
                        resolve(); // Skip jika container tidak ada
                        return;
                    }
                    
                    const resultImage = resultImageContainer.querySelector(".resultImage");
                    const loadingIndicator = resultImageContainer.querySelector(".loading-indicator");
                    const regenerateBtn = resultImageContainer.querySelector(".regenerate-style-btn");
                    const downloadBtn = resultImageContainer.querySelector(".download-image-btn");
                    
                    resultImage.src = url;
                    resultImage.hidden = false;
                    
                    // Show the regenerate and download buttons
                    regenerateBtn.hidden = true;
                    downloadBtn.hidden = true;
                    
                    updateStatus({
                        data: {
                            description: `Gambar ${index+1} dihasilkan`,
                            status: "complete",
                            done: true
                        },
                        type: "status"
                    }, index);
                    
                    // Clean up
                    if (loadingIndicator) {
                        resultImageContainer.removeChild(loadingIndicator);
                    }
                    
                    resolve();
                };
                
                img.onerror = () => {
                    reject(new Error(`Gagal memuat gambar ${index+1}`));
                };
                
                img.src = url;
            });
        });
        
        // Wait for all images to load
        await Promise.all(loadPromises);
        
        // Simpan gambar ke history
        for (let i = 0; i < currentImageUrls.length; i++) {
            saveImageToHistory(currentImageUrls[i], originalPrompt);
        }
        
        // Update generation count only once for the batch
        generationCount++;
        genCount.textContent = generationCount;
        
        // Show download button and add container button
        downloadAllBtn.hidden = false;
        addContainerBtn.hidden = false;
        
        // Reset UI state
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate Gambar";
        isGenerating = false;
        
    } catch (error) {
        console.error("Error generating images:", error);
        
        // Show error on all containers that haven't loaded yet
        const containers = document.querySelectorAll('.image-container');
        for (let i = 0; i < containers.length; i++) {
            const resultImageContainer = document.getElementById(`resultImageContainer${i}`);
            if (!resultImageContainer) continue;
            
            const initialMessage = resultImageContainer.querySelector(".initialMessage");
            const loadingIndicator = resultImageContainer.querySelector(".loading-indicator");
            
            if (loadingIndicator) {
                updateStatus({
                    data: {
                        description: `Kesalahan: ${error.message}`,
                        status: "complete",
                        done: true
                    },
                    type: "status"
                }, i);
                
                initialMessage.hidden = false;
                resultImageContainer.removeChild(loadingIndicator);
            }
        }
        
        // Reset UI state
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate Gambar";
        isGenerating = false;
      }  // Ini adalah akhir dari blok catch
}
        
        // Show error on all containers that haven't loaded yet
        for (let i = 0; i < 4; i++) {
          const resultImageContainer = document.getElementById(`resultImageContainer${i}`);
          const initialMessage = resultImageContainer.querySelector(".initialMessage");
          const loadingIndicator = resultImageContainer.querySelector(".loading-indicator");
          
          if (loadingIndicator) {
            updateStatus({
              data: {
                description: `Kesalahan: ${error.message}`,
                status: "complete",
                done: true
              },
              type: "status"
            }, i);
            
            initialMessage.hidden = false;
            resultImageContainer.removeChild(loadingIndicator);
          }
        }
        
        globalNotif.error("Gagal menghasilkan beberapa gambar. Silakan coba lagi.");
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate Gambar";
        isGenerating = false;
        
    // Function to download an individual image
    async function downloadImage(index) {
      if (!currentImageUrls[index]) {
        globalNotif.error("Tidak ada gambar untuk diunduh.");
        return;
      }
      
      try {
        // Get the image element that's already displayed
        const imageContainer = document.getElementById(`resultImageContainer${index}`);
        const imgElement = imageContainer.querySelector('.resultImage');
        
        
        // Show status message
        if (statusMessage) {
          const statusText = "Mempersiapkan unduhan...";
          statusMessage.textContent = statusText;
          statusMessage.hidden = false;
          globalNotif.info(statusText, 2000, true, statusMessage);
        }
        
        // Ensure the image is fully loaded before proceeding
        if (imgElement && !imgElement.complete) {
          await new Promise((resolve, reject) => {
            imgElement.onload = resolve;
            imgElement.onerror = reject;
            // Set a timeout in case it never loads
            setTimeout(resolve, 3000);
          });
        }
        
        try {
          // Method 1: Try using fetch API first
          const response = await fetch(currentImageUrls[index]);
          const blob = await response.blob();
          
          // Create download link
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = `tkk-creator-ai-image-${index+1}.jpeg`;
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          if (statusMessage) {
            const successText = "Gambar berhasil diunduh!";
            statusMessage.textContent = successText;
            setTimeout(() => {
              statusMessage.hidden = true;
            }, 2000);
            globalNotif.success(successText, 2000, true, statusMessage);
          }
          
        } catch (error) {
          // Method 2: Fall back to using the image element's src if fetch fails
          const downloadLink = document.createElement('a');
          downloadLink.href = imgElement.src;
          downloadLink.download = `tkk-creator-ai-image-${index+1}.jpeg`;
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          if (statusMessage) {
            const successText = "Gambar berhasil diunduh!";
            statusMessage.textContent = successText;
            setTimeout(() => {
              statusMessage.hidden = true;
            }, 2000);
            globalNotif.success(successText, 2000, true, statusMessage);
          }
        }
        
      } catch (error) {
        console.error("Error downloading image:", error);
        globalNotif.error("Gagal mengunduh gambar. Coba lagi nanti.", 4000);
        
        const imageContainer = document.getElementById(`resultImageContainer${index}`);
        const statusMessage = imageContainer.querySelector(".statusMessage");
        if (statusMessage) {
          const errorText = "Gagal mengunduh gambar";
          statusMessage.textContent = errorText;
          setTimeout(() => {
            statusMessage.hidden = true;
          }, 3000);
          globalNotif.error(errorText, 3000, true, statusMessage);
        }
      }
    }
    
    // Function to download all images
    async function downloadAllImages() {
      if (!currentImageUrls.length) {
        globalNotif.warning("Tidak ada gambar untuk diunduh.");
        return;
      }
      
      try {
        for (let i = 0; i < currentImageUrls.length; i++) {
          await downloadImage(i);
          
          // Small delay between downloads to prevent browser throttling
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        showNotification("Semua gambar berhasil diunduh!");
        
      } catch (error) {
        console.error("Error downloading all images:", error);
        globalNotif.error("Gagal mengunduh beberapa gambar. Coba lagi nanti.");
      }
    }
    
    // Function to regenerate an image with the selected style
    async function regenerateWithStyle(index) {
      if (isGenerating) return;
      
      // Check if there's a selected style
      if (!selectedStyle && !selectedFilter && !selectedCyberpunkStyle) {
        globalNotif.warning("Pilih gaya seni atau efek kamera terlebih dahulu.");
        return;
      }
      
      // Update UI to loading state
      isGenerating = true;
      
      const resultImageContainer = document.getElementById(`resultImageContainer${index}`);
      const resultImage = resultImageContainer.querySelector(".resultImage");
      const statusMessage = resultImageContainer.querySelector(".statusMessage");
      const regenerateBtn = resultImageContainer.querySelector(".regenerate-style-btn");
      const downloadBtn = resultImageContainer.querySelector(".download-image-btn");
      
      // Hide buttons and image
      regenerateBtn.hidden = true;
      downloadBtn.hidden = true;
      resultImage.hidden = false;
      
      // Create loading indicator
      const loadingIndicator = document.createElement("div");
      loadingIndicator.className = "loading-indicator";
      resultImageContainer.appendChild(loadingIndicator);
      
      // Show status message
      statusMessage.textContent = "Menghasilkan ulang dengan gaya terpilih...";
      statusMessage.hidden = false;
      
      try {
        // Get selected options from main UI
        const modelSelect = document.getElementById("modelSelect");
        const formatSelect = document.getElementById("formatSelect");
        const enhanceCheck = document.getElementById("enhanceCheck");
        
        const model = modelSelect.value;
        const imageFormat = formatSelect.value;
        const enhance = enhanceCheck.checked;
        
        // Use original prompt if available, otherwise use whatever is in the input
        const promptInput = document.getElementById("promptInput");
        let prompt = originalPrompt || promptInput.value.trim();
        
        // Combine prompt with selected style and filter
        let fullPrompt = prompt;
        
        // Add cyberpunk style at the beginning if selected
        if (selectedCyberpunkStyle) {
          fullPrompt = `${selectedCyberpunkStyle}, ${fullPrompt}`;
        }
        
        if (selectedStyle) {
          fullPrompt += `, ${selectedStyle} style`;
        }
        if (selectedFilter) {
          fullPrompt += `, ${selectedFilter} filter`;
        }
        
        // Create image URL using the Pollinations.ai Text-To-Image API
        const formats = {
          "default": [1080, 1920],
          "square": [1080, 1080],
          "landscape": [1920, 1080],
          "landscape_large": [2560, 1440],
          "portrait": [1080, 1920],
          "portrait_large": [1440, 2560]
        };
        
        const [width, height] = formats[imageFormat] || formats["default"];
        
        // Generate a new random seed
        const seed = Math.floor(Math.random() * 1000000);
        
        // Create URL for the image
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponentSafe(fullPrompt)}?width=${width}&height=${height}&model=${model}&nologo=true&enhance=${enhance}&seed=${seed}`;
        
        // Store the URL for download
        currentImageUrls[index] = url;
        
        // Load the image
        await new Promise((resolve, reject) => {
          const img = new Image();
          
          img.onload = () => {
            resultImage.src = url;
            resultImage.hidden = false;
            
            // Show the buttons
            regenerateBtn.hidden = true;
            downloadBtn.hidden = true;
            
            globalNotif.success("Gambar berhasil dihasilkan ulang!", 3000, true, statusMessage);
            
            // Clean up
            if (loadingIndicator) {
              resultImageContainer.removeChild(loadingIndicator);
            }
            
            resolve();
          };
          
          img.onerror = () => {
            reject(new Error(`Gagal menghasilkan ulang gambar ${index+1}`));
          };
          
          img.src = url;
        });
        
        // Reset UI state
        isGenerating = false;
        
      } catch (error) {
        console.error("Error regenerating image:", error);
        
        // Show error
        globalNotif.error(`Kesalahan: ${error.message}`, 4000, true, statusMessage);
        
        // Clean up
        if (loadingIndicator) {
          resultImageContainer.removeChild(loadingIndicator);
        }
        
        resultImage.hidden = false;
        regenerateBtn.hidden = true;
        downloadBtn.hidden = true;
        
        isGenerating = false;
      }
    }
    
    // Fungsi untuk menambah container gambar baru
    function addImageContainer() {
        const imageGrid = document.getElementById("imageGrid");
        const containers = document.querySelectorAll('.image-container');
        const newIndex = containers.length;
        
        // Batasi maksimal 4 container
        if (newIndex >= 4) {
            showNotification("Maksimal 4 container gambar!");
            return;
        }
        
        // Buat container baru
        const newContainer = document.createElement("div");
        newContainer.className = "image-container";
        newContainer.id = `resultImageContainer${newIndex}`;
        
        // Isi container dengan elemen yang sama seperti container pertama
        newContainer.innerHTML = `
            <p class="initialMessage">Gambar yang dihasilkan AI akan muncul di sini</p>
            <img class="resultImage" hidden onclick="previewImage(this)">
            <span class="close" onclick="closeModal()" hidden>×</span>
            <div class="statusMessage" hidden></div>
            <button class="regenerate-style-btn" onclick="regenerateWithStyle(${newIndex})" hidden>Generate ulang</button>
            <button class="download-image-btn" onclick="downloadImage(${newIndex})" hidden>Unduh Gambar</button>
        `;
        
        // Tambahkan ke grid
        imageGrid.appendChild(newContainer);
        
        // Tampilkan notifikasi
        showNotification(`Container gambar #${newIndex+1} ditambahkan!`);
        
        // Jika sudah mencapai batas maksimal, sembunyikan tombol tambah
        if (newIndex + 1 >= 4) {
            document.getElementById("addContainerBtn").hidden = true;
        }
    }
    
    // Fungsi untuk menghapus container terakhir yang ditambahkan
    function resetLastContainer() {
        const imageGrid = document.getElementById("imageGrid");
        const containers = document.querySelectorAll('.image-container');
        const containerCount = containers.length;
        
        // Jika hanya ada satu container (container default), tampilkan notifikasi
        if (containerCount <= 1) {
            globalNotif.warning("Tidak ada container tambahan yang dapat dihapus!");
            return;
        }
        
        // Ambil container terakhir
        const lastContainer = containers[containerCount - 1];
        const containerIndex = containerCount - 1;
        
        // Hapus container dari grid
        imageGrid.removeChild(lastContainer);
        
        // Tampilkan notifikasi
        globalNotif.success(`Container gambar #${containerIndex+1} telah dihapus!`);
        
        // Update tombol download all jika perlu
        updateDownloadAllButton();
        
        // Pastikan tombol tambah container selalu terlihat setelah menghapus
        document.getElementById("addContainerBtn").hidden = false;
    }
    
    // Fungsi untuk update tombol download all (jika ada)
    function updateDownloadAllButton() {
        const downloadAllBtn = document.getElementById('downloadAllBtn');
        if (downloadAllBtn) {
            const images = document.querySelectorAll('.resultImage:not([hidden])');
            downloadAllBtn.hidden = images.length === 0;
        }
    }
    
    //fungsi gennerate histori
    function generateImages() {
      saveAllResultImagesToHistory(); // simpan semua sebelum generate ulang
    
      for (let i = 0; i < 4; i++) {
        const img = document.querySelector(`#resultImageContainer${i} .resultImage`);
        const msg = document.querySelector(`#resultImageContainer${i} .initialMessage`);
        const newUrl = `https://picsum.photos/300?random=${Math.random()}`;
    
        img.src = newUrl;
        img.hidden = false;
        if (msg) msg.style.display = 'none';
      }
    }
    
    
  
      // Fungsi untuk menutup modal
    function closeModal() {
      const modal = document.getElementById('imageModal');
      if (modal) {
        modal.style.display = 'none';
        // Aktifkan kembali scroll pada body
        document.body.style.overflow = 'auto';
      }
    }
      

      
    function saveAllResultImagesToHistory() {
      const historyGrid = document.getElementById('historyGrid');
    
      for (let i = 0; i < 4; i++) {
        const img = document.querySelector(`#resultImageContainer${i} .resultImage`);
        if (img && !img.hidden && img.src) {
          const cloneImg = document.createElement('img');
          cloneImg.src = img.src;
          cloneImg.alt = `Generated Image ${i}`;
          cloneImg.onclick = () => previewImage(cloneImg); // Optional preview
          historyGrid.appendChild(cloneImg);
        }
      }
    }

    
        window.onload = function () {
      // Tidak perlu mendefinisikan ulang fungsi yang sudah ada di global scope
      // Cukup pastikan event listener untuk modal berfungsi
      const modal = document.getElementById('imageModal');
      if (modal) {
        window.addEventListener('click', function(event) {
          if (event.target === modal) {
            closeModal();
          }
        });
      }
    };

// Fungsi untuk menyimpan ke sync gallery (untuk home.html)
async function saveToSyncGallery(imageUrl, prompt) {
    try {
        const userIP = await getUserIP();
        
        // Ambil gallery yang sudah ada
        let syncGallery = JSON.parse(localStorage.getItem(`syncGallery_${userIP}`)) || [];
        
        // Tambahkan gambar baru ke gallery
        const timestamp = new Date().getTime();
        const newImage = {
            id: `img_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
            url: imageUrl,
            prompt: prompt || "Tidak ada deskripsi",
            timestamp: timestamp,
            source: 'index',
            userIP: userIP
        };
        
        syncGallery.push(newImage);
        
        // Hapus gambar yang lebih dari 7 hari
        const sevenDaysAgo = timestamp - (7 * 24 * 60 * 60 * 1000);
        syncGallery = syncGallery.filter(item => item.timestamp >= sevenDaysAgo);
        
        // Batasi maksimal 100 gambar
        if (syncGallery.length > 100) {
            syncGallery = syncGallery.slice(-100);
        }
        
        // Simpan kembali ke localStorage
        localStorage.setItem(`syncGallery_${userIP}`, JSON.stringify(syncGallery));
        
        console.log('Gambar berhasil disimpan ke sync gallery:', newImage.id);
        return newImage;
    } catch (error) {
        console.error('Gagal menyimpan gambar ke sync gallery:', error);
        return null;
    }
}

// Modifikasi fungsi saveImageToHistory untuk juga menyimpan ke sync gallery
async function saveImageToHistory(imageUrl, prompt) {
    try {
        // Dapatkan IP pengguna untuk identifikasi
        const userIP = await getUserIP();
        
        // Ambil history yang sudah ada
        let imageHistory = JSON.parse(localStorage.getItem(`imageHistory_${userIP}`)) || [];
        
        // Tambahkan gambar baru ke history
        const timestamp = new Date().getTime();
        imageHistory.push({
            url: imageUrl,
            prompt: prompt || "Tidak ada deskripsi",
            timestamp: timestamp
        });
        
        // Hapus gambar yang lebih dari 24 jam
        const oneDayAgo = timestamp - (24 * 60 * 60 * 1000);
        imageHistory = imageHistory.filter(item => item.timestamp >= oneDayAgo);
        
        // Batasi maksimal 50 gambar dalam history
        if (imageHistory.length > 50) {
            imageHistory = imageHistory.slice(-50);
        }
        
        // Simpan ke localStorage
        localStorage.setItem(`imageHistory_${userIP}`, JSON.stringify(imageHistory));
        
        // TAMBAHAN: Simpan juga ke sync gallery untuk home.html
        await saveToSyncGallery(imageUrl, prompt);
        
        console.log('Gambar berhasil disimpan ke history dan sync gallery');

    } catch (error) {
        console.error('Gagal menyimpan gambar:', error);
    }
}




      
    
