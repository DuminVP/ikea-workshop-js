'use strict';

import { getData } from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';

export const catalog = () => {

    const updateSubCatalog = generateSubCatalog();

    // получаем элементы со страницы
    const btnBurger = document.querySelector('.btn-burger'),
        catalogJS = document.querySelector('.catalog'),
        subCatalog = document.querySelector('.subcatalog'),
        btnReturn = document.querySelector('.btn-return');

    const overlay = document.createElement('div');

    overlay.classList.add('overlay');
    document.body.insertAdjacentElement('beforeend', overlay);

    // функция открытия меню
    const openMenu = () => {
        catalogJS.classList.add('open');
        overlay.classList.add('active');
    };

    // функция закрытия меню и подменю
    const closeMenu = () => {
        catalogJS.classList.remove('open');
        overlay.classList.remove('active');
        closeSubMenu();
    };

    // функция открытия подменю
    const handlerCatalog = event => {
        event.preventDefault();

        const target = event.target;
        const itemList = target.closest('.catalog-list__item');

        document.querySelectorAll('.catalog-list__item').forEach(item => item.classList.remove('active'));

        if (itemList) {

            getData.subCatalog(target.textContent, (data) => {

                updateSubCatalog(target.textContent, data);
                subCatalog.classList.add('subopen');
                itemList.classList.add('active');
            });
          
        }

        if (event.target.closest('.btn-close')) {
            closeMenu();
        }

    };

    // функция закрытия подменю
    const closeSubMenu = () => {
        subCatalog.classList.remove('subopen');
    }

    // обработчики событий
    btnBurger.addEventListener('click', openMenu); // открыть меню при нажатии на бургер-кнопку
    overlay.addEventListener('click', closeMenu); // закрыть меню при нажатии мимо меню
    catalogJS.addEventListener('click', handlerCatalog); // открыть подкаталог
  
    // закрыть подкаталог
    subCatalog.addEventListener('click', event => {
        const btnReturn = event.target.closest('.btn-return');
        if (btnReturn) {
            document.querySelectorAll('.catalog-list__item').forEach(item => item.classList.remove('active'));
            closeSubMenu();
        }
    });

    // закрыть меню при нажатии на ESC
    document.addEventListener('keydown', event => {
        if (event.code === 'Escape') {
            closeMenu();
        }
    });

}