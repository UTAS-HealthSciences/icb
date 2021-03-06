
//new wysihtml5.Editor("textarea-id", { // Could also pass a DOM node instead of an ID
//    // Give the editor a name, the name will also be set as class name on the iframe and on the iframe's body
//    name:                 undef,
//    // Whether the editor should look like the textarea (by adopting styles)
//    style:                true,
//    // Id of the toolbar element or DOM node, pass false value if you don't want any toolbar logic
//    toolbar:              undef,
//    // Whether urls, entered by the user should automatically become clickable-links
//    autoLink:             true,
//    // Object which includes parser rules to apply when html gets inserted via copy & paste
//    // See parser_rules/*.js for examples
//    parserRules:          { tags: { br: {}, span: {}, div: {}, p: {} }, classes: {} },
//    // Parser method to use when the user inserts content via copy & paste
//    parser:               wysihtml5.dom.parse,
//    // Class name which should be set on the contentEditable element in the created sandbox iframe, can be styled via the 'stylesheets' option
//    composerClassName:    "wysihtml5-editor",
//    // Class name to add to the body when the wysihtml5 editor is supported
//    bodyClassName:        "wysihtml5-supported",
//    // By default wysihtml5 will insert a <br> for line breaks, set this to false to use <p>
//    useLineBreaks:        true,
//    // Array (or single string) of stylesheet urls to be loaded in the editor's iframe
//    stylesheets:          [],
//    // Placeholder text to use, defaults to the placeholder attribute on the textarea element
//    placeholderText:      undef,
//    // Whether the rich text editor should be rendered on touch devices (wysihtml5 >= 0.3.0 comes with basic support for iOS 5)
//    supportTouchDevices:  true,
//    // Whether senseless <span> elements (empty or without attributes) should be removed/replaced with their content
//    cleanUp:              true
//});

var editor = new wysihtml5.Editor("textarea", {  // id of textarea element
    toolbar: "toolbar", // id of toolbar element
    stylesheets: "../template/vendor/wysihtml5/css/stylesheet.css",
    parserRules: wysihtml5ParserRules,  // defined in parser rules set
    supportTouchDevices: true,
    cleanUp: true
});

var log = document.getElementById("log");

editor
    .on("load", function() {
        log.innerHTML += "<div>load<\/div>";
    })
    .on("focus", function() {
        log.innerHTML += "<div>focus<\/div>";
    })
    .on("blur", function() {
        log.innerHTML += "<div>blur<\/div>";
    })
    .on("change", function() {
        log.innerHTML += "<div>change<\/div>";
    })
    .on("paste", function() {
        log.innerHTML += "<div>paste<\/div>";
    })
    .on("newword:composer", function() {
        log.innerHTML += "<div>newword:composer<\/div>";
    })
    .on("undo:composer", function() {
        log.innerHTML += "<div>undo:composer<\/div>";
    })
    .on("redo:composer", function() {
        log.innerHTML += "<div>redo:composer<\/div>";
    });
