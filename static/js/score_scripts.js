console.log('LOADING SCORE SCRIPTS');

// Functions for showing score taken from:
// 
var xml_options = { p:'f' };
var muziek = '';
function loadXMLDoc(dname){
    if (window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else
    {
        xhttp=new ActiveXObject("Microsoft.XMLDOM");
    }

    xhttp.open("GET",dname,false);
    xhttp.send();
    // return xhttp.responseXML;
    return xhttp.responseText;
}
// --5
function dolayout (abctxt) {
    console.log('dolayout');
    function svg_out (str) {
        console.log('svg_out');
        muziek += str;
    }
    var abc2svg;
    muziek = '';
    var errtxt = '';
    $('#notation').html (muziek);
    var user = {
        'imagesize': 'width="100%"',
        'img_out': svg_out,
        'errmsg': function errmsg (txt) { errtxt += txt + '\n' },
        'read_file': function (x) { return ''; },   // %%abc-include, unused
        'page_format': true // define the non-page-breakable blocks
    }
    abc2svg = new Abc (user);
    abc2svg.tosvg ('abc2svg', abctxt);
    if (errtxt.replace (/\s/g,'') == '') errtxt = 'no error';
    $('#err').append (errtxt);
    if (muziek) $('#score_container').html (muziek);
}
// --4
function loadXml (data) {
    console.log('loadXml');
    var xmldata = $.parseXML (data);
    var res = vertaal (xmldata, xml_options);
    var errtxt = res[1]; abcText = res[0];
    if (errtxt) errtxt += '\n';
    $('#abc').text (abcText);
    $('#err').text (errtxt);
    $('#savebtn').attr ('disabled', false);
    if (abcText.indexOf ('percmap') >= 0 || abcText.indexOf ('strings=') >= 0) { // translate again with option t==1
        xml_options ['t'] = 1;  // t==1 -> code with %%map and %%voicemap
        res = vertaal (xmldata, xml_options);
    }
    dolayout (res[0]);
}
// --3
function readEnc (data) {
    console.log('readEnc - data: ', data);
    var xs = data.slice (0, 100);   // only look at the beginning of the file
    if (xs.indexOf ('<?xml') == -1) { alert ('not an xml file'); return; }
    var enc = xs.match (/encoding="([^"]+)"/);
    enc = enc && enc.length == 2 ? enc [1] : 'utf-8'; // extract given encoding and fall back to utf-8
    if (/utf/i.test (enc)) loadXml (data);    // proceed when utf-8
    else readFile (loadXml, enc);   // read again when not utf encoded
}
// --2
function readStaticFile (doRes, enc, file_name) {
    console.log('readStaticFile -- file_name: ', file_name);
    var file = loadXMLDoc( file_name );
    console.log('file: ', file);
    readEnc(file);
    // var freader = new FileReader ();
    // freader.onload = function (e) { doRes (freader.result); }
    // xmlFileName = file_name;
    // freader.readAsText (file, enc);
}
// --1
function leesStaticFile (file_name) {
    console.log('leesStaticFile new');
    readStaticFile (readEnc, '', file_name);
    // var b = setOptions ();
    // if (b) readStaticFile (readEnc, '', file_name);
}