import popupListener from "../popups/popupOpen";

export function renderCartsFn() {
  const list = document.querySelector(".exercises__list");
  const title = document.querySelector(".exercises__title");
  const spanFis = document.getElementById("span-ss");
  const boxSserh = document.getElementById("box-searh");
  const renmSpan = document.querySelector(".renm-sp");
  const pagination = document.querySelector(".pagination");

  // function decreaseNumber() {
  //     console.log('Currently at ' + oneClick);
  //     oneClick -= 1;
  // }

  // setInterval(decreaseNumber, 2000);
  list.addEventListener("click", async (event) => {
    console.log(123);
    if (event.target.closest("li")) {
      const itemHide = event.target;
      let nameCart = itemHide.querySelector(".exercises__subtitle").textContent;
      list.remove();
      document
        .querySelector(".exercises .container")
        .insertAdjacentHTML(
          "beforeend",
          `<ul class=exercises__list data-muscles=${nameCart}></ul>`
        );

      pagination.remove();

      spanFis.classList.remove("unFisitble");
      boxSserh.classList.remove("unFisitble");
      list.innerHTML = " ";

      // console.log(renmSpan)
      renmSpan.textContent = nameCart;
      console.log(nameCart.toLowerCase());
      Array.from(document.querySelector(".filters").children).forEach((item) =>
        item.classList.remove("filters__item--active")
      );
      document
        .querySelector(".filters")
        .children[1].classList.add("filters__item--active");
      const resp = await fetch(
        `https://energyflow.b.goit.study/api/exercises?muscles=${nameCart.toLowerCase()}&page=1&limit=10`
      );
      const data = await resp.json();
      console.log(data);
      document
        .querySelector(".exercises .container")
        .insertAdjacentHTML("beforeend", "<ul class=pagination></ul>");
      for (let i = 1; i <= data.totalPages; i++) {
        console.log(1);
        document.querySelector(".pagination").insertAdjacentHTML(
          "beforeend",
          `<li class="pagination__item">
      <p class="pagination__text">${i}</p>
    </li>`
        );
        if (i === 1) {
          document
            .querySelector(".pagination__item")
            .classList.add("pagination__item--active");
        }
      }
      data.results.forEach(renderCarts);
      popupListener();
      document
        .querySelector(".pagination")
        .addEventListener("click", async (e) => {
          console.log(123);
          if (e.target.nodeName === "LI" || e.target.nodeName === "P") {
            let newPage = 1;
            if (
              e.target.classList.contains("pagination__item--active") ||
              e.target.parentNode.classList.contains("pagination__item--active")
            )
              return;
            if (e.target.nodeName === "LI") {
              Array.from(e.target.parentNode.children).forEach((child) =>
                child.classList.remove("pagination__item--active")
              );
              e.target.classList.add("pagination__item--active");

              newPage = Number(e.target.querySelector("p").textContent);
            } else {
              Array.from(e.target.parentNode.parentNode.children).forEach(
                (child) => child.classList.remove("pagination__item--active")
              );
              e.target.parentNode.classList.add("pagination__item--active");
              newPage = Number(e.target.textContent);
            }
            document.querySelector(".exercises__list").innerHTML = "";
            const resp = await fetch(
              `https://energyflow.b.goit.study/api/exercises?muscles=${document
                .querySelector(".exercises__list")
                .dataset.muscles.toLowerCase()}&page=${newPage}&limit=10`
            );
            const { results } = await resp.json();
            results.forEach(renderCarts);
          }
        });
    }
  });

  function renderCarts({
    bodyPart,
    burnedCalories,
    name,
    rating,
    target,
    time,
    _id,
  }) {
    const str = name;
    const str2 = target;
    // console.log(str)
    document.querySelector(".exercises__list").insertAdjacentHTML(
      "beforeend",
      `<li class="exercises__item-body" data-id=${_id}>
               <div class="top-sec">
                 <h2 class="h-top">WORKOUT</h2>
                 <p class="star-num">${rating.toFixed(1)}</p>
                 <img class="img-svg-bb" src="../imgs/svgs/star-bo.svg" alt="">
               <p class="text-start-to">Start</p>
                 <img class="img-svg-bb" src="../imgs/svgs/arrowstart-arrow.svg" alt="">
               </div>
      
      
               <div class="emdium-sec">
                 <img class="img-svg-bb-run" src="../imgs/svgs/running.svg" alt="">
                 <h2 class="h-medium">
                 ${str.slice(0, 19)}...</h2>
               </div>
      
      
      <div class="buttom-sec">
                <p class="text-buttom-all">Burned calories: <p class="text-buttom-no">${burnedCalories} / ${time} min</p></p>
                <p class="text-buttom-all">Body part: <p class="text-buttom-no">${bodyPart}</p></p>
      <p class="text-buttom-all">Target: <p class="text-buttom-no">${str2.slice(
        0,
        7
      )}...</p></p>
               </div>
             </li>`
    );
  }
}
renderCartsFn();
