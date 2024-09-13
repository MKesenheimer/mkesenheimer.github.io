function initSparkling() {
    // settings
    const color = "#8475F0";
    const svgPath = 'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';

    // sparkling effect
    let sparkling = function() {
        $('.spark').each(function() {
            let sparklingElement = $(this);
            let stars = sparklingElement.find('.star');

            // remove the first star when more than 6 stars existing
            if(stars.length > 5) {
                stars.each(function(index) {
                    if(index === 0) {
                        $(this).remove();
                    }
                });
            }
            // add a new star
            sparklingElement.append(addStar());
        });

        let rand = Math.round(Math.random() * 700) + 100;
        setTimeout(sparkling, rand);
    }

    // star
    let addStar = function() {
        let size = Math.floor(Math.random() * 20) + 10;
        let top = Math.floor(Math.random() * 100) - 50;
        let left = Math.floor(Math.random() * 100);

        return '<span class="star" style="top:' + top + '%; left:' + left + '%;">'
            + '<svg width="' + size + '" height="' + size + '" viewBox="0 0 68 68" fill="none">'
            + '<path d="' + svgPath + '" fill="' + color + '" /></svg></span>';
    }

    // execute
    sparkling();
}

$(function() {
    $(window).on('load', function() {
        // nothing yet
    });

    var windowWidth = $(window).width();
    //var bodyHeight = $('#wrapper').height();
    var windowHeight = $(window).height();
    stars(windowWidth, windowHeight);
    // init sparkling stars
    initSparkling();

    function stars(windowWidth, windowHeight) {
        var mathstar = 7;
        if(windowWidth < 600) {
            mathstar = 10;
        }
        var maxStars = Math.floor(windowHeight / mathstar);
        for(var i = 0; i < maxStars; i++) {
            var top = Math.random() * (windowHeight + 50) - 50;
            var left = Math.random() * (windowWidth + 50) - 50;
            $("body").append('<div class="star'+(Math.floor(Math.random() * 3) + 1)+'" style="top:' + top + 'px; left:' + left + 'px;"></div>');
        }
    }

    $("a[href^=http]").each(function(){
        if(this.href.indexOf(location.hostname) == -1) {
            $(this).attr({target: "_blank"});
        }
    })

});