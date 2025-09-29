const videoInput = document.getElementById('videoFile');
const video = document.getElementById('video');
const canvas = document.getElementById('asciiCanvas');
const ctx = canvas.getContext('2d');
const playPauseBtn = document.getElementById('playPause');
const timeLabel = document.getElementById('timeLabel');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const resolutionSelect = document.getElementById('resolution');
const asciiSetInput = document.getElementById('asciiSet');
const asciiQualitySelect = document.getElementById('asciiQuality');

let paused = false;
let cols = parseInt(resolutionSelect.value);
let ASCII_CHARS = asciiSetInput.value;

videoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    video.src = url;
    video.load();
    video.addEventListener('loadedmetadata', () => {
        resizeCanvas();
        video.play();
        requestAnimationFrame(renderASCII);
    });
});

resolutionSelect.addEventListener('change', () => {
    cols = parseInt(resolutionSelect.value);
    resizeCanvas();
});

asciiSetInput.addEventListener('input', () => {
    ASCII_CHARS = asciiSetInput.value || " ";
});

window.addEventListener('resize', resizeCanvas);

playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        paused = false;
        playPauseBtn.textContent = 'Pausa';
    } else {
        video.pause();
        paused = true;
        playPauseBtn.textContent = 'Reanudar';
    }
});

// Barra de progreso clickeable
progress.addEventListener('click', (e) => {
    const rect = progress.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * video.duration;
    video.currentTime = newTime;
});

function resizeCanvas() {
    const maxWidth = window.innerWidth - 20;
    if (cols * 10 > maxWidth) cols = Math.floor(maxWidth / 10);
    canvas.width = cols * 10;
    canvas.height = Math.floor(cols * video.videoHeight / video.videoWidth / 2) * 10;
    ctx.font = '16px monospace';
}

function renderASCII() {
    if (video.paused) {
        requestAnimationFrame(renderASCII);
        return;
    }

    const rows = Math.floor(canvas.height / 10);

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cols;
    tempCanvas.height = rows;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(video, 0, 0, cols, rows);
    const frame = tempCtx.getImageData(0, 0, cols, rows).data;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const quality = parseInt(asciiQualitySelect.value);
    const charsToUse = ASCII_CHARS.padEnd(quality, ASCII_CHARS.slice(-1)).slice(0, quality);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const i = (y * cols + x) * 4;
            const r = frame[i];
            const g = frame[i + 1];
            const b = frame[i + 2];
            const brightness = 0.299*r + 0.587*g + 0.114*b;
            const charIndex = Math.floor(brightness / 256 * charsToUse.length);
            const char = charsToUse[charIndex] || ' ';
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillText(char, x*10, y*10);
        }
    }

    // Barra de progreso
    const progressValue = video.currentTime / video.duration;
    progressBar.style.width = (progressValue*100)+'%';

    // Tiempo
    const formatTime = t => {
        const min = Math.floor(t/60);
        const sec = Math.floor(t%60);
        return `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
    };
    timeLabel.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;

    requestAnimationFrame(renderASCII);
}