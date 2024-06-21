const inp = document.querySelector(".inpun-Search")
const list = document.querySelector(".exercises__list");


inp.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    document.querySelector(".exercises__list").innerHTML = " ";
    const resp = await fetch(
      `https://energyflow.b.goit.study/api/exercises?muscles=${document.querySelector(".exercises__list").dataset.muscles.toLowerCase()}&keyword=${inp.value.toLowerCase()}&page=1&limit=10`
    );
    const { results } = await resp.json();
    results.forEach(renderCartsSerh);
  }
});

function renderCartsSerh({ bodyPart, burnedCalories, name, rating, target, time }) {
    const str = name;
    const str2 = target;
    document.querySelector(".exercises__list").insertAdjacentHTML(
      "beforeend",
      `<li class="exercises__item-body">
                 <div class="top-sec">
                   <h2 class="h-top">WORKOUT</h2>
                   <p class="star-num">${Math.floor(rating)}.0</p>
                   <img class="img-svg-bb" src="../imgs/svgs/star-bo.svg" alt="">
                 <p class="text-start-to">Start</p>
                   <img class="img-svg-bb" src="../imgs/svgs/arrowstart-arrow.svg" alt="">
                 </div>
        
        
                 <div class="emdium-sec">
                   <img class="img-svg-bb-run" src="../imgs/svgs/running.svg" alt="">
                   <h2 class="h-medium">${str.slice(0, 19)}...</h2>
                 </div>
        
        
        <div class="buttom-sec">
                  <p class="text-buttom-all">Burned calories: <p class="text-buttom-no">${burnedCalories} / ${time} min</p></p>
                  <p class="text-buttom-all">Body part: <p class="text-buttom-no">${bodyPart}</p></p>
        <p class="text-buttom-all">Target: <p class="text-buttom-no">${str2.slice(0, 7)}...</p></p>
                 </div>
               </li>`
    );
  }