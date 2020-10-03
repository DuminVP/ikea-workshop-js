'use strict';

const COUNTER = 6;

import { getData } from './getData.js';

const wishlist = ['idd005', 'idd100', 'idd086', 'idd010'];

const generateGoodsPage = () => {

    const mainHeader = document.querySelector('.main-header');
    const goodsList = document.querySelector('.goods-list');

    const generateCards = data => {
        goodsList.innerHTML = '';
  
        data.forEach(item => {

            console.log(item);
            const { name: itemName, count, description, id, img: image, price } = item;

            goodsList.insertAdjacentHTML('afterbegin', `

				<li class="goods-list__item">
					<a class="goods-item__link" href="card.html#${id}">
						<article class="goods-item">
							<div class="goods-item__img">
								<img src=${image[0]}
									 ${image[1] ? `data-second-image=${image[1]}`: '' }>
                            </div>
                            ${COUNTER}
							<h3 class="goods-item__header">${itemName}</h3>
							<p class="goods-item__description">${description}</p>
							<p class="goods-item__price">
								<span class="goods-item__price-value">${price}</span>
								<span class="goods-item__currency"> ₽</span>
							</p>
							<button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${id}"></button>
						</article>
					</a>
				</li>

            `);

            if (!item) {
                console.log('нет товара');
            }
        });
    };

    if (location.pathname.includes('goods') && location.search) {

        const search = decodeURI(location.search);
        const prop = search.split('=')[0].substring(1);
        const value = search.split('=')[1];

        if (prop === 'search') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск: ${value}`;
        } else if (prop === 'wishlist') {
            getData.wishlist(wishlist, generateCards);
            mainHeader.textContent = `Список желаний`;
        } else if (prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }
    }

};

export default generateGoodsPage;