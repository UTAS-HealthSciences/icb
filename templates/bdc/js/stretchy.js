// in separate file due to caching issue

// toggle hints, explanation and feedback (requires jquery library)
$(window).load(function () {
    $(".newStretchy").each(function () {

        var titleDiv = $(this).find(".title");
        var titleH3 = titleDiv.find("h3");
        var contentDiv = $(this).find(".content");

        // wrap with anchors
        titleH3.wrap("<a class='toggle' href='javascript:;'></a>");

        var titleA = titleDiv.find("a");

        // initialise title
        $(titleH3[0]).addClass("primary");
        $(titleH3[1]).addClass("secondary");
        $(titleA[1]).toggle();
        titleDiv.toggleClass('closed'); // initially adds class closed

        //initially hide content div
        contentDiv.hide();

        // toggle appropriate classes
        $(titleDiv).find(".toggle").click(function () {

            var thisTitleDiv = titleDiv;

            titleA.toggle(); // toggle button text

            // tidy css transitions by ordering
            if (thisTitleDiv.hasClass('closed')) {
                thisTitleDiv.toggleClass('closed');
                contentDiv.slideToggle("slow");
            }
            else {
                contentDiv.slideToggle("slow", function () {
                    thisTitleDiv.toggleClass('closed')
                });
            }

        })
    });
});