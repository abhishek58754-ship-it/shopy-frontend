const productForm = document.querySelector("#productForm");
const formMessage = document.querySelector("#formMessage");

function getFormData() {
  const formData = new FormData(productForm);
  return {
    name: formData.get("name").trim(),
    price: Number(formData.get("price")),
    quantity: Number(formData.get("quantity")),
    category: formData.get("category").trim(),
    description: formData.get("description").trim(),
  };
}

function clearErrors() {
  document.querySelectorAll(".field-error").forEach((element) => {
    element.textContent = "";
  });
  formMessage.textContent = "";
  formMessage.className = "status-message";
}

function showErrors(errors) {
  Object.entries(errors).forEach(([field, message]) => {
    const errorElement = document.querySelector(`[data-error-for="${field}"]`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  });
}

function validateClientSide(product) {
  const errors = {};

  if (!product.name) errors.name = "Name is required.";
  if (!product.category) errors.category = "Category is required.";
  if (!product.description) errors.description = "Description is required.";
  if (!product.price || product.price <= 0) errors.price = "Price must be greater than zero.";
  if (!Number.isInteger(product.quantity) || product.quantity < 0) {
    errors.quantity = "Quantity must be zero or more.";
  }

  return errors;
}

function showMessage(message, type = "") {
  formMessage.textContent = message;
  formMessage.className = `status-message ${type}`.trim();
}

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  const product = getFormData();
  const clientErrors = validateClientSide(product);
  if (Object.keys(clientErrors).length > 0) {
    showErrors(clientErrors);
    showMessage("Please fix the highlighted fields.", "error");
    return;
  }

  try {
    showMessage("Saving product...");
    await createProduct(product);
    productForm.reset();
    showMessage("Product added successfully. You can add another product or view the list.", "success");
  } catch (error) {
    showErrors(error.errors || {});
    showMessage(error.message, "error");
  }
});
