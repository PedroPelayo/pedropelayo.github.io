document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initContactForm();

});

/* =========================================================
   MENÚ HAMBURGUESA
========================================================= */
function initMobileMenu() {
        // Mobile Menu Toogle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', String(isOpen))
            menuBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');

            menuBtn.textContent = isOpen ? '✕' : '☰';
        });

        // Cerrar al seleccionar un enlace

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.setAttribute('aria-label', 'Abrir menú');

                menuBtn.textContent = '☰';
            });
        });

        // Cerrar con Escape
        document.addEventListener('keydown', event => {

            if (event.key === 'Escape') {

                navLinks.classList.remove('active');

                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.setAttribute('aria-label', 'Abrir menú');

                menuBtn.textContent = '☰';
            }
        });
    }
}
    

// =========================================================
// FORMULARIO DE CONTACTO — TIP CONSULTING
// Conexión existente con Google Apps Script
// =========================================================

function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const status = document.getElementById("form-status");
    const btn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function(e) {

        e.preventDefault();
        
        if (btn.disabled) return;

        const data = new FormData(form);

        btn.disabled = true;
        btn.textContent = "Enviando..."

        if (status) {
            status.style.display = "none";
        }

        fetch("https://script.google.com/macros/s/AKfycbyOAdoPvfplsJUal97dnY2HGG9cJ1Zre2woadiDqPwQdu3ixqjv99SFiK-mv5cxPMKu/exec", {
            method: "POST",
            body: data
        })

        .then(response =>{
            if (status) {
                status.style.display = "block";
            }

            if (response.status === "ok") {
                if (status) {
                    status.style.color = "green";
                    status.textContent = result.message || "Mensaje enviado correctamente.";
                }
                form.reset();
            } else {
                if (status) {
                    status.style.color = "red";
                    status.textContent = result.message || "Error en el envío.";
                }
            }

        })

        .catch(error => {
            console.error("Error:", error);
            if (status) {
                status.style.display = "block";
                status.style.color = "red";
                status.textContent = "Error en la conexión de red";
            }
        })
        .finally(() => {
            // <-- CRUCIAL: Liberar el botón pase lo que pase (éxito o error)
            btn.disabled = false;
            btn.textContent = "Enviar consulta";
        });
        
    });
}
