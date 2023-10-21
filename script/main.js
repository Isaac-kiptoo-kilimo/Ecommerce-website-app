document.addEventListener('DOMContentLoaded', () => {
  const products = document.querySelector('.products');
  const productModal = document.getElementById('productModal');
  const modalContent = document.querySelector('.modal-content');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartDisplay = document.getElementById('cart-display');
  const totalAmount = document.getElementById('total-amount');
  const clearCartButton = document.getElementById('clear-cart');


  let cartItems = [];

  function updateCart() {
    // Clear existing items in the cart
    cartDisplay.innerHTML = '';
    cartItems = [];

    // Initialize the total price and quantity
    let totalPrice = 0;
    let totalQuantity = 0;

    // Iterate through the cart and display each item
    cart.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.title} - $${item.price}`;
      cartItems.push(item);
      cartDisplay.appendChild(listItem);
      totalPrice += item.price* item.quantity;
      
      console.log(totalPrice);
      totalQuantity+=item.quantity;
      console.log((totalQuantity));
    });

    // Update the total amount
    totalAmount.textContent = `Total: $${totalPrice.toFixed(2)}`;
    console.log(totalAmount)
  }

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    if(existingItem){
      existingItem.quantity+=product.quantity
    }else{
      product.quantity=1;
      cart.push(product);
    };
    
    updateCart();
  }

  async function fetchProducts(url) {
    try {
      let data = await fetch(url);
      let response = await data.json();
      console.log(response);

      response.forEach((product) => {
        let description = product.description;
        let title = product.title;
        products.innerHTML += `
          <div class="card" style="width: 18rem;">
            <img src="${product.image}" class="card-img-top img-fluid product-image" alt="...">
            <div class="card-body">
              <h5 class="card-title">${product.category}</h5>
              <h5 class="card-title">${title.length > 20 ? description.substring(0, 20).concat('...') : title}</h5>
              <p class="card-text">${description.length > 20 ? description.substring(0, 20).concat('...') : title}</p>
              <div class="product-price-container">
                <h3 class="product-price">$${product.price}</h3>
              </div>
            </div>
          </div>
        `;
      });

      const productImages = document.querySelectorAll('.product-image');

      productImages.forEach((image, index) => {
        image.addEventListener('click', () => {
          openModal(response[index]);
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
            <h3 class="product-price" id="modalPrice">$${product.price}</h3>
            <div class="quantity">
              <i class="fa-solid fa-minus fa-2x text-primary" id="decrementQuantity"></i>
              <span class="output-input m-4 fa-2x" id="quantityOutput">1</span>
              <i class="fa-solid fa-plus  fa-2x text-primary" id="incrementQuantity"></i>
            </div>
          </div>
        </div>
       <div class="d-flex justify-content-between mx-4">
       <i id="closeModalIcon" class="fa-regular fa-3x text-primary fa-circle-xmark"></i>
       <button class=" btn btn-primary" id="add-to-cart-button">Add to cart<i class="fa-solid fa-cart-plus  text-white "></i></button>
       </div>
      </div>
    `;
    const addToCartButton = modalContent.querySelector('#add-to-cart-button');
        addToCartButton.addEventListener('click', () => {
          addToCart(product);
          productModal.style.display='none';
          // alert('Product added to cart!')
        });


    productModal.style.display = 'block';

    const closeModalIcon = document.getElementById('closeModalIcon');
    const decrementQuantity = document.getElementById('decrementQuantity');
    const incrementQuantity = document.getElementById('incrementQuantity');
    const quantityOutput = document.getElementById('quantityOutput');
    
    const modalPrice = modalContent.querySelector('#modalPrice');

    let quantity = 1;
    let price = product.price;
    // Add an event listener to the closing icon
    closeModalIcon.addEventListener('click', () => {
      productModal.style.display = 'none';
    });

    // Event listener for decreasing quantity
    decrementQuantity.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        quantityOutput.textContent = quantity;
        modalPrice.textContent = `$${(price * quantity).toFixed(2)}`;
      }
    });

    // Event listener for increasing quantity
    incrementQuantity.addEventListener('click', () => {
      quantity++;
      quantityOutput.textContent = quantity;
      modalPrice.textContent = `$${(price * quantity).toFixed(2)}`;
    });
  }
  
  clearCartButton.addEventListener('click', () => {
    cart.length = 0;
    updateCart();
  });

  fetchProducts('https://fakestoreapi.com/products');
});
