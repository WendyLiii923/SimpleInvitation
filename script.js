const form = document.querySelector("#rsvpForm");
const successMessage = document.querySelector("#successMessage");
const submitBtn = document.querySelector("#submitBtn");

const googleFormTarget = document.querySelector("#googleFormTarget");


form.addEventListener("submit", function () {

  // 防止重複送出
  submitBtn.disabled = true;

  submitBtn.textContent = "送出中…";


  /*
   * Google Form 會在 iframe 裡收到資料。
   *
   * 因為表單 target 指向 googleFormTarget，
   * 所以不會離開目前的網站。
   */

  setTimeout(() => {

    form.classList.add("d-none");

    successMessage.classList.remove("d-none");

  }, 1200);

});