// travarse way--------------

const carts = document.getElementsByClassName('Add-to-Cart');

for(const cart of carts){
    cart.addEventListener('click', function(){

        const imgSource = cart.parentNode.parentNode.parentNode.children[0].children[0].src;
        // console.log(imgSource);

        const productTitle =cart.parentNode.parentNode.children[1].innerText;
        // console.log(productTitle);

        let productPrice =cart.parentNode.parentNode.children[2].children[0].innerText;
        productPrice =Number(productPrice);
        // console.log(productPrice);


        const div =document.createElement('div');
        div.innerHTML =`
        
                       <div class="product-cart rounded-lg px-8 flex justify-between bg-[#F3F3F3] mb-5">

                <div class="py-1">
                  <img src="${imgSource}" alt="">
                </div>

                <div class="flex flex-col justify-center">
                  <h1 class="product-title text-xl font-semibold">${productTitle}</h1>
                  <h3 class="text-[20px]"><span class="product-price">${productPrice}</span> TK</h3>
                </div>


               </div>
            
        
        `
        const cartList = document.getElementById('cart-list');
        // console.log(cartList);

        cartList.appendChild(div);
        


    })
}