// Animated counters
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = start;
    }
  }, 16);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(document.getElementById('machinesCount'), 51);
      animateCounter(document.getElementById('toolsCount'), 15);
      animateCounter(document.getElementById('writeupsCount'), 51);
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.getElementById('about');
if (aboutSection) observer.observe(aboutSection);

// Writeup filter
const filterBtns = document.querySelectorAll('.filter-btn');
const writeupItems = document.querySelectorAll('.writeup-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active', 'btn-danger'));
    filterBtns.forEach(b => {
      if (!b.classList.contains('active')) {
        b.classList.add('btn-outline-' + (b.dataset.filter === 'all' ? 'danger' :
          b.dataset.filter === 'htb' ? 'danger' :
          b.dataset.filter === 'thm' ? 'info' :
          b.dataset.filter === 'easy' ? 'secondary' :
          b.dataset.filter === 'medium' ? 'warning' : 'danger'));
      }
    });
    btn.classList.add('active', 'btn-danger');
    btn.classList.remove('btn-outline-danger', 'btn-outline-info', 'btn-outline-secondary', 'btn-outline-warning');

    const filter = btn.dataset.filter;
    writeupItems.forEach(item => {
      if (filter === 'all' || item.dataset.tags.includes(filter)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Navbar shrink on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    nav.style.padding = '4px 0';
  } else {
    nav.style.padding = '';
  }
});

// Smooth active nav link highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('text-danger');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('text-danger');
    }
  });
});
