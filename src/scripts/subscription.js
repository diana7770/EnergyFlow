import Toast from "typescript-toastify";

function validateEmail(mail) {
  const regExp =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return regExp.test(mail);
}

async function subscribe(email) {
  try {
    const data = { email };
    const resp = await fetch(
      "https://energyflow.b.goit.study/api/subscription",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    return { ok: resp.ok, status: resp.status };
  } catch (err) {
    console.log(err);
    return { ok: false, status: err.status };
  }
}

document
  .querySelector("[data-footer-form]")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!validateEmail(email))
      return new Toast({
        position: "top-right",
        toastMsg: "Validation error",
        autoCloseTime: 2500,
        canClose: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "error",
        theme: "light",
      });
    const response = await subscribe(email);
    if (response.ok) {
      return new Toast({
        position: "top-right",
        toastMsg: "🩶 Thank you",
        autoCloseTime: 4500,
        canClose: true,
        // showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "default",
        theme: "light",
      });
    } else {
      if (Number(response.status) === 409) {
        return new Toast({
          position: "top-right",
          toastMsg: "This email has already been subscribed",
          autoCloseTime: 2500,
          canClose: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "error",
          theme: "light",
        });
      }
      return new Toast({
        position: "top-right",
        toastMsg: "Error",
        autoCloseTime: 2500,
        canClose: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "error",
        theme: "light",
      });
    }
  });
