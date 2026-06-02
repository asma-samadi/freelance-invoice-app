let clients = JSON.parse(localStorage.getItem("clients")) || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

export { clients, invoices };
