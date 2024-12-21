const apiUrl = "https://dummyjson.com/carts";
const cartsContainer = document.getElementById("cartsContainer");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");


async function fetchCarts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayCarts(data.carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
  }
}


function displayCarts(carts) {
  cartsContainer.innerHTML = ""; 
  carts.forEach((cart) => {
    const cartDiv = document.createElement("div");
    cartDiv.className = "cart";
    cartDiv.innerHTML = `
      <h3>Cart #${cart.id}</h3>
      <p><strong>Total:</strong> $${cart.total}</p>
      <p><strong>Discounted Total:</strong> $${cart.discountedTotal}</p>
      <p><strong>User ID:</strong> ${cart.userId}</p>
      <p><strong>Total Products:</strong> ${cart.totalProducts}</p>
      <p><strong>Total Quantity:</strong> ${cart.totalQuantity}</p>
      <h4>Products:</h4>
      <ul>
        ${cart.products
          .map(
            (product) => `
          <li style="display: flex; align-items: center; margin-bottom: 10px;">
            <img 
              src="${product.thumbnail || 'https://via.placeholder.com/50'}" 
              alt="${product.title}" 
              style="width: 50px; height: 50px; margin-right: 10px; object-fit: cover; border: 1px solid #ddd; border-radius: 5px;" 
            />
            <div>
              <strong>${product.title}</strong> - 
              $${product.price} | Quantity: ${product.quantity} | Total: $${(product.price * product.quantity).toFixed(2)}
            </div>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
    cartsContainer.appendChild(cartDiv);
  });
}


searchButton.addEventListener("click", async () => {
  const cartId = searchInput.value.trim();
  if (!cartId) {
    alert("Please enter a cart ID");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${cartId}`);
    if (!response.ok) {
      throw new Error("Cart not found");
    }
    const cart = await response.json();
    displayCarts([cart]); 
  } catch (error) {
    alert(error.message);
  }
});


fetchCarts();
