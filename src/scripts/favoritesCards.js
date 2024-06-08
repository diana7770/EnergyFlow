// function renderCarts({
//   bodyPart,
//   burnedCalories,
//   name,
//   rating,
//   target,
//   time,
//   _id,
// }) {
//   const str = name;
//   const str2 = target;
//   // console.log(str)
//   document.querySelector(".exercises__list").insertAdjacentHTML(
//     "beforeend",
//     `<li class="exercises__item-body" data-id=${_id}>
//                <div class="top-sec">
//                  <h2 class="h-top">WORKOUT</h2>
//                    <img class="" src="../imgs/svgs/trash.svg" alt="trash">
//                <p class="text-start-to">Start</p>
//                  <img class="img-svg-bb" src="../imgs/svgs/arrowstart-arrow.svg" alt="">
//                </div>

//                <div class="emdium-sec">
//                  <img class="img-svg-bb-run" src="../imgs/svgs/running.svg" alt="">
//                  <h2 class="h-medium">
//                  ${str.slice(0, 19)}...</h2>
//                </div>

//       <div class="buttom-sec">
//                 <p class="text-buttom-all">Burned calories: <p class="text-buttom-no">${burnedCalories} / ${time} min</p></p>
//                 <p class="text-buttom-all">Body part: <p class="text-buttom-no">${bodyPart}</p></p>
//       <p class="text-buttom-all">Target: <p class="text-buttom-no">${str2.slice(
//         0,
//         7
//       )}...</p></p>
//                </div>
//              </li>`
//   );
// }
