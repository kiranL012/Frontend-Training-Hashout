function fakeStoreApi() {
    fetch('https://fakestoreapi.com/products')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            productsData(data);
        })
        .catch((error) => {
            console.log('error fetching data:', error);
        })
}

function productsData(products) {
    const productList = document.querySelector('.products-list');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.classList.add('productImage');
        productDiv.appendChild(productImage);

        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;
        productDiv.appendChild(productTitle);

        const productPrice = document.createElement('p');
        productPrice.textContent = 'Price: $' + product.price;
        productDiv.appendChild(productPrice);

        productList.appendChild(productDiv);
    });
}
fakeStoreApi();
