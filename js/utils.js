export async function loadQuote() {
  const res = await fetch(
    "https://corsproxy.io/?url=https://zenquotes.io/api/quotes",
  );

  return await res.json();
}

export async function fetchClients() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=5&nat=us");

    if (!response.ok) {
      throw new Error("Failed to fetch clients");
    }

    const data = await response.json();

    return data.results.map((user) => ({
      id: Date.now() + Math.random(),
      nameClient: `${user.name.first} ${user.name.last}`,
      emailClient: user.email,
      companyClient: "Freelance Inc.",
      textareaClient: "",
    }));
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}
