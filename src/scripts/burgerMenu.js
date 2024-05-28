function toggleBurger() {
  document
    .querySelector("[data-burger-backdrop]")
    .classList.toggle("burger--hidden");
}

document
  .querySelector("[data-burger-open]")
  .addEventListener("click", toggleBurger);

document
  .querySelector("[data-burger-close]")
  .addEventListener("click", toggleBurger);
