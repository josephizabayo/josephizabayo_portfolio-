const curDot  = document.getElementById('cur');
const curRing = document.getElementById('crng');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  curDot.style.left = mouseX + 'px';
  curDot.style.top  = mouseY + 'px';
  curDot.classList.add('active');
  curRing.classList.add('active');

  const hero = document.getElementById('hero');
  const heroRect = hero.getBoundingClientRect();
  const inHero = mouseY >= heroRect.top && mouseY <= heroRect.bottom;

  if (inHero) {
    const panelW   = window.innerWidth * 0.52;
    const topEdge  = panelW * 1.0;
    const botEdge  = panelW * 0.88;
    const progress = (mouseY - heroRect.top) / heroRect.height;
    const diagX    = topEdge + (botEdge - topEdge) * progress;
    const onBlack  = mouseX > diagX;
    curDot.classList.toggle('on-dark',  onBlack);
    curRing.classList.toggle('on-dark', onBlack);
  } else {
    curDot.classList.remove('on-dark');
    curRing.classList.remove('on-dark');
  }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.13;
  ringY += (mouseY - ringY) * 0.13;
  curRing.style.left = ringX + 'px';
  curRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .sk-card, .port-item').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    curDot.style.transform  = 'translate(-50%, -50%) scale(2.8)';
    curRing.style.width     = '52px';
    curRing.style.height    = '52px';
  });
  el.addEventListener('mouseleave', function() {
    curDot.style.transform  = 'translate(-50%, -50%) scale(1)';
    curRing.style.width     = '32px';
    curRing.style.height    = '32px';
  });
});

const navbar = document.getElementById('nav');
window.addEventListener('scroll', function() {
  navbar.classList.toggle('solid', window.scrollY > 60);
});

const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) entry.target.classList.add('vis');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.rev').forEach(function(el) {
  revealObserver.observe(el);
});

function filt(category, clickedBtn) {
  document.querySelectorAll('.ptab').forEach(function(tab) { tab.classList.remove('on'); });
  clickedBtn.classList.add('on');
  document.querySelectorAll('.port-item').forEach(function(item) {
    item.style.display = (category === 'all' || item.dataset.c === category) ? 'block' : 'none';
  });
}
// Formspree contact form handling

const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

if(form){ // ensure form exists
  form.addEventListener("submit", async function(e) {
    e.preventDefault(); // stop default redirect

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        successMessage.style.display = "block"; // show success
        form.reset(); // clear inputs
      } else {
        alert("Something went wrong. Try again.");
      }

    } catch (error) {
      alert("Error sending message.");
    }
  });
}