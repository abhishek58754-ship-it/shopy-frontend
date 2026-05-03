const API_BASE_URL = "http://localhost:5050/api/products";

async function requestProducts(searchTerm = "") {
  const url = new URL(API_BASE_URL);
  if (searchTerm.trim()) {
    url.searchParams.set("search", searchTerm.trim());
  }

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load products.");
  }

  return data.products;
}

async function createProduct(product) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Unable to create product.");
    error.errors = data.errors || {};
    throw error;
  }

  return data.product;
}

async function deleteProduct(productId) {
  const response = await fetch(`${API_BASE_URL}/${productId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to delete product.");
  }

  return data.product;
}
