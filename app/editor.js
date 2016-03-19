function saveCode(codeVal) {
    localStorage.setItem("code", codeVal);
}

function loadCode() {
    var code = localStorage.getItem("code");
    return code || "";
}

function loadSettings()
{
    document.getElementById('exeName').value = localStorage.getItem("exeName") || 'program.exe';
}
function saveSettings()
{
    localStorage.setItem("exeName", document.getElementById('exeName').value || 'program.exe');
}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function compileCode() {
    var postData = {
        code: textEditor.getValue(),
        lang: "csharp",
        NetBitz: document.getElementById('nbCheckbox').checked,
        mainFn: document.getElementById('exeName').value || 'program.exe'
    };
    post('./compile.escx', postData);
    /*
    $.post('/compile.escx', postData, function(retData,status,xhr) {
        if (retData.substring(0,2)=='MZ')
        {
            
        }
        console.log(retData);
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", retData.url);
        iframe.setAttribute("style", "display: none");
        document.body.appendChild(iframe);
    });
    */
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

loadSettings();
textEditor.setSize(null, "70%");
textEditor.on('change', function(cMirror) {
    saveCode(cMirror.getValue());
    saveSettings();
});

shortcut.add("Ctrl+S", function() {
    saveCode(textEditor.getValue());
    saveSettings();
});

shortcut.add("F5", function() {
    saveSettings();
    compileCode();
});