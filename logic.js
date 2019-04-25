document.querySelector(".btn-rules").addEventListener("click", function() {
  document.querySelector(".hint").classList.toggle('hint-show');
});

document.querySelector(".hint").addEventListener("click", function() {
  this.classList.remove("hint-show");
});