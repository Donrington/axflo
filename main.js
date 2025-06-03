
  function toggleNav() {
            const mobileNav = document.querySelector('.mobile-nav');
            const toggleBtn = document.querySelector('.toggle-btn');
            const overlay = document.querySelector('.overlay');
            
            const isActive = mobileNav.classList.contains('active');
            
            if (!isActive) {
                // Open mobile nav
                mobileNav.classList.add('active');
                toggleBtn.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add entrance animation to mobile nav items
                const navItems = document.querySelectorAll('.mobile-nav__links a');
                navItems.forEach((item, index) => {
                    item.style.transform = 'translateX(-50px)';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.transform = 'translateX(0)';
                        item.style.opacity = '1';
                    }, index * 100 + 200);
                });
            } else {
                // Close mobile nav
                mobileNav.classList.remove('active');
                toggleBtn.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        // Enhanced Scroll Handler with Smooth Transitions
        function handleScroll() {
            const header = document.querySelector('.header');
            const scrollThreshold = 50;
            const currentScrollY = window.scrollY;
            
            // Debounce scroll events for better performance
            if (window.scrollTimeout) {
                clearTimeout(window.scrollTimeout);
            }
            
            window.scrollTimeout = setTimeout(() => {
                if (currentScrollY > scrollThreshold) {
                    if (!header.classList.contains('scrolled')) {
                        header.classList.add('scrolled');
                        
                        // Trigger logo transition
                        const lightLogo = document.querySelector('.logo-light');
                        const darkLogo = document.querySelector('.logo-dark');
                        
                        if (lightLogo && darkLogo) {
                            lightLogo.style.opacity = '0';
                            darkLogo.style.opacity = '1';
                        }
                    }
                } else {
                    if (header.classList.contains('scrolled')) {
                        header.classList.remove('scrolled');
                        
                        // Revert logo transition
                        const lightLogo = document.querySelector('.logo-light');
                        const darkLogo = document.querySelector('.logo-dark');
                        
                        if (lightLogo && darkLogo) {
                            lightLogo.style.opacity = '1';
                            darkLogo.style.opacity = '0';
                        }
                    }
                }
            }, 10);
        }

        // Smooth Scroll for Anchor Links
        function initSmoothScroll() {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const targetId = link.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const offsetTop = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile nav if open
                        if (document.querySelector('.mobile-nav').classList.contains('active')) {
                            toggleNav();
                        }
                        
                        // Add active state to clicked link
                        document.querySelectorAll('.nav__links a, .mobile-nav__links a').forEach(l => {
                            l.classList.remove('active');
                        });
                        link.classList.add('active');
                    }
                });
            });
        }

        // Close mobile nav when clicking outside
        function handleOutsideClick(e) {
            const mobileNav = document.querySelector('.mobile-nav');
            const toggleBtn = document.querySelector('.toggle-btn');
            
            if (mobileNav.classList.contains('active') && 
                !mobileNav.contains(e.target) && 
                !toggleBtn.contains(e.target)) {
                toggleNav();
            }
        }

        // Handle window resize
        function handleResize() {
            const mobileNav = document.querySelector('.mobile-nav');
            if (window.innerWidth > 1000 && mobileNav.classList.contains('active')) {
                toggleNav();
            }
        }

        // Intersection Observer for Active Navigation States
        function initActiveNavigation() {
            const sections = document.querySelectorAll('section, [id]');
            const navLinks = document.querySelectorAll('.nav__links a, .mobile-nav__links a');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentId = entry.target.getAttribute('id');
                        
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${currentId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, {
                threshold: 0.6,
                rootMargin: '-100px 0px -100px 0px'
            });
            
            sections.forEach(section => {
                if (section.id) {
                    observer.observe(section);
                }
            });
        }

        // Initialize all functionality when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Add scroll event listener with throttling
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
            
            // Initialize other functionality
            initSmoothScroll();
            initActiveNavigation();
            
            // Add event listeners
            document.addEventListener('click', handleOutsideClick);
            window.addEventListener('resize', handleResize);
            
            // Add keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const mobileNav = document.querySelector('.mobile-nav');
                    if (mobileNav.classList.contains('active')) {
                        toggleNav();
                    }
                }
            });
            
            // Initial call to set correct state
            handleScroll();
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.5s ease-in-out';
        });
        

        