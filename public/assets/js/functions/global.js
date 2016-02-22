//
// global
var Global = (function() {

    var body = $('body');

    function pageLoad() {

        var globalLoader = $('#global-loader');
        var mods = $('.title');
        var duration = 1200;

        $(window).load(function() {
            TweenMax.to(globalLoader, duration*0.001, {
                opacity: '0',
                delay: .1,
                ease:Power4.easeOut
            });

            TweenMax.staggerFrom(mods, duration*0.001, {
                y: '+= 100',
                ease:Power4.easeOut
            }, .1);

            TweenMax.set(globalLoader, {
                pointerEvents: 'none',
            });

        });
    }

    return {
        pageLoad: pageLoad
    }
})();