import Toast from "typescript-toastify";

async function patchRating(id, data) {
  try {
    const resp = await fetch(
      `https://energyflow.b.goit.study/api/exercises/${id}/rating`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    return resp.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function validate({ rate, email, review }) {
  function validateEmail(mail) {
    const regExp =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return regExp.test(mail);
  }
  let errors = 0;
  if (rate < 0 || rate > 5) {
    errors++;
  }
  if (!validateEmail(email)) {
    errors++;
  }
  if (review.length > 1000 || review.length < 10) {
    errors++;
  }
  if (errors) {
    new Toast({
      position: "top-right",
      toastMsg: "Error",
      autoCloseTime: 2500,
      canClose: true,
      // showProgress: true,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      type: "error",
      theme: "light",
    });
    return false;
  } else {
    return true;
  }
}

document
  .querySelector("[data-review-form]")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      rate: Number(e.currentTarget.rating.value),
      email: e.currentTarget.email.value,
      review: e.currentTarget.comment.value,
    };
    if (!validate(formData)) return;
    const id = document.querySelector(".review-backdrop").dataset.id;
    const ok = await patchRating(id, formData);
    if (ok) {
      new Toast({
        position: "top-right",
        toastMsg: "🩶 Thank you for review",
        autoCloseTime: 4500,
        canClose: true,
        // showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "default",
        theme: "light",
      });
      e.target.reset();
      e.target.parentNode.parentNode.classList.add("review-backdrop--hidden");
      document
        .querySelector(".popup-backdrop")
        .classList.remove("popup--hidden");
    } else {
      new Toast({
        position: "top-right",
        toastMsg: "Error",
        autoCloseTime: 2500,
        canClose: true,
        // showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "error",
        theme: "light",
      });
    }
  });
