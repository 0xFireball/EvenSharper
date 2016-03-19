function saveCode(codeVal) {
    localStorage.setItem("code", codeVal);
}

function loadCode() {
    var code = localStorage.getItem("code");
    if (!code) {
        return "";
    }
    else {
        return code;
    }
}

function compileCode() {
    postData = {
        code: textEditor.getValue(),
        lang: "csharp"
    };
    $.post('/compile.escx', postData, function(retData) {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", retData.url);
        iframe.setAttribute("style", "display: none");
        document.body.appendChild(iframe);
    }); 
}

var textArea = document.getElementById("textArea");
var textEditor = CodeMirror(function(elt) {
    textArea.parentNode.replaceChild(elt, textArea);
},
    {
        value: loadCode(),
        lineNumbers: true,
        indentUnit: 4,
        viewportMargin: 20,
        mode: "text/x-csharp"
    }
);

textEditor.on('change', function(cMirror) {
    saveCode(cMirror.getValue());
});

shortcut.add("Ctrl+S", function() {
    saveCode(textEditor.getValue());
});