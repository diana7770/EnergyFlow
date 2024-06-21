function renderFavorites() {
  JSON.parse(localStorage.getItem("favorites")).forEach(
    ({ _id, target, name, burnedCalories, bodyPart, time }) => {
      document.querySelector(".exercises__list").insertAdjacentHTML(
        "beforeend",
        `<li class="exercises__item-body" data-id=${_id}>
                   <div class="top-sec">
                     <h2 class="h-top">WORKOUT</h2>
                     <img class=favorites__trash src=./imgs/svgs/trash.svg alt=trash/>
                   <p class="text-start-to">Start</p>
                     <img class="img-svg-bb" src="../imgs/svgs/arrowstart-arrow.svg" alt="">
                   </div>
          
          
                   <div class="emdium-sec">
                     <img class="img-svg-bb-run" src="../imgs/svgs/running.svg" alt="">
                     <h2 class="h-medium">
                     ${name.slice(0, 19)}...</h2>
                   </div>
          
          
          <div class="buttom-sec">
                    <p class="text-buttom-all">Burned calories: <p class="text-buttom-no">${burnedCalories} / ${time} min</p></p>
                    <p class="text-buttom-all">Body part: <p class="text-buttom-no">${bodyPart}</p></p>
          <p class="text-buttom-all">Target: <p class="text-buttom-no">${target.slice(
            0,
            7
          )}...</p></p>
                   </div>
                 </li>`
      );
    }
  );
}

function deleteFromFavoritesFn(e) {
  if (!e.target.classList.contains("favorites__trash")) return;
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const idToDelete = e.target.closest("li").dataset.id;
  const index = favorites.findIndex((favorite) => favorite._id === idToDelete);
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  document.querySelector(".exercises__list").innerHTML = "";
  renderFavorites();
}


  if (localStorage.getItem("favorites")) {
    if (!JSON.parse(localStorage.getItem("favorites"))[0]) {
       
      document
      .querySelector(".favorites__content")
      .insertAdjacentHTML(
        "beforeend",
        "<img class='favorites__svg' src='./imgs/dumbbell.png' alt='dumbbell' /><p class='favorites__text'>It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.</p>"
      );
    }
    renderFavorites();
    document
      .querySelector(".exercises__list")
      .addEventListener("click", deleteFromFavoritesFn);
  } else {
    document
      .querySelector(".favorites__content")
      .insertAdjacentHTML(
        "beforeend",
        "<img class='favorites__svg' src='./imgs/dumbbell.png' alt='dumbbell' /><p class='favorites__text'>It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.</p>"
      );
  }