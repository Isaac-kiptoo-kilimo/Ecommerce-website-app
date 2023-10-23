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
              
              </div>
              
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
                  
                    </div>
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
  


  const menClothings=document.querySelector('.mens-clothing')
let category3= "men's clothing";
  async function fetchMensClothing(){
    const url=`https://fakestoreapi.com/products/category/${category3}`;

    try{

        const data=await fetch(url);
        const response=await data.json();

        
        response.forEach((product)=>{
            let title=product.title;
            let description=product.description;
            menClothings.innerHTML+=`
            <div class="card mx-3" style="width: 18rem;">
           
              <img src="${product.image}"  class="shop-img card-img-top img-fluid product-image" alt="...">
              <div class="card-body">
                
              <h5 class="card-title">${title.length > 20 ? description.substring(0, 20).concat('...') : title}</h5>
                
                    <div class="product-price-container">
                  <h3 class="product-price">$${product.price.toFixed(2)}</h3>
                  
                    </div>
                 </div>
            </div>                
           
            `;
        })
    }
    catch(err){
        console.error(err);
    }

  };

  fetchMensClothing();



  const womensClothings=document.querySelector('.womens-clothing')
  let category4= "women's clothing";

  async function fetchWomensClothing(){

    const url=`https://fakestoreapi.com/products/category/${category4}`

    try{
        const data=await fetch(url);
        const response=await data.json();
        
        response.forEach((product)=>{
            let title=product.title;
            let description=product.description;
            womensClothings.innerHTML+=`
            <div class="card mx-3" style="width: 18rem;">
           
              <img src="${product.image}"  class="shop-img card-img-top img-fluid product-image" alt="...">
              <div class="card-body">
                
              <h5 class="card-title">${title.length > 20 ? description.substring(0, 20).concat('...') : title}</h5>
                
                    <div class="product-price-container">
                  <h3 class="product-price">$${product.price.toFixed(2)}</h3>
                  
                    </div>
                 </div>
            </div>               
            `;

        })

    }catch(err){
        console.error(err);
    };

  };

  fetchWomensClothing();