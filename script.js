// ==================== eDEX UI BOOT SEQUENCE ====================
const logLines = document.querySelectorAll('.log-line');
const bootStatus = document.getElementById('bootStatus');
const systemReady = document.getElementById('systemReady');
const progressFill = document.getElementById('edexProgressFill');
let currentLogIndex = 0;

function showNextLogLine() {
    if (currentLogIndex < logLines.length) {
        logLines[currentLogIndex].style.opacity = '1';
        currentLogIndex++;
        setTimeout(showNextLogLine, 350);
    } else {
        bootStatus.textContent = 'SYSTEM READY';
        systemReady.textContent = '[ SYSTEM READY ]';
        systemReady.style.color = '#0f0';
        
        setTimeout(() => {
            const introLayer = document.getElementById('intro-layer');
            introLayer.style.transition = 'opacity 0.8s';
            introLayer.style.opacity = '0';
            setTimeout(() => {
                introLayer.style.display = 'none';
                document.getElementById('slide1').classList.add('active-slide');
                updateSlideIndicator(1);
                initAll();
            }, 800);
        }, 1500);
    }
}

// ==================== META TAGS ====================
function updateMetaTags() {
    const currentUrl = window.location.href;
    const pageTitle = document.title;
    const currentDomain = window.location.origin;
    
    const ogTitle = document.getElementById('ogTitle');
    const ogUrl = document.getElementById('ogUrl');
    const ogImage = document.getElementById('ogImage');
    
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    if (ogUrl) ogUrl.setAttribute('content', currentUrl);
    if (ogImage) ogImage.setAttribute('content', currentDomain + '/images/og-image.jpg');
}

// ==================== SLIDE NAVIGATION ====================
let currentSlide = 1;
const totalSlides = 4;

function showSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) return;
    for (let i = 1; i <= totalSlides; i++) {
        const slide = document.getElementById(`slide${i}`);
        if (slide) slide.classList.remove('active-slide');
    }
    const targetSlide = document.getElementById(`slide${slideNumber}`);
    if (targetSlide) targetSlide.classList.add('active-slide');
    currentSlide = slideNumber;
    updateSlideIndicator(slideNumber);
}

function updateSlideIndicator(slideNumber) {
    const dots = document.querySelectorAll('.slide-indicator .dot');
    dots.forEach((dot, idx) => {
        if (idx + 1 === slideNumber) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function initNavigation() {
    document.querySelectorAll('.next-slide-btn').forEach(btn => {
        btn.onclick = () => {
            const next = btn.getAttribute('data-next');
            if (next) showSlide(parseInt(next));
        };
    });
    document.querySelectorAll('.prev-slide-btn').forEach(btn => {
        btn.onclick = () => {
            const prev = btn.getAttribute('data-prev');
            if (prev) showSlide(parseInt(prev));
        };
    });
}

// ==================== AUTO SKILL BAR ====================
function initSkillBar() {
    document.querySelectorAll('.skill-card').forEach(card => {
        const percentSpan = card.querySelector('.skill-percent');
        const barFill = card.querySelector('.skill-bar-fill');
        if (percentSpan && barFill) {
            const percent = parseInt(percentSpan.textContent);
            barFill.style.width = percent + '%';
        }
    });
}

// ==================== PROJECTS ====================
const projectsData = [
    { title: "Cyberpunk Poster Series", image: "images/project-1.jpg", desc: "Seri poster bertema cyberpunk dengan kombinasi neon dan glitch effect.", tech: "PixelLab, CorelDraw" },
    { title: "Brand Identity Project", image: "images/project-2.jpg", desc: "Desain identitas merek dengan sentuhan retro-futuristik.", tech: "Canva, CorelDraw" },
    { title: "Social Media Campaign", image: "images/project-3.jpg", desc: "Kampanye media sosial dengan visual berani dan tipografi eksperimental.", tech: "Canva, PixelLab" }
];

function initProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `<img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/400x200/0a0a0f/00f3ff?text=No+Image'"><h4>${project.title}</h4><p>${project.desc.substring(0, 55)}...</p>`;
        card.onclick = () => openModal(project);
        grid.appendChild(card);
    });
}

function openModal(project) {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').innerText = project.title;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalDesc').innerText = project.desc;
    document.getElementById('modalTech').innerHTML = `<strong>Tech:</strong> ${project.tech}`;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('projectModal').classList.add('hidden');
}

// ==================== CONTACT ====================
function initContacts() {
    document.querySelectorAll('.contact-item').forEach(item => {
        const btn = item.querySelector('.contact-btn');
        const type = item.getAttribute('data-type');
        const value = item.querySelector('span').innerText;
        btn.onclick = () => {
            if (type === 'instagram') window.open(`https://instagram.com/${value.replace('@', '')}`, '_blank');
            if (type === 'github') window.open(`https://github.com/${value.replace('@', '')}`, '_blank');
        };
    });
}

// ==================== MUSIC PLAYER ====================
const playlist = [
    { src: "assets/music/music-1.mp3", title: "music-1.mp3" },
    { src: "assets/music/music-2.mp3", title: "music-2.mp3" },
    { src: "assets/music/music-3.mp3", title: "music-3.mp3" }
];

let currentTrack = 0;
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const trackTitle = document.getElementById('trackTitle');

function loadTrack(index) {
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;
    currentTrack = index;
    bgMusic.src = playlist[currentTrack].src;
    trackTitle.innerText = playlist[currentTrack].title;
    if (isPlaying) bgMusic.play().catch(e => console.log('Playback failed:', e));
}

function initMusicPlayer() {
    if (playPauseBtn) {
        playPauseBtn.onclick = () => {
            if (isPlaying) {
                bgMusic.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
            } else {
                bgMusic.play().catch(e => console.log('Playback failed:', e));
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }
        };
    }
    if (nextBtn) nextBtn.onclick = () => { loadTrack(currentTrack + 1); if (isPlaying) bgMusic.play(); };
    if (prevBtn) prevBtn.onclick = () => { loadTrack(currentTrack - 1); if (isPlaying) bgMusic.play(); };
    if (volumeSlider) volumeSlider.oninput = (e) => { bgMusic.volume = parseFloat(e.target.value); };
    bgMusic.volume = 0.5;
    bgMusic.onended = () => { loadTrack(currentTrack + 1); if (isPlaying) bgMusic.play(); };
    loadTrack(0);
}

// ==================== MINIMIZE MUSIC PLAYER ====================
function initMinimizePlayer() {
    const musicPlayer = document.getElementById('musicPlayer');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const expandBtn = document.getElementById('expandBtn');
    if (minimizeBtn) minimizeBtn.onclick = () => { musicPlayer.classList.add('minimized'); expandBtn.classList.remove('hidden'); };
    if (expandBtn) expandBtn.onclick = () => { musicPlayer.classList.remove('minimized'); expandBtn.classList.add('hidden'); };
}

// ==================== FLOATING BINARY ====================
function createBinary() {
    const binaryContainer = document.getElementById('binaryContainer');
    if (!binaryContainer) return;
    const binary = document.createElement('div');
    binary.className = 'binary';
    let binaryStr = '';
    for (let i = 0; i < Math.floor(Math.random() * 20) + 10; i++) binaryStr += Math.random() > 0.5 ? '1' : '0';
    binary.textContent = binaryStr;
    binary.style.left = Math.random() * 100 + '%';
    binary.style.fontSize = (Math.random() * 10 + 10) + 'px';
    binary.style.animationDuration = (Math.random() * 15 + 10) + 's';
    binary.style.animationDelay = Math.random() * 5 + 's';
    binaryContainer.appendChild(binary);
    setTimeout(() => binary.remove(), 20000);
}

// ==================== MODAL ====================
function initModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.modal-close');
    const backBtn = document.querySelector('.modal-back-btn');
    if (modal) modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    if (closeBtn) closeBtn.onclick = closeModal;
    if (backBtn) backBtn.onclick = closeModal;
}

// ==================== INIT ALL ====================
function initAll() {
    initNavigation();
    initSkillBar();
    initProjects();
    initContacts();
    initMusicPlayer();
    initMinimizePlayer();
    initModal();
    updateMetaTags();
    setInterval(createBinary, 800);
}

// ==================== START ====================
window.addEventListener('DOMContentLoaded', () => {
    logLines.forEach(line => line.style.opacity = '0');
    showNextLogLine();
});
