const productsDiv = document.getElementById("produts");

const getProducts = () => {
  let produts = fetch("http://localhost:8000/api/products").then((results) => {
    results
      .json()
      .then((data) => {
        produts = data.products;
      })
      .then(() => {
        for (let product of produts) {
          let h1 = document.createElement("h1");
          h1.textContent = product.name;
          productsDiv.appendChild(h1);
        }
      });
  });
};
