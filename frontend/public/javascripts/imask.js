function emailMask() {
    const email = $('#email')[0];
    if (email && window.IMask) {
        IMask(email, {
            mask: /^\S*@?\S*$/
        });
    }
}

function phoneMask() {
    const phone = $('#phone')[0];
    if (phone && window.IMask) {
        IMask(phone, {
            mask: '(00) 00000-0000'
        });
    }
}

function ageMask() {
    const age = $('#age')[0];
    if (age && window.IMask) {
        IMask(age, {
            mask: Number,
            min: 1,
            max: 120
        });
    }
}

function priceMask() {
    const price = $('#price')[0];
    if (price && window.IMask) {
        IMask(price, {
            mask: Number,
            min: 1,
            max: 1000
        });
    }
}

export const masks = {
    emailMask,
    phoneMask,
    ageMask
};