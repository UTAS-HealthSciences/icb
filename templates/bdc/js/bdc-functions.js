// replace video splash screen with video on click (requires jquery library)
$(function () {
    $('.vid-splash')
        .click(function () {
            var video = '<iframe src="' + $(this)
                .attr('data-video') + '" width="620" height="350" frameborder="0" allowfullscreen></iframe>';
            $(this)
                .replaceWith(video);
        });
});


// toggle hints, explanation and feedback (requires jquery library)
$(window).load(function () {
    $(".stretchy > .toggle").each(function () {
        var next = $(this).next();

        // wrap content in extra div so margins are included in height.
        var innerDiv = $('<div class="innerDiv"></div>').css({margin: 0, padding: '1em'});
        innerDiv.append(next.children());
        next.append(innerDiv);

        next.height(next.height()); // explicitely write height to css for return transistion
        next.addClass('hidden'); // initially hide text div

        // toggle appropriate classes
        $(this).click(function () {
            next.toggleClass('hidden'); // toggle text div
            $(this).toggleClass('hide'); // toggle button text
        })
    });
});

// Hide download button. Download button is no appropriate when there is HTML content (requires jquery library)
$(window.top.document).find("a.d2l-button.d2l-button-icon.d2l-button-nml:contains('Download')").hide();