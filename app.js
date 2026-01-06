const fetchBtn = document.getElementById("fetchBtn");
const resultDiv = document.getElementById("result");

fetchBtn.addEventListener("click", handleFetch);

async function handleFetch() {
  const symbol = document.getElementById("symbolInput").value.toUpperCase();

  if (!symbol) {
    resultDiv.innerHTML = "Please enter a stock symbol.";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    const data = await fetchStockData(symbol);
    const formatted = formatStockData(data);
    displayResult(formatted);
  } catch (error) {
    resultDiv.innerHTML = "Unable to fetch stock data. Please try again.";
  }
}

async function fetchStockData(symbol) {
  const API_KEY = "YOUR_API_KEY_HERE";

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data["Global Quote"];
}

function formatStockData(quote) {
  if (!quote || Object.keys(quote).length === 0) {
    throw new Error("Invalid data");
  }

  return {
    symbol: quote["01. symbol"],
    price: quote["05. price"],
    change: quote["09. change"],
    changePercent: quote["10. change percent"]
  };
}

function displayResult(stock) {
  resultDiv.innerHTML = `
    <h3>${stock.symbol}</h3>
    <p>Price: $${stock.price}</p>
    <p>Change: ${stock.change} (${stock.changePercent})</p>
  `;
}
