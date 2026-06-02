import { clients, invoices } from "./data.js";
import { loadQuote } from "./utils.js";

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".ul-navbar");

menuToggle.addEventListener("click", function () {
  navMenu.classList.toggle("active");
});

function dashboard() {
  document.getElementById("total-invoice-index").textContent = invoices.length;

  const paid = invoices.filter((i) => i.status === "Paid").length;
  const unpaid = invoices.filter((i) => i.status === "Unpaid").length;

  document.getElementById("total-paidInvoice-index").textContent = paid;
  document.getElementById("total-unpaidInvoice-index").textContent = unpaid;

  const revenue = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + Number(i.amountData), 0);

  document.getElementById("total-revenueEarned-index").textContent = revenue;

  document.getElementById("total-client-index").textContent = clients.length;
}

dashboard();

async function showQuote() {
  try {
    const data = await loadQuote();

    const random = data[Math.floor(Math.random() * data.length)];

    document.getElementById("h3-motivational-index").textContent =
      `"${random.q}"`;

    document.getElementById("p-motivational-index").textContent =
      `- ${random.a || "Unknown"}`;
  } catch (error) {
    console.error(error);
  }
}

showQuote();
