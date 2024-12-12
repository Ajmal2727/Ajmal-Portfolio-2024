// Mobile Menu Toggle
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

mobileMenuIcon.addEventListener('click', () => {
    mobileMenuIcon.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuIcon.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});
// VANTA.NET animation
VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x3fffe8,
    backgroundColor: 0x0a0a0a,
    points: 8.00,
    maxDistance: 25.00,
    spacing: 18.00
})

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate skill bars
gsap.utils.toArray('.skill-progress-bar').forEach(bar => {
    gsap.to(bar, {
        width: bar.style.width,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: bar,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Animate project cards
gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Animate experience timeline
gsap.utils.toArray('#experience .relative').forEach(item => {
    gsap.from(item, {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Custom Cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('custom-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Section Reveal Animations
const observerOptions = {
    threshold: 0.1
};

const revealSection = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, observerOptions);

// Add section reveal to all sections
document.querySelectorAll('section, header').forEach(section => {
    section.classList.add('section-reveal');
    sectionObserver.observe(section);
});

// Particle Background for Sections (using Three.js)
function createParticleBackground(section) {
    const particleBg = document.createElement('canvas');
    particleBg.classList.add('particle-bg');
    section.appendChild(particleBg);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: particleBg, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.5
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    animate();
}

// Add particle backgrounds
document.querySelectorAll('section').forEach(createParticleBackground);
// Function to handle copy event
function handleCopy(e) {
    e.preventDefault();
    e.clipboardData.setData('text/plain', 'Design and Developed By Ajmal Shaikh!!!');
}

// Function to disable right-click
function disableRightClick(e) {
    e.preventDefault();
}

// Function to attempt disabling browser inspect
function disableInspect() {
    // Disable various keyboard shortcuts
    document.onkeydown = function (e) {
        if (
            e.ctrlKey &&
            (e.keyCode === 73 || // Ctrl+I
                e.keyCode === 74 || // Ctrl+J
                e.keyCode === 85 || // Ctrl+U
                e.keyCode === 123)  // F12
        ) {
            return false;
        }
    };
}

// Apply the protection measures when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Handle copy event
    document.addEventListener('copy', handleCopy);

    // Disable right-click
    document.addEventListener('contextmenu', disableRightClick);

    // Attempt to disable inspect
    disableInspect();

    console.log('Content protection measures have been applied.');
});

// Demonstration of the code (this part won't work in a real browser environment)
console.log("Simulating content protection...");
console.log("Attempting to copy selected content...");
let event = { preventDefault: () => { }, clipboardData: { setData: (type, data) => console.log(`Clipboard data set to: ${data}`) } };
handleCopy(event);
console.log("Right-click attempted...");
disableRightClick({ preventDefault: () => console.log("Right-click prevented") });
console.log("Note: Some features like disabling inspect cannot be fully simulated in this environment.");

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Show success message with SweetAlert
    Swal.fire({
        title: 'Message Sent!',
        text: 'Thank you for reaching out! We will get back to you soon.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Close'
    });

    // Clear form fields after successful submission
    document.getElementById('contactForm').reset();
});