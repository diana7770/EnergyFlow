function render({ name, filter, imgUrl }) {
  document.querySelector(".exercises__list").insertAdjacentHTML(
    "beforeend",
    `<li class="exercises__item" style="background-image: linear-gradient(rgba(16, 16, 16, 0.7), rgba(16, 16, 16, 0.7) ), url(${imgUrl})">
     
    <div>
      <h3 class="exercises__subtitle">${
        name.charAt(0).toUpperCase() + name.slice(1)
      }</h3>
      <p class="exercises__text">${filter}</p>
    </div>
  </li>`
  );
}

export default async function renderMuscules() {
  const resp = await fetch(
    "https://energyflow.b.goit.study/api/filters?filter=Muscles&page=1&limit=12"
  );
  const data = await resp.json();
  data.results.forEach(render);
  return data.totalPages;
}
document.querySelector(".pagination").addEventListener("click", async (e) => {
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
      Array.from(e.target.parentNode.parentNode.children).forEach((child) =>
        child.classList.remove("pagination__item--active")
      );
      e.target.parentNode.classList.add("pagination__item--active");
      newPage = Number(e.target.textContent);
    }
    document.querySelector(".exercises__list").innerHTML = "";
    const resp = await fetch(
      `https://energyflow.b.goit.study/api/filters?filter=Muscles&page=${newPage}&limit=12`
    );
    const { results } = await resp.json();
    results.forEach(render);
  }
});
renderMuscules();
