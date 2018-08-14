$(function(){

    function isUrl(string) {
        return /^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(string);
    }

    function removeTooltip(e) {
        $(e.target).tooltip("hide");
    }

    function showTooltip(elem, msg) {
        $(elem).tooltip({title: msg, placement: "bottom", trigger:"manual"});
        $(elem).tooltip('show');
    }

    function onCopyError(e) {
        showTooltip(e.trigger, function(){
            if (/Mac/i.test(navigator.userAgent)) {
                return 'Your browser does not support clipboard integration so the component has been selected. Press ⌘-C to copy manually';
            }
            else {
                return 'Your browser does not support clipboard integration so the component has been selected. Press Ctrl-C to copy manually';
            }
        });
    }

    function onCopySuccess(e) {
        e.clearSelection();
        showTooltip(e.trigger, 'Copied!');
    }

    $(".copy-button").each(function(){
        var button = $(this);
        var tabPane = button.closest(".tab-pane");
        var componentId = tabPane.attr('id');
        var component = tabPane.find('.component')

        var originalOuterHTML = component[0].outerHTML;
        var originalInnerHTML = component[0].innerHTML;


        this.addEventListener('mouseleave', removeTooltip);

        /*
         If there is a custom modification as indicated by dit-has-modification class, build it. Otherwise, default
         innerHTML is copied to clipboard
         */
        var hasMod = component.attr('dit-has-modification');
        if (typeof hasMod !== typeof undefined && hasMod !== false) {
            var modType = component.attr('dit-modification-type');

            switch (modType)
            {
                case 'youtubeEmbedSource':
                case 'echoEmbedSource':
                {
                    var inputId = componentId+'-'+modType;

                    var replacementElementSelector = component.attr('dit-modification-replace-element-selector');
                    var replacementAttribute = component.attr('dit-modification-replace-attribute');

                    button.attr('disabled', 'disabled');

                    var inputForm = $('<form class="form-horizontal">');

                    var inputFormDiv = $('<div class="form-group">')
                    inputForm.append(inputFormDiv);

                    var controlLabel = modType == 'youtubeEmbedSource' ? 'Embed code' : 'Embed code';

                    inputFormDiv.append($('<label class="col-md-3 control-label">'+controlLabel+'</label>', {
                        for: inputId
                    }));

                    var inputColumn = $('<div class="col-md-6">');
                    inputFormDiv.append(inputColumn);

                    var input = $('<input>', {
                        id: inputId,
                        name: inputId,
                        type: 'text',
                        placeholder: controlLabel,
                        class: 'form-control'
                    });
                    inputColumn.append(input);


                    button.before(inputForm);


                    var fields = {};
                    fields[inputId] = {
                        validators: {
                            callback: {
                                message: "Embed code is not valid",
                                callback: function (fieldValue, validator, field) {
                                    button.attr('disabled', 'disabled');

                                    switch(modType)
                                    {
                                        case 'echoEmbedSource':
                                            if(fieldValue)
                                            {
                                                try {
                                                    if(isUrl(fieldValue))
                                                    {
                                                        var src = fieldValue;
                                                    }
                                                    else
                                                    {
                                                        var embedIframe = $(fieldValue);
                                                        var src = embedIframe.attr('src');

                                                        if (!embedIframe.is('iframe') || !src)
                                                            throw "Embed code is not valid";
                                                    }

                                                    if(src.indexOf('https://mymediaservice.utas.edu.au:8443/ess/echo/')!=0)
                                                        throw "Embed url must be from the UTas Echo media provider";

                                                    var paramsIndex = src.indexOf('?');
                                                    if(paramsIndex!=-1)
                                                    {
                                                        src = src.substring(0, paramsIndex);
                                                    }

                                                    var newComponent = $(originalOuterHTML);

                                                    newComponent.find(replacementElementSelector).attr(replacementAttribute, src+'?embed=true');

                                                    var viewSelector = component.attr('dit-modification-view-selector');
                                                    var downloadSelector = component.attr('dit-modification-download-selector');

                                                    newComponent.find(viewSelector).attr('href', src)
                                                    newComponent.find(downloadSelector).attr('href', src+'/media.m4v?downloadOnly=true');

                                                    var component = tabPane.find('.component')
                                                    component.replaceWith(newComponent);

                                                    button.removeAttr('disabled');
                                                    return true;
                                                }
                                                catch (e) {
                                                    return false;
                                                }
                                            }
                                            return;

                                        case 'youtubeEmbedSource':
                                            if(fieldValue)
                                            {
                                                try {
                                                    var embedIframe = $(fieldValue);
                                                    var src = embedIframe.attr('src');

                                                    if (!embedIframe.is('iframe') || !src)
                                                        throw "Embed code is not valid";

                                                    var newComponent = $(originalOuterHTML);

                                                    newComponent.find(replacementElementSelector).attr(replacementAttribute, src);

                                                    var component = tabPane.find('.component')
                                                    component.replaceWith(newComponent);

                                                    button.removeAttr('disabled');
                                                    return true;
                                                }
                                                catch (e) {
                                                    return false;
                                                }
                                            }

                                            return;
                                    }
                                }
                            }
                        }
                    }

                    inputForm.bootstrapValidator({
                        feedbackIcons: {
                            valid: 'glyphicon',
                            invalid: 'glyphicon glyphicon-remove',
                            validating: 'glyphicon'
                        },
                        fields: fields,
                        submitButtons: button,
                        live: 'enabled'
                    });

                    (new Clipboard(this, {target: function(){
                        return tabPane.find('.component')[0];
                    }}))
                        .on('success', onCopySuccess)
                        .on('error', onCopyError);
                    break;
                }
                case 'tabs':
                {
                    var navSelector = component.attr('dit-modification-nav-selector');
                    var contentSelector = component.attr('dit-modification-content-selector');

                    (new Clipboard(this, {target: function(){
                        var newComponent = $(originalOuterHTML);

                        var nav = newComponent.find(navSelector);
                        var content = newComponent.find(contentSelector);

                        if(nav.length!= content.length)
                        {
                            console.error("Tab navigation and content element lists are not the same length for component", newComponent)
                            return;
                        }

                        for(var i=0;i<nav.length;i++)
                        {
                            var time = new Date().getTime();

                            var id = 'dit-tab-'+componentId+'-'+time+'-'+(i+1);
                            nav[i].setAttribute('href', '#'+id);
                            content[i].setAttribute('id',id);
                        }

                        var component = tabPane.find('.component')
                        component.replaceWith(newComponent);

                        return tabPane.find('.component')[0];
                    }}))
                        .on('success', onCopySuccess)
                        .on('error', onCopyError);

                    break;
                }
                case 'dataTarget':
                {
                    var triggerSelector = component.attr('dit-modification-trigger-selector');
                    var targetSelector = component.attr('dit-modification-target-selector');

                    (new Clipboard(this, {target: function(){
                        var newComponent = $(originalOuterHTML);
                        var trigger = newComponent.find(triggerSelector);
                        var target = newComponent.find(targetSelector);

                        var time = new Date().getTime();
                        var id = 'dit-data-target-'+componentId+'-'+time;

                        trigger.attr('data-target', '#'+id);
                        target.attr('id', id);

                        var component = tabPane.find('.component')
                        component.replaceWith(newComponent);

                        return tabPane.find('.component')[0];
                    }}))
                        .on('success', onCopySuccess)
                        .on('error', onCopyError);
                    break;
                }
                default:
                {
                    button.attr('dit-original-html', originalInnerHTML);
                }
            }
        }
        else
        {
            button.attr('data-clipboard-target', '#' + componentId + ' .component');

            this.addEventListener('mouseleave', removeTooltip);

            (new Clipboard(this))
                .on('success', onCopySuccess)
                .on('error', onCopyError);
        }

    });
})

