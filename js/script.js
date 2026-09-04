/* =========================================================
   HOPE HAVEN CHILDREN'S HOME
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    const loader = document.getElementById("loader");

    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("hidden");
            }, 500);
        });
    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            if (nav.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        // Close menu when clicking a link

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("show");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =====================================================
       HEADER ON SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("hopeHavenTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (document.body.classList.contains("dark-mode")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    }

    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "hopeHavenTheme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();

        });

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchToggle = document.getElementById("searchToggle");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearch");
    const siteSearch = document.getElementById("siteSearch");
    const searchResults = document.getElementById("searchResults");


    const pages = [
        {
            name: "Home",
            url: "index.html",
            description: "Welcome to Hope Haven"
        },
        {
            name: "About Us",
            url: "about.html",
            description: "Learn about our mission and story"
        },
        {
            name: "Programs",
            url: "programs.html",
            description: "Explore our programs"
        },
        {
            name: "Our Children",
            url: "children.html",
            description: "Learn about our child support initiatives"
        },
        {
            name: "Gallery",
            url: "gallery.html",
            description: "View our gallery"
        },
        {
            name: "Donate",
            url: "donate.html",
            description: "Support our mission"
        },
        {
            name: "Volunteer",
            url: "volunteer.html",
            description: "Become a volunteer"
        },
        {
            name: "Contact",
            url: "contact.html",
            description: "Get in touch with us"
        }
    ];


    function openSearch() {

        if (!searchOverlay) return;

        searchOverlay.classList.add("show");

        document.body.classList.add("no-scroll");

        setTimeout(() => {

            if (siteSearch) {
                siteSearch.focus();
            }

        }, 200);

    }


    function closeSearchBox() {

        if (!searchOverlay) return;

        searchOverlay.classList.remove("show");

        document.body.classList.remove("no-scroll");

        if (siteSearch) {
            siteSearch.value = "";
        }

        if (searchResults) {
            searchResults.innerHTML = "";
        }

    }


    if (searchToggle) {
        searchToggle.addEventListener("click", openSearch);
    }

    if (closeSearch) {
        closeSearch.addEventListener("click", closeSearchBox);
    }


    if (searchOverlay) {

        searchOverlay.addEventListener("click", event => {

            if (event.target === searchOverlay) {
                closeSearchBox();
            }

        });

    }


    if (siteSearch) {

        siteSearch.addEventListener("input", () => {

            const query =
                siteSearch.value.trim().toLowerCase();

            if (!searchResults) return;

            if (!query) {

                searchResults.innerHTML = "";

                return;
            }


            const matches = pages.filter(page => {

                return (
                    page.name.toLowerCase().includes(query) ||
                    page.description.toLowerCase().includes(query)
                );

            });


            if (matches.length === 0) {

                searchResults.innerHTML = `
                    <p style="padding:12px;color:var(--muted);">
                        No pages found.
                    </p>
                `;

                return;
            }


            searchResults.innerHTML = matches.map(page => `

                <a href="${page.url}" class="search-result">

                    <strong>${page.name}</strong>

                    <small style="
                        display:block;
                        color:var(--muted);
                        margin-top:3px;
                    ">
                        ${page.description}
                    </small>

                </a>

            `).join("");

        });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeSearchBox();

            if (nav) {
                nav.classList.remove("show");
            }

        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach(link => {

        const linkPage =
            link.getAttribute("href");

        link.classList.remove("active");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop = document.getElementById("backTop");

    function handleBackTop() {

        if (!backTop) return;

        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    }

    window.addEventListener("scroll", handleBackTop);

    handleBackTop();


    if (backTop) {

        backTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    function animateCounter(counter) {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const duration = 1600;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            const eased =
                1 - Math.pow(1 - progress, 3);


            current =
                Math.floor(target * eased);


            counter.textContent =
                current.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        }


        requestAnimationFrame(updateCounter);

    }


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* =====================================================
       TOAST SYSTEM
    ===================================================== */

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const closeToast =
        document.getElementById("closeToast");


    function showToast(
        title = "Success",
        message = "Action completed successfully."
    ) {

        if (!toast) return;

        if (toastTitle) {
            toastTitle.textContent = title;
        }

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toast.classList.add("show");


        setTimeout(() => {

            toast.classList.remove("show");

        }, 4000);

    }


    if (closeToast) {

        closeToast.addEventListener("click", () => {

            toast.classList.remove("show");

        });

    }


    /* =====================================================
       DEMO FORM HANDLING
    ===================================================== */

    const forms =
        document.querySelectorAll(
            "form[data-demo-form]"
        );


    forms.forEach(form => {

        form.addEventListener("submit", event => {

            event.preventDefault();


            const formType =
                form.dataset.demoForm || "Form";


            const formData =
                new FormData(form);


            const data = {};

            formData.forEach((value, key) => {

                data[key] = value;

            });


            /*
             * Save submissions to localStorage.
             * This makes the project demonstrate
             * front-end data storage without a backend.
             */

            const storageKey =
                "hopeHaven_" + formType;


            const existing =
                JSON.parse(
                    localStorage.getItem(storageKey) || "[]"
                );


            existing.push({

                ...data,

                submittedAt:
                    new Date().toLocaleString()

            });


            localStorage.setItem(
                storageKey,
                JSON.stringify(existing)
            );


            showToast(
                "Thank You!",
                "Your form has been submitted successfully."
            );


            form.reset();

        });

    });


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletter =
        document.querySelector(
            "[data-newsletter]"
        );


    if (newsletter) {

        newsletter.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const emailInput =
                    newsletter.querySelector(
                        "input[type='email']"
                    );


                if (!emailInput ||
                    !emailInput.value.trim()) {

                    showToast(
                        "Missing Email",
                        "Please enter your email address."
                    );

                    return;

                }


                const emails =
                    JSON.parse(
                        localStorage.getItem(
                            "hopeHaven_newsletter"
                        ) || "[]"
                    );


                emails.push({

                    email:
                        emailInput.value.trim(),

                    subscribedAt:
                        new Date().toLocaleString()

                });


                localStorage.setItem(
                    "hopeHaven_newsletter",
                    JSON.stringify(emails)
                );


                showToast(
                    "Subscribed!",
                    "You have joined our newsletter."
                );


                newsletter.reset();

            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (!targetId ||
                targetId === "#") {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       PREVENT EMPTY DEMO LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

        });

    });

});
/* =========================================================
   FAQ ACCORDION
   ========================================================= */

document.querySelectorAll(".faq-question").forEach((question) => {

    question.addEventListener("click", () => {

        const item = question.closest(".faq-item");

        // Close other FAQ items
        document.querySelectorAll(".faq-item").forEach((otherItem) => {

            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }

        });

        // Toggle current item
        item.classList.toggle("active");

    });

});
/* =========================================================
   GALLERY FILTER
   ========================================================= */

const galleryFilters = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryFilters.forEach((filter) => {

    filter.addEventListener("click", () => {

        const selectedCategory = filter.dataset.filter;

        galleryFilters.forEach((button) => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        galleryItems.forEach((item) => {

            const itemCategory = item.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === itemCategory
            ) {

                item.classList.remove("hidden");

            } else {

                item.classList.add("hidden");

            }

        });

    });

});


/* =========================================================
   GALLERY LIGHTBOX
   ========================================================= */

const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentGalleryIndex = 0;


/* Get visible gallery items */

function getVisibleGalleryItems() {

    return Array.from(
        document.querySelectorAll(".gallery-item:not(.hidden)")
    );

}


/* Open image */

function openGalleryImage(index) {

    const items = getVisibleGalleryItems();

    if (!items.length) return;

    currentGalleryIndex = index;

    const item = items[currentGalleryIndex];

    const image = item.querySelector("img");

    const title = item.querySelector("h3");

    const category = item.querySelector("span");

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxTitle.textContent =
        title ? title.textContent : "";

    lightboxCategory.textContent =
        category ? category.textContent : "";

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* Gallery buttons */

document.querySelectorAll(".gallery-view").forEach((button) => {

    button.addEventListener("click", (event) => {

        event.stopPropagation();

        const items = getVisibleGalleryItems();

        const currentItem =
            button.closest(".gallery-item");

        const index =
            items.indexOf(currentItem);

        openGalleryImage(index);

    });

});


/* Previous */

lightboxPrev?.addEventListener("click", () => {

    const items = getVisibleGalleryItems();

    if (!items.length) return;

    currentGalleryIndex--;

    if (currentGalleryIndex < 0) {

        currentGalleryIndex = items.length - 1;

    }

    openGalleryImage(currentGalleryIndex);

});


/* Next */

lightboxNext?.addEventListener("click", () => {

    const items = getVisibleGalleryItems();

    if (!items.length) return;

    currentGalleryIndex++;

    if (currentGalleryIndex >= items.length) {

        currentGalleryIndex = 0;

    }

    openGalleryImage(currentGalleryIndex);

});


/* Close */

lightboxClose?.addEventListener("click", () => {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

});


/* Close by clicking background */

lightbox?.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }

});


/* Keyboard controls */

document.addEventListener("keydown", (event) => {

    if (!lightbox?.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }

    if (event.key === "ArrowLeft") {

        lightboxPrev?.click();

    }

    if (event.key === "ArrowRight") {

        lightboxNext?.click();

    }

});
/* =========================================================
   DONATION AMOUNT SELECTION
   ========================================================= */

const amountButtons =
    document.querySelectorAll(".amount-btn");

const customAmount =
    document.getElementById("customAmount");


amountButtons.forEach((button) => {

    button.addEventListener("click", () => {

        amountButtons.forEach((btn) => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        if (customAmount) {

            customAmount.value =
                button.dataset.amount;

        }

    });

});


/* Remove selected button when custom amount is typed */

customAmount?.addEventListener("input", () => {

    amountButtons.forEach((button) => {
        button.classList.remove("selected");
    });

});
