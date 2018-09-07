/* dit-clipboard.js */
// Adam Carvosso
// 10/05/2017

// "Copy" probably too generic a namespace to use safely with other APIs.
function dCopy(targetElementId)
{
    // Grab innerHTML from target element specified by argument.
	targetContent = document.getElementById(targetElementId).innerHTML;
	clipboard.data = targetContent;
	
	if (window.clipboardData)
	{
		window.clipboardData.setData('Text', targetContent);
	}
	else
	{
		clipboard.intercept = true;
		document.execCommand('copy');
	}	
}

// Clipboard element modified from "JavaScript Copy To Clipboard Example" by Scott Offen. 
// https://gist.github.com/scottoffen/1363764209058daafed2
// Licensing unknown.
var clipboard =
{
	data      : '',
	intercept : false,
	hook      : function (evt)
	{
		if (clipboard.intercept)
		{
			evt.preventDefault();
			evt.clipboardData.setData('text/html', clipboard.data);
			clipboard.intercept = false;
			clipboard.data      = '';
		}
	}
};

window.addEventListener('copy', clipboard.hook);
