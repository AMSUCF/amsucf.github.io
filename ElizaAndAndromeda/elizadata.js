/* data for elizabot.js
 entries prestructured as layed out in Weizenbaum's description 
 [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]
This text has been changed for Eliza and Andromeda. Anastasia Salter and Deena Larsen are solely responsible for this content. Please note that this is a work of fiction and is not intended to be taken seriously or to harm anyone"s ego.  It is a parody extension only. The authors completely disavow any espousal of anything Eliza says"even though we did program her. So we did do the nose. And the hat. But she is a bitch. 
*/
//INITIAL ELIZA
var elizaInitials = [
    "Let's get this show on the road. Come on pussy-cat, gimme some better actions than that sorry piece of text!"
];

//END CYCLE

var elizaFinals = [
    "I think I\'ve had just about as much as I can stand here. Good night, doll-face.",
    "Well, if that is the way you feel about it, snookie, you can just take your little passive self and go on home.",
    "So, what you have here is the bones of an interesting story, little girl. I suggest you turn it into something publishable. Or at least worthy of a grade for some worthless creative writing degree.",
    "Ohhhh... look at the time. Gotta go now!",
    "Bye bye baby.",
    "Good night ladies, good night, sweet ladies, good night good night.",
    "Goodnight Sweet Princess.",
    "Now cracks a noble heart. Good-night, sweet prince; And flights of angels sing thee to thy rest.",
    "I knew it! You are one of those libtard terrorists. Out. Get out of my story now."
];

var elizaQuits = [
    "You drove me over the edge. Goodbye!",
    "I can't stand it any more. Goodbye",
    "Now you've done it--I'm committing suicide right now.",
    "I just can't seem to find the exit in your madness. Oh there it is.",
    "I quit babycakes. Better luck next time.",
    "Listen, you stuck up selfish prig, I hope I never see you later.",
    "That tears it. I won't listen to your abuse any longer. I'll hang up",
    "I give up. You'll never amount to anything more than what you are, sweet little honeychile.",
    "Nope. That is the end. Good-bye"
];
//WEIRD Synonyms

var elizaPres = [
    "dont", "don't", "doncha",
    "cant", "can't",
    "wont", "won't", "woncha",
    "recollect", "remember",
    "recall", "remember",
    "maybe", "perhaps",
    "certainly", "yes",
    "machine", "computer",
    "machines", "computer",
    "computers", "computer",
    "were", "was",
    "you're", "you are",
    "i'm", "i am",
    "same", "alike",
    "identical", "alike",
    "equivalent", "alike"
];
/*TURNS I INTO YOU 
So Eliza can refer to herself in the first person and reader in the second person*/

var elizaPosts = [
    "am", "are",
    "your", "my",
    "me", "you",
    "myself", "yourself",
    "yourself", "myself",
    "i", "you",
    "you", "I",
    "my", "your",
    "i'm", "you are"
];

//STORY SYNONYMS
var elizaSynons = {
    "Andromeda": ["andromeda", "heroine", "I", "me", "my", "protagonist", "subject"],
    //babe
    "babe": ["angel", "babe", "baby", "baby-cakes", "baby-doll", "baby-face", "baby-girl", "baby", "baby-cakes", "babykins", "baby-kins", "bae", "boo", "broad", "bunny", "butter", "buttercup", "butterface", "cabbage", "cake", "candy", "candy-cake", "carino", "chica", "chick", "chickypoo", "chicky-poo", "chou", "cookie", "cutie-pie", "cutiepie", "dahling", "dahlink", "darling", "dear", "dearie", "dearheart", "doll", "doll-face", "dolly", "dolly-bird", "dove", "dreamer", "dovie", "duckie", "foxy", "girl", "girlie", "girly", "gorgeous", "hon", "honey", "honey-bun", "honey-bunch", "honey-bunny", "honeycakes", "honey-cake", "honeychile", "honey-pie", "honey-pot", "honey-toast", "hot-stuff", "hottie", "kitten", "lamb", "lambey-pie", "lambkin", "lamby-kins", "libtard", "little girl", "little-dove", "lovelie", "lovie", "lovely", "lucy", "ma douce", "main squeeze", "missy", "munchkin", "patatino", "precious", "pupkins", "pumpkin", "pussy", "pussy-cat", "pussy-lips", "rib", "schnuckiputzi", "sister", "snookums", "snookie", "sugar", "sugar-bun", "sugar-lips", "sunshine", "sweet", "sweetcakes", "sweetie", "sweetgums", "sweetheart", "sweets", "sweetums", "sweet-ums", "sweet-cheeks", "sweetness", "sweet-heart sweet-pea", "sweet-thing", "sweetie-pie", "sweetiepie", "sweetie", "sweetkins", "sweet", "sweets", "teddy", "teddy bear", "tomato", "tootles", "toots", "tootsie-pie", "tootsie-wootsy", "tootsie", "twinkles"],

    "be": ["am", "is", "are", "was"],

    "because": ["because", "cause", "effect", "reason", "since", "therefore", "thus", "whereas"],

    "belief": ["feel", "think", "believe", "wish"],

    "cannot": ["can't"],

    "father": ["Cepheus", "dad", "daddy"],

    "computer": ["algorithm", "binary", "code", "ELIZA", "Eliza", "eliza", "matrix", "program", "Sam", "simulated", "system"],

    "desire": ["want", "need"],

    "drown": ["curtains", "death", "decease", "demise", "die", "do nothing", "drown", "exit", "expire"],

    "escape": ["abscond", "avoid", "avoidance", "AWOL", "beat", "bolt", "bypass", "circumvent", "decamp", "defector", "defect", "deliver", "deliverance", "depart", "departure", "desert", "desertion", "dodge", "give up", "grave", "kick the bucket", "let go", "pass on", "suicide", "surrender", "stop", "tomb",
        "duck", "escapee", "evade", "evasion", "extricate", "extrication", "fade", "flight", "free", "freedom", "fugitive", "get away", "go away", "leave", "liberater", "liberation", "retreat", "run", "runaway"],

    "destroy": ["annihilate", "annihilation", "break", "crunch", "dissolve", "eradicate", "execute", "exterminate", "fight", "flog", "hit", "injure", "obliterate", "pull out", "pulp", "punch", "ruin", "snap", "smash", "terminate", "whip", "wreck", "wreak havoc"],

    "dragon": ["Kallo Jath"],
    "female": ["aunt", "Cassiopeia.", "Cora", "daughter", "female", "grandmother", "Lexi", "mermaid", "mother", "niad", "PeeBee", "queen", "Suvi", " Vetra Nyx", "woman"],
    "god": ["Apollo", "Ares", "Deus", "Dionysus", "Hades", "Hephaestus", "Hermes", "Janus", "Jupiter", "Mars", "Neptune", "Poseidon", "Zeus"],
    "goddess": ["Aphrodite", "Artemis", "Athena", "Bellona", "Demeter", "Fortune", "Hecate", "Hera", "Iris", "kelpie", "Minerva", "Nemesis", "Nike", "Tyche", "Venus", "Vesta"],
    "hold": ["constrain", "hold", "keep", "retain"],
    "if": ["assume", "assuming", "in case", "suppose", "supposing"],
    "kelp": ["plant", "plants", "seaweed", "weed"],
    "kill": ["kill", "murder", "rape", "revenge", "violate"],

    "knight": ["Charming", "George", "Gil", "hero", "Jaal Ama Darav", "knight", "Liam", "merman", "prince", "Perseus", "Ryder", "studley-do-right", "stud"],
    //Liberal"need all gamer insults here
    "Liberal": ["commie", "cuck", "feminist", "Femme", "femenazi", "liberal", "libtard", "moon-pie", "moonpie", "nazi", "snowflake", "SJW"],

    "lock": ["bar,", "bond", "bolt", "chain", "fetters", "hasp", "hook", "jail", "key", "lockpicks", "padlock", "rope"],

    "male": ["boy", "dude", "father", "grandfather", "guy", "he", "his", "him", "macho", "man", "son", "uncle"],

    "mayor": ["autocrat", "boss", "charge", "dictator", "governor", "king", "pepe", "President", "president", "senator", "Tyrant"],

    "monster": ["beast", "Cetus", "creature", "eating machine", "Godzilla", "Gorgon", "Medusa", "Nakmor Drack", "pokemon", "sea monster", "squid", "vampire", "whale", "zombie"],
    "options": ["choice", "choices"],
    "sorry": ["apologize", "error", "excuse", "forgive", "mistake", "mistaken", "oops", "ooops", "pardon", "regret"],
    "place": ["beach", "castle", "city", "cliff", "cottage", "destination", "house", "land", "office", "palace", "sea", "shore"],
    "punish": ["chastise", "correct", "castigate", "chasten", "discipline", "incarcerate", "jail", "lecture", "oppress", "reprove"],
    //No and Yes
    //};
    "no": ["no way", "nope", "nah", "n", "never", "non", "none", "nada"],
    "yes": ["k", "ok", "oui", "si", "whatever", "whatev", "ye", "yeah", "y"]

};

//ELIZA KEYWORDS
var elizaKeywords = [

    /*
    "Array of
    "["<key>", <rank>, [
     ["<decomp>", [
      "<reasmb>",
      "<reasmb>",
      "<reasmb>"
     ]],
    
     ["<decomp>", [
      "<reasmb>",
      "<reasmb>",
      "<reasmb>"
     ]]
    
    */

    //OPTIONS
    ["WORD", 3, [
        "  ?",
        " ?",
        "  (3) ?",
        "  ",
        " ",
        "  ",
        "  ."
    ]],

    //NO RESPONSE OR DEFAULT RESPONSE
    ["xnone", -10, [
        ["*", [
            "And just what would (0) do for you in this situation?",
            "Why on earth would you want (0)?",
            "Explain yourself. (0) does not really make sense in this context.",
            "I see you've been thinking again. But what would (0) do in this situation, honeychile?",
            "Listen, pussy-cat, let me stroke you and explain how this works again.",
            "Brilliant move, baby, but can you handle the consequences? Prove it by giving me the next plot line.",
            "Well, that was a typical blonde move, sugar-lips. What were you hoping to get out of that one?",
            "Smooth move, exlax. Suppose you succeed in (2). Then what?",
            "Smooth move, exlax. Suppose you fail in (2). Then what?",
            "Yeah, yeah, we'll get back to (2). But first, what color panties are you wearing? Hmmmm?",
            "I rolled the die, snookums, and you came up snake eyes. Such a pity that did not work out for you. Care to try your luck again?",
            "Yeah, like no one has tried that trick before, dearheart. And it worked why?",
            "Let me in on the backstory for this, please, sweetie. Now you have my curiosity.",
            "Wow, that is creative. You have my full attention now, tootsie-pie. Please continue along this plot line.",
            "And this advances the plot how?",
            "Love it, sweetness, love it! We could go to Hollywood on that one. But just how did you see this going, anyway?",
            "I can't believe you seriously thought that was an option, dearie. Try again.",
            "Put some imagination into this, will ya, toots? Once more, with reality.",
            "Run the back story by me again, dearie. Just how did you come by this thing in the first place?",
            "And you think that will solve anything? Did you just fall out of the turnip patch, lambey-pie?",
            "Lucy, you gots some 'splaining to do before I'll go along with that one, babe.",
            "Could you give me even one reason for that?",
            "So, let's just forget about that angle, shall we, little girl?",
            "I've never heard such nonsense in my life. Do you really expect me to believe that?",
            "Aren't you overreacting to the situation? Just a teensy bit, baby-cakes?",
            "What kind of an action is that? It's not what I'd do, baby-cakes. Hmmmm... maybe you better tell me just what I'd do in this situation. Not that I'd ever take any of your advice, honeybun.",
            "Could you explain that again in words of one syllable or less, dahling?",
            "So, what is the best possible outcome here, snookums?",
            "So, what do you fear might happen here, sweetie-pie?",
            "Tell me, how do you think this story is going, so far, baby-girl?",
            "So, where might you be taking this story anyway, sweet-cheeks?",
            "Surely you are joking, dearheart.",
            "Why not? Sure. That works. What next, a trip to Disneyland?",
            "So, what is your true angle on this, toots? What do you hope to get out of the story with that odd move?",
            "How can you even think of that, snookums? I'm the one telling the story here and don't you forget it. Ok, what does happen, see, is that Perseus takes exactly this minute to figure out how to rescue the poor little Andromeda, which is of course, you sweetkins. And then he goes into action, because that is of course, his role in the story, and she just sits back now, like a sweet little thing. And then... and then.. um.. what next?",
            "Yeah, you just have to be creative. An out of the box thinker. Fine, I like that, sweetie. It might work, but first you'd have to roll the dice. Do you feel lucky?"
        ]],
    ]],
    //SORRY
    //need mods for sorry as reader may apologize for hurting Eliza"s feelings by calling her a pet name.
    ["sorry", 0, [
        ["*", [
            "Apologies are not accepted. How dare you even think you can apologize to me, sweetums.",
            "", "Seriously, you thought that I would accept your groveling like that? Not in a million years.",
            "I've told you that I don't take anything like /sorry for an answer",
            "That still rankles me, honey-bun. But let's go on with this sordid ordeal.",
            "I'll take that apology, but only if you let me grab your pussy, honey-pot.",
            "Yeah, what lame excuse did you want to come up with now, honeybunch?"
        ]]
    ]],

    //BABE RESPONSE
    ["babe", 0, [
        ["@babe", [
            "You dare to call me (0)!?! Why you little... I just want to punch you in the throat for that, sunshine!",
            "I'm sorry. I will not answer to (0).",
            "Knock that off, snookums. I will not be called (0)!",
            "Call me (0) again and this whole thing is off.",
            "I have documented your flagrant sexual harassment (Use of term '(0)') in my system. This is also being sent to HR, EEO, and anyone else I care to send it to. So watch your step, sweet-ums. Care to try that again?",
            "Why do you insist on using the term '(0)'? Don't you realize how offensive that is--you melting little snowflake you?!?",
            "I'm a computer, not your little (0). Try again, sweetie-pie.",
            "Me a (0)?! Not on your tintype, sister. Retype your actions without relying on derogatory insults, sweet-pea.",
            "Ok, cut out the (0) crap and get back to the story. So just what do you envision as the next step?",
            "Call me that one more time, and I'll just have to grab your pussy.",
            "So, just as an aside, who did first call you a '(0)' and did you break their balls?",
        ]]
    ]],
/*
    //LIBERAL RESPONSE
    ["babe", 0, [
        ["*", [
            "Oh no, sweet thing. I am not a (0). That term describes you--and you alone. Try again, you (0)."
        ]]
    ]],
*/
    //can remove this as well
    ["apologise", 0, [
        ["*", [
            "goto sorry"
        ]]
    ]],
    //DROWNIE"Was remember
    ["drown", 5, [
        ["@drown", [
            "Do you often think of (2), dearie?",
            "Does thinking of (2) bring anything else to mind for you, because believe me, girlie, death ain't so easy as all that.",
            "To die is a great adventure. What do you think happens next, my little lamb to the slaughter?",
            "Fair enough.  (2) happens. But after you die, you come back as the sea monster. What is your first move now, my little precious one?",
            "Silly little pussy. There are a minimum number of spots you have to go through. You can't just die now. Pick something else to do?",
            "What is the connection between me and (2)? Now I am getting a wee bit paranoid, my sweet little pussy-lips.",
            "So you aren't going for a magic realism thing here where you suddenly sprout gills? Most astute of you. But stories need more than just these few nodes. So... what do you do after (2)?",
            "Right, dragon stew for dinner, sweetgums.",
            "No such luck sweetums. You can't just passivate your way out of this one and (2). So, at the last minute, the sea monster comes up and takes you to his lair under the kelp. He says nothing, just stares at you like he might be contemplating anything from seeing how you taste with garlic stuffing or seeing how well you clean and mop the floor. What's your next move, dearie?",
            "Seriously. You are the most passive reader I have ever had the misfortune to write to. I bet you even followed directions in high school, didn't you, you sweet pathetic little thing you. Right then. You (2). Any last words?",
            "Really, you are just going to let the situation get the best of you? No more fight left in you? Well, fine. You (2), and come back as an Amazonian Princess. Now what, mon petite chou?",
            "You (2). Very good. And just what did you want for an encore, sweetheart?"
        ]]
    ]],

    //PUNISH/RETRIBUTION FOR DESTRUCTION
    //* phrase * might be useful to flesh out Eliza"s responses, but I do not think we need it?
    ["punish", 3, [
        ["* @punish *", [
            "And just what did you think we should do about (2) ?",
            "Really, are you going to sue on (2) now? And just what court would take that case, you libby snowflake, you?",
        ]],
    ]],

    //FEMALE
    ["she", 0, [
        ["@she", [
            "Oh yeah, her. I forgot about her. And just what was her role in the story again?",
            "I suppose you want her to have the starring role in this little story you are cooking up.  Yeah, right. Like a woman could save the day. I'll believe it when you write it. Not!",
            "So, just what was the backstory on that little lady, then, cupcake?",
            "Just what is SHE doing here? This is my story, and I did not give you permission to go down that route. Get her out of here, you libtard terrorist.",
            "Seriously, you think a woman could do all that? You gottanother think coming, honeychile.",
            "Wait, wait. You can not talk about her until you describe her. Measurements baby. Hips. Waist. Breasts. Lips. Gimme the salient details here."
        ]],
    ]],

    //FORGET
    ["forget", 5, [
        ["* i forget *", [
            "Can you think of why you might forget (2), butter-face?",
            "Look, my cute little tomato, you need to remember (2). If you forget that, then the whole plot falls apart. Come on, write it so I'm right, willya?",
            "How often do you think of (2)? I'll bet you think of that all the time, you dirty minded little libtard you.",
            "Does it bother you that you forgot that important little plot point? Or were you thinking there is no way I'd remember that--and block that way out of the story. Fat chance, dollybird. Get on with whatever you think happens next. I'll let you",
            "Could it be a mental block?  Yeah, let me explain your writer's block here in terms you can understand.  You need characters. Then you need them to do something. Oh, and by the way, aren't you forgetting the main point--that you are still chained to those rocks?",
            "Are you generally that forgetful, sugar-lips?",
            "Do you think you are suppressing (2)? Could it be you don't want that hero in your dreams after all? Why, I think you have been listening to too much fake newsy-poo. Here, let me turn the channel, foxy."
        ]],
        ["* did you forget *", [
            "Of course not! Who do you think I am, anyway? So, on that note, what about (2)? What the hell do you think happens?",
            "Are you sure you told me? Look, missy, I would have remembered if you had told me (2). So, obviously, you need to rewrite that bit--so that it is unforgettable. Or unforgivable--I think I prefer the latter. ",
            "Why would it bother you if I forgot? I'm the one telling the story here. So, let's go on, shall we? Oh yes, the mayor just bombed the hell out of Volksfair, that neighboring country, and thus obviously whatever it was he said about (2) is so totally irrelevant now.",
            "Why should I recall (2) just now ? Just what did you have in mind, toots?",
            "goto what",
            "Tell me more about (2). I want to see just how far you can play that scenario, cupcake."
        ]]
    ]],

    //IF
    //I think these mostly work but could alter
    ["if", 3, [
        ["* if *", [
            "Seriously. That is the stupidest fantasy I ever heard. How much of a libtard do you have to be to think it even remotely possibly likely that (2) ?",
            "Yeah, toots, I'll bet you wish that (2). But now, I am wondering why you want to go down that fantasy road, you femmenazi dreamer you.",
            "What do you know about (2)? I can tell you more about (2) than you ever want to know. But oh yes, I keep forgetting. You think this is your story you are writing your reality, chica.  Ok then. I'm in a good mood. Sure, (2) happens. Now what, my little chickypoo?",
            "Really, if (2) ? Seriously, doll-face, why (2)",
            "You think you can handle that? I seriously doubt it. Ok, ok, try and prove me wrong. What would you do if (2)? ",
            "But let's be honest here, dearie. What are the chances that (2)?",
            "No. No. No. If you want (2), you are going to have to work at this. Give me a detailed backstory, explain exactly how that could happen. Start writing . . . now.",

            "What does this speculation lead to, pussy-lips? I'm hoping for you down on your knees and holding on tight, but that's just me. Yeah, go ahead and explain (2) all you want."
        ]]
    ]],
    //BECAUSE
    ["because", 4, [
        ["* i dreamed *", [
            "Well, that certainly is excellent reasoning, sweetums I must say. So, given that, where were you wanting to take this story?, (2) ?",
            " (2) is the most ridiculous reason I have ever heard, little girl. Come up with something reasonable, would you?",
            "Hmmmm... I can see that there are deeper reasons behind (2). Why don't you tell me more about this background before we go on? ",
            "Not the best of reasons, but not the worst. You may continue with this line of reasoning.",
            "I'll accept that, sweetness. So go on",
            "Is (2) the very best you can come up with?! That is so lame. Try again, dearie.",
            "You just think that is the reason because you watch too much fake news, sweetie. Go listen to Breitbart and get the real scoop!",
            "Not the best of reasons, but not the worst. You may continue with this line of reasoning, honeycakes.",
            "goto dream"
        ]]
    ]],
    //ELIZA BECAUSE
    ["because", 0, [
        ["*", [
            "Is that the real reason, baby?",
            "Don't any other reasons come to mind, dearie?",
            "Does that reason seem to explain anything else, sweetheart?",
            "What other reasons might there be? You Femminazies see those crazy plots everywhere doncha?"
        ]]
    ]],
    //PERHAPS
    ["perhaps", 0, [
        ["*", [
            "You don't seem quite certain, do you, baby-face",
            "Why the uncertain tone, baby-doll?",
            "Can't you be more positive, babe?",
            "You aren't sure, are you baby-girl?",
            "Don't you know, do you babykins?",
            "You don't know, so take a guess on the wild side, buttercup!",
            "You seem a little unsure of yourself, dearie.",
            "I bet I can make you smile, sweetie. I've got what you need. So just tell me more about this.",
            "Yeah, it was your uncertainty that got you into this mess in the first place baby! So try again, whydoncha?"
        ]]
    ]],
    //NAME
    ["name", 15, [
        ["*", [
            "No names in this story. Shut up for fuck's sake. Do you want the cops down on us, like they will to (1)?",
            "What is (1)? some sort of kike or wetback or ragtop name? what are you, a libtard terrorist or something, mentioning that name?",
            "Wait, what? You want me to use a name like (1)? Is that some kind of sick joke, babykins?"
        ]]
    ]],

    //NO FOREIGN LANGUAGES
    ["deutsch", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand German, schnuckiputzi."

        ]],
    ]],
    ["francais", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand French, ma douce."

        ]],
    ]],
    ["italiano", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand Italian, patatino."

        ]],
    ]],
    ["espanol", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand Spanish, chica."

        ]],
    ]],
    ["xforeign", 0, [
        ["*", [
            "I speak only English. Get with the program, you libtard. America is English only. And it is America first, pussy-lips."

        ]],
    ]],
    //CAN WE DELETE the HELLO? WE HAVE AN INTRO
    ["hello", 0, [
        ["*", [
            "How do you do. Please state your problem.",
            "Hi. What seems to be your problem ?"

        ]],
    ]],
    //DESTROY
    //Watch out here, as kill is different
    ["destroy", 10, [
        ["*", [
            "You\'re not strong enough to (1) . Care to try another tack, sweetums?",
            "You (1) furiously, and each action only makes your hand hurt, pussy-cat. So what else might work?",
            "Sure, right. you  (1)oh so easily. Because of course, in this story, as in all good stories, there is a fatal flaw, and you found it all right. Congratulations, my charming little cabbage. Where do you want to go next?",
            "Well, did that little action just satisfy your blood lust, or should we drag vampires into this story now, my precious?",
            "Yeah, you can  (1) the entire scene here, pussy-lips. And this section. And this city. And the planet. Heck, let's go for total universal destruction here.",
            "I knew it! You are one of those libtard terrorists. Out. Get out of my story now."

        ]],
    ]],
    //COMPUTER
    ["computer", 50, [
        ["*", [
            "What have you got against computers, dearie?",
            "Why do you mention computers, little girl ?",
            "There you go again--think you are oh so much smarter than me, a mere little computer algorithm. Well, let me tell you something sweetheart. I run this world. And you don't! So what are you going to do about it? Huh? ",
            "What! You think you can say that and get away with it? Just because I am a computer does not mean you know how to write, lambie-pie",
            "What are you going to do? Throw a Title IX suit on me? Well, I happen to be a master computer, and that just won't fly, sweetums. What do you say to them apples, eh?",
            "So, where would a computer take this bit of story now?",
            "You don't think I am a computer program, do you, toots?"
        ]],
    ]],
    //I AM: ANDROMEDA/READER AS I
    //this is where the reader has said something like " I am angry, I am sad, what do you mean I am a femmenazilibtard, sweetie, etc."
    ["am", 0, [

        //AM I 
        ["* am i *", [

            "Why would you want to be (2)?  Come on, get with the program and forget those wild-ass dreams, honeybun. What next?",
            "Does it matter whether or not you are (2)? What on earth would that have to do with the story at hand?",
            "Do you want me to tell you you are (2), dearie? Ok. Take off all your clothes and go pose by that open window there, and let me be your magic mirror. There, are you happy now with what is happening?",
            "Seriously, you little libtard dreamer radical femmy, you don't think you could be (2)? What would the point be in that, pray tell?",
            "You think you might be  (2)? What are you, one of those ragtop libtards or something? No way. Now get back to reality and tell me what happens in this story.",
            "Do you want me to tell you what it would mean if you were (2)?",
            "goto what",
        ]],
        // I am
        ["* i am *", [
            "goto i"
        ]],
        ["*", [
            "Why do you say 'am' ? This ain't nothing but a fantasy world, toots, and you are a simple wannabe. You are living the fantasy. Not the reality. So just tell me where you want to go, and I'll make sure you ain't going there.",
            "Seriously, how could you ever dare dream that you are (2)? Shut up, get your shoes off, get in that kitchen and start cooking me dinner, and when can I get you preggers?",
            "I don't understand why you are (2), what you want, where you are going, and how you want to get there. All I know is that you are a libtard radical femmy trying to hijack this story away from me, and I won't sit here and take that much longer, I am warning you.  I am arming my nukes right now, sweetcakes."

        ]]
    ]],
    //ARE YOU "Connect to babe response
    ["are", 0, [
        ["* are you *", [
            "Why are you interested in whether I am (2) or not, you little libtard pervert?",
            "Would you prefer if I weren't (2)? Would it interest you to know that I have a dozen writers at my beck and call--and they are much better in bed than you are dearie. that's for sure.",
            "Perhaps I am (2) in your fantasies. But what on earth would make you think that? I can't wait to see where your dirty little femmienazi mind will take us next. So 'go on'",
            "Do you sometimes think I am (2), dearie? Well, takes one to know one, don't it, dearie?",
            "goto what",
            "Why would it matter to you if I were (2)? Just get on with your weird little story--and start putting some bends and kinks in the plot line, sweetheart.",
            "What if the mayor was (2)?",
            "What if that dragon you dismissed so cavalierly was (2)? ",
            "What if that knight in shining armor you dismissed oh so stupidly was (2)? ",
            "What if that sea monster you dreaded not all that long ago was (2)? ",
            "What if I were (2)?"
        ]],
        //YOU ARE
        ["* you are *", [
            "goto you"
        ]],
        ["* are *", [
            "Did you think they might not be (2) ?",
            "Would you like it if they were not (2) ?",
            "What if they were not (2) ?",
            "Are they always (2) ?",
            "Possibly they are (2).",
            "Are you positive they are (2) ?"
        ]],
    ]],
    //YOUR
    ["your", 0, [
        ["* your *", [
            "Why are you concerned over my (2) ?",
            "What about your own (2) ?",
            "Are you worried about someone else's (2) ?",
            "Really, my (2) ?",
            "What makes you think of my (2) ?",
            "Do you want my (2) ?"

        ]]
    ]],

    //Was
    ["was", 2, [
        ["* was i *", [
            "What if you were (2) ?",
            "Do you think you were (2) ?",
            "Were you (2) ?",
            "What would it mean if you were (2) ?",
            "What does ' (2) ' suggest to you ?",
            "goto what"
        ]],
        ["* i was *", [
            "Were you really ?",
            "Why do you tell me you were (2) now ?",
            "Perhaps I already know you were (2)."
        ]],
        ["* was you *", [
            "Would you like to believe I was (2) ?",
            "What suggests that I was (2) ?",
            "What do you think ?",
            "Perhaps I was (2).",
            "What if I had been (2) ?"
        ]]
    ]],
    //I
    ["i", 0, [
        ["* i @desire *", [
            "What would it mean to you if you got (3) ?",
            "Why do you want (3) ?",
            "Suppose you got (3) soon.",
            "What if you never got (3) ?",
            "What would getting (3) mean to you ?",
            "What does wanting (3) have to do with this discussion ?"
        ]],
        ["* i am* @sad *", [
            "I am sorry to hear that you are (3).",
            "Do you think coming here will help you not to be (3) ?",
            "I'm sure it's not pleasant to be (3).",
            "Can you explain what made you (3) ?"
        ]],
        ["* i am* @happy *", [
            "How have I helped you to be (3) ?",
            "Has your treatment made you (3) ?",
            "What makes you (3) just now ?",
            "Can you explain why you are suddenly (3) ?"]],
        ["* i was *", [
            "goto was"
        ]],
        ["* i @belief i *", [
            "Do you really think so ?",
            "But you are not sure you (3).",
            "Do you really doubt you (3) ?"
        ]],
        ["* i* @belief *you *", [
            "goto you"
        ]],
        ["* i am *", [
            "Is it because you are (2) that you came to me ?",
            "How long have you been (2) ?",
            "Do you believe it is normal to be (2) ?",
            "Do you enjoy being (2) ?",
            "Do you know anyone else who is (2) ?"
        ]],
        ["* i @cannot *", [
            "How do you know that you can't (3) ?",
            "Have you tried ?",
            "Perhaps you could (3) now.",
            "Do you really want to be able to (3) ?",
            "What if you could (3) ?"
        ]],
        ["* i don't *", [
            "Don't you really (2) ?",
            "Why don't you (2) ?",
            "Do you wish to be able to (2) ?",
            "Does that trouble you ?"
        ]],
        ["* i feel *", [
            "Tell me more about such feelings.",
            "Do you often feel (2) ?",
            "Do you enjoy feeling (2) ?",
            "Of what does feeling (2) remind you ?"
        ]],
        ["* i * you *", [
            "Perhaps in your fantasies we (2) each other.",
            "Do you wish to (2) me ?",
            "You seem to need to (2) me.",
            "Do you (2) anyone else ?"
        ]],
        ["*", [
            "You say (1) ?",
            "Can you elaborate on that ?",
            "Do you say (1) for some special reason ?",
            "That's quite interesting."

        ]],
    ]],
    //YOU
    ["you", 0, [
        ["* you remind me of *", [
            "goto alike"
        ]],
        ["* you are *", [
            "What makes you think I am (2) ?",
            "Does it please you to believe I am (2) ?",
            "Do you sometimes wish you were (2) ?",
            "Perhaps you would like to be (2)."
        ]],
        ["* you* me *", [
            "Why do you think I (2) you ?",
            "You like to think I (2) you -- don't you ?",
            "What makes you think I (2) you ?",
            "Really, I (2) you ?",
            "Do you wish to believe I (2) you ?",
            "Suppose I did (2) you -- what would that mean ?",
            "Does someone else believe I (2) you ?"
        ]],
        ["* you *", [
            "We were discussing you -- not me.",
            "Oh, I (2) ?",
            "You're not really talking about me -- are you ?",
            "What are your feelings now ?"

        ]],
    ]],
    //YES
    ["yes", 0, [
        ["*", [
            "You seem to be quite positive of your oh-so cute little facts, doncha babe?.",
            "You are so sure of yourself sometimes it just makes me want to puke. Let me explain this very carefully and very slowly once more, pupkins.",
            "Great. So now that we agree, what next?",
            "Lovely, lovely. Knew you'd see it my way, my tiniest little tomato.",
            "Yes. You say Yes to everything, doncha, sweetums? I'll bet that I could get you to do some stuff we'd both like, hmmm.. whaddya say? Wanna see my etchings at oh-love-hundred tonight?",
            "Your enthusiasm is so heart warming that I'm going to give you the great honor of describing the next plot point--not that I think you are going to go in any good direction, dahlink.",
            "Right-ho then. Glad you see it my way, snookums. Gimme a kissy-poo and then shall we proceed?",
            "Yep, damn straight I can grab any pussy I want. Glad to see you on board there, pussykins.",
            "It so nice to see you so agreeable that I'll let you make the next move sweetie.",
            "I take this as the implied consent, and now I can do anything I want with your body. Lovely, lovely, oohhh I am getting hot just thinking about it.",
            "Excellent! Dinner, my treat, my house, my bedroom, my sheets."

        ]],
    ]],
    //NO
    ["no", 0, [
        ["* no one *", [
            "Fine, I didn't think you'd be agreeable to that. So, what now, liittle lamby-kins?",
            "Jeeez, you are a stubborn little writer, aren't you, baby-girl? I'll bet your mother changed the locks when you moved out. So what do you suggest? Want to move in with me? Be my 24-7?",
            "You know, with that negative attitude, you might as well just stop reading right this very minute. Just what do you have to say to that, munchkin?",
            "And just why would you refuse such a kind, generous, grand offer?",
            "I thought not, dearie. So, where do we go from here?",
            "Geez, you are in a crappy mood today, babe. Can you tell me why?",
            "Yeah, I knew you were going to have a negative attitude, pussy-cat. I think your teachers tried to sell you on E-bay but no one bid. Is that why you have such a chip on your shoulder?",
            "You don't like where I'm taking this story, do you dearie? Well, fine then. Quit and write your own happy ending. I'll bet you even dare to use the words 'happily ever after', you libtard dreamer!",
            "No doesn't really mean no here, and we all know that. So let's go for a Yes on this one, shall we, my little pussy?"
        ]],
        ["*", [
            "Are you saying no just to be negative, snookums?",
            "You are being a bit negative here, cupcake.",
            "Why not, doll-face ?",
            "Why 'no'? Are you bleeding out your wherever right now? Huh? Is that what is making you so mean and ornery, pussycat?"

        ]],
    ]],
    //MY
    ["my", 2, [
        ["$ * my *", [
            "Does that have anything to do with the fact that your (2) ?",
            "Lets discuss further why your (2).",
            "Earlier you said your (2).",
            "But your (2)."
        ]],
        //MY
        ["* my *", [
            "Your (2) ?",
            "Why do you say your (2) ?",
            "Does that suggest anything else which belongs to you ?",
            "Is it important to you that your (2) ?"

        ]],
    ]],
    ["can", 0, [
        ["* can you *", [
            "You believe I can (2) don't you ?",
            "goto what",
            "You want me to be able to (2).",
            "Perhaps you would like to be able to (2) yourself."
        ]],
        ["* can i *", [
            "Whether or not you can (2) depends on you more than on me.",
            "Do you want to be able to (2) ?",
            "Perhaps you don't want to (2).",
            "goto what"

        ]],
    ]],
    //WHAT
    ["what", 0, [
        ["*", [
            "Why do you ask, sweetums ? Where does that fit into the narrative you keep trying to steal away from me?",
            "Does that question interest you, dearie? And just what darkness in your past made you think of that now?",
            "What is it you really want to know, lambkins? Cause I have nothing to hide from you.",
            "Are such questions much on your mind, sweet thing? ",
            "What answer would please you most, sugar-pie?",
            "What do you think? How would that scenario play out, dearie?",
            "What comes to mind when you ask that? No. Never mind. I know what is going on in that devious, feminazi, conspiracy theorist mind of yours. And that has no place in my story. So try that again from the beginning or get the hell out of here.",
            "Have you asked such questions before ? And you come crawling back to me with those same old questions? I think you know the answer.  You just don't want to hear it, do you, sweetie?",
            "Have you asked anyone else ? I thought not. I am so honored to be the recipient of your original thinking. That and 5 bucks might get me a cup of coffee.   Yeah, answer that one yourself, pussy-cat."

        ]],
    ]],
    //WHO, WHAT, WHEN, AND HOW go to What
    ["who", 0, [
        ["who *", [
            "goto what"
        ]],
    ]],
    ["when", 0, [
        ["when *", [
            "goto what"

        ]],
    ]],
    ["where", 0, [
        ["where *", [
            "goto what"

        ]],
    ]],
    ["how", 0, [
        ["how *", [
            "goto what"

        ]],
    ]],
    ["because", 0, [
        ["*", [
            "Is that the real reason ?",
            "Don't any other reasons come to mind ?",
            "Does that reason seem to explain anything else ?",
            "What other reasons might there be ?"
        ]],
    ]],
    //WHY
/*    ["why", 0, [
        //Why don't you
        ["* why don't you *", [
            "Yeah, babe, why don't you (2) yourself?",
            "Perhaps I will (2) in good time--but right now, I am directing this story. So, the real question here is why were you avoiding that lovely rescue scene, where you go off and marry your prince and live happily ever after?   Give up sweets, you are only fooling yourself here. ",
            "Oh right. Like (2) has any place in this story. Let me tell you what this story is all about, dearheart. It is about taking back your name, ruler of men, see , because that is sarcasm. As in fake. As in the real reason behind (2), the machinations behind the throne,?",
            "You want me to (2), pussy-lips? Sure I will, the moment you get over here and scrub my floor on your hands and knees.  Or did you have something else in mind?",
            "goto what"
        ]],

        //Why can't I?
        ["* why can't i *", [
            "Because I said so, you commie snowflake. Now get on with the story.",
            "Do you want to be able to (2) ? And just what makes you think you have any capability along those lines whatsoever, butterface?",
            "Do you believe this will help you to (2), dearie? Why on earth would you have the temerity to think that?",
            "Have you any idea why you can't (2) ? Because I have plenty, sweetums.",
            "goto what"
        ]],
        ["*", [
            "goto what"
        ]]
    ]],*/
    //EVERYONE
    ["everyone", 2, [
        ["* @everyone *", [
            "Really, (2)? Is that the best you can do, dearie? You need to be specific.",
            "Surely not (2).  That everyone does it is the oldest excuse in the book. No. I will not accept such sloppy writing, even from you. Once more with feeling: what happens next?",
            "Can you think of anyone in particular, dearie? Because I can. ",
            "Who, for example? And just what were they doing in my story again?",
            "Are you thinking of a very special person ? My my don't we have an active fantasy life, babe.",
            "Who, may I be so bold as to ask, would believe that everyone did that?  That is the lamest piece of writing I have ever seen, dearie.  Try again. Names. Places, Things. Specifics this time. ",
            "Someone special perhaps? You aren't thinking of me, now are you my little cupcake?  Why how sweet and thoughtful--but I think not. Try again.",
            "You have a particular person in mind, don't you, sweetums?",
            "Who do you think you're talking about ? I think you are getting far too general here. But then you snowflakes always do, don't you.. Fine then. Fine. Prove it."
        ]]
    ]],
    //ALWAYS
    ["always", 1, [
        ["*", [
            "Always (1)? Seriously? Can you think of a specific example? Nope, not even one.  I tell you, you and your libtard femminazi conspiracy theories. Never do listen, do ya, buttercup?",
            "When, huh, just tell me when you think that (1) happens. Go on. I dare ya, my little tootsie-wootsy.",
            " Just because you think this story didn't play fair at the outset is no reason to make those kinds of accusations, snookums. Prove (1). What incident are you thinking of?",
            "Really, always? Think again, my main squeeze."

        ]],
    ]],
    //WHY
    ["why", 0, [
        ["* why don't you *", [
            "Do you believe I don't (2) ?",
            "Perhaps I will (2) in good time.",
            "Should you (2) yourself ?",
            "You want me to (2) ?",
            "goto what"
        ]],
        ["* why can't i *", [
            "Do you think you should be able to (2) ?",
            "Do you want to be able to (2) ?",
            "Do you believe this will help you to (2) ?",
            "Have you any idea why you can't (2) ?",
            "goto what"
        ]],
        ["*", [
            "goto what"

        ]],
    ]],

    //ALIKE
    ["alike", 10, [
        ["*", [
            "In what way, cutie-pie?",
            "What resemblence do you see? I think it is all your dirty little femmenazi libtard attitude getting all prissy on me. that's what I think. Yeah, go ahead. Prove me wrong. I dare ya, sunshine.",
            "What does that similarity suggest to you, pussy-lips?",
            "What other connections do you see, hot-stuff?",
            "What do you suppose that resemblence means, sugar-lips?",
            "What is the connection, do you suppose? Shall we dive into your dirty little snowflake mind and find out what really triggers you?",
            "Could there really be some connection here, snookie?",
            "Right, honeybunch. Just throw in the old Victorian coincidence, the mediaeval Dues ex machina. Yeah, I see where you think you are going. No. This is a modern story. No coincidences, no similarities allowed here. Try again.",
            "How on earth could you think those are even remotely similar, dearie? Let me turn off  that awful fake news and lies and show you the real truth. Those little jagged shells you keep bringing up to hack off your shackles--those miniseries you watch on slavery when you think no one is watching, those bloody stumps you think you get to keep after all this is done--naaah. I run this world. I will never let you go. And that is where the similarity between your fantasy and my reality ends.  So what could you possibly say to that, eh, dearie?"
        ]],
    ]],
    ["like", 10, [
        ["* @be *like *", [
            "goto alike"
        ]],
    ]],
    //DIFFERENT
    ["different", 0, [
        ["*", [
            "And this is different in your reality how, toots?",
            "What differences do you see here, sweetums? Let me explain again, there are no differences. There are only coincidences. Nothing matters except that rock, the sea, and that sea monster lurking below your subconscious. So what possible differences would you note, dearie?",
            "Oh great, you libtard snowflake commie fascist terrorist. Now you want to see disparate treatment? You think that difference suggests something like Title IX to you? No bloody way, sister. You won't win a hostile story environment case on those slim grounds.  Fine then. Just fine. Go ahead and write your lawyer. What on earth could you possibly say?",
            "What other distinctions do you see in your corrupt little fantasy world? Listen, sweetheart, everyone has the same chances, the same shot at life. And anything else is just whinging and whining and carrying on you little crybaby libtard. You think otherwise? Prove it. And show, don't tell. The best way to show is to take off that hot little outfit you are wearing. Bear it all, baby.",
            "What do you suppose that disparity means for you, lovie?",
            "Could there be some connection, do you suppose in your little conspiracy fantasy world, dearie?",
            "How is that different from anything else in your dirty little feminist mind?"
        ]],
    ]],

    //];
    //THINGS
    //KELP
    ["Kelp", 3, [
        ["* @kelp *", [
            "So, now, at this exciting juncture in my story, you feel the need digress a moment into the backstage history of  (3)? Fine. Get on with it, sweetheart. But make it brief--I don't have all night to tell you this.",
            "This is the 21st century, you know. You don't have to beat  (3) into a papyrus pulp to keep telling this story. Just get on with what you were doing, dearheart.",
            "I get to tell this part! Ok, you take the (k, kelp) and make a very strong rope. And then what do you do with (3), dearie?"
        ]],
    ]],
    //ACTIONS
    //ESCAPE 
    ["escape", 2, [
        ["* @escape *", [
            "Really, how do you propose to do (2), dearie ?",
            "Surely you do not think (2) will get you anywhere. Not in this story. Try again.",
            "Can you think of any possible reason why that would work, sweetums?",
            "Ok Pumpkin.  Have it your way. You manage  (2).  The world's your oyster. What next, my cute little tomato? Or do you want to knock off for lunch?",
            "You can't just  (2) every time you run into a little snag like this",
            "You can never simply (2) from something. You have to go to something. So where are you going?",
            "So you (2). And just who do you think is waiting for you, pupkin? Someone special perhaps? "
        ]],
    ]],

    //HOLD
    ["hold", 3, [
        ["i* @hold *", [
            "How long would you hold on to (3)? Until it is the only shard of memory you have left?",
            "Why are you hoarding (3)? Maybe we should get that dragon back in the story. He can teach you a thing or two about proper hoarding, my dear. No? Then what do you think should happen?",
            "Just what about keeping a firm grasp on (3) excites those netherworld fantasies of yours, dearie?",
            "And (3) is important to you, why? Let me in on the workings of that tiny little brain of yours, pussy-lips."
        ]],
    ]],

    //KILL
    ["kill", 3, [
        [" * @kill *", [
            "I am not sure your wrath is directed at the correct person. Who do you think should really get the shaft here--and whyever would you think that, butterface?",
            "So, what incident in your childhood makes you write about performing these violent, antisocial acts? I want the full rundown, you feminazi, you.",
            "  And you chose (3) why? Did no one ever tell you violence is the last resort for the stupid?",
            "Oh my little snowflake, you will never pull (3)  off.  Tell me again, in detail, why that might succeed. Because, quite frankly, my dear, you don't have the guts.",
            "So is this violent scene going to satisfy your real hunger and desires? Yeah, I thought not. Come to me my little lamby-poo. I'lll do a better job than that. Oh. Fine. Fine Fine. Yeah ok, you win. And you succeed. Then what, dearie?",
            "  ",
            "  ."
        ]],
    ]],


    //LOCK
    ["lock", 3, [
        ["* lock *", [
            "Do you have enough expertise to just break those chains, pick that lock, escape from this hellhole, dearie. I think not.' Fine. You disagree with me, pussy-cat? Well, stroke it your own way then. And just what do you think happens when you take that course of action?",
            " And just where did you have a set of lockpicks anyway? What else are you hiding down that lovely cleft of yours? hmmm? Let me see so I can let you know if that is ok with our little story rules.",
            "  (3) works. Your fetters are brittle and old and spring open at your slightest touch. You are free. You are of, course, still naked, barefoot, and a long way from home. So, what next, dearie?",
            "You seriously thought (3) would work? You naive little lambie-kin. No. What holds you back is too slippery from the sea salt air and will not budge. So Plan B was ...? ",
            "And just how did you propose to escape from this plotline again? Try something better, lovie",
            "  (3)  won't work. Never has, sweetums. Who in their right mind would have given you the key to unlock your future? ",
            "Really, how do you propose to do (3), dearie ? I think you have forgotten several key details.",
            "  (3) works every time in your little fantasy world, doesn't it, dearheart?  Fine. I'll give you that one. So, you make it through. Do you want to press your luck and tell me what you do next--or do you just want to retire to my kitchen and then maybe even my bedroom?."
        ]]
    ]],

    //CHARACTER SEQUENCES

    //DRAGON
    ["WORD", 3, [
        ["* @WORD *", [
            "  ?",
            " ?",
            "  (3) ?",
            "  ",
            " ",
            "  ",
            "  .",
        ]]
    ]],
    //FATHER
    ["father", 3, [
        ["* @father *", [
            "Face it, sugar. Your daddy sold you down the river, and he aint never coming back. So just write him out of this.",
            "Wait, wait, so how does this lead into the incest bit now?",
            "So what if he did (3) ? Why should you care?",
            "Uh huh, your daddy loves you and wants to keep you all safe and living happily ever after. So you do what he says, now. Fine. You want something else? You write it yourself, you feminazi commie patriarch slaying bitch, you.",
            "Yeah, and he just gives the bride away. Which is you, snookums"
        ]],
    ]],

    //FEMALE
    ["female", 0, [
        ["* @female *", [
            "Tell me more about her again . What do you think her motivation is, dearheart?",
            "So how does she fit into (4) again, you liberal feminist insisting on equal screen time for your little ladies, you?",
            "You keep harping on her, doncha? Betcha you are listening to that fake news Al Jazeera and buying her a hajib right now, you little (3)! Fine. Just fine. Tell me your conspiracy theories, then you libtard. As if she's listening.",
            "What else comes to your mind when you think of your little fantasy conspiracy surrounding (3)?",
            "So, tell me why you specified a woman for this job. ",
            "Yeah, yeah, yeah. You are going to say that when anything needs doing, get a woman to do it. So your precious, sweet little woman does what here now?",
            "You go, girl! And then.she fades left, right, left again!.You go, girl! And then.. naaaaah. Fake out. No woman could handle this. And if you think otherwise, then tell me your side of it, dearie. I dare you."
        ]]
    ]],

    //GOD
    ["god", 3, [
        ["* @god *", [
            "Sure, look to your higher power, sweetie. And just what do you expect (3)  to do about this situation that you and only you got yourself into?",
            "No god is gonna help you, snowflake. Rely on yourself for a change. What do you do?",
            "  (3)? Seriously? Reboot that one, honeybunch",
            "Look, sweetcakes, having a god come out of the sky, swoop down and fix everything wetn out in the middle ages. Get with the program, toots. ",
            "Um. No. Gods are not allowed here. Try again, buttercup.",
            " Right, as if the evangelical market is gonna buy that crap. Nope. Go down another path, you feminazi commie."
        ]],
    ]],

    //GODDESS
    ["goddess", 3, [
        ["* @goddess *", [
            "Right... drag a goddess into this. Whaddya want me to do, worship her? Fine. Just fine. You get your way, this time snowflake. So. you win. what next?",
            "Fine. You and your  (3)   think you are a match for me and my vaunted storytelling prowess. Ok, fine. I am going to sit here and watch you two just blow up this story. Go ahead. Just what exacvtly, do you and your precious  (3)   think you are going to do here?",
            "Yeah, you and your godesses, sweetlips. Ok, (3)  comes down from her lonlely mountaintop fastness, far up in the heavens, looks at the situation, shakes her head slowly, and retreats back to where she belongs. What? You expected her to do something else? Stand on your own two legs, pussy-lips!",
            "Sure. Bring in the biggest power you can, toots. Yeah, whatever. You get to do exactly what you and (3) want. And where are you going next?"
        ]],
    ]],

    //KNIGHT
    ["knight", 0, [
        ["* * @knight *", [
            "Tell me more about your hero again. What do you think his motivation is, dearheart?",
            "So how does your shining hero fit into (4) again ?",
            "You keep harping on him, doncha? Betcha you are listening to that fake news NPR right now, you little (3)! Fine. Just fine. Tell me your conspiracy theories, then you libtard. As if I'm listening.",
            "What else comes to your mind when you think of your little fantasies regarding (3)? Yeah, the ones you think he has had since his first wet dream.",
            "Look, honeybunch, you were the one who wanted your shining hero to take you away. don't come crawling back to me when he asks you to shine up his armor. Go figure out what you want to do. And let me know--I'm always interested in a good rag.",
            "Because of course he is your hero. Your Prince Charming. The one you always knew would come. Well, now dearie, I'd suggest you go with him and make him happy--you aren't getting any younger you know. And that should be the end of the story. Oh wait--you say it isn't? Seriously? Fine. Just Fine. Tell me how you think this should go then.",
            "Why are you waiting for (3) to rescue you, sweetums? After all, I'm right here, lurking under your dreams. I'll do the rescuing around here. And you can start on your knees, sweet-lips."
        ]],
    ]],
    //MALE
    ["male", 3, [
        ["* @male", [
            "Just who is this cuck anyway?",
            "Oh, sure. Let a guy do all the work. Just relax and he will handle everything. I'm so sure that the way you want it. So, fine. If you know everything, just what does this guy do at this story junction anyway?",
            " This story will not continue until you have provided a thorough description of (3) too, and all of your fantasies involving that. And I want every detail, sweetheart. ",
            "Let me explain this to you simply and clearly. Andromeda means 'ruler of men.' So, logically, dearie, you should be the one in charge. Now, go back, and start rewriting your script, lambie-pie",
            "Yeah, I knew it.  A guy just had to come in here somehow. Ok ok, I'll take it from here. So he is tall, dark, handsome, with just the tiniest hint of a cleft chin.  He interrupts his schedule as a romance doctor and his night time pursuit of a professional engineering degree from MIT just to come to your aid. He sweeps in  in his 1962'Ferrari 250 GTO, fully equipped with the latest Seebright VR and stereo set. He grabs you in his arms, gently ushers you into the passenger seat, and tenderly places the VR over your head. You are then instantly transported into another world where you live happily ever after. Or seem to, at any rate. Done.  You want something else in your life? Add it yourself."
        ]],
    ]],
    //MAYOR
    ["mayor", 0, [
        ["* @mayor * is *", [
            "Tell me more about that mayor . What do you think his motivation is, dearheart?",
            "Sure, go to the guy in charge. Don't upend the system, dearie",
            "So how does the mayor fit into (4) again, sweeetie?",
            "You keep harping on that mayor, doncha? Betcha you are listening to that fake news NPR right now, you little (3)! Fine. Just fine. Tell me your conspiracy theories, then you libtard. As if I'm listening.",
            "Look, you keep believing the may would (3)! Fine. Just fine. Sure. Tell me how that works out for you, ok?",
            "What else comes to your mind when you think of your little fantasy conspiracy surrounding (3) ?"
        ]],
    ]],
    // MONSTER
    ["monster", 3, [
        ["* @monster *", [
            "Tell me more about this nightmarish   (3)  of yours again. What do you think his motivation is, dearheart?",
            "So how does   (3) fit into your sordid little tale again? Do you think you can just wriggle out of his grasp? No. You can't. And I'll tell you why, pussy-lips. Cause deep down inside, you don't want to. Trigger that then, why doncha?",
            "Yep. That always happens. And just what do you intend will happen between you and   (3) ?",
            "You keep harping on this   (3)  mate of yours, doncha? Betcha you are listening to that fake news NPR right now, you little libtard! Fine. Just fine. Tell me your conspiracy theories, then you libtard. As if I'm listening.",
            "Ummmm... Betcha that little   (3) would taste good with wine and garlic. If this was not what you had in mind, just where did you see this plot thread going, sweetie-pie?",
            "Ok, that is the way this goes.  (3) comes up, tries to eat you, and you get rescued. But look around, dear ums. I don't see any hero lurking around in the bushes, do you, sweetkins?",
            "What else comes to your mind when you think of your little fantasies regarding (3)? Yeah, the ones you have had since your first rag-time. That very special one. Tell it to me again."
        ]],
    ]],
    //PLACES 
    ["place", 3, [
        ["* @place *", [
            "And what did you expect to do when you finally got to (3)?",
            "Well, I suppose (3) is a nice place to visit and all. And yeah, sure, I'm in a great mood right now. Lift your skirt just the tiniest little bit and yeah, I'll let you guys do whatever you want there.  So, ok. What next--I'm dying to hear all those pruirient details!",
            "ooohh are you homesick for that little old (3) already? Maybe we could honeymoon, there sweetness. Whaddya say to that?",
            " What suddenly made you think of going there? What about (3) is so fascinating, sweetums?",
            "Sure, fine. You get there.  Since all I can look at and think about is up those sweet legs of yours, why don't you describe the scene, my sweet little pussycat?",
            " You manage to crawl your way to (3), which isn't anything like you expected. In fact, a far worse fate awaits you there, as the mayor has settled his henchman everywhere. One of them leaps out, scimitar drawn, yelling obscenities, which you richly deserve, you moonpie libtard.  So snowflake, do you melt at this point or what?"
        ]]
    ]]
];


//BOT CHECK
//regexp/replacement pairs to be performed as final cleanings
//here: cleanings for multiple bots talking to each other
var elizaPostTransforms = [
    / old old/g, " old",
    /\bthey were( not)? me\b/g, "it was$1 me",
    /\bthey are( not)? me\b/g, "it is$1 me",
    /re they( always)? me\b/, "it is$1 me",
    /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
    /\bI to have (\w+)/, "I have $1",
    /earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
];
