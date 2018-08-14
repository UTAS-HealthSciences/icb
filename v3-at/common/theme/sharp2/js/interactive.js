/*
 * Shuffle jQuery array of elements - see Fisher-Yates algorithm
 * http://stackoverflow.com/questions/5329201/jquery-move-elements-into-a-random-order
 */
jQuery.fn.shuffle = function () {
    var j;
    for (var i = 0; i < this.length; i++) {
        j = Math.floor(Math.random() * this.length);
        $(this[i]).before($(this[j]));
    }
    return this;
};

$(function(){
    $('.dit-sortable').each(function(){
        $(this).disableSelection().sortable();

        $(this).find('tr').shuffle();
    });


    $('.dit-drag-drop').each(function(){
        var dragDropId = 'dit-drag-drop-'+ (new Date().getTime());
        var dragDropSelector = "."+dragDropId+" .dit-drag-drop-group";
        $(this).addClass(dragDropId);

        var all = $(this).find('.group-all')
            .addClass('dit-drag-drop-group')
            .empty();

        for(var i=0;i<3;i++)
        {
            var groupClass = 'group-'+i;
            var group = $(this).find('.'+groupClass);
           group.find('tr').wrap('<li class="list-group-item">');
           group.find('> li').attr('dit-group', groupClass).appendTo(all)
            group.closest('.panel-body').html('<ul class="'+groupClass+ ' dit-drag-drop-group list-group">');
        }

        $(dragDropSelector).sortable({
            connectWith: dragDropSelector,
            remove:  function(event, ui) {
                ui.item.removeClass('list-group-item-success list-group-item-danger')
            },
            receive: function(event, ui) {
                var target = $(event.target);

                if(!target.hasClass('group-all'))
                    ui.item.addClass(target.hasClass(ui.item.attr('dit-group')) ? 'list-group-item-success' : 'list-group-item-danger');
            },
            tolerance: "pointer",
            placeholder: "list-group-item bg-info"
        });

        $(this).find('li').shuffle();
    })

    $('.dit-sorting-with-feedback').each(function(){
        var sortableContainer = $(this);
        var continuousFeedback = sortableContainer.hasClass('dit-sorting-continuous-feedback');
        var sortable = sortableContainer.find('.dit-sortable-with-feedback')

        var index = 0;
        var sortableObjects = sortable.find('tr').each(function(){
            $(this).addClass("dit-sortable-index-"+index);
            index++;
        });

        function isSorted() {
            var currentIndex = 0;
            var match = true;
            sortable.find('tr').each(function () {
                if ($(this).hasClass("dit-sortable-index-" + currentIndex)) {
                    if(continuousFeedback) {
                        $(this).toggleClass('success', true).toggleClass('danger', false)
                    }
                }
                else {
                    match = false;

                    if(continuousFeedback) {
                        $(this).toggleClass('success', false).toggleClass('danger', true)
                    }
                }

                currentIndex++;
            });
            return match;
        }

        function updateUi() {

            var sorted = isSorted();

            sortableContainer.find('.dit-sorting-default').toggleClass('hidden', sorted);
            sortableContainer.find('.dit-sorting-success').toggleClass('hidden', !sorted);

            sortableContainer.toggleClass('panel-success', sorted);
            sortableContainer.toggleClass('panel-default', !sorted);
        }

        function anyCorrect() {
            var currentIndex = 0;
            var correct = false;

            sortable.find('tr').each(function () {
                if ($(this).hasClass("dit-sortable-index-" + currentIndex)) {
                    correct =  true;
                }

                currentIndex++;
            });

            return correct;
        }

        while(anyCorrect())
            sortableObjects.shuffle();

        updateUi()

        sortable.sortable({
            stop: updateUi
        });
    });


})

