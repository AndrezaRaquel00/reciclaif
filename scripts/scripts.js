/*window.onscroll = function() {
    var nav1 = document.getElementById("navbar");
    if (window.pageYOffset > 50) {
        nav1.classList.add("scrolled");
    } else {
        nav1.classList.remove("scrolled");
    }
};
#nav1.scrolled {
    background: #222; /* Cor de fundo alterada quando rolada */
/*document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.headermenu');

    function changeNavOnScroll() {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        let current = '';

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    changeNavOnScroll();
    window.addEventListener('scroll', changeNavOnScroll);
});*/

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.headermenu');
    const sections = document.querySelectorAll('section[id]');

    function changeNavOnScroll() {
        const scrollPos = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', changeNavOnScroll);
    changeNavOnScroll(); // Atualiza o estado do menu quando a página é carregada
});

