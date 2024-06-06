document
  .querySelector("[data-review-close]")
  .addEventListener("click", (e) =>
    e.currentTarget.parentNode.parentNode.classList.add(
      "review-backdrop--hidden"
    )
  );
