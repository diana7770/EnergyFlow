const list = document.querySelector(".exercises__list")


console.log(list)
list.addEventListener("click", async (event) => {
    list.textContent = " "
if (event.target.closest("li")) {
    const itemHide = event.target;
   let gg = itemHide.querySelector(".exercises__subtitle")

    const resp = await fetch(
        `https://energyflow.b.goit.study/api/exercises?&equipment=barbell&keyword=pull&page=1&`
      );
      const { results } = await resp.json();
      results.forEach(render);
      console.log(resp)
      console.log(itemHide)
      console.log(gg.textContent)
      console.log(results);
}
})




function render({ bodyPart, burnedCalories, equipment, rating, target, time }) {
  document.querySelector(".exercises__list").insertAdjacentHTML(
    "beforeend",
    `<li class="exercises__item-body">
               <div class="top-sec">
                 <h2 class="h-top">WORKOUT</h2>
                 <p class="star-num">${rating}</p>
                 <img class="img-svg-bb" src="../imgs/svgs/star-bo.svg" alt="">
               <p class="text-start-to">Start</p>
                 <img class="img-svg-bb" src="../imgs/svgs/arrowstart-arrow.svg" alt="">
               </div>
      
      
               <div class="emdium-sec">
                 <img class="img-svg-bb-run" src="../imgs/svgs/running.svg" alt="">
                 <h2 class="h-medium">${equipment}</h2>
               </div>
      
      
      <div class="buttom-sec">
                <p class="text-buttom-all">Burned calories: <p class="text-buttom-no">${burnedCalories} / ${time} min</p></p>
                <p class="text-buttom-all">Body part: <p class="text-buttom-no">${bodyPart}</p></p>
      <p class="text-buttom-all">Target: <p class="text-buttom-no">${target}</p></p>
               </div>
             </li>`
  );
}

