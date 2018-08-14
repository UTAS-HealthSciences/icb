$(function(){
   
    function isUrl(string) {
        return /^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(string);
    }
	
    var buttons = $(".copy-button");
    buttons.each(function(){
        var button = $(this);
        var tabPane = button.closest(".tab-pane");  
        var componentId = tabPane.attr('id');
        var component = tabPane.find('.component');
        var originalOuterHTML = component[0].outerHTML;
        var originalInnerHTML = component[0].innerHTML;
		
    //    button.attr('dit-original-html', originalInnerHTML);
    //    button.attr('dit-original-text', component[0].innerText);

        /*
         If there is a custom modification as indicated by dit-has-modification class, build it. Otherwise, default
         innerHTML is copied to clipboard
         */
        var hasMod = component.attr('dit-has-modification');
        if (typeof hasMod !== typeof undefined && hasMod !== false) {
            var modType = component.attr('dit-modification-type');

            switch (modType)
            {
                case 'tabs':
                {
                    var navSelector = component.attr('dit-modification-nav-selector');
                    var contentSelector = component.attr('dit-modification-content-selector');

                    button.on('click', function(){
						// Scramble the ID after click so that they don't all just target the same thing.
                        var nav = $("#"+componentId).find(navSelector);
                        var content = $("#"+componentId).find(contentSelector);

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
						
						
                    })

                    break;
                }
                case 'dataTarget':
                {
										
                    var triggerSelector = component.attr('dit-modification-trigger-selector');
                    var targetSelector = component.attr('dit-modification-target-selector');
					
                    button.on('click', function(){
						
						// Scramble the ID after click so that they don't all just target the same thing. 
                        var time = new Date().getTime();
                        var id = 'dit-data-target-'+componentId+'-'+time;
						
						$("#"+componentId).find(triggerSelector).attr('data-target', '#'+id);
						$("#"+componentId).find(targetSelector).attr('id', id);
						
                    })

                    break;
                }
				case 'youtubeEmbedSource':
                {
					// Create an ID
                    var inputId = componentId+'-'+modType;

					// Create variables to store the element selector attribute and the replacement attribute
                    var replacementElementSelector = component.attr('dit-modification-replace-element-selector');
                    var replacementAttribute = component.attr('dit-modification-replace-attribute');

					// I have no idea what this means
                    button.attr('disabled', 'disabled');
					
					// What?!
                    var inputForm = $('<form class="form-horizontal">');

					// Oh I get it, they're creating the actual input field and button to insert into the DOM.
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
					// Add that shit right into the DOM
					
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
											// Now we get to the meat and potatoes
                                            var embedIframe = $(fieldValue);
                                            var src = embedIframe.attr('src');

                                            if (!embedIframe.is('iframe') || !src)
                                                throw "Embed code is not valid";

                                            var newComponent = $(originalOuterHTML);
											var subComponent = newComponent.find(".video-youtube");
											
                                            newComponent.find(replacementElementSelector).attr(replacementAttribute, src);

											// Actually edit the button in question to set the attributes to this. This is a problem because that's now how we copy anymore.
                                            //button.attr('dit-original-text', newComponent.text());
                                            //button.attr('dit-original-html', newComponent.html());
											
											
											// Let's try something alternative... let's try actually replacing the element in the DOM with the new element. Holy shit!
											$('#'+componentId).find(".video-youtube").replaceWith(subComponent);
											
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

                    button.closest('.text-center').before(inputForm);

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
											var subComponent = newComponent.find("video");
											
											newComponent.find(replacementElementSelector).attr(replacementAttribute, src);
											newComponent.find(viewSelector).attr('href', src)

											// Let's modify this a bit
											// button.attr('dit-original-text', newComponent.text());
											// button.attr('dit-original-html', newComponent.html());

											$('#'+componentId).find("video").replaceWith(subComponent);

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

					button.closest('.text-center').before(inputForm);

					break;
                }
                default:
                {
                    // Do nothing
                }
            }

        }

    });


})