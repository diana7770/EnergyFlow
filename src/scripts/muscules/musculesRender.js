async function renderMuscules() {
  function render({ name, filter, imgUrl }) {
    document.querySelector(".exercises__list").insertAdjacentHTML(
      "beforeend",
      `<li class="exercises__item" style="background-image: url(${imgUrl})">
    <div>
      <h3 class="exercises__subtitle">${name}</h3>
      <p class="exercises__text">${filter}</p>
    </div>
  </li>`
    );
  }
  const resp = await fetch(
    "https://energyflow.b.goit.study/api/filters?filter=Muscles&page=1&limit=12"
  );
  const { results } = await resp.json();
  results.forEach(render);
}
renderMuscules();
