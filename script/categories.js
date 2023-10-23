const categories=document.querySelector('categories')


async function fetchProducts(url) {
    fetch('https://fakestoreapi.com/products/category/jewelery')
            .then(res=>res.json())
            .then(json=>console.log(json))

}

fetchProducts()