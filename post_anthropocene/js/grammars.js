/**
 * @author Kate
 */

var grammars = {
    move:["fall", "crash", "collide", "run", "crawl", "walk", "wander", "flee", "jump", "falter", "stumble", "drift", "hide", 
    "conceal", "charge", "slither", "slide", "transform", "mutate", "shift", "progress", "grow", "wither", "ride", "gallop", "skip",
    "advance", "proceed", "stir", "cross", "withdraw", "switch", "climb", "travel", "change", "transfer", "skulk", "strut", "glide",
],
    feminine:["hostess", "patroness", " prophetess", "lady", "mistress", "woman", "matron", "miss", "daughter", "sister", 
    "wife", "witch", "harpy", "witch", "feline"],
    masculine:["host", "patron", "prophet", "lord", "master", "man", "patriarch", "mister", "son", "brother", "husband", 
    "warlock", "monster", "fighter", "wolf"],
    neutral:["leader", "human", "person", "child", "partner", "parent", "fairy", "soul", "bird"],
    agent:["#masculine#", "#feminine#", "#neutral#"],
    transVerb:["lose", "forget", "destroy", "consume", "make", "promise", "want", "need", "take", "kick", "kill", "forgive", "mend", "heal", 
    "comfort", "hold"],
    emotion:[
        "sorrow", "despair", "rage", "futility", "grief", "resignation", "gloom", "misery", "discontent", "doubt", "terror", 
    "panic", "anxiety", "fear", "worry", "stress", "irritation", "anger", "bitterness", "horror", "revulsion", "nausea", "aversion", 
    "withdrawal", "hope", "contentment", "joy", "pride", "serenity", "gratitude", "amusement", "euphoria", "eagerness", "surprise", "admiration"],
    material:["#emotion#", "fiber", "cloth", "wood", "dust", "fire", "lava", "ash", "air", "glass", "cardboard", "tin", "waste", "paper", 
    "quilt", "thread", "twine"],
    texture:["abrasive", "angular", "burnished", "creepy", "carved", "painted", "concentrated", "cratered", "dense", "dented", "dusty", 
    "disfigured", "damaged", "deep", "enameled", "engraved", "etched", "embossed", "feathery", "fluffy", "flattened", "fuzzy", "grungy", 
    "glossy", "jagged", "inscribed", "layered", "marked", "metallic", "pressed", "polished", "ragged", "raw", "rough", "sandy", "sharp", 
    "smooth", "tesselated", "velvety", "sweet"],
    mascadj: [
        "", "active", "adventurous", "aggressive", "ambitious", "analyzing", "assertive", "athletic", "free", 
        "boastful", "challenging", "competitive", "confident", "courageous", "decisive", "determined", "dominant", 
        "forceful", "greedy", "headstrong", "hostile", "impulsive", "independent", "individual", "intellectual", 
        "logical", "masculine", "objective", "opinionated", "outspoken", "persistent", "principled", "reckless", 
        "stubborn", "superior", "self-confident", "self-sufficient", "self-reliant", "#adj#"
    ],
    mascnoun: [
        "action", "adventure", "aggression", "ambition", "analysis", "assertion", "athleticism", "freedom", "boast", 
        "challenge", "competition", "confidence", "courage", "decision", "determination", "dominance", "force",
        "greed", "obstinance", "hostility", "impulse", "independence", "individuality", "intellect", "logic", "",
        "objection", "opinion", "candor", "persistence", "principle", "recklessness", "stubborness", "superiority",
        "self-confidence", "self-sufficiency", "self-reliance", "#noun#"
    ],
    femadj: [
        "", "affectionate", "childish", "cheerful", "committed", "communal", "compassionate", "connected", "considerate", 
        "cooperative", "dependable", "emotional", "empathetic", "feminine", "flattering", "gentle", "honest", "kind", 
        "personal", "loyal", "modest", "nurturing", "pleasant", "polite", "quiet", "responsible", "sensitive", 
        "supportive", "sympathetic", "tender", "trusting", "understanding", "warm", "passive", "yielding", "#adj#"
    ],
    femnoun:[
        "affection", "child", "cheer", "community", "commitment", "compassion", "connection", "consideration", "cooperation",
        "emotion", "empathy", "gentleness", "", "flattery", "honesty", "kindness", "personality", "loyalty", 
        "modesty", "nurture","pleasantness", "politeness", "silence", "responsibility", "sensitivity", "support", 
        "sympathy", "tenderness", "trust", "belief", "warmth", "deference", "surrender", "#noun#"
    ],
    adj:[
        "faint", "dreary", "handsome", "beautiful", "haunted", "forgotten", "emotional", "frumpy", "shrill", 
        "bossy", "pushy", "passionate", "ditsy", "hysterical", "irrational", "virile", "dowdy", "energetic", 
        "empathetic", "frigid", "bewildered", "breakable", "average", "cautious", "careful", "colorful", "charming", 
        "cruel", "dangerous", "dark", "determined", "difficult", "drab", "foolish", "glorious", "fierce", "grotesque", 
        "jittery", "light", "strange", "sparkling", "poor", "powerful", "#color#", "surreal", "brilliant", "beaming", 
        "glittery", "gleaming", "glistening",
    ],
    verb:[
        "join", "gather", "come", "linger", "wait", "see", "reveal", "revel", "wonder", "imagine", "stay", "despair", 
        "abandon", "leave", "forgive", "forget", "aid", "help", "adapt", "remain", "strengthen", "weaken", 
        "accumulate", "collect", "storm", "permeate", "saturate",
    ],
    place:["wasteland", "city", "suburb", "ruin", "classroom", "home", "forest", "desert", "swamp", "devastation", "den", "dive", "hole", 
    "spot", "abode", "dwelling", "roof", "hearth", "cabin", "ranch", "salon", "barrack", "lodging", "farm", "bunker", "trailer", 
    "hut", "hovel", "shack", "park", "#color# #place#"],
    color:[
        "alabaster", "bone-white", "snowy", "chalky", "bleached",
        "amber", "golden", "flaxen", "saffron",
        "terracotta", "ochre", "apricot", "tangerine", 
        "bronze", "rusty", "sepia", "sandy",
        "carmine", "crimson", "rosy", "claret", "vermilion", "rouge", "flushed",
        "amethyst", "lavender", "orchid", "bruised", "plum", "cerise",
        "azure", "cobalt", "sapphire", "indigo", "cerulean",
        "avocado", "grassy", "lush", "verdant", "fresh", "sage", "verdigris", "viridian",
        "ashen", "dove-grey", "leaden", "slate", "silver", "smoky",
        "gloomy", "cloudy", "dun", "inky", "raven", "obsidian",
        "deep", "vivid", "shady", "tinted", "tinged", "beaming", "radiant", "dappled", "fiery", "glowing",
        "iridescent", "opalescent", "vibrant", "colorless", "dark", "dim", "discolored", "muddy", "opaque", 
        "sickly", "sooty", "stained", "watery", "faded", "pale", "rustic", "translucent", "transparent", 
        "muted", "warm", "cool", "bright", "dark", "flowing", "fine", "delicate", "bold", "subtle", "dramatic",
        "dynamic", "earthy", 
    ],
    while:["while", "until"],
    from: ["from", "across", "of"],
    and: ["and", "", ""],
    punctuation:[",", " ", " ", "!", ".", ",", " -", ",", ""],
    world:["society", "world", "Earth", "species", "globe", "culture", "planet", "civilization", "nation","community","humanity", 
    "nature", "creation", "environment"],
    pronoun:["his", "her", "their", "its"],
    thought:[
        "dream", "thought", "memory", "hope", "fear", "need", "belief", "idea", "intent", "faith", "desire", "promise",
        "reality", "deception", "distortion", "prevarication", "fiction", "sincerity", "gravity", "delusion",
        "imagination", "nightmare", "vision", "reverie", "fancy", "ambition", "wish", "aspiration", "pretension", 
        "prayer", "thirst", "folly",
    ],
    noun:["#place#", "#agent#", "#world#"],
    towards:[
        "toward", "through", "with", "in", "on", "across", "to", "upon", "atop", "around", "circling", "covering",
        "after", "in light of", "based on", "admist", "during", "at", "throughout", "over", "above", "crossing", 
        "facing", "opposite", "before", "against", "nearby", "adjoining", "beside", "within", "between", "apace","from",
    ],
    despite:[
        "despite", "in spite of", "against", "even with", "in defiance of", "regardless of", 
        "undeterred by", "in contempt of", "in the face of", "with", "alongside"
    ],
    this:["this", "that", "our", "your", "#pronoun#", "the"],
    let:[
        "allow", "let", "permit", "insist", "prohibit", "demand", "forbid", "restrain", "prevent", 
        "stop", "hinder", "obstruct", "constrain", "authorize", "accept", "grant", "afford", "yield to",
    ],
    word:[
        "word", "text", "phrase", "tune", "sound", "song", "call", "poem", "speech", "novel", "story",
        "tale", "narrative", "yarn", "account", "recital", "myth", "fantasy", "drama", "legend", "history",
        "tragedy", "adventure", "allegory", "anthem", "hymn", "psalm", "verse", "ballad", "melody", "chant",
        "silence",
    ],
    femlinea:[
        "#towards.capitalize# #femadj# #femnoun.s#",
        "#color.capitalize# #femnoun# #move.s# #from# #thought# to #thought#",
        "#this.capitalize# #femadj# #agent# #verb.s# #despite# #pronoun# #color# #emotion#", 
        "#verb.capitalize# the #femadj# #world# and #pronoun# #emotion#", 
        "#pronoun.capitalize# #femnoun# is but a #color# #thought#",

    ],
    masclinea:[
        "#towards.capitalize# #mascadj# #mascnoun.s#",
        "#color.capitalize# #mascnoun# #move.s# #from# #thought# to #thought#",
        "#this.capitalize# #mascadj# #agent# #verb.s# #despite# #pronoun# #color# #emotion#", 
        "#verb.capitalize# the #mascadj# #world# and #pronoun# #emotion#", 
        "#pronoun.capitalize# #mascnoun# is but a #color# #thought#",
    ],
    femlineb:[
        "",
        "#let.capitalize# #pronoun# #femadj# #emotion# #move#", 
        "#this.capitalize# #femadj# #world# #verb.s#", 
        "The #femadj# #color# #noun# #transVerb.s# #emotion#",
        "#what.capitalize# of #pronoun# #femadj# #femnoun#?",
        "#despite.capitalize# #this# #color# #world#, they #move#",
    ],
   masclineb:[
       "",
       "#let.capitalize# #pronoun# #mascadj# #emotion# #move#", 
       "#this.capitalize# #mascadj# #world# #verb.s#", 
       "The #mascadj# #color# #noun# #transVerb.s# #emotion#",
       "#what.capitalize# of #pronoun# #mascadj# #mascnoun#?",
       "#despite.capitalize# #this# #color# #world#, they #move#",
    ],
   femlinec:[
       "#femadj.a.capitalize# #agent# #move.s# #towards# #thought.a# from #pronoun# #femnoun#", 
       "#while.capitalize# only #place.a# #verb.s#", 
       "#femadj.a.capitalize# #color# #material# #move.s#", 
       "#pronoun.capitalize# #color# #femnoun# #move.s# #despite# #this# #word#",
       "#let.capitalize# #this# #femadj# #word# <br> #and.capitalize# #move# #towards# #thought#", 
       "#while.capitalize# #this# #femadj# #emotion# #verb.s#",
    ],
    masclinec:[
        "#mascadj.a.capitalize# #agent# #move.s# #towards# #thought.a# from #pronoun# #mascnoun#", 
        "#while.capitalize# only #place.a# #verb.s#", 
        "#mascadj.a.capitalize# #color# #material# #move.s#", 
        "#pronoun.capitalize# #color# #mascnoun# #move.s# #despite# #this# #word#",
        "#let.capitalize# #this# #mascadj# #word# <br> #and.capitalize# #move# #towards# #thought#", 
        "#while.capitalize# #this# #mascadj# #emotion# #verb.s#",
    ],
     what:["but what","what"],
     poem:["#femlinea##punctuation#<br> #femlineb#<br>#femlinec#.", "#masclinea##punctuation#<br> #masclineb#<br>#masclinec#."],
    origin:["#poem#"]
    }
    
   