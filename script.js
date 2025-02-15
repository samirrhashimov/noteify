let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " sepete eklendi!");
}

function displayCart() {
    let cartItems = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let itemElement = document.createElement("p");
        itemElement.textContent = item.name + " - " + item.price + " TL";
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    totalPrice.textContent = "Toplam: " + total + " TL";
}

if (document.getElementById("cart-items")) {
    displayCart();
}