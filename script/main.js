document.addEventListener('DOMContentLoaded', () => {
  const products = document.querySelector('.products');
  const productModal = document.getElementById('productModal');
  const modalContent = document.querySelector('.modal-content');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartDisplay = document.getElementById('cart-display');
  const totalAmount = document.getElementById('total-amount');
  const clearCartButton = document.getElementById('clear-cart');

  function updateCart() {
    cartDisplay.querySelector('.display-order').innerHTML = '';

    let totalPrice = 0;
    let totalQuantity = 0;

    cart.forEach((item) => {
      const listItem = document.createElement('div');
      const itemTotalPrice = item.price * item.quantity;
      listItem.innerHTML = `
      <div class="card-display p-3" style="width: 30%">
        <img src="${item.image}" alt="image">
        <h3>${item.title}</h3>
        <h4>${item.category}</h4>
        <p>${item.description}</p>
        <h3>$${itemTotalPrice.toFixed(2)}</h3>
        <div><button class="btn btn-outline-danger">Delete</button>
        </div>
      </div>
       `;
      cartDisplay.querySelector('.display-order').appendChild(listItem);
      totalPrice += itemTotalPrice;
      totalQuantity += item.quantity;
    });

    totalAmount.textContent = `Total: $${totalPrice.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    updateCart();
  }

  async function fetchProducts(url) {
    try {
      let data = await fetch(url);
      let response = await data.json();

      response.forEach((product) => {
        let description = product.description;
        let title = product.title;
        products.innerHTML += `
          <div class="card" style="width: 18rem;">
            <img src="${product.image}" class="card-img-top img-fluid product-image" alt="...">
            <div class="card-body">
              <h5 class="card-title">${product.category}</h5>
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <div class="product-price-container">
                <h3 class="product-price">$${product.price.toFixed(2)}</h3>
                <div class="quantity-controls">
                  <i class="fa-solid fa-minus fa-2x text-primary"></i>
                  <span class="output-input m-4 fa-2x">1</span>
                  <i class="fa-solid fa-plus fa-2x text-primary"></i>
                </div>
              </div>
              <button class="btn btn-primary add-to-cart-button">Add to cart<i class="fa-solid fa-cart-plus text-white"></i></button>
            </div>
          </div>
        `;

        const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
        const productImages = document.querySelectorAll('.product-image');
        const quantityControls = document.querySelectorAll('.quantity-controls');

        addToCartButtons.forEach((button, index) => {
          button.addEventListener('click', () => {
            const quantity = parseInt(quantityControls[index].querySelector('.output-input').textContent, 10);
            const selectedProduct = { ...response[index], quantity };
            addToCart(selectedProduct);
          });
        });

        productImages.forEach((image, index) => {
          image.addEventListener('click', () => {
            openModal(response[index]);
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  function openModal(product) {
    modalContent.innerHTML = `
      <div class="card-modal" style="width: 100%;">
        <img src="${product.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.category}</h5>
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <div class="product-price-container">
            <h3 class="product-price" id="modalPrice">$${product.price.toFixed(2)}</h3>
            <div class="quantity-controls">
              <i class="fa-solid fa-minus fa-2x text-primary" id="decrementQuantity"></i>
              <span class="output-input m-4 fa-2x" id="quantityOutput">1</span>
              <i class="fa-solid fa-plus fa-2x text-primary" id="incrementQuantity"></i>
            </div>
          </div>
          <button class="btn btn-primary add-to-cart-button" id="add-to-cart-button">Add to cart<i class="fa-solid fa-cart-plus text-white"></i></button>
        </div>
        <div class="d-flex justify-content-between mx-4">
          <i id="closeModalIcon" class="fa-regular fa-3x text-primary fa-circle-xmark"></i>
        </div>
      </div>
    `;
    productModal.style.display = 'block';

    const closeModalIcon = document.getElementById('closeModalIcon');
    const decrementQuantity = document.getElementById('decrementQuantity');
    const incrementQuantity = document.getElementById('incrementQuantity');
    const quantityOutput = document.getElementById('quantityOutput');
    const addToCartButton = modalContent.querySelector('#add-to-cart-button');

    let quantity = 1;
    let price = product.price;

    incrementQuantity.addEventListener('click', () => {
      quantity++;
      quantityOutput.textContent = quantity;
      modalPrice.textContent = `$${(price * quantity).toFixed(2)}`;
    });

    decrementQuantity.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        quantityOutput.textContent = quantity;
        modalPrice.textContent = `$${(price * quantity).toFixed(2)}`;
      }
    });

    addToCartButton.addEventListener('click', () => {
      const selectedProduct = { ...product, quantity };
      addToCart(selectedProduct);
      productModal.style.display = 'none';
    });

    closeModalIcon.addEventListener('click', () => {
      productModal.style.display = 'none';
    });
  }

  clearCartButton.addEventListener('click', () => {
    cart.length = 0;
    updateCart();
  });

  fetchProducts('https://fakestoreapi.com/products');
});