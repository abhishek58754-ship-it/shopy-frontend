const productsContainer = document.querySelector("#productsContainer");
const statusMessage = document.querySelector("#statusMessage");
const searchInput = document.querySelector("#searchInput");
const refreshButton = document.querySelector("#refreshButton");

const productImages = {
  "canvas tote bag": "assets/images/tote-bag.svg",
  "desk lamp": "assets/images/desk-lamp.svg",
  "wireless mouse": "assets/images/wireless-mouse.svg",
  fitness: "assets/images/fitness-bottle.svg",
  accessories: "assets/images/tote-bag.svg",
  home: "assets/images/desk-lamp.svg",
  electronics: "assets/images/wireless-mouse.svg",
};

function formatCurrency(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price);
}

function setStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`.trim();
}

function getProductImage(product) {
  const nameKey = product.name.toLowerCase();
  const categoryKey = product.category.toLowerCase();
  return productImages[nameKey] || productImages[categoryKey] || "assets/images/product-default.svg";
}

function renderProducts(products) {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    setStatus("No products found.");
    return;
  }

  setStatus(`Showing ${products.length} product${products.length === 1 ? "" : "s"}.`);

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = getProductImage(product);
    image.alt = `${product.name} illustration`;

    const title = document.createElement("h2");
    title.textContent = product.name;

    const meta = document.createElement("div");
    meta.className = "product-meta";

    const category = document.createElement("span");
    category.className = "pill";
    category.textContent = product.category;

    const quantity = document.createElement("span");
    quantity.className = "pill";
    quantity.textContent = `${product.quantity} in stock`;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = formatCurrency(product.price);

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = product.description;

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const deleteButton = document.createElement("button");
    deleteButton.className = "danger-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      await handleDeleteProduct(product.id);
    });

    meta.append(category, quantity);
    actions.append(deleteButton);
    card.append(image, title, meta, price, description, actions);
    productsContainer.append(card);
  });
}

async function loadProducts() {
  try {
    setStatus("Loading products...");
    const products = await requestProducts(searchInput.value);
    renderProducts(products);
  } catch (error) {
    productsContainer.innerHTML = "";
    setStatus(error.message, "error");
  }
}

async function handleDeleteProduct(productId) {
  try {
    setStatus("Deleting product...");
    await deleteProduct(productId);
    await loadProducts();
  } catch (error) {
    setStatus(error.message, "error");
  }
}

searchInput.addEventListener("input", () => {
  loadProducts();
});

refreshButton.addEventListener("click", () => {
  searchInput.value = "";
  loadProducts();
});

loadProducts();
