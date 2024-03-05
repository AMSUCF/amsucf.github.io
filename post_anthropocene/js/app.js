console.log("app");

var imageNum = 0;
var images = [];
var texts = [
    "Forgive the self-sufficient civilization their eagerness,<br>The confident crimson monster consumes contentment<br>A dominant inky fire grows.",
    "Toward persistent adventures<br>This aggressive planet adapts<br>His cloudy determination drifts even with this story.",
    "Commited novels falter from memory to fear!<br>But what of her trusting soul?<br>An honest feline collides through a dream from her quilt forest.",
    "Your competitive host waits, and revels, in contempt of their misery!<br>Our intellectual Earth lingers<br>His ebony opinionated eagerness drifts in spite of our novel.",
    "Sounds slither from fear to determined fear<br>Our greedy nature despairs<br>Until only a wasteland remains.",
    "Grow the supportive planet with her worry<br>Allow her communal joy to be shifted<br>This amber terror wonders ", 
    "Confidence struts across fear to faith -<br> While the reckless horror gathers.",
    "Her personality is but a raven memory,<br>Our passive society imagines -<br>A dependable soul faltering on a promise of their connection.",
    "Leave the gentle globe and their grief<br>Despite your compassionate nature, they wither<br>Their delicate delusion drifts undeterred by your melody.",
    "Despair the greedy species his bitterness.<br>His fiery competition proceeds undeterred by your psalm.",
    "Atop polite modesties<br>With your pleasant creations they conceal<br>A quiet azure grief lurks.",
    "Polite speeches drift from hope to belief,<br>Alongside the tender species, they falter<br>A sensitive witch wanders through a memory from her cheerful devastation.",
    "In courageous adventures,<br>What of their persistent recklessness?<br>Hinder this impulsive tragedy<br>And withdraw from pretension.",
    "Their cheer is but a deep dream<br>Your polite discontent forgets",
    "This gentle prophetess forgives, and gathers, regardless of her misery!<br>Insist your compassionate word move through belief."
];

function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
        images[i].className = "bordered";
    }
    imageNum = Math.floor(Math.random()*arguments.length);
}

preload(
    "images/fourteen.png",
    "images/persistent_adventures.png",
    "images/feline.png",
    "images/masc.png",
    "images/eight.png",
    "images/eleven.png",
    "images/horror.png",
    "images/raven_memories.png",
    "images/gentle_globe.png",
    "images/greedy_species.png",
    "images/polite_modesties.png",
    "images/thirteen.png",
    "images/impulsive_tragedy.png",
    "images/cheer.png",
    "images/prophetesspng.png"
    );


$(document).ready(function() {    
    function loadImage(iter) {
        imageNum+=iter;
        if (imageNum >= (images.length)) {
            imageNum=0;
        }
        if (imageNum<0) {
            imageNum=images.length-1;
        }
        $("#cycledImages").html(images[imageNum]);
        $("#poem").html("<p>" + texts[imageNum] + "</p>");
        // var div = $("<div/>", {
        //     class : "outputSample",
        //     html :  texts[i]
        // }); 
        // $("#cycledImages").append(div);
    }
    function loadGrammar(name) {
        $("#outputSample").html("");

        var grammar = tracery.createGrammar(grammars);
        $("#grammar").html(grammar.toText());

        var s = grammar.flatten("#origin#");
        console.log(s);
        var div = $("<div/>", {
             class : "outputSample",
             html : s
        });

        $("#outputSample").append(div);
 
    }
    loadImage(0);

    $('#grammarSelect').on('click', function() {
        loadGrammar(this.value);
    });
    $('#leftArrow').on('click', function() {
        loadImage(-1);
    });
    $('#rightArrow').on('click', function() {
        loadImage(1);
    });
});
