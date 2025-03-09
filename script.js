// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Navigation buttons in trending section
    const trendingContainer = document.querySelector('.trending-container');
    const movieGrid = document.querySelector('.movie-grid');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');

    // Scroll amount for navigation (adjust based on card width + gap)
    const scrollAmount = 300;

    // Navigation button functionality
    if (prevButton && nextButton && movieGrid) {
        // Initially hide prev button
        prevButton.style.opacity = '0';
        prevButton.style.pointerEvents = 'none';

        // Show/hide navigation buttons based on scroll position
        movieGrid.addEventListener('scroll', () => {
            const maxScroll = movieGrid.scrollWidth - movieGrid.clientWidth;

            prevButton.style.opacity = movieGrid.scrollLeft > 0 ? '1' : '0';
            prevButton.style.pointerEvents = movieGrid.scrollLeft > 0 ? 'auto' : 'none';

            nextButton.style.opacity = movieGrid.scrollLeft < maxScroll ? '1' : '0';
            nextButton.style.pointerEvents = movieGrid.scrollLeft < maxScroll ? 'auto' : 'none';
        });

        // Navigation button click handlers
        prevButton.addEventListener('click', () => {
            movieGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextButton.addEventListener('click', () => {
            movieGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // FAQ Accordion Animation
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        const content = item.querySelector('.faq-content');

        summary.addEventListener('click', (e) => {
            e.preventDefault();

            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.hasAttribute('open')) {
                    otherItem.removeAttribute('open');
                }
            });

            // Toggle current item
            if (item.hasAttribute('open')) {
                item.removeAttribute('open');
            } else {
                item.setAttribute('open', '');
            }
        });
    });

    // Email Form Validation
    const emailForms = document.querySelectorAll('.email-signup-form');

    emailForms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');

        emailInput.addEventListener('input', () => {
            const isValid = emailInput.checkValidity();
            submitButton.disabled = !isValid;

            if (isValid) {
                emailInput.classList.remove('invalid');
                emailInput.classList.add('valid');
            } else {
                emailInput.classList.remove('valid');
                emailInput.classList.add('invalid');
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically handle the form submission
            console.log('Form submitted with email:', emailInput.value);
        });
    });

    // Language Selector
    const languageSelectors = document.querySelectorAll('select[name="LanguageSelect"]');

    languageSelectors.forEach(selector => {
        selector.addEventListener('change', (e) => {
            const selectedLanguage = e.target.value;
            // Here you would typically handle the language change
            console.log('Language changed to:', selectedLanguage);
        });
    });

    // Watch Party Feature
    initializeWatchParty();
});

// Watch Party Feature
function initializeWatchParty() {
    const watchPartyBtns = document.querySelectorAll('.watch-party-btn');
    const viewerCounts = document.querySelectorAll('.count');

    // Simulate random viewer counts
    viewerCounts.forEach(counter => {
        const randomViewers = Math.floor(Math.random() * 5000) + 500;
        counter.textContent = `${(randomViewers / 1000).toFixed(1)}K watching`;
    });

    // Watch Party Button Click Handler
    watchPartyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = btn.classList.contains('active');

            if (!isActive) {
                // Show join confirmation
                const movieTitle = btn.closest('.movie-info').querySelector('.movie-title').textContent;
                const confirmed = confirm(`Join watch party for "${movieTitle}"? You'll be able to chat with other viewers!`);

                if (confirmed) {
                    // Update button state
                    btn.classList.add('active');
                    btn.innerHTML = `
                        <svg viewBox="0 0 24 24" class="party-icon">
                            <path d="M21 6h-8.586l2.293-2.293-1.414-1.414L10 5.586 6.707 2.293 5.293 3.707 7.586 6H3c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h18c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm-1 14H4c-.551 0-1-.449-1-1V9c0-.551.449-1 1-1h16c.551 0 1 .449 1 1v10c0 .551-.449 1-1 1z"/>
                        </svg>
                        In Party
                    `;

                    // Simulate viewer count increase
                    const counterElement = btn.closest('.movie-info').querySelector('.count');
                    const currentCount = parseFloat(counterElement.textContent);
                    counterElement.textContent = `${(currentCount + 0.1).toFixed(1)}K watching`;

                    // Show chat interface (simulated)
                    setTimeout(() => {
                        alert('Watch Party chat interface would appear here. You can now watch and chat with others!');
                    }, 500);
                }
            } else {
                // Leave party
                btn.classList.remove('active');
                btn.innerHTML = `
                    <svg viewBox="0 0 24 24" class="party-icon">
                        <path d="M21 6h-8.586l2.293-2.293-1.414-1.414L10 5.586 6.707 2.293 5.293 3.707 7.586 6H3c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h18c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm-1 14H4c-.551 0-1-.449-1-1V9c0-.551.449-1 1-1h16c.551 0 1 .449 1 1v10c0 .551-.449 1-1 1z"/>
                    </svg>
                    Join Party
                `;

                // Simulate viewer count decrease
                const counterElement = btn.closest('.movie-info').querySelector('.count');
                const currentCount = parseFloat(counterElement.textContent);
                counterElement.textContent = `${(currentCount - 0.1).toFixed(1)}K watching`;
            }
        });
    });

    // Simulate periodic viewer count updates
    setInterval(() => {
        viewerCounts.forEach(counter => {
            const currentCount = parseFloat(counter.textContent);
            const change = (Math.random() - 0.5) * 0.2;
            const newCount = Math.max(0.1, currentCount + change).toFixed(1);
            counter.textContent = `${newCount}K watching`;
        });
    }, 5000);
} 