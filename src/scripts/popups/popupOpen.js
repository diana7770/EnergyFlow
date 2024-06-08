import Toast from "typescript-toastify";

export default function popupListener() {
  const refs = {
    listEl: document.querySelector("[data-muscles]"),
    popupEl: document.querySelector(".popup-backdrop"),
    gifEl: document.querySelector("[data-popup-img]"),
    titleEl: document.querySelector("[data-popup-title]"),
    ratingTextEl: document.querySelector(".rating__text"),
    targetEl: document.querySelector("[data-popup-target]"),
    bodypartEl: document.querySelector("[data-popup-bodypart]"),
    equipmentEl: document.querySelector("[data-popup-equip]"),
    popularEl: document.querySelector("[data-popup-popular]"),
    caloriesEl: document.querySelector("[data-popup-calories]"),
    descriptionEl: document.querySelector("[data-popup-description]"),
    pasteValues({
      _id,
      bodyPart,
      equipment,
      gifUrl,
      name,
      target,
      description,
      rating,
      burnedCalories,
      time,
      popularity,
    }) {
      this.popupEl.setAttribute("data-id", _id);
      this.titleEl.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      this.gifEl.style.backgroundImage = `url(${gifUrl})`;
      this.ratingTextEl.textContent = rating.toFixed(1);
      this.targetEl.textContent =
        target.charAt(0).toUpperCase() + target.slice(1);
      this.bodypartEl.textContent =
        bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1);
      this.equipmentEl.textContent =
        equipment.charAt(0).toUpperCase() + equipment.slice(1);
      this.popularEl.textContent = popularity;
      this.caloriesEl.textContent = `${burnedCalories}/${time} min`;
      this.descriptionEl.textContent = description;
    },
  };

  async function getInfo(id) {
    const resp = await fetch(
      `https://energyflow.b.goit.study/api/exercises/${id}`
    );
    const data = await resp.json();
    return data;
  }

  refs.listEl.addEventListener("click", async (e) => {
    if (e.target === e.currentTarget) return;
    let id = e.target.dataset.id;
    if (e.target.nodeName !== "LI") {
      id = e.target.closest(".exercises__item-body").dataset.id;
    }
    const infoObj = await getInfo(id);
    refs.pasteValues(infoObj);
    refs.popupEl.classList.remove("popup--hidden");
  });
  refs.popupEl.addEventListener("click", async (e) => {
    if (e.target.dataset.closePopup)
      e.currentTarget.classList.add("popup--hidden");
    if (e.target.dataset.addFavorites) {
      if (JSON.parse(localStorage.getItem("favorites"))) {
        const isAdded = JSON.parse(localStorage.getItem("favorites")).some(
          ({ _id }) => _id === refs.popupEl.dataset.id
        );
        if (isAdded)
          return new Toast({
            position: "top-right",
            toastMsg: "💪 This exercise has already been added to favorites",
            autoCloseTime: 3000,
            canClose: true,
            // showProgress: true,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            type: "default",
            theme: "light",
          });
      }
      const info = await getInfo(refs.popupEl.dataset.id);
      if (localStorage.getItem("favorites")) {
        try {
          const currentFavorites = JSON.parse(
            localStorage.getItem("favorites")
          );
          currentFavorites.push(info);
          localStorage.setItem("favorites", JSON.stringify(currentFavorites));
          new Toast({
            position: "top-right",
            toastMsg: "🩶 Added to favorites",
            autoCloseTime: 2500,
            canClose: true,
            // showProgress: true,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            type: "default",
            theme: "light",
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        localStorage.setItem("favorites", JSON.stringify([info]));
        new Toast({
          position: "top-right",
          toastMsg: "🩶 Added to favorites",
          autoCloseTime: 2500,
          canClose: true,
          // showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "default",
          theme: "light",
        });
      }
    }
    if (e.target.dataset.giveRating) {
      const id = e.currentTarget.dataset.id;
      e.currentTarget.classList.add("popup--hidden");
      const reviewModal = document.querySelector(".review-backdrop");
      reviewModal.setAttribute("data-id", id);
      reviewModal.classList.remove("review-backdrop--hidden");

      document.querySelector(".review__rating").value = Number(
        refs.ratingTextEl.textContent
      );
    }
  });
}
