const API_URL = 'https://api.realinspire.live/v1/quotes/random?maxLength=100';
const author = document.querySelector<HTMLParagraphElement>('#QuoteAuthor')!;
const quote = document.querySelector<HTMLParagraphElement>('#QuoteDisplay')!;
const newQuoteBtn = document.querySelector<HTMLButtonElement>('#newQuoteBtn')!;
const speakBtn = document.querySelector<HTMLButtonElement>('#ReadAloud')!;
const copyBtn = document.querySelector<HTMLButtonElement>('#copyBtn')!;
const tweetBtn = document.querySelector<HTMLButtonElement>('#tweetBtn')!;

let Quote = '';
let Author = '';

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
      Quote = data[0].content;
      Author = data[0].author;

      quote.textContent = Quote;
      author.textContent = Author;
    } else {
      quote.textContent = data.content;
      author.textContent = data.author;
    }
  } catch (err) {
    quote.textContent = 'please Check your Connection and Try Again';
  }
}

// read quote aloud
speakBtn.addEventListener('click', () => {
  const speakQuote = Quote;
  const utterance = new SpeechSynthesisUtterance(speakQuote);
  window.speechSynthesis.cancel();
  const synth = window.speechSynthesis;
  synth.speak(utterance);
});

// copy quote to clipboard

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(Quote);
});

// post quote as tweet
tweetBtn.addEventListener('click', () => {
  const tweetText = `${Quote} - ${Author}`;

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  window.open(tweetUrl, '_blank');
});
