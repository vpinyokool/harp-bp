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
            TweenMax.to(localLoader, duration*.001, {
                x: '100%',
                ease:Power4.easeOut
            });

            // clear props of  local loader
            TweenMax.set($('#local-loader'), {
                clearProps: 'all',
                delay: duration*.001
            });

            // on page load run functions needed
            init();
        },

        loadPage = function(href) {
            // load page page after 1500
            setTimeout(function(){
                // load the page
                $main.load(href + ' main>*', ajaxLoad);

            },duration );
        };

    ////////////////////////////////////////////////
    // start here
    ////////////////////////////////////////////////

    // call this when the page first load when page load
    call.firstInit();
    init();
    var localLoader = $('#local-loader');
    var duration = 1200;

    // listen for popstate
    $(window).on("popstate", function(e) {
        // if (e.originalEvent.state !== null) {
            loadPage(location.href);
        // }
    });

    // listen for click
    $(document).on('click', 'a', function() {
        var href = $(this).attr('href');

        // animate top to 0
        TweenMax.to(localLoader, duration*.001, {
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