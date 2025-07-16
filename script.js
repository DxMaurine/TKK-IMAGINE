function validateAccess() {
    const accessKey = document.getElementById("accessKey").value;
    const validKey = "20250505"; // Your access key
    const loginContainer = document.querySelector(".login-container");
    const loadingAnim = document.createElement("div");
    
    loadingAnim.className = "loading-animation";
    loginContainer.appendChild(loadingAnim);
    loadingAnim.style.display = "block";
    
    if (accessKey === validKey) {
        // Show success state
        loginContainer.classList.add("login-success");
        loginContainer.classList.add("access-granted");
        
        // Hide loading animation after delay
        setTimeout(() => {
            loadingAnim.style.display = "none";
            sessionStorage.setItem("accessKey", accessKey);
            window.location.href = "index.html";
        }, 2000);
    } else {
        // Hide loading animation if failed
        setTimeout(() => {
            loadingAnim.style.display = "none";
            alert("Akses Key salah!");
        }, 1000);
    }
}
const togglePassword = document.getElementById('togglePassword');
const accessKeyInput = document.getElementById('accessKey');

togglePassword.addEventListener('click', function () {
    const type = accessKeyInput.type === 'password' ? 'text' : 'password';
    accessKeyInput.type = type;
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

// Tambahkan event listener untuk tombol Enter
accessKeyInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        validateAccess();
    }
});



