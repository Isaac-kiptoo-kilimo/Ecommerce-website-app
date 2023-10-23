const jewelery=document.querySelector('.Jelewery')
const electronics=document.querySelector('.electronics')
const category = 'jewelery'; 

async function fetchJelewery() {
  const url = `https://fakestoreapi.com/products/category/${category}`;

  try {
    const data = await fetch(url);
    const response = await data.json();
    response.forEach((product) => {
        let description = product.description;
        let title = product.title;
        jewelery.innerHTML += `
          <div class="card mx-3" style="width: 18rem;">
         
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


      });

    
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

fetchJelewery();

const category2 = 'electronics'; 
async function fetchElectronics() {
    const url = `https://fakestoreapi.com/products/category/${category2}`;
  
    try {
      const data = await fetch(url);
      const response = await data.json();
      response.forEach((product) => {
          let description = product.description;
          let title = product.title;
          electronics.innerHTML += `
            <div class="card mx-3" style="width: 18rem;">
           
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
  
  
        });
  
      
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchElectronics();
  