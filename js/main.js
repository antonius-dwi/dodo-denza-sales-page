document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = mainNav?.querySelectorAll('a');

    const modelsNav = document.querySelector('.nav-models');
    const modelsToggle = document.querySelector('.nav-models-toggle');
    const modelsMenu = document.querySelector('.nav-models-menu');

    let modelsCloseTimer = null;

    const clearModelsCloseTimer = () => {
        if (modelsCloseTimer) {
            clearTimeout(modelsCloseTimer);
            modelsCloseTimer = null;
        }
    };

    const openModelsMenu = () => {
        clearModelsCloseTimer();

        modelsNav?.classList.add('is-open');
        modelsToggle?.setAttribute('aria-expanded', 'true');
    };

    const closeModelsMenu = () => {
        clearModelsCloseTimer();

        modelsNav?.classList.remove('is-open');
        modelsToggle?.setAttribute('aria-expanded', 'false');
    };

    const scheduleModelsClose = () => {
        clearModelsCloseTimer();

        modelsCloseTimer = setTimeout(() => {
            closeModelsMenu();
        }, 3000);
    };

    if (modelsNav && modelsToggle && modelsMenu) {
        const canHover = window.matchMedia('(hover: hover)').matches;

        /*
         * Desktop / hover-capable devices:
         * Models opens immediately on hover.
         * Menu stays open while pointer is inside Models + dropdown.
         * Closes 3 seconds after pointer leaves the whole area.
         */
        if (canHover) {
            modelsNav.addEventListener('mouseenter', openModelsMenu);
            modelsNav.addEventListener('mouseleave', scheduleModelsClose);
        }

        /*
         * Click remains available for accessibility and
         * non-hover interaction.
         */
        modelsToggle.addEventListener('click', (event) => {
            event.stopPropagation();

            const isOpen = modelsNav.classList.contains('is-open');

            if (isOpen) {
                closeModelsMenu();
            } else {
                openModelsMenu();
            }
        });

        modelsMenu.addEventListener('mouseenter', openModelsMenu);

        modelsMenu.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                closeModelsMenu();
            }
        });

        document.addEventListener('click', (event) => {
            if (!modelsNav.contains(event.target)) {
                closeModelsMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModelsMenu();
            }
        });
    }
    /* =====================================================
       MOBILE DEVICE DETECTION
    ===================================================== */

    const isMobileDevice = window.matchMedia('(pointer: coarse)').matches;

    document.body.classList.toggle('is-mobile-device', isMobileDevice);

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('is-open');

            navToggle.classList.toggle('is-open', isOpen);

            navToggle.setAttribute('aria-expanded', String(isOpen));

            navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');

            document.body.classList.toggle('nav-open', isOpen);
        });

        navLinks?.forEach((link) => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');

                navToggle.classList.remove('is-open');

                navToggle.setAttribute('aria-expanded', 'false');

                navToggle.setAttribute('aria-label', 'Open navigation');

                document.body.classList.remove('nav-open');
            });
        });
    }

    /* =====================================================
       Z9 INTEREST FORM → WHATSAPP
    ===================================================== */

    const z9Form = document.querySelector('.denza-z9-form');

    if (z9Form) {
        z9Form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = z9Form.elements.name?.value.trim() || '';
            const whatsapp = z9Form.elements.whatsapp?.value.trim() || '';
            const email = z9Form.elements.email?.value.trim() || '';

            const message = [
                'Hi Dodo, I’m interested in the DENZA Z9.',
                '',
                `Name: ${name}`,
                `WhatsApp: ${whatsapp}`,
                email ? `Email: ${email}` : '',
                '',
                'I’d like to register my interest and receive more information about the Z9.',
            ]
                .filter(Boolean)
                .join('\n');

            const whatsappUrl = `https://wa.me/6288294745477?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        });
    }
});

/* =====================================================
   D9 EXPERIENCE SLIDER
===================================================== */

const d9ExperienceSlider = document.querySelector('.d9-experience-features');
const d9ExperienceSlides = document.querySelectorAll('.d9-experience-feature');
const d9ExperienceDots = document.querySelectorAll('.d9-experience-dot');

if (d9ExperienceSlider && d9ExperienceSlides.length && d9ExperienceDots.length) {
    const updateD9ExperienceIndicator = () => {
        const slideWidth = d9ExperienceSlider.clientWidth;

        const activeIndex = Math.round(d9ExperienceSlider.scrollLeft / slideWidth);

        d9ExperienceDots.forEach((dot, index) => {
            const isActive = index === activeIndex;

            dot.classList.toggle('is-active', isActive);

            if (isActive) {
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.removeAttribute('aria-current');
            }
        });
    };

    d9ExperienceSlider.addEventListener('scroll', updateD9ExperienceIndicator, { passive: true });

    d9ExperienceDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            d9ExperienceSlider.scrollTo({
                left: d9ExperienceSlider.clientWidth * index,
                behavior: 'smooth',
            });
        });
    });

    updateD9ExperienceIndicator();
}

/* =====================================================
   PAGE 1 — HERO MODEL CAROUSEL
===================================================== */

const heroModels = [
    {
        key: 'd9',
        number: '01',
        name: 'DENZA D9',
        positioning: 'Premium Electric MPV',
        exploreLabel: 'EXPLORE DENZA D9',
        exploreTarget: '#d9-experience',
    },
    {
        key: 'b5',
        number: '02',
        name: 'DENZA B5',
        positioning: 'A Bolder Perspective',
        exploreLabel: 'EXPLORE DENZA B5',
        exploreTarget: 'b5.html',
    },
    {
        key: 'z9',
        number: '03',
        name: 'DENZA Z9',
        positioning: 'A Higher Horizon',
        exploreLabel: 'EXPLORE DENZA Z9',
        exploreTarget: 'z9.html',
    },
];

const heroSection = document.querySelector('.hero');

if (heroSection) {
    const homepage = heroSection.closest('.homepage');
    const heroSlides = [...heroSection.querySelectorAll('.hero-slide')];
    const heroDots = [...heroSection.querySelectorAll('.hero-dot')];

    const heroModelNumber = heroSection.querySelector('.hero-model-number');
    const heroModelName = heroSection.querySelector('.hero-model-name');
    const heroModelPositioning = heroSection.querySelector('.hero-model-positioning');
    const heroExplore = heroSection.querySelector('.hero-explore-button');
    const heroPrev = heroSection.querySelector('.hero-prev');
    const heroNext = heroSection.querySelector('.hero-next');

    let activeIndex = 0;
    let imageTimer = null;
    let transitionToken = 0;

    const clearImageTimer = () => {
        if (imageTimer) {
            clearTimeout(imageTimer);
            imageTimer = null;
        }
    };

    const resetSlideVideo = (slide) => {
        const video = slide?.querySelector('.hero-slide-video');

        if (!video) return;

        video.pause();
        video.currentTime = 0;
        slide.classList.remove('is-video-playing');
    };

    const stopAllHeroVideos = () => {
        heroSlides.forEach(resetSlideVideo);
    };

    const playActiveHeroVideo = (token) => {
        if (token !== transitionToken) return;

        const slide = heroSlides[activeIndex];
        const video = slide?.querySelector('.hero-slide-video');

        if (!slide || !video) return;

        slide.classList.add('is-video-playing');
        homepage?.classList.add('is-hero-video-playing');

        video.currentTime = 0;

        const playPromise = video.play();

        if (playPromise?.catch) {
            playPromise.catch(() => {
                slide.classList.remove('is-video-playing');
                homepage?.classList.remove('is-hero-video-playing');
            });
        }
    };

    const scheduleActiveHeroVideo = () => {
        clearImageTimer();

        const token = transitionToken;

        imageTimer = window.setTimeout(() => {
            playActiveHeroVideo(token);
        }, 2500);
    };

    const setHeroModel = (nextIndex, { autoplay = true } = {}) => {
        clearImageTimer();
        transitionToken += 1;

        stopAllHeroVideos();
        homepage?.classList.remove('is-hero-video-playing');

        activeIndex = (nextIndex + heroModels.length) % heroModels.length;

        const model = heroModels[activeIndex];

        heroSlides.forEach((slide, index) => {
            const isActive = index === activeIndex;

            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });

        heroDots.forEach((dot, index) => {
            const isActive = index === activeIndex;

            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-selected', String(isActive));
        });

        if (heroModelNumber) {
            heroModelNumber.textContent = model.number;
        }

        if (heroModelName) {
            heroModelName.textContent = model.name;
        }

        if (heroModelPositioning) {
            heroModelPositioning.textContent = model.positioning;
        }

        if (heroExplore) {
            heroExplore.textContent = '';

            const label = document.createElement('span');
            label.textContent = model.exploreLabel;

            const arrow = document.createElement('span');
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '→';

            heroExplore.append(label, arrow);
            heroExplore.href = model.exploreTarget;
        }

        if (autoplay) {
            scheduleActiveHeroVideo();
        }
    };

    const advanceHeroModel = () => {
        setHeroModel(activeIndex + 1);
    };

    heroSlides.forEach((slide) => {
        const video = slide.querySelector('.hero-slide-video');

        video?.addEventListener('ended', () => {
            if (!slide.classList.contains('is-active')) return;

            slide.classList.remove('is-video-playing');
            homepage?.classList.remove('is-hero-video-playing');

            advanceHeroModel();
        });
    });

    heroPrev?.addEventListener('click', () => {
        setHeroModel(activeIndex - 1);
    });

    heroNext?.addEventListener('click', () => {
        setHeroModel(activeIndex + 1);
    });

    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setHeroModel(index);
        });
    });

    heroSection.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            setHeroModel(activeIndex - 1);
        }

        if (event.key === 'ArrowRight') {
            setHeroModel(activeIndex + 1);
        }
    });

    setHeroModel(0);
}
