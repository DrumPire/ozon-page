import renderCart from "./renderCart";
import postData from "./postData";

const cart = () => {
    const cartBtn = document.getElementById('cart'),
          cartModal = document.querySelector('.cart'),
          cartCloseBtn = cartModal.querySelector('.cart-close'),
          cartTotal = cartModal.querySelector('.cart-total > span'),
          cartSendBtn = cartModal.querySelector('.cart-confirm'),
          cartWrapper = document.querySelector('.cart-wrapper'),
          cartCounter = document.querySelector('.counter'),
          goodsWrapper = document.querySelector('.goods');

    const openCart = () => {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        cartModal.style.display = 'flex';

        renderCart(cart);

        cartTotal.textContent = cart.reduce((sum, goodItem) => {
            return sum + goodItem.price;
        }, 0);
    };

    const closeCart = () => {
        cartModal.style.display = '';
    };

    cartBtn.addEventListener('click', openCart);
    cartCloseBtn.addEventListener('click', closeCart);
    goodsWrapper.addEventListener('click', e => {
        if (e.target.classList.contains('btn-primary')) {
            const card = e.target.closest('.card'),
                  key = card.dataset.key,
                  goods = JSON.parse(localStorage.getItem('goods')),
                  cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
                  goodItem = goods.find(item => {
                      return item.id === +key;
                  });

            cart.push(goodItem);
            cartCounter.textContent = cart.length;
            renderCart(cart);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });

    cartWrapper.addEventListener('click', e => {
        if (e.target.classList.contains('btn-primary')) {
            const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
                  card = e.target.closest('.card'),
                  key = card.dataset.key,
                  index = cart.findIndex(item => {
                    return item.id === +key;
                  });

            cart.splice(index, 1);
            cartCounter.textContent = cart.length;
            localStorage.setItem('cart', JSON.stringify(cart));

            renderCart(cart);

            cartTotal.textContent = cart.reduce((sum, goodItem) => {
                return sum + goodItem.price;
            }, 0);
        }
    });

    cartSendBtn.addEventListener('click', () => {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        postData(cart).then(() => {
            localStorage.removeItem('cart');

            renderCart([]);

            cartTotal.textContent = 0;
        });
        cartCounter.textContent = 0;
    });
};

export default cart;