//mask SVG info
var mask1start = "<clipPath id=\"maskPath\"><path d=\"M816,304.6c-6.6,7.4-223.4,126.5-298.1,\
124.2c-137.9-4.2-280-92.6-330.5-123.1l-12.1-3.7c0,0-2.6-120.5-3.2-121c6.5,0.3,13.8-0.2,21.7-1.2c37.6-4.9,87.9-22.7,\
118.8-35.1c37.4-15,111-84.7,221-68.4s168.4,88.4,250,101.6c-0.5-0.5,42.1,7.4,42.1,7.4l5.3,110.5C830.9,\
295.7,820.9,302.5,816,304.6z\"/></clipPath>";

var mask1end = "<path stroke=\"black\" d=\"M1023.6,226.2c-7.5-65.1-48.4-68.4-62.1-71.6c-33.1-7.6-115.8,10.5-115.8,\
10.5s-12.1-2.6-21.1-1.1c-12.1-1.6-75.3-12.1-112.1-32.1c-38.9-21.1-103.1-66.3-211.3-65.8c-108.1,0.5-182.3,56.3-219.7,\
71.6s-99.4,22.6-115.3,22.6c-7.3,0-16.8,0-16.8,0c-13.7-3.2-33.7-9.5-55.8-9.5c-18.4,0-76.3,8.9-91.6,68.4s57.4,88.9,76.8,\
94.7s61,7.4,80,7.4c0,0,7.3,3.6,16.3,4.7c28.9,3.7,168.9,112.1,339.4,119.5c109.9,4.7,302.1-120,313.1-122.6c11.1-2.6,26.3-13.7,\
26.3-13.7s68.4-3.2,91.6-6.3C968.8,299.9,1029.9,280.9,1023.6,226.2z M76.8,287.8c-18.9-5.3-67.4-21.1-65.3-58.9S60,172,\
79.5,171.6c15.2-0.3,49.9,5.9,64.4,8.6l-0.2,0.8c0,0,7.4-4.2,8.4,20c1.1,24.2,5.4,96.3,5.4,96.3C152.3,296.9,94.9,292.8,76.8,\
287.8zM816,304.6c-6.6,7.4-223.4,126.5-298.1,124.2c-137.9-4.2-280-92.6-330.5-123.1l-12.1-3.7c0,0-2.6-120.5-3.2-121c6.5,0.3,\
13.8-0.2,21.7-1.2c37.6-4.9,87.9-22.7,118.8-35.1c37.4-15,111-84.7,221-68.4s168.4,88.4,250,101.6c-0.5-0.5,42.1,7.4,42.1,7.4l5.3,\
110.5C830.9,295.7,820.9,302.5,816,304.6z M960.4,283c-25.3,2.1-109.2,0-109.2,0l0,0l0,0c0,0-5-13.2-5.5-43.7c-0.5-30.6,0-51.7,\
0-51.7s59.2-10.2,75.8-9.8c16.5,0.3,74.7-6.3,89.5,30.5C1025.7,245.2,985.7,280.9,960.4,283z\"/>";

var mask2start = "<clipPath id=\"maskPath\"><path d=\"M504.8,54.2c66.2,4.1,210,62.9,304.9,85.8c-2.5,25.3,5.7,88.3,8.2,118.5s21.71,81.65-1.36,\
93.93c-41.42,22.05-94.7,102.14-290.44,106.27c-187.2,4.1-288.4-76-314.7-94c-9.2-6.3-29.4-9.8-36.8-21.3c-7.4-11.4,11.7-93.1,\
14.7-127.5s6.5-54.8,2.5-84.2C257.1,124.5,438.6,50.2,504.8,54.2z\"/></clipPath>";

var mask2end = "<image x=\"0\" y=\"0\" width=\"1024\" height=\"512\" href=\"maskoutline2.svg\" />";

//tracery grammar
var sampler = {
    "start": ["<span style='color:#color#'>#title#</span>", "<span style='color:#color#'>#titletwo#</span>", "<span style='color:#color#'>#titlethree#</span>"],
    "quip": ["#staring# again", "wear a mask", "just stay home", "I am #verb#", "I am #mood#", "we are #mood#", "we are #verb#", "this is not normal", "this is fine", "this is not ok"],
    "lockdown": ["lockdown", "quarantine", "stay-at-home", "social isolation", "virtual", "trashfires", "dumpster fires", "nothingness", "social distancing"],
    "blame": ["TRUMP", "CUOMO", "DESANTIS", "KARENS", "COVID", "THIS"],
    "verb": ["exhausted", "irritated", "fail", "lost", "done"],
    "mood": ["tired", "scared", "exhausted", "panicked", "indifferent", "blank", "numb", "done", "so done"],
    "platform": ["TikTok", "Twitter", "Facebook", "Reddit", "Insta", "4chan"],
    "aday": ["Saturday", "Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Friday", "day", "endless day"],
    "staring": ["staring", "looking", "gazing", "doomscrolling", "zoning", "stitching", "crafting", "making", "living", "dealing", "coping"],
    "object": ["wall", "ceiling", "tile", "floor", "door", "phone", "feed", "screen"],
    "number": ["99", "42", "???", "unknown", "?!?!", "69", "73", "106", "27", "150"],
    "month": ["March", "April", "May", "June"],
    "year": ["2020", "The End Times", "2020", "2020", "The year of #name.capitalize#"],
    "image": ["»»————-　　————-««", "━━━━━━ XXX ━━━━━━", "┍——— /ᐠ｡ꞈ｡ᐟ\\ ———┑", "»»————-———-««", "^V^V^V^V^V^V^V^V^V^V^V^V^V^V^V^V^V^V^", ".:*~*:._.:*~*:._.:*~*:._.:*~*:.", "=^..^=    =^..^=    =^..^=    =^..^=", ".oOo.oOo.oOo.oOo.oOo.oOo.oOo.", "-=x=-=x=-=x=-=x=-=x=-=x=-=x=-=x=-"],
    "line": ["<span style='color:#color#'>#image#</span>"],
    "again": ["again", "endlessly", "of life", "or everything", "or something"],
    "title": ["Anonymous maskmaker"],
    "titletwo": ["Maskmaker from (source organizations)"],
    "titlethree": ["Name generator"],
    "maskproto": "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" height=\"512\" \
    width=\"1024\">#maskshape#</svg>",
    "maskdesign": "#background##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse#\
    #ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse#\
    #ellipse##ellipse##ellipse##ellipse##ellipse##ellipse##ellipse#",
    "maskdesigntwo": "<rect width=\"1024\" height=\"512\" class=\"clipped\" style=\"fill:#color#\"/><text  x=\"50%\" y=\"55%\" font-size=\"100\" fill:\"black\" text-anchor=\"middle\" font-family=\"Impact\">FUCK #blame#</text>",
    "background": "<rect width=\"1024\" height=\"512\" class=\"clipped\" style=\"fill:#backgroundcolor#\"/>",
    "maskshape": [mask1start + "#maskdesign#" + mask1end, mask2start + "#maskdesign#" + mask2end, mask1start + "#maskdesigntwo#" + mask1end, mask2start + "#maskdesigntwo#" + mask2end],
    "backgroundcolor": ["black", "gray", "darkgray"],
    "ellipse": "<ellipse class=\"clipped\" cx=\"#cx#\" cy=\"#cy#\" rx=\"#rx#\" ry=\"50\" style=\"fill:#color#;stroke:#color#;stroke-width:2;opacity:#opacity#\" />",
    "rx": ["50", "100", "150", "200", "250", "300", "350"],
    "palette": ["covidpal", "origpal"],
    "color": ["rgb(81,87,74)", "rgb(68,124,105)", "rgb(116,196,147)", "rgb(142,140,109)", "rgb(228,191,128)", "rgb(233,215,142)", "rgb(226,151,93)", "rgb(241,150,112)", "rgb(225,101,82)", "rgb(201,74,83)", "rgb(190,81,104)", "rgb(163,73,116)", "rgb(153,55,103)", "rgb(101,56,125)", "rgb(78,36,114)", "rgb(145,99,182)", "rgb(226,121,163)", "rgb(224,89,139)", "rgb(124,159,176)", "rgb(86,152,196)", "rgb(154,191,136)"],
    "origpal": ["purple", "blue", "green", "teal", "navy", "darkgreen", "LightCyan", "MediumTurquoise", "LightSeaGreen", "CadetBlue", "SeaGreen", "PaleGreen", "ForestGreen", "Indigo", "SlateBlue", "DarkMagenta", "BlueViolet", "DarkOrchid"],
    "opacity": ["0.2", "0.3", "0.4", "0.5", "0.6", "0.7"],
    "cx": ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    "cy": ["100", "200", "300", "400", "500"]

}

$(document).ready(init);

function init() {
    if (typeof (tracery) != 'undefined') {
        var grammar = tracery.createGrammar(sampler);
        //entry one
        var mySentence = grammar.flatten("#start#");
        var image = grammar.flatten("#line#");
        var month = grammar.flatten("#month#");
        var year = grammar.flatten("#year#");
        var title = grammar.flatten("#quip#");
        var masktest = grammar.flatten("#maskproto#")
        var date = Math.floor(Math.random() * 20) + 9;
        var myDate = "Mask created: " + month + " " + date + ", " + year;
        $("#text").empty().append(title);
        $("#date").empty().append(myDate);
        $("#line1").empty().append(image);
        $("#title1").empty().append(mySentence);
        $("#maskimage").empty().append(masktest).fadeIn(2000).fadeOut(2000);
        myVar = setTimeout(init, 4000);
    } else {
        setTimeout(init, 100);
    }
}