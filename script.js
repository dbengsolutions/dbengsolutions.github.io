document.addEventListener("DOMContentLoaded", () => {
  // --- Menu responsivo ---
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // --- Carrossel de imagens nos Cases ---
  document.querySelectorAll('.carousel').forEach(carousel => {
    const imgElement = carousel.querySelector('img');
    const images = carousel.dataset.images.split(',');
    let index = 0;
    let interval;

    // Inicia carrossel ao passar o mouse
    carousel.addEventListener('mouseenter', () => {
      interval = setInterval(() => {
        index = (index + 1) % images.length;
        imgElement.src = images[index];
      }, 1000); // troca a cada 1 segundo
    });

    // Para carrossel ao sair com o mouse
    carousel.addEventListener('mouseleave', () => {
      clearInterval(interval);
      index = 0;
      imgElement.src = images[0]; // volta para a primeira imagem
    });
  });

  // --- Ajuste de tamanho uniforme para todas as imagens ---
  const caseImages = document.querySelectorAll('.case-imagem img');
  caseImages.forEach(img => {
    img.style.width = "300px";      // largura fixa
    img.style.height = "300px";     // altura fixa
    img.style.objectFit = "cover";  // mantém proporção cortando excesso
    img.style.borderRadius = "12px";
  });

  // --- Autoplay em loop para vídeos nos Cases ---
  document.querySelectorAll('.video-case').forEach(video => {
    video.addEventListener('mouseenter', () => {
      video.play(); // inicia autoplay
    });

    video.addEventListener('mouseleave', () => {
      video.pause();        // pausa
      video.currentTime = 0; // volta ao início
    });
  });

  // --- Envio do formulário de contato via JS ---
  const form = document.getElementById("form-contato");
  const msg = document.getElementById("mensagem-sucesso");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // impede redirecionamento padrão
      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          msg.style.display = "block"; // mostra mensagem
          form.reset(); // limpa formulário
        } else {
          alert("Erro ao enviar. Tente novamente.");
        }
      } catch (error) {
        alert("Erro de conexão. Tente novamente.");
      }
    });
  }
});
