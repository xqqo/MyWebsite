// إظهار انتقال قصير قبل فتح صفحة الموقع الرئيسية.
const continueLink = document.querySelector(".continue-button");

continueLink.addEventListener("click", (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;

  event.preventDefault();
  document.body.classList.add("is-leaving");
  window.setTimeout(() => {
    window.location.href = continueLink.href;
  }, 180);
});
