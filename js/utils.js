export async function loadQuote() {
  const res = await fetch(
    "https://api.allorigins.win/raw?url=https://zenquotes.io/api/quotes",
  );

  return await res.json();
}
