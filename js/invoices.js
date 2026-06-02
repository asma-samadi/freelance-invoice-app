import { clients, invoices } from "./data.js";

let selectInvoices = document.getElementById("client");
let serviceTitle = document.getElementById("service-title");
let description = document.getElementById("description");
let amount = document.getElementById("amount");
let date = document.getElementById("date");
let createInvoice = document.getElementById("create-invoice");

createInvoice.addEventListener("click", function (event) {
  event.preventDefault();

  let sendInvoice = {
    id: Date.now(),
    selectInvoicesData: selectInvoices.value.trim(),
    serviceTitleData: serviceTitle.value.trim(),
    descriptionData: description.value.trim(),
    amountData: amount.value.trim(),
    dateData: date.value,
    status: "Unpaid",
  };

  if (
    sendInvoice.serviceTitleData === "" ||
    sendInvoice.descriptionData === "" ||
    sendInvoice.amountData === "" ||
    sendInvoice.dateData === ""
  ) {
    alert("Please fill all the form");
    return;
  }

  if (editIndex !== null) {
    invoices[editIndex] = {
      ...sendInvoice,
      id: invoices[editIndex].id,
    };
    editIndex = null;
  } else {
    invoices.push(sendInvoice);
  }

  localStorage.setItem("invoices", JSON.stringify(invoices));

  showInvoices();
  updateSummary();

  console.log(invoices);

  selectInvoices.value = "";
  serviceTitle.value = "";
  description.value = "";
  amount.value = "";
  date.value = "";
});

function loadClientsToSelect() {
  selectInvoices.innerHTML = `<option value="">Select Client</option>`;

  clients.forEach((client) => {
    selectInvoices.innerHTML += `
      <option value="${client.id}">
        ${client.nameClient}
      </option>
    `;
  });
}

loadClientsToSelect();

let divAllInvoices = document.getElementById("div-all-invoices");

function showInvoices() {
  divAllInvoices.innerHTML = "";

  invoices.forEach((invoice, index) => {
    const client = clients.find(
      (c) => c.id === Number(invoice.selectInvoicesData),
    );

    divAllInvoices.innerHTML += `
    <div class="all-invoices">
        <h3 class="invoice-name">${client ? client.nameClient : "Unknown Client"}</h3>
        <p class="invoice-service">Service: ${invoice.serviceTitleData}</p>
        <p class="invoice-amount">Amount: ${invoice.amountData}</p>
        <p class="invoice-description">Description: ${invoice.descriptionData}</p>
        <p class="invoice-status">Status: ${invoice.status}</p>
        <p class="date">Date: ${invoice.dateData}</p>
        <button class="invoice-edit" data-index = '${index}'>Edit</button>
        <button class="invoice-delete" data-index = '${index}'>Delete</button>
        <button class="invoice-mark" data-index="${index}">
        ${invoice.status === "Paid" ? "Paid ✔" : "Mark Paid"}
        </button>
    </div>
    `;
  });
}

showInvoices();

divAllInvoices.addEventListener("click", function (event) {
  if (event.target.classList.contains("invoice-delete")) {
    const index = Number(event.target.dataset.index);

    invoices.splice(index, 1);

    localStorage.setItem("invoices", JSON.stringify(invoices));

    showInvoices();
    updateSummary();
  }
});

let editIndex = null;

divAllInvoices.addEventListener("click", function (event) {
  if (event.target.classList.contains("invoice-edit")) {
    const index = Number(event.target.dataset.index);

    editIndex = index;

    const invoice = invoices[index];

    selectInvoices.value = invoice.selectInvoicesData;
    serviceTitle.value = invoice.serviceTitleData;
    description.value = invoice.descriptionData;
    amount.value = invoice.amountData;

    date.value = invoice.dateData;
    selectInvoices.focus();

    selectInvoices.scrollIntoView({
      behavior: "smooth",
    });
  }
});

divAllInvoices.addEventListener("click", function (event) {
  if (event.target.classList.contains("invoice-mark")) {
    const index = Number(event.target.dataset.index);

    invoices[index].status = "Paid";

    localStorage.setItem("invoices", JSON.stringify(invoices));

    showInvoices();
    updateSummary();
  }
});

function updateSummary() {
  document.getElementById("total-invoices").textContent = invoices.length;

  const paid = invoices.filter((i) => i.status === "Paid").length;
  const unpaid = invoices.filter((i) => i.status === "Unpaid").length;

  document.getElementById("total-paidInvoice-").textContent = paid;
  document.getElementById("total-unpaidInvoice").textContent = unpaid;

  const revenue = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + Number(i.amountData), 0);

  document.getElementById("total-revenueEarned").textContent = revenue;
}

updateSummary();
