const API_URL = 'https://api.realinspire.live/v1/quotes/random?maxLength=100';
const author = document.querySelector<HTMLParagraphElement>('#QuoteAuthor')!;
const quote = document.querySelector<HTMLParagraphElement>('#QuoteDisplay')!;
const newQuoteBtn = document.querySelector<HTMLButtonElement>('#newQuoteBtn')!;

getQuote();
// fetch quote from api
newQuoteBtn.addEventListener('click', () => {
  getQuote();
});

async function getQuote(): Promise<void> {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (Array.isArray(data)) {
      quote.textContent = data[0].content;
      author.textContent = data[0].author;
    } else {
      quote.textContent = data.content;
      author.textContent = data.author;
    }
  } catch (err) {
    quote.textContent = 'please Check your Connection and Try Again';
  }
}
