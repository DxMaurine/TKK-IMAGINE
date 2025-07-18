function previewHistoryImage(imageUrl, theme = 'light') {
    // Hapus modal sebelumnya jika ada
    const oldModal = document.getElementById('canvas-modal');
    if (oldModal) oldModal.remove();

    // Modal wrapper
    const modal = document.createElement('div');
    modal.id = 'canvas-modal';
    modal.className = `canvas-modal ${theme}`;
    modal.innerHTML = `
      <div class="canvas-modal-content neumorphic">
        <style>
          .canvas-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 98%;
            height: 100%;
            background: var(--highlight-color);
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
            width: 70%;
          }
          .neumorphic-color {
            padding: 8px;
            border: none;
            border-radius: var(--border-radius);
            background: var(--bg-color);
            color: var(--text-color);
            box-shadow: var(--box-shadow-concave);
            font-size: 14px;
            width: 40%;
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
              <h3 class="neumorphic-text">Filter</h3>
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
              <h3 class="neumorphic-text">Watermark</h3>
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
              <div id="wm-anchor" class="neumorphic-radio-group">
                <label class="neumorphic-radio">
                  <input type="radio" name="anchor" value="tl" checked />
                  <span class="radio-label">↖kiri atas</span>
                </label>
                <label class="neumorphic-radio">
                  <input type="radio" name="anchor" value="tc" />
                  <span class="radio-label">⬆atas</span>
                </label>
                <label class="neumorphic-radio">
                  <input type="radio" name="anchor" value="tr" />
                  <span class="radio-label">↗kanan atas</span>
                </label>
                <label class="neumorphic-radio">
                  <input type="radio" name="anchor" value="cl" />
                  <span class="radio-label">⬅tengah kiri</span>
                </label>
                <label class="neumorphic-radio">
                  <input type="radio" name="anchor" value="cc" />
                  <span class="radio-label">🔄tengah </span>
                </label>
                <label class="neumorphic-radio">
                  <input type="radio" name="anchor" value="cr" />
                  <span class="radio-label">➡tengah kanan</span>
                </label>
                <label class="neumorphic-radio">
                  <input type="radio" name="anchor" value="bl" />
                  <span class="radio-label">↙kiri bawah</span>
                </label>
                <label class="neumorphic-radio">
                  <input type="radio" name="anchor" value="bc" />
                  <span class="radio-label">⬇bawah</span>
                </label>
                <label class="neumorphic-radio">
                  <input type="radio" name="anchor" value="br" />
                  <span class="radio-label">↘kanan bawah</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <button class="canvas-close neumorphic-close" style="color: red; font-size: 1.25rem;">&times;</button>

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
      let x = 10, y = parseInt(fontSize) + 6; // Adjust y position based on font size
      
      const textWidth = ctx.measureText(watermark.text).width;
      
      // Handle all anchor positions
      switch(watermark.anchor) {
        case 'tr': // Top right
          x = canvas.width - textWidth - 10;
          break;
        case 'tc': // Top center
          x = (canvas.width - textWidth) / 2;
          break;
        case 'bl': // Bottom left
          y = canvas.height - 10;
          break;
        case 'bc': // Bottom center
          x = (canvas.width - textWidth) / 2;
          y = canvas.height - 10;
          break;
        case 'br': // Bottom right
          x = canvas.width - textWidth - 10;
          y = canvas.height - 10;
          break;
        case 'cl': // Center left
          y = canvas.height / 2;
          break;
        case 'cc': // Center center
          x = (canvas.width - textWidth) / 2;
          y = canvas.height / 2;
          break;
        case 'cr': // Center right
          x = canvas.width - textWidth - 10;
          y = canvas.height / 2;
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
    
    modal.querySelectorAll('input[name="anchor"]').forEach(radio => {
      radio.onchange = e => { 
        watermark.anchor = e.target.value; 
        applyAll(); 
      };
    });
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
}
