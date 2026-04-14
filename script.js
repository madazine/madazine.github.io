const canvas = document.getElementById('constellation-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.closePath();
    }
}

function initParticles() {
    particles = [];
    const numParticles = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 100);
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

initParticles();

window.addEventListener('resize', () => {
    initParticles();
});

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 150})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();


const chaeImage = document.querySelector('.corner-character');
const photographySection = document.getElementById('photography');

if (chaeImage && photographySection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chaeImage.classList.add('muncul');
            } else {
                chaeImage.classList.remove('muncul');
            }
        });
    }, { threshold: 0.3 });

    observer.observe(photographySection);
}

const translations = {
    'id': {
        'projects-title': 'PROJECTS',
        'projects-desc': 'Eksplorasi karya dan project yang sedang saya kembangkan. Berkaitan dengan kode, desain, dan inovasi.',
        'preview-btn': 'Klik untuk preview <i class="fas fa-arrow-right"></i>',
        'photo-title': 'Photography',
        'photo-desc': 'Menangkap setiap momen berharga melalui lensa. Selamat datang di dunia fotografi saya, di mana setiap gambar menceritakan sebuah kisah unik.',
        'footer-copy': '&copy; 2026 madazine. Hak cipta dilindungi.',

        'proj-alpha-title': 'madazine',
        'proj-alpha-desc': 'Simpel web portofolio with html css dan js',
        'proj-web-title': 'GOSER',
        'proj-web-desc': 'GoSER platform untuk mempermudah para pedagang kecil dalam menjual dagangannya secara online.'
    },
    'en': {
        'projects-title': 'PROJECTS',
        'projects-desc': 'Exploring the works and projects I am currently developing. Emphasizing code, design, and continuous innovation.',
        'preview-btn': 'Click to preview <i class="fas fa-arrow-right"></i>',
        'photo-title': 'Photography',
        'photo-desc': 'Capturing precious moments through the lens. Welcome to my photography portfolio, where every picture tells a unique story.',
        'footer-copy': '&copy; 2026 madazine. All rights reserved.',

        'proj-alpha-title': 'madazine',
        'proj-alpha-desc': 'Simple web portofolio with html css dan js',
        'proj-web-title': 'GOSER',
        'proj-web-desc': 'GoSER platform to make it easier for small traders to sell their goods online.'
    }
};

let currentLang = 'id';

function switchLanguage(lang) {
    currentLang = lang;

    document.getElementById('lang-id').classList.toggle('active', lang === 'id');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    const modal = document.getElementById('project-modal');
    if (modal.classList.contains('show')) {
        const activeProject = modal.getAttribute('data-active-project');
        if (activeProject) {
            document.getElementById('modal-title').innerText = translations[lang][`proj-${activeProject}-title`];
            document.getElementById('modal-desc').innerText = translations[lang][`proj-${activeProject}-desc`];
        }
    }
}


function openPreview(projectKey, imgSrc) {
    const modal = document.getElementById('project-modal');
    modal.setAttribute('data-active-project', projectKey);

    document.getElementById('modal-title').innerText = translations[currentLang][`proj-${projectKey}-title`];
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-desc').innerText = translations[currentLang][`proj-${projectKey}-desc`];

    modal.classList.add('show');
}

function closePreview() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('show');
    modal.removeAttribute('data-active-project');
}


window.onclick = function (event) {
    const modal = document.getElementById('project-modal');
    if (event.target == modal) {
        closePreview();
    }
};
