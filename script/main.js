document.addEventListener('DOMContentLoaded', () => {
  const products = document.querySelector('.products');
  const productModal = document.getElementById('productModal');
  const modalContent = document.querySelector('.modal-content');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartDisplay = document.getElementById('cart-display');
  const TotalQty=document.getElementById('quality')
  const totalAmount = document.getElementById('total-amount');
  const clearCartButton = document.getElementById('clear-cart');
  const newCart=document.querySelector('.cart')
  const mainContain=document.querySelector('.main-contain')
  const containerCart=document.querySelector('.container-cart ')
  const btnCart=document.querySelector('#cart-icon');
  const cart1=document.querySelector('.cart');
  const btnClose=document.querySelector('#cart-close');
  

  btnCart.addEventListener('click',()=>{
    cart1.classList.add('cart-active');
  });
  
  btnClose.addEventListener('click',()=>{
    cart1.classList.remove('cart-active');
  });

  // newCart.addEventListener('click',()=>{
    
  //   mainContain.style.display='none'
  //   containerCart.style.display='block';

  // })
  function updateCart() {
    cartDisplay.querySelector('.display-orders').innerHTML = '';

    let totalPrice = 0;
    let totalQuantity = 0;

    cart.forEach((item,index) => {
      const listItem = document.createElement('div');
      listItem.classList.add="card-cart"
      const itemTotalPrice = item.price * item.quantity;
      listItem.innerHTML = `
            <div class="cart-box">
                <img src="${item.image}" class="cart-img">
                  <div class="detail-box">
                   <div class="cart-food-title">${item.title}</div>
                    <div class="price-box">
                      <div class="cart-price">Amount :  $${itemTotalPrice.toFixed(2)}</div>
                                 
                      </div>
                      <p class="cart-quantity">Qnty: ${item.quantity}</p>
                    </div>
                    <button class="btn btn-danger cart-remove" data-item-index="${index}" >Delete</button>
                           
             </div>
       `;
      cartDisplay.querySelector('.display-orders').appendChild(listItem);
      totalPrice += itemTotalPrice;
      totalQuantity += item.quantity;
   

      
    });

    totalAmount.textContent = `Total: $${totalPrice.toFixed(2)}`;
    TotalQty.textContent = `${totalQuantity}`;
    localStorage.setItem('cart', JSON.stringify(cart));

    const deleteButtons = document.querySelectorAll('.btn-danger');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const itemIndex = event.target.getAttribute('data-item-index');
      deleteItemFromCart(itemIndex);
    });
  });

  }

  function deleteItemFromCart(itemIndex) {
    cart.splice(itemIndex, 1);
    updateCart();
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

  const categoriesBtn=document.querySelector('.categories-btn');
  const dropDownMenu=document.querySelector('.dropdown-menu');



  categoriesBtn.addEventListener(
    "mouseenter",
    () => {
  
      dropDownMenu.style.display='block';
  
  
    },
    false,
  );

  dropDownMenu.addEventListener('mouseleave',()=>{

    dropDownMenu.style.display=''
  })


  const url_='https://fakestoreapi.com/products'
  async function fetchProducts(url) {
    try {
      let data = await fetch(url);
      let response = await data.json();

      response.forEach((product) => {
        let description = product.description;
        let title = product.title;
        products.innerHTML += `
          <div class="card" style="width: 18rem;">
         
            <img src="${product.image}"  class="shop-img card-img-top img-fluid product-image" alt="...">
            <div class="card-body">
              
            <h5 class="card-title">${title.length > 20 ? description.substring(0, 20).concat('...') : title}</h5>
              
              <div class="product-price-container">
                <h3 class="product-price">$${product.price.toFixed(2)}</h3>
                <div class="quantity-controls">
                  <i class="fa-solid fa-minus fa-2x  text-warning"></i>
                  <span class="output-input m-2 fa-2x ">1</span>
                  <i class="fa-solid fa-plus fa-2x text-warning"></i>
                </div>
              </div>
              
            </div>
            <div class="cart-btn mx-5  my-3">
            <button class="btn btn-warning add-to-cart-button">Add to cart<i class="fa-solid fa-cart-plus text-white"></i></button>
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
            alert(`You have added ${selectedProduct.title} to the cart`)
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
    let description = product.description;
    modalContent.innerHTML = `
      <div class="card-modal" style="width: 100%;">
      <h5 class="card-title">${product.title}</h5>
        <img src="${product.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.category}</h5>
          
          <p class="card-text">${description.length > 100 ? description.substring(0, 100).concat('...') : title}</p>
          <div class="product-price-container">
            <h3 class="product-price" id="modalPrice">$${product.price.toFixed(2)}</h3>
            <div class="quantity-controls d-flex align-items-center">
              <button class="btn btn-warning "><i class="fa-solid fa-minus fa-2x text-white" id="decrementQuantity"></i></button>
              <span class="output-input m-4 fa-3x " id="quantityOutput">1</span>
              <button class="btn btn-warning" id="incrementQuantity"><i class="fa-solid fa-plus fa-2x text-white" ></i></button>
            </div>
          </div>
          
        </div>
        <div class="d-flex justify-content-between mx-4">
          <i id="closeModalIcon" class="fa-regular fa-3x text-warning fa-circle-xmark"></i>
          <button class="btn btn-warning add-to-cart-button" id="add-to-cart-button">Add to cart<i class="fa-solid fa-cart-plus text-white"></i></button>
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



  fetchProducts(url_);
});