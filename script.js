// التفاعلات الأساسية: قائمة الجوال، تفاصيل اللغات، والاختبار القصير.
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function closeMenu() {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "فتح قائمة التنقل");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "فتح قائمة التنقل" : "إغلاق قائمة التنقل");
  mainNav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
    mainNav.querySelectorAll("a").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

document.querySelectorAll(".detail-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    detail.hidden = isExpanded;
    button.firstChild.textContent = isExpanded ? "اعرف أكثر " : "إخفاء التفاصيل ";
  });
});

// يعرض نتيجة السؤال ويمنع تغيير الإجابة بعد الاختيار.
const quizOptions = document.querySelectorAll(".quiz-option");
const quizFeedback = document.querySelector(".quiz-feedback");

quizOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const isCorrect = option.dataset.correct === "true";
    option.classList.add(isCorrect ? "correct" : "incorrect");
    quizFeedback.textContent = isCorrect
      ? "إجابة صحيحة! تحقّق من المرسل ولا تضغط على الروابط المشبوهة."
      : "ليس الخيار الأكثر أمانًا. الأفضل تجنّب الرابط والتحقّق من المرسل.";
    quizFeedback.classList.toggle("error", !isCorrect);
    quizOptions.forEach((item) => {
      item.disabled = true;
      if (item.dataset.correct === "true") item.classList.add("correct");
    });
  });
});

// إظهار العناصر عند الوصول إليها، مع دعم المتصفحات التي لا توفر المراقب.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 420);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

// يتحقق من الاسم والبريد، ويعرض نتيجة تجريبية دون إرسال البيانات.
const contactForm = document.querySelector("#contact-form");
const contactName = document.querySelector("#contact-name");
const formStatus = document.querySelector("#form-status");

contactName.addEventListener("input", () => {
  contactName.setCustomValidity("");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.hidden = true;
  contactName.setCustomValidity("");

  const name = contactName.value.trim();
  if (name.length < 2 || !/[A-Za-z\u00C0-\u024F\u0600-\u06FF]/.test(name)) {
    contactName.setCustomValidity("يرجى إدخال اسم صحيح يتكوّن من حرفين على الأقل.");
    contactName.reportValidity();
    return;
  }

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  formStatus.textContent = "تم التحقق من البيانات بنجاح. هذا نموذج تجريبي، ولم تُرسل بياناتك.";
  formStatus.hidden = false;
});
