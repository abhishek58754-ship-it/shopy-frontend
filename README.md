# Shopy Frontend

Shopy is a responsive product inventory frontend built with HTML, CSS, and JavaScript. It connects to a Flask backend API, displays products with DOM manipulation, and includes a form to add new products through a POST request.

## Live Demo

GitHub Pages: https://abhishek58754-ship-it.github.io/shopy-frontend/

The live page is a static frontend deployment. To use product loading and form submission, run the Flask backend locally at `http://localhost:5050`.

## Features

- Home page with navbar navigation.
- Add Product page with a validated form.
- Product cards rendered dynamically using JavaScript DOM manipulation.
- API integration with `GET /api/products` and `POST /api/products`.
- Search and refresh controls on the product listing page.
- Delete button connected to the optional backend delete endpoint.
- Responsive mobile-friendly layout.
- Local SVG product visuals for a polished UI.

## Tech Stack

- HTML5
- CSS3
- JavaScript
- GitHub Pages
- Flask API integration

## Folder Structure

```text
.
├── add-product.html
├── assets/
│   └── images/
├── index.html
├── js/
│   ├── add-product.js
│   ├── api.js
│   └── home.js
└── styles.css
```

## Run Locally

Start the backend first from the backend repository:

```bash
python app.py
```

Then serve this frontend folder:

```bash
python3 -m http.server 5501
```

Open:

```text
http://localhost:5501
```

## Backend API Used

```text
GET    http://localhost:5050/api/products
POST   http://localhost:5050/api/products
DELETE http://localhost:5050/api/products/<id>
```

## Project Requirements Covered

- Separate frontend repository.
- Home and Add Product pages.
- Navbar with page links.
- DOM manipulation to render product data.
- API calls to localhost backend.
- Form submission using JSON request body.
- Responsive UI and improved visual design.
