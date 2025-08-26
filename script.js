/* // travarse way-----(but on this way , the loop run for every time so that is not efficient , and not suitable for big website )---------

const carts = document.getElementsByClassName("Add-to-Cart");

for (const cart of carts) {
  cart.addEventListener("click", function () {
    const imgSource =
      cart.parentNode.parentNode.parentNode.children[0].children[0].src;
    // console.log(imgSource);

    const productTitle = cart.parentNode.parentNode.children[1].innerText;
    // console.log(productTitle);

    let productPrice =
      cart.parentNode.parentNode.children[2].children[0].innerText;
    productPrice = Number(productPrice);
    // console.log(productPrice);

    const div = document.createElement("div");
    div.innerHTML = `
        
                       <div class="product-cart rounded-lg px-8 flex justify-between bg-[#F3F3F3] mb-5">

                <div class="py-1">
                  <img src="${imgSource}" alt="">
                </div>

                <div class="flex flex-col justify-center">
                  <h1 class="product-title text-xl font-semibold">${productTitle}</h1>
                  <h3 class="text-[20px]"><span class="product-price">${productPrice}</span> TK</h3>
                </div>


               </div>
            
        
        `;
    // get the total price element
    const totalPriceElement = document.getElementById("total-price");

    // read current total
    let totalPrice = Number(totalPriceElement.innerText);

    // add product price
    totalPrice = totalPrice + productPrice;

    // update UI
    totalPriceElement.innerText = totalPrice;

    const cartList = document.getElementById("cart-list");
    // console.log(cartList);

    cartList.appendChild(div);
  });
}
*/




// ---------Deligate way-----(we add eventListener to a parent element and add logic on that way, that within the parent elment if any element is clicked where certain 'class' exist then rest of the code run to get our job done )-----------

document.getElementById('product-box').addEventListener('click', function(e){
    /* // console.log(e.target);// find the exact element tha was clicked
    // console.log(e.target.className);// find the element's class name that was clicked
    // console.log(e.target.className.includes('Add-to-Cart'));// will console true/false
    // console.log(e.target.classList.contains('Add-to-Cart')); //safer way check NOTE 1  */

    if(e.target.classList.contains('Add-to-Cart')){
      
      const cart = e.target  // the clicked element
      
   
    const imgSource =
      cart.parentNode.parentNode.parentNode.children[0].children[0].src;
    // console.log(imgSource);

    const productTitle = cart.parentNode.parentNode.children[1].innerText;
    // console.log(productTitle);

    let productPrice =
      cart.parentNode.parentNode.children[2].children[0].innerText;
    productPrice = Number(productPrice);
    // console.log(productPrice);

    const div = document.createElement("div");
    div.innerHTML = `
        
                       <div class="product-cart rounded-lg px-8 flex justify-between bg-[#F3F3F3] mb-5">

                <div class="py-1">
                  <img src="${imgSource}" alt="">
                </div>

                <div class="flex flex-col justify-center">
                  <h1 class="product-title text-xl font-semibold">${productTitle}</h1>
                  <h3 class="text-[20px]"><span class="product-price">${productPrice}</span> TK</h3>
                </div>


               </div>
            
        
        `;
    // get the total price element
    const totalPriceElement = document.getElementById("total-price");

    // read current total
    let totalPrice = Number(totalPriceElement.innerText);

    // add product price
    totalPrice = totalPrice + productPrice;

    // update UI
    totalPriceElement.innerText = totalPrice;

    const cartList = document.getElementById("cart-list");
    // console.log(cartList);

    cartList.appendChild(div);

    }
})








/* NOTE 1 :- 



Got it 👍 let me break it down clearly.

---

### 1. `className`

When you do:

```js
console.log(e.target.className);
```

You don’t get just one class, you get a **string of all classes** on that element.
Example:

```html
<button class="Add-to-Cart btn btn-primary">Add</button>
```

👉 `e.target.className` will be:

```
"Add-to-Cart btn btn-primary"
```

---

### 2. Using `.includes()`

If you write:

```js
e.target.className.includes('Add-to-Cart')
```

This will return `true` because the string **contains** `"Add-to-Cart"`.

⚠️ Problem: it’s just doing a substring search.
So if some other class happened to be `"Not-Add-to-Cart-btn"`, then `.includes('Add-to-Cart')` would also return `true` — even though that element doesn’t *really* have the `"Add-to-Cart"` class.

---

### 3. The safer way → `classList.contains()`

Every DOM element has a `classList` property, which is a **real list** of the classes.
Example:

```js
console.log(e.target.classList);
```

Gives something like:

```
["Add-to-Cart", "btn", "btn-primary"]
```

Now you can safely check:

```js
e.target.classList.contains('Add-to-Cart')
```

This will only return `true` if the element **actually has that class**, not just a substring match.

---

✅ Summary:

* `className.includes('...')` → risky (substring search, can give false positives).
* `classList.contains('...')` → safe (checks real class membership).

---

Do you want me to show you an **example where `includes` fails but `classList.contains` works** so it’s crystal clear?




*/


/* cuple of improvments 

Absolutely! Let’s break these four lines step by step so it’s crystal clear 😎:

---

### 1️⃣ `const card = cart.closest('.kitechen-items');`

* `cart` is the button you clicked (the `Add-to-Cart` button).
* `.closest(selector)` searches **up the DOM tree** from that element, looking for the **nearest ancestor** that matches the selector.
* Here, `.kitechen-items` is the wrapper `<div>` for a single product card.

So after this line:

```js
card
```

represents the **whole product card** that contains the button you clicked.

---

### 2️⃣ `const imgSource = card.querySelector('img').src;`

* `.querySelector('img')` finds the **first `<img>`** inside the `card`.
* `.src` gets the **image URL**.

So `imgSource` now contains the path to the product image, e.g., `"assets/kitchen-1.png"`.

---

### 3️⃣ `const productTitle = card.querySelector('.card-title').innerText;`

* `.querySelector('.card-title')` finds the **first element with class `card-title`** inside the card (usually the `<h2>` with the product name).
* `.innerText` gets the **text content** of that element.

So `productTitle` now contains something like:

```
"K. Accessories"
```

---

### 4️⃣ `let productPrice = Number(card.querySelector('span[id$="-price"]').innerText);`

* `.querySelector('span[id$="-price"]')` uses an **attribute selector**:

  * `[id$="-price"]` matches any element whose `id` **ends with `-price`** (like `k.Accessories-price` or `home-cooker-price`).
* `.innerText` gets the text inside that `<span>`, e.g., `"39.00"`.
* `Number(...)` converts that string to a number type so you can do math with it.

So `productPrice` now contains the numeric value of the product, e.g., `39`.

---

### ✅ Why this is better than `parentNode.parentNode.parentNode`:

* **Readable:** You don’t need to count how many parent levels to climb.
* **Flexible:** Even if the HTML structure changes slightly, `closest()` and `querySelector()` will still work.
* **Safe:** Reduces the chance of grabbing the wrong element accidentally.

---

If you want, I can rewrite your **full Add-to-Cart delegation code** using these four lines so it’s **short, clean, and fully working**.

Do you want me to do that?
*/









