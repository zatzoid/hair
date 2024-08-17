


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
    /* heal slider */



    /* pack slider */
    const packSliderMain = $('.packs')
    const packSliderSelf = packSliderMain.find('.packs__items')
    const packLeftBtn = packSliderMain.find('.slider-btn_left')
    const packRightBtn = packSliderMain.find('.slider-btn_right')

    packLeftBtn.on('click', (e) => packSlider(e, packLeftBtn, packRightBtn, packSliderSelf))
    packRightBtn.on('click', (e) => packSlider(e, packLeftBtn, packRightBtn, packSliderSelf))
    /* pack slider */



    /* reviews slider */
    const reviewsSliderMain = $('.reviews')
    const reviewsSliderSelf = reviewsSliderMain.find('.reviews__c-items')
    const reviewsLeftBtn = reviewsSliderMain.find('.slider-btn_left')
    const reviewsRightBtn = reviewsSliderMain.find('.slider-btn_right')

    reviewsLeftBtn.on('click', (e) => reviewsSlider(e, reviewsLeftBtn, reviewsRightBtn, reviewsSliderSelf))
    reviewsRightBtn.on('click', (e) => reviewsSlider(e, reviewsLeftBtn, reviewsRightBtn, reviewsSliderSelf))
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
    //УБЕРИ МЕНЯ
    //УБЕРИ МЕНЯ
    //УБЕРИ МЕНЯ
    //УБЕРИ МЕНЯ
    //УБЕРИ МЕНЯ
    //УБЕРИ МЕНЯ
    //УБЕРИ МЕНЯ
    $('.modal-action-close').trigger('click')
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




   /*  const diplomSliderMain = $('.diploms__c')
    const diplomsSliderWrapper = document.querySelector('.diploms__c-slider-wrp')
    const diplomSliderSelf = $('.diploms__c-slider-items')
    const diplomLeftBtn = diplomSliderMain.find('.slider-btn_left')
    const diplomRightBtn = diplomSliderMain.find('.slider-btn_right')

    diplomRightBtn.on('click', (e) => { diplomSlider(e, diplomLeftBtn, diplomRightBtn, diplomsSliderWrapper, diplomSliderSelf) })
    diplomLeftBtn.on('click', (e) => {
        diplomSlider(e, diplomLeftBtn, diplomRightBtn, diplomsSliderWrapper, diplomSliderSelf)
    })
    diplomsSliderWrapper.addEventListener('scroll', (e) => {
        console.log(e.currentTarget.scrollLeft);
        diplomCheckScroll(diplomLeftBtn, diplomRightBtn, scrollVal, diplomSliderSelf.width())
    })
 */

}, false);


/*  */
function healSlider(evt, container, indication, allBtns) {
    const { index } = evt.currentTarget.dataset

    container.css({ transform: `translateX(-${index * 100}%)` })
    indication.css({ transform: `translateX(-${(index * 100)}% )` })
    allBtns.attr('disabled', false)

    $(evt.currentTarget).attr('disabled', true)
}
/*  */



/*  */
let packCurrSlide = 0
function packSlider(evt, leftbtn, rightBtn, container, max = 2) {
    //max is index, start from 0

    let { slideto } = evt.currentTarget.dataset
    slideto = Number(slideto) > 0 ? 1 : -1

    if (packCurrSlide + slideto >= 0 && packCurrSlide + slideto <= max) {
        packCurrSlide = packCurrSlide + slideto
        container.css({ transform: `translateX(calc(-${packCurrSlide * 100}% - ${10 * packCurrSlide}px))` })
            .find('.drop-down-action_opened')
            .removeClass('drop-down-action_opened')
    }

    rightBtn.attr('disabled', packCurrSlide + 1 > max)
    leftbtn.attr('disabled', packCurrSlide - 1 < 0)

}
/*  */



/*  */
/* let diplomCurrSlide = 1
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

} */
/*  */


/*  */
let reviewsCount = 0
function reviewsSlider(evt, leftbtn, rightBtn, container, max = 1) {
    //max is index, start from 0
    let { slideto } = evt.currentTarget.dataset
    slideto = Number(slideto) > 0 ? 1 : -1

    if (reviewsCount + slideto >= 0 && reviewsCount + slideto <= max) {
        reviewsCount = reviewsCount + slideto
        container.css({ transform: `translateX(calc(-${reviewsCount * 100}% / ${max} - ${15 * reviewsCount}px))` })

    }

    rightBtn.attr('disabled', reviewsCount + 1 > max)
    leftbtn.attr('disabled', reviewsCount - 1 < 0)
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
