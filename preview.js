function previewHistoryImage(imageUrl, theme = 'light') {
    // Remove previous modals if they exist
    const oldModal = document.getElementById('canvas-modal');
    const oldWarning = document.getElementById('mobile-warning-modal');
    if (oldModal) oldModal.remove();
    if (oldWarning) oldWarning.remove();

    // Check if user is on mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Create warning modal
        const warningModal = document.createElement('div');
        warningModal.id = 'mobile-warning-modal';
        warningModal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-color);
            padding: 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow-convex);
            border: 1px solid var(--border-color);
            backdrop-filter: blur(8px);
            z-index: 10000;
            width: 100%;
            max-width: 300px;
            text-align: center;
            transition: var(--transition);
            background-image: var(--gradient-light);
        `;
        warningModal.innerHTML = `
            <h3 style="color: var(--text-color); margin-bottom: 15px;">⚠️ Mobile Device Detected</h3>
            <p style="color: var(--text-color); margin-bottom: 20px; font: poppins, sans-serif; font-weight: normal;">
                For the best editing experience, we recommend using a desktop computer.
                Some features may be limited on mobile devices.
            </p>
            <style>
                .warning-btn {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 6px;
                    font-weight: 500;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    position: relative;
                    top: 0;
                }
                
                .warning-btn.continue {
                    background: var(--accent-color);
                    color: var(--text-color);
                    margin-right: 8px;
                    box-shadow: 0 4px 0 rgba(0,0,0,0.1);
                }
                
                .warning-btn.close {
                    background: var(--accent-secondary);
                    color: var(--text-color);
                    box-shadow: 0 4px 0 rgba(0,0,0,0.1);
                }

                .warning-btn:hover {
                    top: -2px;
                    box-shadow: 0 6px 0 rgba(0,0,0,0.1);
                }

                .warning-btn:active {
                    top: 2px;
                    box-shadow: 0 2px 0 rgba(0,0,0,0.1);
                }
            </style>
            <button id="continue-anyway" class="warning-btn continue">
                Continue Anyway
            </button>
            <button id="close-warning" class="warning-btn close">
                Close
            </button>
        `;
        
        document.body.appendChild(warningModal);
        
        // Handle warning modal buttons
        document.getElementById('continue-anyway').onclick = () => {
            warningModal.remove();
            initializeEditor();
        };
        
        document.getElementById('close-warning').onclick = () => {
            warningModal.remove();
        };
    } else {
        initializeEditor();
    }

    // Helper function to initialize the editor
    function initializeEditor() {

    // Modal wrapper
    const modal = document.createElement('div');
    modal.id = 'canvas-modal';
    modal.className = `canvas-modal ${theme}`;
    modal.innerHTML = `
      <div class="canvas-modal-content neumorphic">
        <style>
          .canvas-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: var(--transition);
          }
          .canvas-modal-content {
            background: var(--bg-color);
            padding: 12px;
            border-radius: var(--border-radius);
            position: relative;
            display: flex;
            gap: 12px;
            box-shadow: var(--box-shadow-convex);
            width: relative auto;
            max-width: 1400px;
          }
          .canvas-panel {
            padding: 10px;
            border-radius: var(--border-radius);
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: center;
          }
          .canvas-panel.center {
            flex: 1;
            min-width: 0;
          }
          .canvas-panel.left, .canvas-panel.right {
            width: 100%;
          }
          .canvas-action {
            display: flex;
            gap: 8px;
            justify-content: center;
            width: 100%;
          }
          .neumorphic-panel {
            background: var(--bg-color);
            box-shadow: var(--box-shadow-concave);
          }
          .neumorphic-canvas {
            width: 100%;
            height: auto;
            max-height: 60vh;
            object-fit: contain;
          }
          .neumorphic-btn {
            padding: 8px;
            border: none;
            border-radius: var(--border-radius);
            background: var(--bg-color);
            color: var(--text-color);
            font-weight: bold;
            cursor: pointer;
            box-shadow: var(--box-shadow-convex);
            transition: var(--transition);
            font-size: 0.85em;
          }
          .neumorphic-btn:active {
            box-shadow: var(--box-shadow-pressed);
          }
          .neumorphic-btn.primary {
            background: var(--accent-color);
            color: var(--text-color);
          }
          .neumorphic-btn.secondary {
            background: var(--accent-secondary);
            color: var(--text-color);
          }
          .neumorphic-text {
            color: var(--text-color);
            text-align: center;
            margin: 0;
            font-size: 0.9em;
          }
          .neumorphic-input {
            padding: 8px;
            border: none;
            border-radius: var(--border-radius);
            background: var(--bg-color);
            color: var(--text-color);
            box-shadow: var(--box-shadow-concave);
            font-size: 14px;
            width: 94%;
          }
          .neumorphic-color {
            padding: 6px;
            border: none;
            border-radius: var(--border-radius);
            background: var(--bg-color);
            color: var(--text-color);
            box-shadow: var(--box-shadow-concave);
            font-size: 14px;
            width: 35%;
          }
          .neumorphic-range {
            width: 100%;
            height: 8px;
            border-radius: calc(var(--border-radius) / 2);
            background: var(--bg-color);
            outline: none;
            box-shadow: var(--box-shadow-concave);
          }
          .neumorphic-radio-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
          }
          .neumorphic-radio {
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            color: var(--text-color);
            font-size: 0.8em;
          }
          .neumorphic-close {
            position: absolute;
            top: -10px;
            right: -10px;
            width: 22px;
            height: 22px;
            border: none;
            border-radius: 50%;
            background: var(--bg-color);
            color: var(--text-color);
            font-size: 14px;
            cursor: pointer;
            box-shadow: var(--box-shadow-convex);
            transition: var(--transition);
          }
          .neumorphic-close:active {
            box-shadow: var(--box-shadow-pressed);
          }
          
          .mobile-wrapper {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            max-width: 370px;
            margin: 0 auto;
            max-height: 90vh;
            overflow-y: auto;
            padding: 0 5px;
          }
          .controls-wrapper {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 0 5px;
          }
          .filter-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
          }

          @media (min-width: 371px) {
            .canvas-modal-content {
              padding: 10px;
              gap: 10px;
            }
            .mobile-wrapper {
              padding: 0 8px;
            }
            .controls-wrapper {
              padding: 0 8px;
            }
            .filter-grid {
              grid-template-columns: repeat(5, 1fr);
              gap: 8px;
            }
            .neumorphic-btn,
            .neumorphic-input,
            .neumorphic-text {
              font-size: 0.9em;
            }
          }

          @media (min-width: 768px) {
            .mobile-wrapper {
              flex-direction: row;
              max-width: none;
              overflow: hidden;
              padding: 10px;
              gap: 15px;
            }
            .controls-wrapper {
              width: 280px;
              padding: 0;
            }
            .canvas-panel.center {
              flex: 1;
              min-width: 0;
            }
            .neumorphic-canvas {
              max-height: 75vh;
            }
            .canvas-panel {
              padding: 12px;
            }
          }
        </style>
        <div class="mobile-wrapper">
          <div class="canvas-panel center neumorphic-panel">
            <canvas id="editor-canvas" class="neumorphic-canvas"></canvas>
            <div class="canvas-action">
              <button id="download-btn" class="neumorphic-btn primary">Download</button>
              <button id="reset-btn" class="neumorphic-btn secondary">Reset</button>
            </div>
          </div>
          <div class="controls-wrapper">
            <div class="canvas-panel neumorphic-panel">
              <h3 class="neumorphic-text">🎨 Filter</h3>
              <div class="filter-grid">
                <button class="filter-btn neumorphic-btn" data-filter="none" style="display: flex; align-items: center; justify-content: center;">
                  <div style="width: 20px; height: 20px; border-radius: 50%; background: conic-gradient(#ffffff 0deg 90deg,rgb(255, 0, 0) 90deg 180deg,rgb(255, 174, 0) 180deg 270deg,rgb(0, 71, 204) 270deg);"></div>
                </button>
                <button class="filter-btn neumorphic-btn" data-filter="grayscale" style="display: flex; align-items: center; justify-content: center;">
                  <div style="width: 20px; height: 20px; border-radius: 50%; background: #808080;"></div>
                </button>
                <button class="filter-btn neumorphic-btn" data-filter="sepia" style="display: flex; align-items: center; justify-content: center;">
                  <div style="width: 20px; height: 20px; border-radius: 50%; background: #704214;"></div>
                </button>
                <button class="filter-btn neumorphic-btn" data-filter="invert" style="display: flex; align-items: center; justify-content: center;">
                  <div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(45deg, #000 50%, #fff 50%);"></div>
                </button>
                <button class="filter-btn neumorphic-btn" data-filter="sharpen" style="display: flex; align-items: center; justify-content: center;">
                  <div style="width: 20px; height: 20px; border-radius: 50%; background: #4a90e2;"></div>
                </button>
              </div>
            </div>
            <div class="canvas-panel neumorphic-panel">
              <div class="accordion">
                <div class="accordion-header">
                  <h3 class="neumorphic-text">🎨 Watermark</h3>
                  <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                  <input type="text" id="wm-text" class="neumorphic-input" placeholder="Teks watermark" />
                  <div style="display: flex; gap: 8px; align-items: center;">
                    <input type="color" id="wm-color" class="neumorphic-color" value="#ffffff" />
                    <select id="wm-font-family" class="neumorphic-input" style="flex: 1;">
                      <option value="Arial Bold">Arial Bold</option>
                      <option value="Impact">Impact</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Comic Sans MS">Comic Sans MS</option>
                    </select>
                  </div>
                  <label class="neumorphic-label">
                    Font Size
                    <input type="range" id="wm-font-size" class="neumorphic-range" min="50" max="300" value="24" />
                  </label>
                  <label class="neumorphic-label">
                    Opacity 
                    <input type="range" id="wm-opacity" class="neumorphic-range" min="0" max="1" step="0.05" value="0.5" />
                  </label>
                  <div id="wm-anchor" class="neumorphic-select-wrapper">
                    <label for="anchor-select" class="neumorphic-text" style="display: block; margin-bottom: 8px;">Position</label>
                    <select id="anchor-select" class="neumorphic-input">
                      <option value="tl">↖ kiri atas</option>
                      <option value="tc">⬆ atas</option>
                      <option value="tr">↗ kanan atas</option>
                      <option value="cl">⬅ tengah kiri</option>
                      <option value="cc">🔄 tengah</option>
                      <option value="cr">➡ tengah kanan</option>
                      <option value="bl">↙ kiri bawah</option>
                      <option value="bc">⬇ bawah</option>
                      <option value="br">↘ kanan bawah</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="canvas-panel neumorphic-panel">
              <div class="accordion">
                <div class="accordion-header">
                  <h3 class="neumorphic-text">⚙️ Setting</h3>
                  <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                  <div style="display: flex; gap: 8px; align-items: center;">
                    <input type="color" id="accent-color" class="neumorphic-color" value="#0fa1e6" />
                    <label class="neumorphic-text" style="flex: 1;">Accent Color</label>
                  </div>
                  
                  <button id="reset-all" class="neumorphic-btn secondary" style="width: 100%; margin-top: 8px;">
                    Reset All Settings
                  </button>

                  <div class="admin-panel" style="margin-top: 8px; padding: 8px; border-radius: var(--border-radius); background: var(--bg-color); box-shadow: var(--box-shadow-concave);">
                    <h4 class="neumorphic-text" style="margin: 0 0 8px 0;">Admin Panel</h4>
                    <input type="password" id="admin-pass" class="neumorphic-input" placeholder="Admin Password" style="margin-bottom: 8px;" />
                    <button id="admin-login" class="neumorphic-btn primary" style="width: 100%;">
                      Login as Admin
                    </button>
                  </div>
                </div>
              </div>
              <style>
                .accordion {
                  width: 100%;
                }
                
                .accordion-header {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 10px;
                  cursor: pointer;
                  user-select: none;
                }

                .accordion-header h3 {
                  margin: 0;
                }

                .accordion-icon {
                  transition: transform 0.3s ease;
                  color: var(--text-color);
                  margin-left: flex;
                  padding-left: 10px;
                }

                .accordion-content {
                  max-height: 0;
                  overflow: hidden;
                  transition: max-height 0.3s ease-out;
                  display: flex;
                  flex-direction: column;
                  gap: 8px;
                }

                .accordion.active .accordion-content {
                  max-height: 500px;
                  padding: 10px;
                }

                .accordion.active .accordion-icon {
                  transform: rotate(180deg);
                }

                .neumorphic-select-wrapper {
                  width: 100%;
                }
                
                #anchor-select {
                  width: 100%;
                  padding: 8px;
                  border: none;
                  border-radius: var(--border-radius);
                  background: var(--bg-color);
                  color: var(--text-color);
                  box-shadow: var(--box-shadow-concave);
                  font-size: 14px;
                  cursor: pointer;
                  appearance: none;
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
                  background-repeat: no-repeat;
                  background-position: right 8px center;
                  background-size: 16px;
                  padding-right: 32px;
                }

                #anchor-select:focus {
                  outline: none;
                  box-shadow: var(--box-shadow-pressed);
                }

                #anchor-select option {
                  background: var(--bg-color);
                  color: var(--text-color);
                  padding: 8px;
                }
              </style>
            </div>
          </div>
        </div>
        <button class="canvas-close neumorphic-close" style="color: red; font-size: 1.25rem; width: 40px; height: 40px;">&times;</button>
      </div>
    `;
    document.body.appendChild(modal);

    // Event close
    modal.querySelector('.canvas-close').onclick = () => modal.remove();

    // Canvas setup
    const canvas = modal.querySelector('#editor-canvas');
    const ctx = canvas.getContext('2d');
    let originalImgData = null;
    let currentFilter = 'none';
    let watermark = {
      text: '',
      color: '#ffffff',
      opacity: 0.5,
      anchor: 'tl'
    };

    // Load image & set canvas size with original dimensions
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      // Set canvas to original image dimensions
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Scale canvas element display size while maintaining aspect ratio
      const maxW = 400, maxH = 400;
      const ratio = img.width / img.height;
      let displayW = img.width;
      let displayH = img.height;
      
      if (displayW > displayH) {
        if (displayW > maxW) {
          displayW = maxW;
          displayH = Math.round(maxW / ratio);
        }
      } else {
        if (displayH > maxH) {
          displayH = maxH;
          displayW = Math.round(maxH * ratio);
        }
      }
      
      // Set display dimensions via CSS
      canvas.style.width = displayW + 'px';
      canvas.style.height = displayH + 'px';

      // Draw at original resolution
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      originalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      applyAll();
    };
    img.src = imageUrl;

    // Filter logic
    function applyFilter(type) {
      ctx.putImageData(originalImgData, 0, 0);
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let d = imgData.data;
      if (type === 'grayscale') {
        for (let i = 0; i < d.length; i += 4) {
          let avg = (d[i] + d[i+1] + d[i+2]) / 3;
          d[i] = d[i+1] = d[i+2] = avg;
        }
      } else if (type === 'sepia') {
        for (let i = 0; i < d.length; i += 4) {
          let r = d[i], g = d[i+1], b = d[i+2];
          d[i] = Math.min(255, 0.393*r + 0.769*g + 0.189*b);
          d[i+1] = Math.min(255, 0.349*r + 0.686*g + 0.168*b);
          d[i+2] = Math.min(255, 0.272*r + 0.534*g + 0.131*b);
        }
      } else if (type === 'invert') {
        for (let i = 0; i < d.length; i += 4) {
          d[i] = 255 - d[i];
          d[i+1] = 255 - d[i+1];
          d[i+2] = 255 - d[i+2];
        }
      } else if (type === 'sharpen') {
        // Adaptive sharpening based on image content
        const sw = canvas.width, sh = canvas.height;
        const output = ctx.createImageData(sw, sh);
        const src = d, dst = output.data;

        // Calculate local variance to determine sharpening strength
        for (let y = 1; y < sh-1; y++) {
          for (let x = 1; x < sw-1; x++) {
            for (let c = 0; c < 3; c++) {
              const i = (y*sw + x)*4 + c;
              
              // Calculate local mean
              let mean = 0;
              let variance = 0;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  mean += src[((y+dy)*sw + (x+dx))*4 + c];
                }
              }
              mean /= 9;

              // Calculate variance
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  const diff = src[((y+dy)*sw + (x+dx))*4 + c] - mean;
                  variance += diff * diff;
                }
              }
              variance /= 9;

              // Adaptive kernel weights based on variance
              const strength = Math.min(1.5, 0.5 + variance/2000);
              const center = 1 + 4*strength;
              const outer = -strength;
              
              // Apply adaptive kernel
              let sum = src[i] * center;
              sum += src[i-4] * outer;  // left
              sum += src[i+4] * outer;  // right 
              sum += src[i-sw*4] * outer;  // top
              sum += src[i+sw*4] * outer;  // bottom

              dst[i] = Math.min(255, Math.max(0, sum));
            }
            dst[(y*sw + x)*4 + 3] = src[(y*sw + x)*4 + 3];
          }
        }
        imgData = output;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // Watermark logic
    function drawWatermark() {
      if (!watermark.text) return;
      ctx.save();
      ctx.globalAlpha = watermark.opacity;
      
      // Get font size and family from inputs
      const fontSize = document.querySelector('#wm-font-size').value;
      const fontFamily = document.querySelector('#wm-font-family').value;
      ctx.font = `${fontSize}px ${fontFamily}`;
      
      ctx.fillStyle = watermark.color;
      let x = 10, y = parseInt(fontSize) + 6;
      
      const textWidth = ctx.measureText(watermark.text).width;
      const textHeight = parseInt(fontSize); // Approximate height based on font size
      
      // Get anchor position from select element
      const anchorSelect = document.querySelector('#anchor-select');
      watermark.anchor = anchorSelect.value;
      
      // Calculate position based on anchor
      switch(watermark.anchor) {
        case 'tr':
          x = canvas.width - textWidth - 10;
          y = textHeight + 10;
          break;
        case 'tc':
          x = (canvas.width - textWidth) / 2;
          y = textHeight + 10;
          break;
        case 'tl':
          x = 10;
          y = textHeight + 10;
          break;
        case 'cl':
          x = 10;
          y = canvas.height / 2;
          break;
        case 'cc':
          x = (canvas.width - textWidth) / 2;
          y = canvas.height / 2;
          break;
        case 'cr':
          x = canvas.width - textWidth - 10;
          y = canvas.height / 2;
          break;
        case 'bl':
          x = 10;
          y = canvas.height - 10;
          break;
        case 'bc':
          x = (canvas.width - textWidth) / 2;
          y = canvas.height - 10;
          break;
        case 'br':
          x = canvas.width - textWidth - 10;
          y = canvas.height - 10;
          break;
      }
      
      ctx.fillText(watermark.text, x, y);
      ctx.restore();
    }

    // Apply all (filter + watermark)
    function applyAll() {
      applyFilter(currentFilter);
      drawWatermark();
    }

    // Filter event
    modal.querySelectorAll('.filter-btn').forEach(btn => {
      btn.onclick = function() {
        currentFilter = btn.dataset.filter;
        applyAll();
      };
    });

    // Watermark events
    modal.querySelector('#wm-text').oninput = e => {
      watermark.text = e.target.value;
      applyAll();
    };
    
    modal.querySelector('#wm-color').oninput = e => {
      watermark.color = e.target.value;
      applyAll();
    };
    
    modal.querySelector('#wm-opacity').oninput = e => {
      watermark.opacity = parseFloat(e.target.value);
      applyAll();
    };
    
    // Font controls handlers
    modal.querySelector('#wm-font-size').oninput = e => {
      applyAll();
    };

    modal.querySelector('#wm-font-family').onchange = e => {
      applyAll();
    };
    
    // Anchor select handler
    modal.querySelector('#anchor-select').onchange = e => {
      watermark.anchor = e.target.value;
      applyAll();
    };
    // Download
    modal.querySelector('#download-btn').onclick = () => {
      const link = document.createElement('a');
      link.download = 'edited-image.png';
      link.href = canvas.toDataURL();
      link.click();
    };
    // Reset
    modal.querySelector('#reset-btn').onclick = () => {
      ctx.putImageData(originalImgData, 0, 0);
      currentFilter = 'none';
      watermark = { text: '', color: '#ffffff', opacity: 0.5, anchor: 'tl' };
      // Reset UI
      modal.querySelector('#wm-text').value = '';
      modal.querySelector('#wm-color').value = '#ffffff';
      modal.querySelector('#wm-opacity').value = 0.5;
      modal.querySelector('input[name="anchor"][value="tl"]').checked = true;
      applyAll();
    };

// Add click handler for accordion expansion
const accordions = document.querySelectorAll('.accordion-header');

// Track currently open accordion
let openAccordion = null;

accordions.forEach(accordion => {
  accordion.addEventListener('click', () => {
    const parent = accordion.parentElement;
    const content = parent.querySelector('.accordion-content');
    const icon = parent.querySelector('.accordion-icon');
    
    // If clicking the same open accordion, close it
    if (openAccordion === parent) {
      parent.classList.remove('active');
      content.style.cssText = `
        max-height: 0;
        padding: 0;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-out;
      `;
      icon.style.cssText = `
        transform: rotate(0deg);
        transition: transform 0.3s ease;
      `;
      openAccordion = null;
      return;
    }
    
    // Close currently open accordion if exists
    if (openAccordion) {
      const openContent = openAccordion.querySelector('.accordion-content');
      const openIcon = openAccordion.querySelector('.accordion-icon');
      
      openAccordion.classList.remove('active');
      openContent.style.cssText = `
        max-height: 0;
        padding: 0;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-out;
      `;
      openIcon.style.cssText = `
        transform: rotate(0deg);
        transition: transform 0.3s ease;
      `;
    }
    
    // Open clicked accordion
    parent.classList.add('active');
    content.style.cssText = `
      max-height: ${content.scrollHeight}px;
      padding: 10px;
      opacity: 1;
      visibility: visible;
      transition: all 0.3s ease-in;
    `;
    icon.style.cssText = `
      transform: rotate(180deg);
      transition: transform 0.3s ease;
    `;
    openAccordion = parent;
  });
});

// Add default ambient light effect
const defaultAmbientColor = '#0fa1e6'; // blue ambient color
const modalElement = document.querySelector('.canvas-modal-content');
if (modalElement) {
  modalElement.style.boxShadow = `0 0 50px ${defaultAmbientColor}`;
}

// Handle accent color change - updates both accent color and ambient light
document.querySelector('#accent-color').addEventListener('input', function(e) {
  const newColor = e.target.value;
  document.documentElement.style.setProperty('--accent-color', newColor);
  
  // Update ambient light effect
  const modalElement = document.querySelector('.canvas-modal-content');
  if (modalElement) {
    modalElement.style.boxShadow = `0 0 50px ${newColor}`;
  }
});
// Global notification function
function showGlobalNotification(message, type = 'info', duration = 3000) {
  // Create notification container if it doesn't exist
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
    `;
    document.body.appendChild(container);
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    padding: 12px 24px;
    margin-bottom: 10px;
    background: var(--bg-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-convex);
    color: var(--text-color);
    min-width: 280px;
    max-width: 400px;
    display: flex;
    align-items: center;
    gap: 10px;
    transform: translateX(120%);
    transition: transform 0.3s ease;
  `;

  // Set icon based on type
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  
  // Create message content
  notification.innerHTML = `
    <span style="font-size: 1.2em">${icon}</span>
    <span style="flex-grow: 1">${message}</span>
    <button style="background: none; border: none; color: var(--text-color); cursor: pointer; padding: 0; font-size: 1.2em">&times;</button>
  `;

  // Add to container
  container.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Add close button handler
  const closeBtn = notification.querySelector('button');
  closeBtn.onclick = () => {
    notification.style.transform = 'translateX(120%)';
    setTimeout(() => notification.remove(), 300);
  };

  // Auto remove after duration
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.transform = 'translateX(120%)';
      setTimeout(() => notification.remove(), 300);
    }
  }, duration);
}

// Handle reset all settings
document.querySelector('#reset-all').addEventListener('click', function() {
  // Reset accent color
  document.documentElement.style.setProperty('--accent-color', '#0fa1e6');
  document.querySelector('#accent-color, defaultAmbientColor').value = '#0fa1e6';
  modalElement.style.boxShadow = `0 0 50px ${defaultAmbientColor}`;
  
  showGlobalNotification('Settings have been reset successfully!', 'success');
});

// Handle admin login
document.querySelector('#admin-login').addEventListener('click', function() {
  const pass = document.querySelector('#admin-pass').value;
  if(pass === 'admin123') {
    showGlobalNotification('Logged in successfully!', 'success');
    // Add admin functionality here
  } else {
    showGlobalNotification('Invalid password. Please try again.', 'error');
  }
});

  }
}
