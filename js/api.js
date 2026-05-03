const API_BASE_URL = "http://localhost:5050/api/products";
const CONNECTION_ERROR_MESSAGE =
  "Cannot connect to the Flask backend. Start the backend at http://localhost:5050, then try again.";

async function fetchJson(url, options) {
  let response;
  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error(CONNECTION_ERROR_MESSAGE);
  }

  const data = await response.json();
  return { response, data };
}

async function requestProducts(searchTerm = "") {
  const url = new URL(API_BASE_URL);
  if (searchTerm.trim()) {
    url.searchParams.set("search", searchTerm.trim());
  }

  const { response, data } = await fetchJson(url);

  if (!response.ok) {
    throw new Error(data.message || "Unable to load products.");
  }

  return data.products;
}

async function createProduct(product) {
  const { response, data } = await fetchJson(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = new Error(data.message || "Unable to create product.");
    error.errors = data.errors || {};
    throw error;
  }

  return data.product;
}

async function deleteProduct(productId) {
  const { response, data } = await fetchJson(`${API_BASE_URL}/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(data.message || "Unable to delete product.");
  }

  return data.product;
}
