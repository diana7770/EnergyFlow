function renderQuote({ author, quote }) {
  document.querySelector("[data-quote-text]").textContent = quote;
  document.querySelector("[data-quote-author]").textContent = author;
}

async function loadQuote() {
  const resp = await fetch("https://energyflow.b.goit.study/api/quote");
  const data = await resp.json();
  const quoteObj = {
    ...data,
    date: new Date().getDate(),
  };
  localStorage.setItem("quote", JSON.stringify(quoteObj));
  renderQuote(data);
}


if (
  new Date().getDate() !==
  JSON.parse(localStorage.getItem("quote")).date
) {
  loadQuote();
} else {
  try {
    renderQuote(JSON.parse(localStorage.getItem("quote")));
  } catch (err) {
    console.log(err);
  }
}