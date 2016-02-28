//////////////////////////////////////////////////////////////////////////////////////////
// Init function PushState
//////////////////////////////////////////////////////////////////////////////////////////

var call = {

    firstInit: function(){
        // run everywhere
        Global.pageLoad();
    },
    init: function() {
        // getting location path
        var sPath = window.location.pathname;

        // run on specific page
        if (sPath.indexOf('post') > -1) {



        }
    }
}



//////////////////////////////////////////////////////////////////////////////////////////
// History PushState
//////////////////////////////////////////////////////////////////////////////////////////




$(function() {
    String.prototype.decodeHTML = function() {
        return $('<div>', {
            html: '' + this
        }).html();
    };

    var $main = $('main'),

        init = function() {
            // on init
            call.init();
        },

        ajaxLoad = function(html) {
            // on page load update title
            document.title = html
                .match(/<title>(.*?)<\/title>/)[1]
                .trim()
                .decodeHTML();

            // on page load hide loader
            TweenMax.to(localLoader, duration, {
                x: '100%',
                ease:Power4.easeOut
            });

            // move the loader back
            TweenMax.set(localLoader, {
                x: '-100%',
                delay: duration
            });

            // clear props of  local loader
            TweenMax.set(localLoader, {
                clearProps: 'all',
                delay: duration
            });

            // on page load run functions needed
            init();
        },

        loadPage = function(href) {

            console.log('should have scroll top right here');;

            // load page page after 1500
            setTimeout(function(){

                $(window).scrollTop(0)

                // load the page
                $main.load(href + ' main>*', ajaxLoad);

            },duration * 1000 );
        },
        loadPreviousPage = function(href) {

            // expand loader
            TweenMax.to(localLoader, duration, {
                x: 0,
                ease:Power4.easeOut
            });

            $(window).scrollTop();

            // load page page after 1500
            setTimeout(function(){

                $(window).scrollTop(0)

                // load the page
                $main.load(href + ' main>*', ajaxLoad);

            }, duration * 1000 );
        };

    ////////////////////////////////////////////////
    // start here
    ////////////////////////////////////////////////

    // call this when the page first load when page load
    call.firstInit();
    init();
    var localLoader = $('#local-loader');
    var duration = .8;

    // listen for popstate
    $(window).on("popstate", function(e) {
        // if (e.originalEvent.state !== null) {
            loadPreviousPage(location.href);
        // }
    });

    // listen for click
    $(document).on('click', 'a', function() {
        var href = $(this).attr('href');

        // expand loader
        TweenMax.to(localLoader, duration, {
            x: 0,
            ease:Power4.easeOut
        });

        // if href match something run psuh state and loadpage function after 1500ms

        if (href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) {
            history.pushState({}, '', href);
            loadPage(href);
            return false;
        }

    });
});