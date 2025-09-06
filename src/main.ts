const author = document.querySelector<HTMLParagraphElement>('#QuoteAuthor')!;
const quote = document.querySelector<HTMLParagraphElement>('#QuoteDisplay')!;
const newQuoteBtn = document.querySelector<HTMLButtonElement>('#newQuoteBtn')!;
const speakBtn = document.querySelector<HTMLButtonElement>('#ReadAloud')!;
const copyBtn = document.querySelector<HTMLButtonElement>('#copyBtn')!;
const tweetBtn = document.querySelector<HTMLButtonElement>('#tweetBtn')!;

let quoteText = '';
let quoteAuthor = '';

const API_URL = 'https://api.realinspire.live/v1/quotes/random?maxLength=100';

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
      quoteText = data[0].content;
      quoteAuthor = data[0].author;

      quote.textContent = `"${quoteText}"`;
      author.textContent = `-- ${quoteAuthor}`;
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
  const speakQuote = quoteText;
  const utterance = new SpeechSynthesisUtterance(speakQuote);
  window.speechSynthesis.cancel();
  const synth = window.speechSynthesis;
  synth.speak(utterance);
});

// copy quote to clipboard

quote.addEventListener('click', () => {
  navigator.clipboard.writeText(quoteText);
  alert('copied to clipboard');
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(quoteText);
  alert('copied to clipboard');
});

// post quote as tweet
tweetBtn.addEventListener('click', () => {
  const tweetText = `${quoteText} - ${quoteAuthor}`;

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  window.open(tweetUrl, '_blank');
});
