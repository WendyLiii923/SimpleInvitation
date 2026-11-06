// =========================
// RSVP 表單
// =========================

const form = document.querySelector('#rsvpForm');
const successMessage = document.querySelector('#successMessage');
const submitBtn = document.querySelector('#submitBtn');

const googleFormTarget = document.querySelector('#googleFormTarget');

// =========================
// 出席意願
// =========================

const attendYes = document.querySelector('#attendYes');
const attendNo = document.querySelector('#attendNo');
const attendDetails = document.querySelector('#attendDetails');

const people = document.querySelector('#people');
const adult = document.querySelector('#adult');
const child = document.querySelector('#child');

function showAttendDetails() {
  const detailFields = attendDetails.querySelectorAll(
    'input, textarea, select',
  );

  attendDetails.classList.remove('d-none');

  attendYes.classList.add('active');

  detailFields.forEach((field) => {
    field.disabled = false;
  });

  adult.required = true;
  child.required = false;

  updatePeople();
}

attendYes.addEventListener('click', showAttendDetails);

// =========================
// 自動計算出席人數
// =========================

const peopleValue = document.querySelector('#peopleValue');

function updatePeople() {
  const adultCount = parseInt(adult.value) || 0;
  const childCount = parseInt(child.value) || 0;

  const total = adultCount + childCount;

  people.textContent = total;
  peopleValue.value = total;
}

adult.addEventListener('change', updatePeople);
child.addEventListener('change', updatePeople);

// =========================
// 表單送出
// =========================

form.addEventListener('submit', function (event) {
  const submitter = event.submitter;

  if (submitter === attendNo) {
    document.querySelector('#attendance').value = '不參加';

    // 清除「我要參加」的選取狀態
    attendYes.classList.remove('active');

    attendNo.disabled = true;
    attendNo.textContent = '送出中…';
  } else {
    document.querySelector('#attendance').value = '參加';

    submitBtn.disabled = true;
    submitBtn.textContent = '送出中…';
  }

  setTimeout(() => {
    form.classList.add('d-none');
    successMessage.classList.remove('d-none');
  }, 1200);
});

// =========================
// Navbar
// =========================

const navbarCollapse = document.querySelector('#mainNavbar');
const navbarLinks = document.querySelectorAll('#mainNavbar .nav-link');
const navbar = document.querySelector('.navbar');

navbarLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (!target) return;

    // 計算 Navbar 實際高度
    const navbarHeight = navbar.offsetHeight;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    // 平滑滾動
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    // 手機版 Navbar 自動收合
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

    bsCollapse.hide();
  });
});
