


window.addEventListener("DOMContentLoaded", function () {


    /* drop down toggler */
    $('.drop-down-action').on('click', (e) => {
        $(e.currentTarget).toggleClass('drop-down-action_opened')
    })

    /* drop down toggler */



    /* heal slider */
    const healSliderMain = $('.heal__c')
    const healSliderSelf = $('.heal__c-slides')
    const healSliderIndication = $('.heal__c-btn-indication')
    const healSliderBtns = healSliderMain.find('.heal__c-btn')

    healSliderBtns.on('click', (e) => healSlider(e, healSliderSelf, healSliderIndication, healSliderBtns))
    healSliderSelf.on('touchstart', (e) => healTouch(e, healSliderBtns))
    healSliderSelf.on('touchend', (e) => healTouch(e, healSliderBtns))


    /* heal slider */



    /* pack slider */
    const packSliderMain = $('.packs')
    const packSliderSelf = packSliderMain.find('.packs__items')
    const packLeftBtn = packSliderMain.find('.slider-btn_left')
    const packRightBtn = packSliderMain.find('.slider-btn_right')

    packLeftBtn.on('click', (e) => sectionSlider(e, 'pack', packLeftBtn, packRightBtn, packSliderSelf, 2, 10))
    packRightBtn.on('click', (e) => sectionSlider(e, 'pack', packLeftBtn, packRightBtn, packSliderSelf, 2, 10))
    packSliderSelf.on('touchstart', (e) => sectionTouch(e, 'pack', packLeftBtn, packRightBtn, 2))
    packSliderSelf.on('touchend', (e) => sectionTouch(e, 'pack', packLeftBtn, packRightBtn, 2))
    /* pack slider */



    /* reviews slider */
    const reviewsSliderMain = $('.reviews')
    const reviewsSliderSelf = reviewsSliderMain.find('.reviews__c-items')
    const reviewsLeftBtn = reviewsSliderMain.find('.slider-btn_left')
    const reviewsRightBtn = reviewsSliderMain.find('.slider-btn_right')

    reviewsLeftBtn.on('click', (e) => sectionSlider(e, 'review', reviewsLeftBtn, reviewsRightBtn, reviewsSliderSelf, 1, 15))
    reviewsRightBtn.on('click', (e) => sectionSlider(e, 'review', reviewsLeftBtn, reviewsRightBtn, reviewsSliderSelf, 1, 15))
    reviewsSliderSelf.on('touchstart', (e) => sectionTouch(e, 'review', reviewsLeftBtn, reviewsRightBtn, 1))
    reviewsSliderSelf.on('touchend', (e) => sectionTouch(e, 'review', reviewsLeftBtn, reviewsRightBtn, 1))

    /* reviews slider */



    /* modal close */
    $('.modal-action-close').on('click', (e) => {
        $(e.currentTarget.closest('.modal-main')).hide()
    })
    $('.modal-overlay').on('click', (e) => {
        if (e.target.classList.value.includes('modal-overlay')) {
            $(e.target).hide()
        }
    })


    /* modal close */



    /*canvas */
    let workLinesIsDrawed = false
    let effectCirclesIsDrawed = false

    const effectSection = document.querySelector('.effect')
    const workSection = document.querySelector('.work')
    window.addEventListener('scroll', winScroll)

    function winScroll() {

        const workSectionTrigger = workSection.getBoundingClientRect().top <= 200
        const effectSectionTrigger = effectSection.getBoundingClientRect().top <= 200

        if (!workLinesIsDrawed && workSectionTrigger) {
            drawLines()
            workLinesIsDrawed = true
        }

        if (!effectCirclesIsDrawed && effectSectionTrigger) {
            drawCircles()
            effectCirclesIsDrawed = true
        }

        if (effectCirclesIsDrawed && workLinesIsDrawed) {
            window.removeEventListener('scroll', winScroll)
        }

    }

    /*canvas */

    /* payment */

    const payMain = $('.payment')
    const payBtns = payMain.find('.payment__c-desc-btn')
    const payImg = payMain.find('.payment__c-desc-img-data')
    const payName = payMain.find('.payment__c-form-name')
    const payPrice = payMain.find('.payment__c-form-price')
    const map = {
        lite: { name: 'Лайт', price: '14 950' },
        standart: { name: 'Стандарт', price: '25 700' },
        prem: { name: 'Премиальный', price: '39 800' }
    }

    payBtns.on('click', (e) => {
        const { type } = e.currentTarget.dataset
        payBtns.attr('disabled', false)
        $(e.currentTarget).attr('disabled', true)
        payImg.attr('src', `./assets/payment/${type}.png`)
        payName.text(map[type].name)
        payPrice.text(map[type].price)
    })

    /* payment */







    /* diploms */
    const diplomSliderMain = $('.diploms__c')
    const diplomsSliderWrapper = document.querySelector('.diploms__c-slider-wrp')
    const diplomSliderSelf = $('.diploms__c-slider-items')
    const diplomLeftBtn = diplomSliderMain.find('.slider-btn_left')
    const diplomRightBtn = diplomSliderMain.find('.slider-btn_right')

    diplomRightBtn.on('click', (e) => { diplomSlider(e, diplomLeftBtn, diplomRightBtn, diplomsSliderWrapper, diplomSliderSelf) })
    diplomLeftBtn.on('click', (e) => {
        diplomSlider(e, diplomLeftBtn, diplomRightBtn, diplomsSliderWrapper, diplomSliderSelf)
    })
    diplomsSliderWrapper.addEventListener('scroll', (e) => {
        console.log(e.currentTarget.scrollLeft, e.currentTarget.offsetWidth, diplomSliderSelf.width());

        diplomCheckScroll(diplomLeftBtn, diplomRightBtn, scrollVal, diplomSliderSelf.width())
    })


}, false);


/*  */
let healCurrSlide = 0
let healTouchStart = 0 //touch start val
function healSlider(evt, container, indication, allBtns) {
    const { index } = evt.currentTarget.dataset
    healCurrSlide = Number(index)
    container.css({ transform: `translateX(-${index * 100}%)` })
    indication.css({ transform: `translateX(-${(index * 100)}% )` })
    allBtns.attr('disabled', false)

    $(evt.currentTarget).attr('disabled', true)
}

function healTouch(e, allBtns) {
    if (e.type == 'touchstart') {
        healTouchStart = e.touches[0].clientX

    } else if (e.type == 'touchend') {
        const endX = e.changedTouches[0].clientX


        if (healTouchStart + 10 > endX && healCurrSlide + 1 < 6) {

            const index = healCurrSlide + 1
            allBtns.toArray()
                .forEach(btn => {
                    btn = $(btn)
                    if (btn.attr('data-index') == index) {
                        btn.trigger('click')
                    }
                })



        } else if (healTouchStart + 10 < endX && healCurrSlide - 1 >= 0) {
            const index = healCurrSlide - 1
            allBtns.toArray()
                .forEach(btn => {
                    btn = $(btn)
                    if (btn.attr('data-index') == index) {
                        btn.trigger('click')
                    }
                })
        }
        healTouchStart = 0
    }
}

/*  */



/*  */

let sliderState = {
    pack: 0,
    review: 0
}
let sectionTouchStart = 0

function sectionSlider(e, type, leftbtn, rightBtn, container, max, gap = 0) {
    //max is index, start from 0
    //type is key of sliderState

    let { slideto } = e.currentTarget.dataset
    slideto = Number(slideto) > 0 ? 1 : -1

    if (sliderState[type] + slideto >= 0 && sliderState[type] + slideto <= max) {
        sliderState[type] = sliderState[type] + slideto
        container.css({ transform: `translateX(calc(-${sliderState[type] * 100}% - ${gap * sliderState[type]}px))` })
            .find('.drop-down-action_opened')
            .removeClass('drop-down-action_opened')
    }

    rightBtn.attr('disabled', sliderState[type] + 1 > max)
    leftbtn.attr('disabled', sliderState[type] - 1 < 0)

}




function sectionTouch(e, type, leftbtn, rightBtn, max,) {

    if (e.type == 'touchstart') {
        sectionTouchStart = e.touches[0].clientX

    } else if (e.type == 'touchend') {
        const endX = e.changedTouches[0].clientX

        if (sectionTouchStart + 50 > endX && sliderState[type] < max) {
            rightBtn.trigger('click')

        } else if (sectionTouchStart + 50 < endX && sliderState[type] - 1 >= 0) {
            leftbtn.trigger('click')

        }
        sectionTouchStart = 0
    }

}
/*  */



/*  */
let diplomCurrSlide = 1
function diplomSlider(evt, leftbtn, rightBtn, wrapper, container, max = 6) {
    //max is index, start from 0
    let { slideto } = evt.currentTarget.dataset
    slideto = Number(slideto)

    const scrollVal = (container.width() / max) * diplomCurrSlide

    wrapper.scrollTo(scrollVal, 0)



    diplomCheckScroll(leftbtn, rightBtn, scrollVal, container.width())
}
function diplomCheckScroll(leftbtn, rightBtn, scrollVal, containerWidth) {
    if (scrollVal + 100 >= containerWidth) {
        rightBtn.attr('disabled', true)
    } else {

        rightBtn.attr('disabled', false)
    }

    if (scrollVal < 100) {
        leftbtn.attr('disabled', true)
    } else {
        leftbtn.attr('disabled', false)
    }

}
/*  */




/* work canvases */
function drawLines() {
    document.querySelectorAll('.work__c-graph-progress-line')
        .forEach((canvas, i) => {
            setTimeout(() => { lineCanvas(canvas) }, i * 500)

        })
}

function lineCanvas(canvas) {
    const ctx = canvas.getContext('2d');

    let lineLength = 0;
    const duration = 1000;
    let startTime = null;

    function drawLine(length) {

        ctx.strokeStyle = 'rgba(255, 132, 160, 1)';
        ctx.lineWidth = canvas.height;

        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(length, canvas.height / 2);
        ctx.stroke();
    }

    requestAnimationFrame(animateLine);

    function animateLine(timestamp) {

        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;

        lineLength = Math.min((elapsedTime / duration) * canvas.width, canvas.width);
        drawLine(lineLength);

        if (elapsedTime < duration) {
            requestAnimationFrame(animateLine);
        }
    }

}

/* work canvases */



/* effect canvases */
function drawCircles() {
    document.querySelectorAll('.effect__c-info-precent-circle-canvas')
        .forEach((canvas, i) => {
            const precentText = $(canvas.closest('.effect__c-info-precent-circle')).find('.effect__c-info-precent-circle-val')
            setTimeout(() => {
                circleCanvas(canvas, canvas.dataset.precent)
                changePrecent(precentText, canvas.dataset.precent)

            }
                , i * 500)

        })
}
function changePrecent(jqDom, callSize) {
    let curr = 0

    const interval = setInterval(() => {
        if (curr <= callSize) {
            jqDom.text(curr)
            curr++
        } else {
            clearInterval(interval)
        }
    }, 1000 / callSize);

}

function circleCanvas(canvas, circleEnd) {
    const ctx = canvas.getContext('2d');

    const { width, height } = canvas


    const radius = Math.min(width, height) / 2 - 6;
    const lineWidth = 6;
    const duration = 1000;
    let startTime = null;

    const startAngle = -Math.PI / 2

    const endAngle = startAngle + 2 * Math.PI * (circleEnd / 100);;

    function drawCircle(angle) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, startAngle, Math.min(angle + startAngle, endAngle));
        ctx.strokeStyle = 'rgba(255, 132, 160, 1)';
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    function animateCircle(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;


        const angle = Math.min((elapsedTime / duration) * (endAngle - startAngle), endAngle - startAngle);
        drawCircle(angle);

        if (elapsedTime < duration) {
            requestAnimationFrame(animateCircle);
        }
    }

    requestAnimationFrame(animateCircle);
}

/* effect canvases */
