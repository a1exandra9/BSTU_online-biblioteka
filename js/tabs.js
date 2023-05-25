
const shops = {
    shop_1: [
        './img/3.png',
        './img/3.png',
        './img/3.png',
        './img/3.png',
        './img/3.png',
        './img/3.png'
    ],
    shop_2: [
        './img/1.png',
        './img/1.png',
        './img/1.png',
        './img/1.png',
        './img/1.png',
        './img/1.png'
    ],
    shop_3: [
        './img/2.png',
        './img/2.png',
        './img/2.png',
        './img/2.png',
        './img/2.png',
        './img/2.png'
    ],
    shop_4: [
        './img/3.png',
        './img/3.png',
        './img/3.png',
        './img/3.png',
        './img/3.png',
        './img/3.png'
    ],
}

const imagesLeft = Array.from(document.querySelectorAll('.slider_left > li > img'));
const imagesCenter = Array.from(document.querySelectorAll('.slider_center > li > img'));
const imagesRight = Array.from(document.querySelectorAll('.slider_right > li > img'));

let shop = 'shop_1';

function redrawPhoto(arr) {
    arr.forEach((image, index) => image.src = shops[shop][index]);
}

function changeImage(event) {
    shop = event.target.dataset.shop;
    redrawPhoto(imagesCenter);


    const buttons = document.querySelectorAll('.portfolio__button');
    console.log(buttons);
    buttons.forEach(button => {
        if (button.dataset.shop == shop) {
            button.classList.add('portfolio__button_active');
        } else {
            button.classList.remove('portfolio__button_active');
        };
    });

};

function buttonClick(event) {
    if (event.target.classList.contains('portfolio__button')) {
        changeImage(event);
    };
};

document.querySelector('.portfolio__buttons').addEventListener('click', buttonClick);

//slider
function shiftPhoto(arrow) {
    let w;
    if (window.innerWidth >= 1024){
        w = 6;
    }
    else if (window.innerWidth >= 768 && window.innerWidth <=1023) {
        w = 4;
    }
    else {
        w = 1;
    }
    if (arrow == 'left') {
        shops[shop] = shops[shop].slice(w).concat(shops[shop].slice(0, w));
    } else if (arrow == 'right') {
        shops[shop] = shops[shop].slice(-w).concat(shops[shop].slice(0, -w));
    }
}

const slider = document.querySelector('.slider');

const buttonLeft = document.querySelector('.button_slider_left');
const buttonRight = document.querySelector('.button_slider_right');

function sliderLeft() {
    buttonLeft.removeEventListener('click', sliderRight);
    buttonRight.removeEventListener('click', sliderLeft);
    slider.classList.add('move_left');
    shiftPhoto('left');
    redrawPhoto(imagesRight);
};

function sliderRight() {
    buttonLeft.removeEventListener('click', sliderRight);
    buttonRight.removeEventListener('click', sliderLeft);
    slider.classList.add('move_right');
    shiftPhoto('right');
    redrawPhoto(imagesLeft);
};

slider.addEventListener('animationend', () => {
    redrawPhoto(imagesCenter);
    slider.classList.remove('move_left');
    slider.classList.remove('move_right');
    buttonLeft.addEventListener('click', sliderRight);
    buttonRight.addEventListener('click', sliderLeft);
});


buttonLeft.addEventListener('click', sliderRight);
buttonRight.addEventListener('click', sliderLeft);