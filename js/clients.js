import { clients } from "./data.js";
import { fetchClients } from "./utils.js";

let nameInputClient = document.getElementById("name-input-client");
let emailInputClient = document.getElementById("email-input-client");
let companyInputClient = document.getElementById("company-input-client");
let textareaInputClient = document.getElementById("textarea-input-client");
let buttonInputClient = document.getElementById("button-input-client");

buttonInputClient.addEventListener("click", function (event) {
  event.preventDefault();

  let sendInfo = {
    id: Date.now(),

    nameClient: nameInputClient.value.trim(),

    emailClient: emailInputClient.value.trim(),

    companyClient: companyInputClient.value.trim(),

    textareaClient: textareaInputClient.value.trim(),
  };

  if (
    sendInfo.nameClient === "" ||
    sendInfo.emailClient === "" ||
    sendInfo.companyClient === ""
  ) {
    alert("Please fill all the form");
    return;
  }

  if (editIndex !== null) {
    clients[editIndex] = {
      ...sendInfo,
      id: clients[editIndex].id,
    };

    editIndex = null;
  } else {
    clients.push(sendInfo);
  }

  localStorage.setItem("clients", JSON.stringify(clients));

  showClients();

  console.log(clients);

  nameInputClient.value = "";
  emailInputClient.value = "";
  companyInputClient.value = "";
  textareaInputClient.value = "";
});

let allClients = document.getElementById("all-clients");

function showClients() {
  allClients.innerHTML = "";

  clients.forEach((client, index) => {
    allClients.innerHTML += `
        <div class="client-cards">
          <h2 class="name-clients">${client.nameClient}</h2>
          <p class="email-clients">${client.emailClient}</p>
          <p class="company-clients">${client.companyClient}</p>
          <button class="edit-client" data-index= '${index}'>Edit</button>
          <button class="delete-client" data-index="${index}">Delete</button>
        </div>
        `;
  });
}

showClients();

allClients.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-client")) {
    const index = Number(event.target.dataset.index);

    clients.splice(index, 1);

    localStorage.setItem("clients", JSON.stringify(clients));

    showClients();
  }
});

let editIndex = null;

allClients.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-client")) {
    const index = Number(event.target.dataset.index);

    editIndex = index;

    const client = clients[index];

    nameInputClient.value = client.nameClient;
    emailInputClient.value = client.emailClient;
    companyInputClient.value = client.companyClient;
    textareaInputClient.value = client.textareaClient;

    nameInputClient.focus();

    nameInputClient.scrollIntoView({
      behavior: "smooth",
    });
  }
});

async function loadInitialClients() {
  if (clients.length === 0) {
    const apiClients = await fetchClients();

    clients.push(...apiClients);

    localStorage.setItem("clients", JSON.stringify(clients));
  }
}

loadInitialClients();
