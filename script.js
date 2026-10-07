const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeColor = document.querySelector('meta[name="theme-color"]');
let savedTheme = null;

try {
  savedTheme = localStorage.getItem('nguyet-anh-theme');
} catch {
}

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

function updateThemeButton() {
  const isDark = document.body.classList.contains('dark-mode');
  themeIcon.textContent = isDark ? '☀' : '☾';
  const label = isDark ? 'Bật giao diện sáng' : 'Bật giao diện tối';
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
  themeColor.content = isDark ? '#181916' : '#f5f5f1';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  try {
    localStorage.setItem('nguyet-anh-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  } catch {
  }
  updateThemeButton();
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
updateThemeButton();

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });

    projectCards.forEach((card) => {
      card.hidden = selectedFilter !== 'all' && card.dataset.category !== selectedFilter;
    });
  });
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

document.querySelector('#check-form').addEventListener('click', () => {
  if (contactForm.reportValidity()) {
    formStatus.textContent = 'Biểu mẫu hợp lệ. Đây là bản demo; không có tin nhắn nào được gửi.';
  }
});

contactForm.addEventListener('input', () => {
  formStatus.textContent = '';
});
