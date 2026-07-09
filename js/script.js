document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // 🍔 MENÚ LATERAL
    // ==============================
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");
    const overlay = document.getElementById("overlay");
    const links = document.querySelectorAll(".main-nav a");

    const openMenu = () => {
        nav.classList.add("active");
        overlay.classList.add("active");
    };

    const closeMenu = () => {
        nav.classList.remove("active");
        overlay.classList.remove("active");
    };

    if (toggle) toggle.addEventListener("click", openMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);

    // cerrar al hacer click en link
    links.forEach(link => {
        link.addEventListener("click", closeMenu);
    });


    // ==============================
    // 🌐 TEXTO DINÁMICO MEJORADO
    // ==============================
    // ===== TRANSICIÓN IDIOMA (NUEVA LÓGICA) =====
    // Obtener todos los elementos del menú que cambian de idioma
    const menuItems = document.querySelectorAll(".menu-item");

    let showEnglish = true;

    setInterval(() => {
        menuItems.forEach(item => {
            const en = item.querySelector(".en");
            const es = item.querySelector(".es");

            if (!en || !es) return;

            if (showEnglish) {
                en.classList.add("active");
                es.classList.remove("active");
            } else {
                en.classList.remove("active");
                es.classList.add("active");
            }
        });

        showEnglish = !showEnglish;

    }, 4000);



    // ==============================
    // 🧩 CARDS INTERACTIVAS
    // ==============================
    const cards = document.querySelectorAll(".services-matrix__card");
    const detail = document.getElementById("service-detail");

    cards.forEach(card => {
        card.addEventListener("click", () => {

            const target = card.dataset.target;

            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            const content = document.querySelector(`.services-detail__item[data-id="${target}"]`);

            if (content && detail) {
                detail.innerHTML = content.innerHTML;
                detail.scrollIntoView({ behavior: "smooth" });
            }
        });
    });


    // ==============================
    // 📩 MODAL
    // ==============================
    const modal = document.getElementById("contact-modal");
    const openMenuBtn = document.getElementById("open-contact");
    const openCTA = document.getElementById("open-contact-cta");
    const closeBtn = document.querySelector(".close-modal");

    const openModal = () => {
        if (modal) modal.style.display = "flex";
    };
    const closeModal = () => {
        if (modal) modal.style.display = "none";
    };

    openMenuBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
    });
    openCTA?.addEventListener("click", (e) =>{
        e.preventDefault();
        openModal();
    });
    closeBtn?.addEventListener("click", closeModal);

    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // ==============================
    // 📧 FORMULARIO
    // ==============================

    const form = document.getElementById("contact-form");

    if(form){

        const status = document.getElementById("form-status");
        const btn = form.querySelector(".send-btn");

        form.addEventListener("submit",function(e){

            e.preventDefault();

            if(btn.disabled) return;

            const data = new FormData(form);

            btn.disabled=true;
            btn.textContent="Enviando...";
            status.style.display="none";

            fetch("https://script.google.com/macros/s/AKfycbyOAdoPvfplsJUal97dnY2HGG9cJ1Zre2woadiDqPwQdu3ixqjv99SFiK-mv5cxPMKu/exec", {
                method:"POST",
                body:data
            })
            .then(res=>{
                if(!res.ok) throw new Error("Error HTTP");
                return res.json();
            })
            .then(data => {

                status.style.display="block";

                if(data.status==="ok"){
                    status.style.color="green";
                    status.textContent=data.message || "Mensaje enviado correctamente ✅";

                    form.reset();
                    closeModal();

                } else {
                    status.style.color = "red";
                    status.textContent = data.message || "Error en el envío ❌";
                }
            })
            .catch(() => {
                status.style.display="block";
                status.style.color="red";
                status.textContent="Error de conexión ❌";

            })
            .finally(() => {
                btn.disabled = false;
                btn.textContent = "Enviar";
            });
        });

    }

});
