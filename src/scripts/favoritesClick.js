const btnFavorite = document.querySelector(".favorites__btn");
const btnHome = document.querySelector(".home__btn");
const main = document.querySelector("main");

btnFavorite.addEventListener("click", function () {
  btnFavorite.style.background = "#fff";
  btnHome.style.background = "none";

  main.innerHTML = `
  <div class="text-quote-box">
      <h3 class="text-up-main">Quote of the day</h3>
      <p class="quote__text">
        A lot of times I find that people who are blessed with the most talent
        don't ever develop that attitude, and the ones who aren't blessed in
        that way are the most competitive and have the biggest heart.
      </p>
      <h5 class="text-down-main">Tom Brady</h5>
    </div>`;
});

btnHome.addEventListener("click", function () {
  btnHome.style.background = "#fff";
  btnFavorite.style.background = "none";
});
