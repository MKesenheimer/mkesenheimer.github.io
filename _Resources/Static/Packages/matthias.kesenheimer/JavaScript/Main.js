(function(e){"use strict";function r(t,n){this.opts=e.extend({handleKeys:!0,scrollEventKeys:[32,33,34,35,36,37,38,39,40]},n);this.$container=t;this.$document=e(document);this.lockToScrollPos=[0,0];this.disable()}var t,n;n=r.prototype;n.disable=function(){var e=this;e.lockToScrollPos=[e.$container.scrollLeft(),e.$container.scrollTop()];e.$container.on("mousewheel.disablescroll DOMMouseScroll.disablescroll touchmove.disablescroll",e._handleWheel);e.$container.on("scroll.disablescroll",function(){e._handleScrollbar.call(e)});e.opts.handleKeys&&e.$document.on("keydown.disablescroll",function(t){e._handleKeydown.call(e,t)})};n.undo=function(){var e=this;e.$container.off(".disablescroll");e.opts.handleKeys&&e.$document.off(".disablescroll")};n._handleWheel=function(e){e.preventDefault()};n._handleScrollbar=function(){this.$container.scrollLeft(this.lockToScrollPos[0]);this.$container.scrollTop(this.lockToScrollPos[1])};n._handleKeydown=function(e){for(var t=0;t<this.opts.scrollEventKeys.length;t++)if(e.keyCode===this.opts.scrollEventKeys[t]){e.preventDefault();return}};e.fn.disablescroll=function(e){!t&&(typeof e=="object"||!e)?t=new r(this,e):t&&t[e]&&t[e].call(t)};window.UserScrollDisabler=r})(jQuery);
function Egg(){this.eggs=[],this.hooks=[],this.kps=[],this.activeEgg="",this.ignoredKeys=[16],arguments.length&&this.AddCode.apply(this,arguments)}Egg.prototype.__execute=function(t){return"function"==typeof t&&t.call(this)},Egg.prototype.__toCharCodes=function(t){var e={slash:191,up:38,down:40,left:37,right:39,enter:13,space:32,ctrl:17,alt:18,tab:9,esc:27},o=Object.keys(e);return"string"==typeof t&&(t=t.split(",").map(function(t){return t.trim()})),t.map(function(t){return t===parseInt(t,10)?t:-1<o.indexOf(t)?e[t]:t.charCodeAt(0)}).join(",")},Egg.prototype.AddCode=function(t,e,o){return this.eggs.push({keys:this.__toCharCodes(t),fn:e,metadata:o}),this},Egg.prototype.AddHook=function(t){return this.hooks.push(t),this},Egg.prototype.handleEvent=function(t){var e=t.which,o=65<=e&&e<=90;if(!("keydown"!==t.type||t.metaKey||t.ctrlKey||t.altKey||t.shiftKey)){var i=t.target.tagName;if(("HTML"===i||"BODY"===i)&&o)return void t.preventDefault()}"keyup"===t.type&&0<this.eggs.length&&(o&&(t.shiftKey||(e+=32)),-1===this.ignoredKeys.indexOf(e)&&this.kps.push(e),this.eggs.forEach(function(t,e){0<=this.kps.toString().indexOf(t.keys)&&(this.kps=[],this.activeEgg=t,this.__execute(t.fn,this),this.hooks.forEach(this.__execute,this),this.activeEgg="")},this))},Egg.prototype.Listen=function(){return void 0!==document.addEventListener&&(document.addEventListener("keydown",this,!1),document.addEventListener("keyup",this,!1)),this},Egg.prototype.listen=Egg.prototype.Listen,Egg.prototype.addCode=Egg.prototype.AddCode,Egg.prototype.addHook=Egg.prototype.AddHook;

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
    var bodyHeight = $('#wrapper').height();
    //buddy();
    logo();
    stars(windowWidth, bodyHeight);
    egg();
    // init sparkling stars
    initSparkling();
    // contact form
    sendContactForm();

    /* ### functions which should not load in backend ### */
    if (!$("body").hasClass("neos-backend")) {

    }

    function logo() {
        var logoLeft = anime({
            targets: '.logo .left',
            delay: 500,
            translateY: 40,
            duration: 800,
            opacity: 100
        });

        var logoRight = anime({
            targets: '.logo .right',
            delay: 500,
            translateY: -40,
            duration: 800,
            opacity: 100
        });

        var rotate = anime({
            targets: '.logo',
            delay: 400,
            duration: 300,
            rotate: 45,
            easing: 'linear'
        });
    }

    function stars(windowWidth, bodyHeight) {
        var mathstar = 7;
        if(windowWidth < 600) {
            mathstar = 10;
        }
        var maxStars = Math.floor(bodyHeight / mathstar);
        for(var i = 0; i < maxStars; i++) {
            var top = Math.random() * (bodyHeight + 50) - 50;
            var left = Math.random() * (windowWidth + 50) - 50;
            $("body").append('<div class="star'+(Math.floor(Math.random() * 3) + 1)+'" style="top:' + top + 'px; left:' + left + 'px;"></div>');
        }
    }

    function sendContactForm() {
        let form = $('.contact-form');
        form.submit(function(e) {
            //prevent Default functionality
            e.preventDefault();
            // handle csrfToken
            var token =  $('input[name="csrfToken"]').attr('value');
            // send data
            $.ajax({
                url: "/api/sendmail",
                type: 'post',
                data: form.serialize(),
                method : 'POST',
                headers: {
                    'X-CSRF-Token': token
                },
                beforeSend: function() {
                    form.find('.btn-send').prop('disabled', true);
                },
                success: function(data) {
                    var dataObject = JSON.parse(data);
                    if (dataObject.error === true) {
                        alert(dataObject.message);
                    } else {
                        $('.contact-form').hide();
                        var htmlOutput = '<div class="message success" style="\n' +
                            '    background: #343560;\n' +
                            '    padding: 30px;\n' +
                            '    text-align: center;\n' +
                            '    font-size: 25px;\n' +
                            '    border-radius: 4px;\n' +
                            '                                    "><span style="\n' +
                            '    display: block;\n' +
                            '    font-size: 35px;\n' +
                            '">💌</span>'+dataObject.message+'</div>';
                        $('.controls').append(htmlOutput);
                    }
                }
            });
        });
    }

    function egg() {
        console.log('%cHuh? '+'%c↑ ↓ ← ← →', 'color: black;', 'color: #e63312;');
        var egg = new Egg("up,down,left,left,right", function() {
            window.location.href = 'https://renerehme.de/world';
        }).listen();
    }

    $("a[href^=http]").each(function(){
        if(this.href.indexOf(location.hostname) == -1) {
            $(this).attr({target: "_blank"});
        }
    })

});