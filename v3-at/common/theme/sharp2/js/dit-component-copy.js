$(function(){
    ZeroClipboard.config({hoverClass:"btn-clipboard-hover", activeClass:"btn-clipboard-active"})

    function isUrl(string) {
        return /^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(string);
    }

    var buttons = $(".copy-button");
    buttons.each(function(){
        var button = $(this);
        var tabPane = button.closest(".tab-pane");
        var componentId = tabPane.attr('id');
        var component = tabPane.find('.component')
        var originalOuterHTML = component[0].outerHTML;
        var originalInnerHTML = component[0].innerHTML;

        button.attr('dit-original-html', originalInnerHTML);
        button.attr('dit-original-text', component[0].innerText);

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
                {
                    var inputId = componentId+'-'+modType;

                    var replacementElementSelector = component.attr('dit-modification-replace-element-selector');
                    var replacementAttribute = component.attr('dit-modification-replace-attribute');

                    button.attr('disabled', 'disabled');

                    var inputForm = $('<form class="form-horizontal">');

                    var inputFormDiv = $('<div class="form-group">')
                    inputForm.append(inputFormDiv);
                    inputFormDiv.append($('<label class="col-md-3 control-label">Embed code</label>', {
                        for: inputId
                    }));

                    var inputColumn = $('<div class="col-md-6">');
                    inputFormDiv.append(inputColumn);

                    var input = $('<input>', {
                        id: inputId,
                        name: inputId,
                        type: 'text',
                        placeholder: 'Embed code',
                        class: 'form-control'
                    });
                    inputColumn.append(input);

                    var fields = {};
                    fields[inputId] = {
                        validators: {
                            callback: {
                                message: "Embed code is not valid",
                                callback: function (fieldValue, validator, field) {
                                    button.attr('disabled', 'disabled');

                                    if(fieldValue)
                                    {
                                        try {
                                            var embedIframe = $(fieldValue);
                                            var src = embedIframe.attr('src');

                                            if (!embedIframe.is('iframe') || !src)
                                                throw "Embed code is not valid";

                                            var newComponent = $(originalOuterHTML);

                                            newComponent.find(replacementElementSelector).attr(replacementAttribute, src);

                                            button.attr('dit-original-text', newComponent.text());
                                            button.attr('dit-original-html', newComponent.html());


                                            button.removeAttr('disabled');
                                            return true;
                                        }
                                        catch (e) {
                                            return false;
                                        }
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

                    button.closest('.zero-clipboard').before(inputForm);

                    break;
                }
                case 'tabs':
                {
                    var navSelector = component.attr('dit-modification-nav-selector');
                    var contentSelector = component.attr('dit-modification-content-selector');

                    button.on('dit-copy', function(){
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

                        button.attr('dit-original-text', newComponent.text());
                        button.attr('dit-original-html', newComponent.html());
                    })

                    break;
                }
                case 'dataTarget':
                {
                    var triggerSelector = component.attr('dit-modification-trigger-selector');
                    var targetSelector = component.attr('dit-modification-target-selector');

                    button.on('dit-copy', function(){
                        var newComponent = $(originalOuterHTML);
                        var trigger = newComponent.find(triggerSelector);
                        var target = newComponent.find(targetSelector);

                        var time = new Date().getTime();
                        var id = 'dit-data-target-'+componentId+'-'+time;

                        trigger.attr('data-target', '#'+id);
                        target.attr('id', id);

                        button.attr('dit-original-text', newComponent.text());
                        button.attr('dit-original-html', newComponent.html());
                    })

                    break;
                }
                case 'echoEmbedSource':
                {
                    var inputId = componentId+'-'+modType;

                    var replacementElementSelector = component.attr('dit-modification-replace-element-selector');
                    var replacementAttribute = component.attr('dit-modification-replace-attribute');

                    var viewSelector = component.attr('dit-modification-view-selector');
                    var downloadSelector = component.attr('dit-modification-download-selector');

                    button.attr('disabled', 'disabled');

                    var inputForm = $('<form class="form-horizontal">');

                    var inputFormDiv = $('<div class="form-group">')
                    inputForm.append(inputFormDiv);
                    inputFormDiv.append($('<label class="col-md-3 control-label">Echo360 embed code</label>', {
                        for: inputId
                    }));

                    var inputColumn = $('<div class="col-md-6">');
                    inputFormDiv.append(inputColumn);

                    var input = $('<input>', {
                        id: inputId,
                        name: inputId,
                        type: 'text',
                        placeholder: 'Echo360 embed code',
                        class: 'form-control'
                    });
                    inputColumn.append(input);

                    var fields = {};
                    fields[inputId] = {
                        validators: {
                            callback: {
                                message: "Embed code is not valid",
                                callback: function (fieldValue, validator, field) {
                                    button.attr('disabled', 'disabled');

                                    if(fieldValue)
                                     fieldValue=$.trim(fieldValue);
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
                                            newComponent.find(viewSelector).attr('href', src)
                                            newComponent.find(downloadSelector).attr('href', src+'/media.m4v?downloadOnly=true');

                                            button.attr('dit-original-text', newComponent.text());
                                            button.attr('dit-original-html', newComponent.html());


                                            button.removeAttr('disabled');
                                            return true;
                                        }
                                        catch (e) {
                                            return false;
                                        }
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

                    button.closest('.zero-clipboard').before(inputForm);

                    break;
                }
                case 'directEmbedSource':
                {
				                    var inputId = componentId+'-'+modType;

				                    var replacementElementSelector = component.attr('dit-modification-replace-element-selector');
				                    var replacementAttribute = component.attr('dit-modification-replace-attribute');

				                    var viewSelector = component.attr('dit-modification-view-selector');
				                    var downloadSelector = component.attr('dit-modification-download-selector');

				                    button.attr('disabled', 'disabled');

				                    var inputForm = $('<form class="form-horizontal">');

				                    var inputFormDiv = $('<div class="form-group">')
				                    inputForm.append(inputFormDiv);
				                    inputFormDiv.append($('<label class="col-md-3 control-label">Video link</label>', {
				                        for: inputId
				                    }));

				                    var inputColumn = $('<div class="col-md-6">');
				                    inputFormDiv.append(inputColumn);

				                    var input = $('<input>', {
				                        id: inputId,
				                        name: inputId,
				                        type: 'text',
				                        placeholder: 'Video link',
				                        class: 'form-control'
				                    });
				                    inputColumn.append(input);

				                    var fields = {};
				                    fields[inputId] = {
				                        validators: {
				                            callback: {
				                                message: "link address is not valid",
				                                callback: function (fieldValue, validator, field) {
				                                    button.attr('disabled', 'disabled');

				                                    if(fieldValue)
				                                     fieldValue=$.trim(fieldValue);
				                                    {
				                                        try {
				                                            if(isUrl(fieldValue))
				                                            {
				                                                var src = fieldValue;
																var paramsIndex = src.indexOf('?');
                                           						if(paramsIndex!=-1)
																{
																	if(/echo/.test(src)){
																		// it's an echo video ... don't trim the src
																		}
																		else
																		{ //it's a local video ... trim off the garbage session variables from MyLO}
																			src = src.substring(0, paramsIndex);
																	}
																}
				                                            }
				                                            else
				                                            {

				                                                    throw "Embed code is not valid";
				                                            }
															var newComponent = $(originalOuterHTML);

				                                            newComponent.find(replacementElementSelector).attr(replacementAttribute, src);
				                                            newComponent.find(viewSelector).attr('href', src)

				                                            button.attr('dit-original-text', newComponent.text());
				                                            button.attr('dit-original-html', newComponent.html());


				                                            button.removeAttr('disabled');
				                                            return true;
				                                        }
				                                        catch (e) {
				                                            return false;
				                                        }
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

				                    button.closest('.zero-clipboard').before(inputForm);

				                    break;
                }

                default:
                {
                    button.attr('dit-original-html', originalInnerHTML);
                }
            }

        }

    });

    var client = new ZeroClipboard(buttons);

    client.on( 'ready', function(event) {
        client.on( "copy", function (event) {

            var button = $(event.target);
            button.trigger('dit-copy');

            var component = button.closest(".tab-pane").find('.component');
            var hasSpace = !component.attr('dit-component-no-space');

            var html = button.attr('dit-original-html');

            if(hasSpace)
            {
                var space = '<p>\n&nbsp;</p>';
                html = space + html + space;
            }

            var clipboard = event.clipboardData;
            clipboard.setData( "text/plain",  html);
            clipboard.setData( "text/html", html );
        });

        client.on( 'aftercopy', function(event) {
//                   $(event.target).attr("title","Copied!").tooltip("fixTitle").tooltip("show").attr("title","").tooltip("destroy");
        });

        client.on( 'error', function(event) {
//                    $(event.target).attr("title","Failed to copy").tooltip("fixTitle").tooltip("show").attr("title","").tooltip("destroy");
        });
    } );
})