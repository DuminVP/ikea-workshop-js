import { getData } from './getData.js';

const wishlist = ['idd005', 'idd100', 'idd086', 'idd010'];

const cartlist = [
    {
        id: 'idd005',
        count: 1
    },
    {
        id: 'idd025',
        count: 2
    },
    {
        id: 'idd007',
        count: 3
    }
];

export const loadData = () => {

    if (location.search) {

        const search = decodeURI(location.search);
        const prop = search.split('=')[0].substring(1);
        const value = search.split('=')[1];

        if (prop === 'search') {
            getData.search(value, data => data);
        } else if (prop === 'wishlist') {
            getData.wishlist(wishlist, data => data);
        } else if (prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, data => data);
        }
    }

    if (location.hash) {
        getData.item(location.hash.substring(1), data => data);
    }

    if (location.pathname.includes('cart')) {
        getData.cart(cartlist, data => data);
    }
    
};