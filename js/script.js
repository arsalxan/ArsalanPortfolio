// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Highlight active nav link on scroll and fade-in sections
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav .nav-links li a');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3 // Adjust as needed for when section becomes active
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class for fade-in animation
            entry.target.classList.add('visible');

            // Highlight active nav link
            const currentId = entry.target.id;
            navLi.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentId)) {
                    link.classList.add('active');
                }
            });
        } else {
            // Optional: remove visible class if section scrolls out of view
            // entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Contact form validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    // Name validation
    const nameInput = document.getElementById('name');
    const nameError = nameInput.nextElementSibling;
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.textContent = '';
        nameError.style.display = 'none';
    }

    // Email validation
    const emailInput = document.getElementById('email');
    const emailError = emailInput.nextElementSibling;
    const emailPattern = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.textContent = '';
        emailError.style.display = 'none';
    }

    // Message validation
    const messageInput = document.getElementById('message');
    const messageError = messageInput.nextElementSibling;
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required.';
        messageError.style.display = 'block';
        isValid = false;
    } else {
        messageError.textContent = '';
        messageError.style.display = 'none';
    }

    if (isValid) {
        // In a real application, you would send the form data to a server here.
        // For this example, we'll just log it and reset the form.
        console.log('Form submitted successfully!', {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        });
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    }
});
