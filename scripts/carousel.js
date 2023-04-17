$(document).ready(function () {
    const animationSpeed = 1 * 1000;
    const widthDefault = 400;
    const heightDefault = 300;
    const paddingDefault = 3;
    const marginDefault = 5;
    const borderWidthDefault = 3;

    const soccerUrlArray =getSoccerlUrlArray();

    let index = 4;
    let count = 2;
    
    $('.current').click(function () {
        if(count == 0){
            window.location.href = 'file:///D:/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%90%D0%93/PacMan%20&%20Snake/snake.html';
        }
        else if(count % 2 == 0){
            window.location.href = 'file:///D:/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%90%D0%93/PacMan%20&%20Snake/snake.html';
        }
        else {
            window.location.href = 'file:///D:/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%90%D0%93/PacMan%20&%20Snake/pacman.html';
        }    
    });

    $('.next').click(function () {
        $('.current').animate(
            {
                width: widthDefault / 2,
                height: heightDefault / 2,
            },
            animationSpeed);

        $('.next').animate(
            {
                width: widthDefault,
                height: heightDefault,
            },
            animationSpeed);
        $('.prev').animate(
            {
                width: 0,
                height: 0,
                padding: 0,
                borderWidth: 0
            },
            animationSpeed);

        $('.last').animate(
            {
                width: widthDefault / 2,
                height: heightDefault / 2,
                padding: paddingDefault,
                margin: marginDefault,
                borderWidth: borderWidthDefault
            },
            animationSpeed,
            pickNextImage);
    });

    $('.prev').click(function () {
        $('.current').animate(
            {
                width: widthDefault / 2,
                height: heightDefault / 2,
            },
            animationSpeed);

        $('.next').animate(
            {
                width: 0,
                height: 0,
                padding: 0,
                borderWidth: 0
                
            },
            animationSpeed);
        $('.prev').animate(
            {
                width: widthDefault,
                height: heightDefault,
            },
            animationSpeed);

        $('.first').animate(
            {
                width: widthDefault / 2,
                height: heightDefault / 2,
                padding: paddingDefault,
                margin: marginDefault,
                borderWidth: borderWidthDefault
            },
            animationSpeed,
            pickPrevImage);
    });

    function pickNextImage() {
        setDefaultStyle();

        var currentUrl = $('.current img').attr('src');
        var nextUrl = $('.next img').attr('src');
        var lastUrl = $('.last img').attr('src');

        $('.prev img').attr('src', currentUrl);
        $('.current img').attr('src', nextUrl);
        $('.next img').attr('src', lastUrl);

        index++;
        if (index >= soccerUrlArray.length){
            index = 0;
        }
        $('.last img').attr('src', soccerUrlArray[index]);
        count +=1;
        console.log(count);
    }

    function pickPrevImage() {
        setDefaultStyle();

        var currentUrl = $('.current img').attr('src');
        var prevUrl = $('.prev img').attr('src');
        var firstUrl = $('.first img').attr('src');

        $('.prev img').attr('src', firstUrl);
        $('.current img').attr('src', prevUrl);
        $('.next img').attr('src', currentUrl);

        index--;
        if (index >= soccerUrlArray.length){
            index = 0;
        }
        else if(index >= soccerUrlArray.length){
            index = soccerUrlArray.length -1;
        }
        $('.first img').attr('src', soccerUrlArray[index]);
        count -=1;
        console.log(count);
    }

    function setDefaultStyle(){
        $('.image-container').css({
            borderWidth: borderWidthDefault,
            margin: marginDefault,
            padding: paddingDefault,
        });

        $('.current').css({
            width: widthDefault,
            height: heightDefault,
        });

        $('.secondary').css({
            width: widthDefault / 2,
            height: heightDefault / 2,
        });

        $('.thrid').css({
            width: 0,
            height: 0,
            borderWidth: 0,
            margin: 0,
            padding: 0,
        });
    }

    function getSoccerlUrlArray(){
        let soccerArray = [];
        for (let i = 0; i < 4; i++) {
            soccerArray.push(`images/Soccer${i}.jpg`);
        }
        return soccerArray;
    }

});