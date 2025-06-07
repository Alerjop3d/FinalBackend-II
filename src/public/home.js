const main = document.querySelector('#main');

const sidebar = document.querySelector('#menu');
const cartContent = document.createElement('div');
const bottomPanel = document.createElement('div');

const boton = document.querySelector('#sidebar-button')
boton.addEventListener('click', () => { sidebar.classList.toggle('open'); setCart(); });

const domain = window.location.origin;
const pathname = window.location.pathname; 
const parts = pathname.split('/'); 
const productType = parts[parts.length - 1];


// ------------- main Fetch All Products View ----------------- //
const renderProducts = async () => {
  try {
    console.log(`domain: ${domain}`);
    const response = await fetch(`${domain}/api/products/${productType}`);
    const products = await response.json();

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.innerHTML = `
        <img src="${product.img}" alt="${product.title}">
        <h4>${product.title}</h2>
        <p>precio: ${product.price}</p>
        <p>stock: ${product.stock}</p>
        <button class="add-item">add</button>
      `;
      main.appendChild(productCard);
      const adder = productCard.querySelector('.add-item');
      adder.addEventListener('click', async () => {
        try {
          await fetch(`${domain}/api/cart/product/${product.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
          });
          setCart();
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
  } catch (error) {
    console.error('Error:', error);
    main.innerHTML = '<p>Error al cargar los productos</p>';
  }
};

renderProducts();


// ------------- Shopping Cart Fetch Products ----------------- //
function setCart () {
  fetch(`${domain}/api/cart`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    sidebar.innerHTML = ''
    const total = data.map((item) => item.quantity * item.price);
    bottomPanel.id = "panelCart";
    bottomPanel.innerHTML = `
    <button class="clear-cart">clear</button>
    <button class="buy">Buy</button>
    <p>Total: ${sumTotal(total).toFixed(2)}$</p>
    `;
    sidebar.appendChild(cartContent)
    sidebar.appendChild(bottomPanel)
    bottomPanel.querySelector('.buy').addEventListener('click', () => {buyItems()})
    sidebar.querySelector('.clear-cart').addEventListener('click', clearCart);
    data.forEach(product => {
      const productItem = document.createElement('div');
      const priceforQuantity = parseFloat(product.quantity * product.price).toFixed(2)
      productItem.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <p>${product.title}</p>
      <p>quantity: ${product.quantity}</P>
      <p>total: ${priceforQuantity}$ <button class="delItem">Delete</button></p> 
      
      `;
      sidebar.appendChild(productItem)
      const del = productItem.querySelector('.delItem');
      del.addEventListener('click', async () => {
        try {
          const response = await fetch(`${domain}/api/cart/product/${product.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
          });
          setCart();
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
  })
};


// ------------- Buy Products ----------------- //
async function buyItems() {
  try {
    const response = await fetch(`${domain}/api/cart`);
    const cartItems = await response.json();
    console.log(cartItems)
    if (cartItems.length > 0) {
      swal({
        title: "SUCESSFUL PURCHASE",
        text: "Your purchase has been finalized!",
        icon: "success",
        button: "Done",
    });
    clearCart()
    } else {
      swal({
        title: "ATTENTION",
        text: "Your shopping cart is empty!",
        icon: "error",
        button: "Done",
      });
    }
  } catch (error) {
    console.error("Error al parsear el JSON:", error);
  }
}


// ------------------- Fecth Functions ----------------------- //
function clearCart() {
  fetch(`${domain}/api/cart/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  setCart()
}

function sumTotal(arr) {
  let total = 0;
  for (const value of arr) { total += value }
  return total;
}