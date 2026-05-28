// BOOT SEQUENCE - CEPAT + COMPLETE 3 DETIK
const bootTexts = [
    "> ROG STRIX BIOS v.4012",
    "> Republic of Gamers - Cyberdeck Initiated",
    "> Scanning neural link... OK",
    "> Loading user profile: PHAQXY ... OK",
    "> Checking system integrity...",
    "> Loading cyberpunk modules...",
    "> Establishing secure connection...",
    "> Rendering neon grid...",
    "> Syncing audio drivers...",
    "> Calibrating glitch effects...",
    "> All systems operational."
];

let currentLine = 0;
let currentChar = 0;
let isComplete = false;
const bootElement = document.getElementById('bootText');
const introLayer = document.getElementById('intro-layer');
let typingSpeed = 25; // ms per karakter (lebih cepat)

function typeNextCharacter() {
    if (currentLine >= bootTexts.length) {
        if (!isComplete) {
            isComplete = true;
            const completeLine = document.createElement('div');
            completeLine.className = 'boot-complete';
            completeLine.innerHTML = '<span style="color: #0f0;">> COMPLETE ✓</span>';
            bootElement.appendChild(completeLine);
            
            // Tunggu 3 detik, lalu fade out intro
            setTimeout(() => {
                introLayer.style.animation = 'fadeOut 0.5s ease forwards';
                setTimeout(() => {
                    introLayer.style.display = 'none';
                    document.getElementById('slide1').classList.add('active-slide');
                    updateSlideIndicator(1);
                }, 500);
            }, 3000); // 3 detik
        }
        return;
    }
    
    const currentText = bootTexts[currentLine];
    
    if (currentChar < currentText.length) {
        bootElement.innerHTML += currentText[currentChar];
        currentChar++;
        setTimeout(typeNextCharacter, typingSpeed);
    } else {
        bootElement.innerHTML += '<br>';
        currentLine++;
        currentChar = 0;
        setTimeout(typeNextCharacter, 50); // jeda antar baris sangat cepat
    }
}

// Mulai efek ngetik saat halaman load
window.addEventListener('load', () => {
    typeNextCharacter();
});

// SLIDE NAVIGATION
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
    const dots = document.querySelectorAll(`.slide-indicator .dot`);
    dots.forEach((dot, idx) => {
        if (idx + 1 === slideNumber) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function attachNavListeners() {
    document.querySelectorAll('.next-slide-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const next = btn.getAttribute('data-next');
            if (next) showSlide(parseInt(next));
        });
    });
    
    document.querySelectorAll('.prev-slide-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prev = btn.getAttribute('data-prev');
            if (prev) showSlide(parseInt(prev));
        });
    });
}

// AUTO SKILL BAR - OTOMATIS SESUAI PERSENTASE
function autoSkillBar() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const percentText = card.querySelector('.skill-percent').textContent;
        const percent = parseInt(percentText);
        const barFill = card.querySelector('.skill-bar-fill');
        if (barFill) {
            barFill.style.width = percent + '%';
        }
    });
}

// PROJECTS DATA
const projectsData = [
    {
        title: "Cyberpunk Poster Series",
        image: "images/project-1.jpg",
        desc: "Seri poster bertema cyberpunk dengan kombinasi neon dan glitch effect.",
        tech: "PixelLab, CorelDraw"
    },
    {
        title: "Brand Identity Project",
        image: "images/project-2.jpg",
        desc: "Desain identitas merek dengan sentuhan retro-futuristik.",
        tech: "Canva, CorelDraw"
    },
    {
        title: "Social Media Campaign",
        image: "images/project-3.jpg",
        desc: "Kampanye media sosial dengan visual berani dan tipografi eksperimental.",
        tech: "Canva, PixelLab"
    }
];

function initProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    projectsData.forEach((project) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/400x200/0a0a0f/00f3ff?text=No+Image'">
            <h4>${project.title}</h4>
            <p>${project.desc.substring(0, 55)}...</p>
        `;
        card.addEventListener('click', () => openModal(project));
        grid.appendChild(card);
    });
}

function openModal(project) {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalDesc').textContent = project.desc;
    document.getElementById('modalTech').innerHTML = `<strong>Tech:</strong> ${project.tech}`;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('projectModal').classList.add('hidden');
}

// CONTACT BUTTONS (IG + GITHUB)
function initContactButtons() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const btn = item.querySelector('.contact-btn');
        const type = item.getAttribute('data-type');
        const span = item.querySelector('span');
        const value = span.textContent;
        
        btn.addEventListener('click', () => {
            let url = '';
            if (type === 'instagram') url = `https://instagram.com/${value.replace('@', '')}`;
            if (type === 'github') url = `https://github.com/${value.replace('@', '')}`;
            if (url) window.open(url, '_blank');
        });
    });
}

// MUSIC PLAYER - PLAYLIST 3 LAGU
const playlist = [
    { src: "assets/music/music-1.mp3", title: "Dandelions" },
    { src: "assets/music/music-2.mp3", title: "Gak Pake Lama" },
    { src: "assets/music/music-3.mp3", title: "Ophelia" }
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
    trackTitle.textContent = playlist[currentTrack].title;
    
    if (isPlaying) {
        bgMusic.play().catch(e => console.log('Playback failed:', e));
    }
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    } else {
        bgMusic.play().catch(e => console.log('Playback failed:', e));
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
    }
});

nextBtn.addEventListener('click', () => {
    loadTrack(currentTrack + 1);
    if (isPlaying) {
        bgMusic.play();
    }
});

prevBtn.addEventListener('click', () => {
    loadTrack(currentTrack - 1);
    if (isPlaying) {
        bgMusic.play();
    }
});

volumeSlider.addEventListener('input', (e) => {
    bgMusic.volume = parseFloat(e.target.value);
});

bgMusic.volume = 0.5;

bgMusic.addEventListener('ended', () => {
    loadTrack(currentTrack + 1);
    if (isPlaying) {
        bgMusic.play();
    }
});

loadTrack(0);

// INIT ALL
document.addEventListener('DOMContentLoaded', () => {
    attachNavListeners();
    autoSkillBar();
    initProjects();
    initContactButtons();
    
    const modal = document.getElementById('projectModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    document.querySelector('.modal-back-btn')?.addEventListener('click', closeModal);
});

// MINIMIZE / EXPAND MUSIC PLAYER
const musicPlayer = document.getElementById('musicPlayer');
const minimizeBtn = document.getElementById('minimizeBtn');
const expandBtn = document.getElementById('expandBtn');

// Minimize player
minimizeBtn.addEventListener('click', () => {
    musicPlayer.classList.add('minimized');
    expandBtn.classList.remove('hidden');
});

// Expand player
expandBtn.addEventListener('click', () => {
    musicPlayer.classList.remove('minimized');
    expandBtn.classList.add('hidden');
});
