# author: Kenton Taylor Howard\
# title: Life In The Megapocalypse
# theme: dark

//Welcome to Life in the Megapocalypse!  If you are reading this comment, you are viewing the game in Ink, probably because you are interested in how the game works or might even want to modify it for your own purposes.  If so, you will find comments like this throughout the file to help you!

->setup

==setup //This is a "knot," which allows you to mark a location in your story that you can send your player to. You can also keep track of whether or not the player has been to a certain knot and do things based on that.  You can create one using "==knotName" and you can put anything you want inside of them - text, code, choices (explained below), and more.  This knot, for example, holds various "setup" options; it allows the user to get more info about my dissertation and Ink or start the game itself.

VAR charOneChatted = false //This is a variable, which are much like variables in other kinds of programming. They are used throughout the story to keep track of various elements of the game. You create your own variables using "VAR variableName = value" and you can change the value of a variable by using "variableName = newValue." 

VAR charTwoChatted =  false //Variables can have a variety of values, but one of the most basic ones is a true/false variable - a "boolean." These are useful for narrative and gameplay because you can check whether they are true or false and do things based on that - for example, if "Char1Chatted" is false, you can talk to Char1, but if it is true, you can't. If you are interested in modding the game, you can change these variables, but keep in mind that most of them are related to talking to the game's various characters and changing them will likely break the conversation system. 

VAR charThreeChatted = false
VAR charFourChatted = false
VAR charOneStoryHeard = false
VAR charOneStrongHeard = false
VAR charOneWeakHeard = false
VAR charTwoStoryHeard = false
VAR charTwoStrongHeard = false
VAR charTwoWeakHeard = false
VAR charThreeStoryHeard = false
VAR charThreeStrongHeard = false
VAR charThreeWeakHeard = false
VAR charFourStoryHeard = false
VAR charFourStrongHeard = false
VAR charFourWeakHeard = false

VAR totalChats = 0  //Variables can also have integer values - 0, 1, 2, etc. - which can be used to keep track of things. These two variables keep track of how many times you have chatted with the characters and how many characters you have lost.
VAR charsLost = 0

VAR charOneName = "Mike" //Variables can have string values too, which allows you to store text inside of a variable. All of these variables are used to set the names of the characters in the player's team, which allows you to easily change the character's names if needed.
VAR charTwoName = "Jean"
VAR charThreeName = "Dana"
VAR charFourName = "Alex"

VAR charOneSingular = "he" //These variables store the gender pronouns for each character so they can be easily modified; for example, if you change "she" to "they," "they" will be used throughout the story in appropriate places when referring to the character's gender.
VAR charOnePossessivePro = "his"
VAR charOnePossessiveAdj = "his"
VAR charOneObject = "him"
VAR charTwoSingular = "she"
VAR charTwoPossessivePro = "hers"
VAR charTwoPossessiveAdj = "her"
VAR charTwoObject = "her"
VAR charThreeSingular = "they"
VAR charThreePossessivePro = "theirs"
VAR charThreePossessiveAdj = "their"
VAR charThreeObject = "them"
VAR charFourSingular = "she"
VAR charFourPossessivePro = "hers"
VAR charFourPossessiveAdj = "her"
VAR charFourObject = "her"

->start //This is a "divert," which allows you to jump to a new location in your story. You can creat one using "->knotName," where knotName is the name of a knot you have already created in your story. In this example, the divert happens automatically without any user input - the player jumps to the "Start" knot without clicking anything.

==start //This knot starts the story.  It is useful to have a knot like this to keep your game organized. If you are interested in modding the game and want to add some information explaining what you changed this is a good place to do it.

Welcome to <i>Life in the Megapocalypse</i> (the prototype version, at least)! From here, you can get a bit more information about the project or start the game.

+[Get more information about this project.] // This is a "choice" - text that the user can click on.  You create one using a "+" symbol and then placing text after it. Note that this is also a "bracketed" choice - it has [] brackets around it. Bracketed choices are not shown in the game window on the right if a player clicks on them. 

->projectInfo //Anything you place inside of a choice will happen when your player clicks on it; since this divert is placed after or "inside" a choice, it only happens when the user clicks on the choice. This means that unlike the previous divert, this one does not happen until the player clicks on the "Get more info about this project" text. 

*[Start the game.] # CLEAR //Note that this is also a choice, but it is created with the "*" symbol instead of the + symbol. Choices with a * get "used up" when the player clicks on them - you can't click on them again. Basically, you use + choices if you want the player to be able to make that choice more than once, and * choices if the player should only be able to make that choice once.  
->gameStart

==projectInfo //This knot holds lots of information about the project I created and about Ink. If you want to add information about modifications that you made, this is a good place to do it, since your player can read through the information before starting the game.

This project is an Ink game that is designed to support my dissertation. It explores queer representation in video games and also aims to help players learn about and explore that concept through gameplay and modification.

+[Get more information about the written dissertation.]
->dissertationInfo

+[Get more information about Ink.]
->inkInfo

+[Get more information about modding this game.]
->modInfo

+[Return to the start page.]
->start

    =dissertationInfo

    My written dissertation is titled "A Design Framework for Learning About Representation in Video Games Through Modification of Narrative and Gameplay." The main goal of my dissertation is to create a pedagogical, critical, and design framework for learning about critical concepts, such as queer representation, by modifying video games like this one.

    +[Return to the project information page.]
    ->projectInfo

    =inkInfo

    Ink is an interactive fiction scripting language used to create choice-based interactive fiction stories. Ink stories can be created in the Inky editor. The language and editor are easy to learn and Ink stories are easy to change and modify. If you are viewing this game in the Inky editor you should be able to see my code and comments that help explain how it all works.

    +[Return to the project information page.]
    ->projectInfo

    =modInfo

    This game is designed to be easily modifiable, and I have added comments throughout the game that you can view in the Inky editor if you are interested in doing so. Those comments will help explain the structure of the game and point out places where you can add new characters, new dialogue, new encounters, new endings, and lots of other kinds of content to the game. Since one focus of the game is on empowering portrayals of queerness, I suggest adding that kind of content to the game.

    +[Return to the project information page.]
    ->projectInfo

==gameStart //This knot starts the game itself! It is separate from the "Setup" and "Start" knots to keep things organized.  If you want to know more about how the game works or how to modify it, start here!

*[I have never played before or I want a refresher on the game's introduction.]
->longIntro
*[I have played before and want to get right to the game!]
->gameStructure

    =longIntro //This is a "stitch," which works exactly the same way as a knot, except that stitches are nested "inside" knots. You can create one using "=stitchName" and they are primarily used for story organization. In this example, the stitch called "LongIntro" is inside the knot called "GameStart" and contains some lengthy introductory text for the game. Structuring things this way allows the player to skip the intro if they have played the game before.

    You are sitting in your office when a chime suddenly plays on the computer - a notification of an incoming message. That surprises you because things out there have gotten even worse than usual lately. When climate change started bringing giant ice storms that covered the earth everyone thought the world was ending, and you couldn't go anywhere without getting ambushed by desperate people who turned to banditry. That was before the dead came back to life and started eating people... and THAT was before the extraterrestrial invasion... and THEN came the killer robots. By the time the giant monsters began showing up you started to lose track of the apocalypses. # CLASS: playernotes

    +Read the message. # CLASS: playernotes

    "Hey, is anyone there?  We found a note in this bunker telling us to send a message if we needed help - and we definitely do!" # CLASS: teamnotes

    At this point, you can't believe anyone is still out there in the megapocalypse - the only term appropriate enough to describe the seemingly endless series of catastrophes that have struck the Earth. But the blinking amber text of the message on your screen is there, all the same.  # CLASS: playernotes

        ++Answer the call. # CLASS: playernotes

        You respond and ask them for a bit more information about who they are. Your job as The Gatekeeper has been quiet lately, but you are the person who guides people to the small safe haven you and your friends call home in the hopes that they can contribute valuable skills to the community. # CLASS: playernotes

        - "We are a team of five survivors. Our last safe haven fell, and we've been trying to survive out here. We thought we were doomed until we found one of your bunkers and a note that told us to call. Are you somewhere safe?" # CLASS: teamnotes

            +++Respond to their message. # CLASS: playernotes

            - You chat with them a bit more, telling them about your community and finding out more about them. It seems like they have some useful talents, so after a short discussion, you offer to guide them to your community. With your advice, hopefully they can make it to the next 8 bunkers and then to your safe haven. # CLASS: playernotes

                *Start guiding them along the road.->gameStructure # CLASS: playernotes # CLEAR

==gameStructure //This knot allows the player to either go talk to the party or to take on an encounter; it is essentially the "main" knot of the game in that it is used to track the player's progress and advance the story. It is useful to have a knot like this to keep track of the overall game progress, and if you are interested in modding the game, you can change lots of elements of the game by modifying things here: for example, there is lots of "story" content in this knot that shows up at different points in the game, so if you want to add new story content this is a good place to do so.

{charsLost == 4: ->endings} //This is a conditional: remember those variables from earlier?  A conditional is one way you can "test" them and do things with them.  You write one by using "{variableName: some text you want to show or logic you want to do.}" In this code, we check to see if the "CharsLost" variable is equal to 4, and if it is, we divert to a knot called "Endings."

{encounters == 8:->endings}

The team is ready to set out for {the first|the second|the third|the fourth|the fifth|the sixth|the seventh|the final} bunker - but maybe you should talk to the team first. # CLASS: playernotes //This is a "sequence," a special kind of text that varies each time the user sees it. You can create one by using "{someText|secondText|thirdText|...}" and when a player sees the sequence, the text the player sees will be based on how many times the player has visited the sequence before. In this example, the user sees "the first" the first time, "the second" the second time, "the third" the third time, etc. A sequence "stops" on its last element - so in this example, the user will see "the final" each time the user visits the sequence after the 8th time.

{abilities.guyMcMannis == 1:It looks like you have decided that violence is the best way to reach the safe haven. It doesn't look like it turned out too well, though - maybe you should try another approach?} # CLASS: fourthwall //Note that this is also a conditional, but here we just used the name of a knot and stich instead of checking a variable.  Conditionals can check to see if a user has been to a certain knot or stitch by just using the name of the knot / stitch - you can write something like "{knotName.stichName:some text.}" This conditional checks to see if your player went to the "Abilities.GuyMcMannis" knot, and if so, it warns them not to take the violent approach that leads to the "bad" ending.

{abilities.guyMcMannis == 2:...well it looks like you are going to keep trying the violent route. Even though so far it has just caused the other characters to get separated from the team.  You know, the ones that you can talk to. The ones who can do something other than just shoot at everything. Maybe you should try using  one of them this time?} # CLASS: fourthwall //You can also check to see if someone visited a knot more than one time - knots and stiches are basically variables and work just like them - so here the game checks to see if the player has used the "bad" ability more than once and keeps warning them not to do it.

{abilities.guyMcMannis == 3:Hmm.  It looks like you are really committed to the violent route, even though it has caused nothing but problems for your team.  Maybe just this once you should try talking to your teammates or using someone else?} # CLASS: fourthwall

{encounters == 7 and totalChats < 11:Reports indicate that storm activity has greatly increased, and you haven't learned enough about the team to form a decent plan.  You definitely need to start learning more about them!} # CLASS: playernotes

{encounters == 7 and totalChats > 10:Reports indicate that storm activity has greatly increased, but you have learned enough about the team to form a decent plan!} # CLASS: playernotes


{encounters == 6: As the team travels, you strike up a conversation with the remaining team members about what their futures might hold.} # CLASS: playernotes

{~{encounters == 6 and not charDeath.charOne and not charAbandon.charOne:{charOneName}:I wonder if they are going to need history teachers? I guess someone has to remember what the world was like before everything fell apart. Though... there are probably some things that it might be worth leaving out.}|{encounters == 6 and not charDeath.charTwo and not charAbandon.charTwo:{charTwoName}:You know, I'm thinking once we are safe, I might try to start shooting nature documentaries all over again - they would certainly be a lot more exciting than the ones I used to do, and they might even keep someone alive out there.}|{encounters == 6 and not charDeath.charThree and not charAbandon.charThree:{charThreeName}:I wonder if they have any kind of training program set up for new doctors there?  I'd love to help people out, but I'd love even more to make sure that we are teaching new people! If there is one thing we need after what I have seen out here, it's more doctors!}|{encounters == 6 and not charDeath.charFour and not charAbandon.charFour:{charFourName}:Considering that we have been communicating via text messaging with these folks, I can definitely tell I will be able to help out once we get to this place. They need to update their systems for sure!}} # CLASS: teamnotes 

{encounters == 5 and totalChats < 6:Reports indicate that monster activity has greatly increased, and you haven't learned enough about the team to form a decent plan. You definitely need to start learning more about them!} # CLASS: playernotes

{encounters == 5 and totalChats > 5:Reports indicate that monster activity has greatly increased, but you have learned enough about the team to form a decent plan!} # CLASS: playernotes

{encounters == 4: As the team travels, they begin talking about dating and relationships.} # CLASS: teamnotes
{~{encounters == 4 and not charDeath.charOne and not charAbandon.charOne:{charOneName}:You know, it was always hard for me to figure out the whole dating thing, but I guess the one nice thing about the apocalypse is that it doesn't really matter anymore... unless your idea of a nice first date is a near-death bonding experience.}|{encounters == 4 and not charDeath.charTwo and not charAbandon.charTwo:{charTwoName}:I've seen a few cute people out here on the road - but at this point, I think I'm most interested in a date that doesn't involve keeping watch for all sorts of things that want to kill me and whoever I am with.}|{encounters == 4 and not charDeath.charThree and not charAbandon.charThree:{charThreeName}:One fun thing about the apocalypse is not having to figure out being poly.  People don't ask too much about dating when you stitching up their wounds!"}|{encounters == 4 and not charDeath.charFour and not charAbandon.charFour:{charFourName}:You know, it's kind of cool that nobody worries about dating in the apocalypse - though it would be nice to be worried abotu a date for a change instead of what we will meet on the road.}} # CLASS: teamnotes

{~{encounters == 3 and not charDeath.charOne and not charAbandon.charOne:{charOneName}:It's funny... whenever I played video games about the apocalypse, I always liked the ones with zombies and aliens the most. Like, they always seemed the most fun and over the top, and I could never take them seriously, which is why I enjoyed then.  Now I wish I had been paying more attention!}|{encounters == 3 and not charDeath.charTwo and not charAbandon.charTwo:{charTwoName}:One thing that amazes me is that people still find the time to try to rob one another even with all this destruction around - I mean, there are literally robot death squads roaming the earth and groups of bandits still get together and try to steal from us.  And everyone wonders why I liked getting away from all the people and machines.}|{encounters == 3 and not charDeath.charThree and not charAbandon.charThree:{charThreeName}:I can't believe there are robots AND zombies out here trying to kill us! One tireless, unstoppable, murderous horde of enemies wasn't enough for this apocalypse?!?}|{encounters == 3 and not charDeath.charFour and not charAbandon.charFour:{charFourName}:I wonder why the bandits are always trying to rob us?  You would think that they might try to steal some laser rifles or spaceships from the aliens or something. Then again, it might be tough to rob extraterrestrial beings with a shotgun.}} # CLASS: teamnotes

{encounters == 2:You have gotten reports that a deadly storm could be in the area.  You should chat with the team to be sure you have a good plan in place, since these storms can be deadly.} #CLASS: playernotes

{encounters == 1:You have gotten reports that a giant monster could be in the area.  You might want to chat with the team and be sure you know enough about them to form a decent plan.} #CLASS: playernotes

+Talk to the members of the party. # CLASS: playernotes //This choice goes to the "chat" section of the game, so if you are interested in modifying the game's dialogue and story, you will want to look at that section.
->partyChat

+Give the party directions to the next landmark on the road! # CLASS: playernotes # CLEAR // This choice goes to the "encounters" section of the game, so if you are interested in modifying the gameplay of the game, you will want to look at that section.
->encounters

==charDeath //This knot contains most of the functionality necessary for handling and keeping track of character deaths. If you want to add a new character to the game or change the way character death works you will need to edit the content here.

    =randCharDeath //This stitch is used to produce a random character death when neccessary.


    {~->charOneCheck|->charTwoCheck|->charThreeCheck|->charFourCheck} //This is a "shuffle." You can create one using "{~someText|someMoreText|evenMoreText|...}" and they allow for randomization - a shuffle will randomly pick one of the options inside it. In this example there is a shuffle with four diverts inside it - so this shuffle will randomly divert to either the Char1Check, Char2Check, Char3Check, or Char4Check stitch. 

    =charOneCheck //These stitches are used to check if the relevant character is already gone or dead before moving on to the death sequence.

    {not charAbandon.charOne and not charOne:->charOne|->randCharDeath} //You can use "not" in your code to check if a certain condition has NOT been met and then do things based on that: for example, here the game checks to see if the character is still alive before the game kills that character.

    =charTwoCheck

    {not charAbandon.charTwo and not charTwo:->charTwo|->randCharDeath}

    =charThreeCheck

    {not charAbandon.charThree and not charThree:->charThree|->randCharDeath}

    =charFourCheck

    {not charAbandon.charFour and not charFour:->charFour|->randCharDeath}


    =charOne //These stitches kill various characters and also keep track of the fact that they are dead.

    ~charsLost = charsLost + 1 //You can change the value of a variable you have already created using the "~" symbol.  An "=" sign will allow you to tell the game what the new value should be.  In this example, the code sets the value of the CharsLost variable to a new value that is 1 higher than the previous value so the game can track how many characters have been lost or killed.

    Unfortunately things did not go well and {charOneName} has been killed in the encounter with the {TURNS_SINCE(->encounters.bandits) == 1:bandits}{TURNS_SINCE(->encounters.robots) == 1:robots}{TURNS_SINCE(->encounters.zombies) == 1:zombies}{TURNS_SINCE(->encounters.aliens) == 1:aliens}{TURNS_SINCE(->encounters.monster) == 1:monster}{TURNS_SINCE(->encounters.climate) == 1:ice storm}. # CLASS: blue //This is a "TURNS_SINCE," a special kind of conditional. They can be created in a few ways, but the basic format is something like "{TURNS_SINCE(-> knotName.StichName) == X}" and they allow you to check how many choices the user has made since they have been to a particular knot or stitch. In this example, the game displays the text only if the player has made exactly one choice since visiting the encounters section of the game. This allows the game to track which encounter just happened and pull up the appropriate text, so if you add new encounters you will need to modify this code.

    ->gameStructure

    =charTwo

    ~charsLost = charsLost + 1

    Unfortunately things did not go well and {charTwoName} has been killed in the encounter with the {TURNS_SINCE(->encounters.bandits) == 1:bandits}{TURNS_SINCE(->encounters.robots) == 1:robots}{TURNS_SINCE(->encounters.zombies) == 1:zombies}{TURNS_SINCE(->encounters.aliens) == 1:aliens}{TURNS_SINCE(->encounters.monster) == 1:monster}{TURNS_SINCE(->encounters.climate) == 1:ice storm}. # CLASS: green

    ->gameStructure

    =charThree

    ~charsLost = charsLost + 1

    Unfortunately things did not go well and {charThreeName} has been killed in the encounter with the {TURNS_SINCE(->encounters.bandits) == 1:bandits}{TURNS_SINCE(->encounters.robots) == 1:robots}{TURNS_SINCE(->encounters.zombies) == 1:zombies}{TURNS_SINCE(->encounters.aliens) == 1:aliens}{TURNS_SINCE(->encounters.monster) == 1:monster}{TURNS_SINCE(->encounters.climate) == 1:ice storm}. # CLASS: orange

    ->gameStructure

    =charFour

    ~charsLost = charsLost + 1

    Unfortunately things did not go well and {charFourName} has been killed in the encounter with the {TURNS_SINCE(->encounters.bandits) == 1:bandits}{TURNS_SINCE(->encounters.robots) == 1:robots}{TURNS_SINCE(->encounters.zombies) == 1:zombies}{TURNS_SINCE(->encounters.aliens) == 1:aliens}{TURNS_SINCE(->encounters.monster) == 1:monster}{TURNS_SINCE(->encounters.climate) == 1:ice storm}. # CLASS: purple

    ->gameStructure

==charAbandon //This knot contains most of the functionality necessary for handling and keeping track of character abandons. It works basically the same way as the random death system, so if you add another character to the game you will need to modify this code as well.

    =randCharAbandon //This stitch is used to produce a random character abandon when neccessary.

    {~->charOneCheck|->charTwoCheck|->charThreeCheck|->charFourCheck}

    =charOneCheck

    {not charDeath.charOne and not charOne:->charOne|->randCharAbandon}

    =charTwoCheck

    {not charDeath.charTwo and not charTwo:->charTwo|->randCharAbandon}

    =charThreeCheck

    {not charDeath.charThree and not charThree:->charThree|->randCharAbandon}

    =charFourCheck

    {not charDeath.charFour and not charFour:->charFour|->randCharAbandon}

    =charOne //These stitches have various characters abandon the group and also keep track of the fact that they did so.

    ~charsLost = charsLost + 1

    {charOneName} got separated from the group. # CLASS: blue

    ->gameStructure

    =charTwo

    ~charsLost = charsLost + 1

    {charTwoName} got separated from the group. # CLASS: green

    ->gameStructure

    =charThree

    ~charsLost = charsLost + 1

    {charThreeName} got separated from the group. # CLASS: orange

    ->gameStructure

    =charFour

    ~charsLost = charsLost + 1

    {charFourName} got separated from the group. # CLASS: purple

    ->gameStructure

==abilities //This knot is used to keep track of character abilities - i.e. how good or bad at a particular scenario the character is.  The stitches inside are accesed during encounters when the player chooses to use a certain character.  Individual success chances, text, and other stuff can be quickly edited here and new encounters can be easily added if you are interested in modifying that kind of content You can see examples of how to create new character abilities here as well. If you make a new character or a new encounter you will need to edit this content.

//Note that I built the game so that talking to the characters can improve success chances on the encounters: for example, learning a character's backstory gives a slightly better chance on certain encounters, and learning more about the team in general can improve success chances on the "monster" and "climate" encounters, which no individual team member is good at. This design encourages players to explore the narrative and talk to the characters instead of simply replaying the encounters over and over to learn the team's strengths and weaknesses. If you modify the character abilities, you might also want to modify how the chat system works as well.

    =charOne

    {TURNS_SINCE(-> encounters.bandits) == 1:{charOneName}'s diplomacy skills could be especially helpful in talking down the bandits.->results.good} # CLASS: blue 

    {charOneStoryHeard and TURNS_SINCE(->encounters.zombies) == 1:Knowing {charOneName}'s story might help you lead the group past the zombies.->results.story} # CLASS: blue

    {TURNS_SINCE(->encounters.zombies) == 1:{charOneName} tries to lead the group past the zombies.->results.moderate} # CLASS: blue

    {charOneStoryHeard and TURNS_SINCE(->encounters.aliens) == 1:Knowing {charOneName}'s backstory might help you lead the group past the aliens.->results.story} # CLASS: blue

    {TURNS_SINCE(->encounters.aliens) == 1:{charOneName} tries to lead the group past the aliens.->results.moderate} # CLASS: blue

    {TURNS_SINCE(->encounters.robots) == 1:{charOneName} has never been a big fan of working with machines.->results.bad} # CLASS: blue

    {totalChats > 5 and charsLost < 3 and TURNS_SINCE(->encounters.monster) == 1:Knowing more about the team might help you use {charOneName}'s strengths along with those of the other teammates to get past the monster.->results.story} # CLASS: blue

    {TURNS_SINCE(->encounters.monster) == 1:{charOneName} tries to lead the group past the monster, but unfortunately, there are no great choices for dealing with monsters on one's own.->results.moderate} # CLASS: blue

    {TURNS_SINCE(->encounters.climate) == 1:{charOneName} tries to lead the group past the giant storm, but there is no good way of dealing with the problem.->results.bad} # CLASS: blue

    {totalChats > 11 and charsLost < 3 and TURNS_SINCE(->encounters.climate) == 1:The storm is devastating, but knowing so much about the team might help you and {charOneName} come up with a decent plan for getting past it using teamwork.->results.moderate} # CLASS: blue

    {TURNS_SINCE(->encounters.climate) == 1:{charOneName} tries to lead the group past the giant storm, but there is no good way of dealing with the problem.->results.bad} # CLASS: blue

    =charTwo

    {charTwoStoryHeard and TURNS_SINCE(-> encounters.bandits) == 1:Knowing {charTwoName}'s backstory might help you lead the group past the bandits.->results.story} # CLASS: green

    {TURNS_SINCE(-> encounters.bandits) == 1:{charTwoName} tries to lead the group past the bandits.->results.moderate} # CLASS: green

    {TURNS_SINCE(-> encounters.zombies) == 1:{charThreeName}'s stealth skills could be especially helpful in slipping past these zombies.->results.good} # CLASS: green

    {TURNS_SINCE(-> encounters.aliens) == 1:{charTwoName} has always been afraid of aliens.->results.bad} # CLASS: green

    {charTwoStoryHeard and TURNS_SINCE(-> encounters.robots) == 1:Knowing {charTwoName}'s backstory might help you lead the group past the robots.->results.story} # CLASS: green

    {TURNS_SINCE(-> encounters.robots) == 1:{charTwoName} tries to lead the group past the robots.->results.moderate} # CLASS: green

    {totalChats > 5 and charsLost < 3 and TURNS_SINCE(->encounters.monster) == 1:Knowing more about the team might help you use {charTwoName}'s strengths along with those of the other teammates to get past the monster.->results.story} # CLASS: green

    {TURNS_SINCE(-> encounters.monster) == 1:{charTwoName} tries to lead the group past the monster, but unfortunately, there are no great choices for dealing with monsters on one's own.->results.moderate} # CLASS: green

    {totalChats > 11 and charsLost < 3 and TURNS_SINCE(->encounters.climate) == 1:The storm is devastating, but knowing so much about the team might help you and {charTwoName} come up with a decent plan for getting past it using teamwork.->results.moderate} # CLASS: green

    {TURNS_SINCE(-> encounters.climate) == 1:{charTwoName} tries to lead the group past the giant storm, but there is no good way of dealing with the problem.->results.bad} # CLASS: green

    =charThree

    {TURNS_SINCE(-> encounters.bandits) == 1:{charThreeName} has never been good with people.->results.bad} # CLASS: orange

    {charThreeStoryHeard and TURNS_SINCE(-> encounters.zombies) == 1:Knowing {charThreeName}'s backstory might help you lead the group past the zombies.->results.story} # CLASS: orange

    {TURNS_SINCE(-> encounters.zombies) == 1:{charThreeName} tries to lead the group past the zombies.->results.moderate} # CLASS: orange

    {TURNS_SINCE(-> encounters.aliens) == 1:{charThreeName} studies the aliens' biology, coming up with a simple chemical that could render them unconcious harmlessly.->results.good} # CLASS: orange

    {charThreeStoryHeard and TURNS_SINCE(-> encounters.robots) == 1:Knowing {charThreeName}'s backstory might help you lead the group past the robots.->results.story} # CLASS: orange

    {TURNS_SINCE(-> encounters.robots) == 1:{charThreeName} tries to lead the group past the robots.->results.moderate} # CLASS: orange

    {totalChats > 5 and charsLost < 3 and TURNS_SINCE(->encounters.monster) == 1:Knowing more about the team might help you use {charThreeName}'s strengths along with those of the other teammates to get past the monster.->results.story} # CLASS: orange

    {TURNS_SINCE(-> encounters.monster) == 1:{charThreeName} tries to lead the group past the monster, but unfortunately, there are no great choices for dealing with monsters on one's own.->results.moderate} # CLASS: orange

    {totalChats > 11 and charsLost <3 and TURNS_SINCE(->encounters.climate) == 1:The storm is devastating, but knowing so much about the team might help you and {charThreeName} come up with a decent plan for getting past it using teamwork.->results.moderate} # CLASS: orange

    {TURNS_SINCE(-> encounters.climate) == 1:{charThreeName} tries to lead the group past the giant storm, but there is no good way of dealing with the problem.->results.bad} # CLASS: orange

    =charFour

    {charFourStoryHeard and TURNS_SINCE(-> encounters.bandits) == 1:Knowing {charFourName}'s backstory might help you lead the group past the bandits.->results.story} # CLASS: purple

    {TURNS_SINCE(-> encounters.bandits) == 1:{charFourName} tries to lead the group past the bandits.->results.moderate} # CLASS: purple

    {TURNS_SINCE(-> encounters.zombies) == 1:{charFourName} has always been afraid of zombies.->results.bad} # CLASS: purple

    {charFourStoryHeard and TURNS_SINCE(-> encounters.aliens) == 1:Knowing {charFourName}'s backstory might help you lead the group past the aliens.->results.story} # CLASS: purple

    {TURNS_SINCE(-> encounters.aliens) == 1:{charFourName} tries to lead the group past the aliens.->results.moderate} # CLASS: purple

    {TURNS_SINCE(-> encounters.robots) == 1:{charFourName} has always been good with machines, and could help try to hack the robots.->results.good} # CLASS: purple

    {totalChats > 5 and charsLost < 3 and TURNS_SINCE(->encounters.monster) == 1:Knowing more about the team might help you use {charFourName}'s strengths along with those of the other teammates to get past the monster.->results.story} # CLASS: purple

    {TURNS_SINCE(-> encounters.monster) == 1:{charFourName} tries to lead the group past the monster, but unfortunately, there are no great choices for dealing with monsters on one's own.->results.moderate} # CLASS: purple

    {totalChats > 11 and charsLost < 3 and TURNS_SINCE(->encounters.climate) == 1:The storm is devastating, but knowing so much about the team might help you and {charFourName} come up with a decent plan for getting past it using teamwork.->results.moderate} # CLASS: purple

    {TURNS_SINCE(-> encounters.climate) == 1:{charFourName} tries to lead the group past the giant storm, but there is no good way of dealing with the problem.->results.bad} # CLASS: purple

    =guyMcMannis //Using Guy McMannis' ability always causes another character to abandon the team. It works the same way every time to encourage the player not to use it and to instead explore nonviolent ways of resolving the game's encounters that the other characters are good at. Using it repeatedly leads to the "bad" ending.

    "I will save us all!" shouts Guy McMannis, drawing his guns and charging into the fray.  In the ensuing chaos... # CLASS: red

    ->charAbandon.randCharAbandon

==results  //This knot is used to generate the results using various character abilities.  Good results give a 3/4 chance of surviving with no character death; Moderate give a 50% chance; Bad give a 25% chance.  Chatting with the characters gives the player hints at which choices are good vs. bad and improves their chances of success in  many situations. The "backstory" result is used in special situations and rewards the player for learning more about the team.  You can easily tweak success chances or add new categories here.

    =good

    Good choice! # CLASS: good

    {~->noDeaths|->noDeaths|->noDeaths|->charDeath.randCharDeath}

    =story

    Knowing more about the team made this a better than average choice! # CLASS: backstory

    {~->noDeaths|->noDeaths|->noDeaths|->charDeath.randCharDeath|->charDeath.randCharDeath}

    =moderate

    An okay choice. # CLASS: okay

    {~->noDeaths|->noDeaths|->charDeath.randCharDeath|->charDeath.randCharDeath}

    =bad

    A bad choice. # CLASS: bad

    {~->noDeaths|->charDeath.randCharDeath|->charDeath.randCharDeath|->charDeath.randCharDeath}

    =noDeaths

    No one died! # CLASS: playernotes

    ->gameStructure

==encounters //This knot is used to create and keep track of encounters.  Most of the logic for the encounters is handled inside of stitches inside of this knot, but having this knot allows the game to track how many encounters have taken place. It also allows for the easy addition of more random encounters or even different random encounter generators if you want to make those kinds of modifications.

~charOneChatted = false //These reset the "chat" variables so that the player can talk to the party again. The player can talk to each character once but then the player has to do an encounter before chatting with the characters again.
~charTwoChatted = false
~charThreeChatted = false
~charFourChatted = false

->randEncounter

    =randEncounter //This code produces random encounters. I nested this code inside of a stich so that it would be easy to add new random encounter generators or modify this one. You can create a new randEncounter stitch, copy this code, modify it, and then send the player to the new stitch you created to create an entirely different encounter system.

    {~You receive a message from the group!|A notification from the team has just come in!|The survivors are trying to contact you!} # CLASS: teamnotes

    Hey, we have run into some trouble on the road and need your advice! <>  # CLASS: teamnotes 

    {encounters == 8:{~->bandits|->zombies|->aliens|->robots|->climate|->climate|->climate|->climate}} //This code keeps track of which encounter the player is on and then produces an appropriate random encounter based on that. It shows off one important function of Ink - you can "nest" almost anything inside of anything else! So in this example, I have a conditional with a shuffle nested inside of it, which means the shuffle won't happen unless the condition is met. If you want to mod the game, you can use this functionality to create all sorts of different gameplay and narrative content!
    {encounters == 7:{~->bandits|->zombies|->aliens|->robots|->monster|->monster|->climate|->climate}}
    {encounters == 6:{~->bandits|->zombies|->aliens|->robots|->monster|->monster|->monster|->monster}}
    {encounters == 5:{~->bandits|->zombies|->aliens|->robots|->monster|->monster}}
    {encounters == 4:{~->bandits|->zombies|->aliens|->robots|->climate}}
    {encounters == 3:{~->bandits|->zombies|->aliens|->robots|->monster|->climate}}
    {encounters == 2:{~->bandits|->zombies|->aliens|->robots|->monster}}
    {encounters == 1:{~->bandits|->zombies|->aliens|->robots}} 

    =bandits //These stitches are the actual individual encounters, so if you want to add new encounters you can add new stitches here and then send the player to those stitches.

    We have been held up by a group of well-armed bandits who are trying to rob the team! # CLASS: teamnotes
    ->encounterController 

    =zombies

    We have come across a giant horde of flesh-eating zombies who could easily devour someone! # CLASS: teamnotes
    ->encounterController 

    =aliens

    We have run into an invasion team of aliens who are trying to abduct one of us for experimentaton! # CLASS: teamnotes
    ->encounterController 

    =robots

    We have encountered a robot extermination squad who want to kill all humans! # CLASS: teamnotes
    ->encounterController 

    =monster

    We aren't sure what to do about things this time - an enormous, unstoppable monster is blocking our path! # CLASS: teamnotes
    ->encounterController

    =climate
 
    We are in a really bad situation - we have come across an impassible ice storm that could easily freeze us all! # CLASS: teamnotes
    ->encounterController 
 
    =encounterController //This is where you choose which character you want to use in the encounter.  If you want to add new characters or abilities you will need to modify this code; you also need to modify the abilities section of the code.

    What advice do you have for the team? # CLASS: playernotes

    +{not charDeath.charOne and not charAbandon.charOne}<p style = "color:skyblue;">Advise {charOneName} to use {charOnePossessiveAdj} conversation skills to help deal with the situation.</p> # CLASS: blue
    ->abilities.charOne//This is a "conditional choice" - the user can only make the choice if the user meets the appropriate condition. In this example, the user must NOT have been to the CharacterDeath.Char1 or CharacterAbandoned.Char1 stitches - if the user has been to those stitches, the choice is unavailable because that character is dead.

    +{not charDeath.charTwo and not charAbandon.charTwo}<p style = "color:lightgreen;">Advise {charTwoName} to use {charTwoPossessiveAdj} stealth skills to help deal with the situation.</p> # CLASS: green
    ->abilities.charTwo

    +{not charDeath.charThree and not charAbandon.charThree}<p style = "color:yellow;">Advise {charThreeName} to use {charThreePossessiveAdj} medical skills to help deal with the situation.</p> # CLASS: orange
    ->abilities.charThree

    +{not charDeath.charFour and not charAbandon.charFour}<p style = "color:violet;">Advise {charFourName} to use {charFourPossessiveAdj} technology skills to help deal with the situation.</p> # CLASS: purple
    ->abilities.charFour

    +<p style = "color:red;">Advise Guy McMannis' to use his superior firepower to handle things, which is clearly the right choice!</p> # CLASS: red
    ->abilities.guyMcMannis

==partyChat //The next section holds logic that controls who the player can talk to.  The stitch for Guy McMannis' chats are in this section because he only has one which is based on whether or not the player has used his ability yet.  Chats for the other characters are held in their own knots so that stitches within each knot can help to organize the chat flow. If you want to modify the game's dialogue, this is where you should be looking! If you add another character you can copy this code to create that character's dialogue.

    You decide to take some time to chat with the members of the team and find out  more about them before they set out for the next bunker. # CLASS: playernotes

    +{not charDeath.charOne and not charAbandon.charOne}{not charOneChatted}<p style = "color:skyblue;">Chat with {charOneName}.</p>  # CLASS: blue 
    ->charOneChats  

    +{not charDeath.charTwo and not charAbandon.charTwo}{not charTwoChatted}<p style = "color:lightgreen;">Chat with {charTwoName}.</p>  # CLASS: green
    ->charTwoChats

    +{not charDeath.charThree and not charAbandon.charThree}{not charThreeChatted}<p style = "color:yellow;">Chat with {charThreeName}.</p>  # CLASS: orange
    ->charThreeChats

    +{not charDeath.charFour and not charAbandon.charFour}{not charFourChatted}<p style = "color:violet;">Chat with {charFourName}.</p> # CLASS: purple
    ->charFourChats

    +<p style = "color:red;">Chat with GuyMcMannis.</p> # CLASS: red
    ->partyChat.guyMcMannis

    +Continue along the road! # CLASS: playernotes # CLEAR
    ->encounters

    =guyMcMannis

    {abilities.guyMcMannis:"Good to see you made the right choice in letting me handle things!"} #CLASS: red
    {not abilities.guyMcMannis:"Hmm, seems like you are a bit of a coward... maybe you should try having me lead the group next time!"} # CLASS: red
    ->partyChat

==charOneChats //Knots, stitches, and logic for each party member's chats can be found below.  Chats reveal backstory about the character as well as have give some hints about the encounters they might be good or bad at. If you want to add additional characters or chat content you can modify the code below.

~charOneChatted = true

  {charOneStrongHeard:{charOneWeakHeard:{charOneStoryHeard:You have finished {charOneName}'s chats!->partyChat}}}

+Message {charOneName} and chat. # CLASS: playernotes
->charOneRandChat

+Talk to someone else. # CLASS: playernotes
->partyChat

    =charOneRandChat //This stitch determines whether or not the character is in the mood to chat. It uses a shuffle that gives the player a 75% chance to talk to the character and a 25% chance the the character will not be interested at the time.

    {~->randYes|->randYes|->randYes|->randNo}

    =randNo

    {charOneName} is not in the mood for chatting right now. # CLASS: blue
    ->partyChat

    =randYes //This logic produces a random chat that the player has not seen yet for that character. If you add a new character you can copy this code to easily do the same for that character, but if you add new chats for the characters you will have to modify how this logic works.
    
    {charOneStrongHeard and charOneWeakHeard and not charOneStoryHeard: ->charOneStory}
    {charOneStrongHeard:->charOneWeak}
    {charOneWeakHeard:->charOneStrong}
    {not charOneStrongHeard and not charOneWeakHeard:{~->charOneStrong|->charOneWeak|}}
 

    =charOneStrong //The "strong" chat for each character tells you what they are good at.

    ~charOneStrongHeard = true
    ~totalChats = totalChats + 1

    You start chatting with {charOneName}. After a short conversation, you ask {charOneObject} to tell you a bit more about {charOnePossessiveAdj} strengths to get a sense for how {charOneSingular} might lead the team best in a dangerous situation. # CLASS: playernotes

    {charOneName}:# CLASS: blue 
    "Hmm... well I haven't always liked talking to people, but I'd say that is my biggest strength. I found out I was good at it when I took a insurance sales job right out of college... my History degree wasn't bringing in any paychecks.  I was actually pretty talented at selling things to people even though I hated doing it."  #CLASS: blue

        +You ask {charOneObject} what happened when the apocalypse hit. # CLASS: playernotes

        {charOneName}:# CLASS: blue 
        "Well, I had quit my job and gone back to grad school just a year before the apocalypse hit, and after going to a few academic conferences, I found I actually liked talking to people when it was about something I was passionate about." # CLASS: blue
        ->partyChat

    =charOneWeak //The "weak" chat for each character tells you what they are bad at.

    ~charOneWeakHeard = true
    ~totalChats = totalChats + 1

    You start chatting with {charOneName}. After a short conversation, you ask {charOneObject} to tell you a bit more about {charOnePossessiveAdj} weaknesses so that you can try to keep the team safe on the road by avoiding them. # CLASS: playernotes

    {charOneName}:# CLASS: blue 
    "I have always hated working with machines... even talking to you on this thing isnt really my favorite.  I'm pretty sure it came from growing up... my dad loved to work on cars and always tried to get me interested, but after several failed attempts to learn - and lots of yelling matches with him - I decided I was better off just taking my car to a mechanic and being done with it."  #CLASS: blue

        +You ask {charOneObject} about the robot extermination squads. # CLASS: playernotes

        {charOneName}:# CLASS: blue 
        "Yeah, I don't really like working with any kind of machines... I don't even particularly like working with computers, though I eventually learned my way around them out of necessity. So let's keep me away from the killer robots." # CLASS: blue
        ->partyChat

    =charOneStory //The "backstory" chat for each character gives some background about each character - it usually focuses on how they grew up and their views on relationships, gender, and sexuality. This chat won't show up until the player has already heard the character's strengths and weaknesses- the idea is that the characters don't share these more intimate details until they trust the player more. 

    ~charOneStoryHeard = true
    ~totalChats = totalChats + 1

    You start chatting with {charOneName}. After a short conversation, you ask {charOneObject} to tell you a bit more about {charOnePossessiveAdj} life to get a sense for how {charOneSingular} might fit into the community. Since you have already chatted quite a bit with {charOneName}, {charOneSingular} is willing to talk more about {charOnePossessiveAdj} personal life.  # CLASS: playernotes

    {charOneName}:# CLASS: blue 
    "I grew up pretty happy... I got along with my parents, did well in school, and had plenty of hobbies. I didn't necessarily have a lot of friends, but I was very close with the ones that I did have. People were sometimes surprised that I was kind of shy and quiet when I was younger because talking to people was such a big part of my job." #CLASS: blue  
    
        +You ask {charOneObject} about their relationships.
    
        "Relationships were the one thing I always had trouble figuring out. I never felt like I was attracted to anyone until I got to know them closely, and never felt like I looked at women the same way as other guys. I struggled with things like dating and thought it was just anxiety or being shy, and it took me awhile to figure out that there was a word for what I was, mostly because things like "asexual" and "demisexual" weren't talked about much until recently." #CLASS: blue

            ++You ask {charOneObject} how things are now. # CLASS: playernotes

            {charOneName}:# CLASS: blue 
            
            "Well, when the apocalypse happened it actually made that kind of stuff easier for me... people were less worried about dating and sex when death was around every corner. It's kind of nice not having to worry about those things as much anymore, though it would still be better if everything wasn't trying to kill us." # CLASS: blue
                ->partyChat

==charTwoChats

~charTwoChatted = true

{charTwoStrong:{charTwoWeak:{charTwoStory:You have finished {charTwoName}'s chats!->partyChat}}} # CLASS: green

+Message {charTwoName} and chat. # CLASS: playernotes
->charTwoRandomChat

+Talk to someone else. # CLASS: playernotes
->partyChat

    =charTwoRandomChat

    {~->randYes|->randYes|->randYes|->randNo}

    =randNo

    {charTwoName} is not in the mood for chatting right now. # CLASS: green
    ->partyChat

    =randYes

    {charTwoStrongHeard and charTwoWeakHeard and not charTwoStoryHeard: ->charTwoStory}
    {charTwoStrongHeard:->charTwoWeak}
    {charTwoWeakHeard:->charTwoStrong}
    {not charTwoStrongHeard and not charTwoWeakHeard:{~->charTwoStrong|->charTwoWeak|}}
 

    =charTwoStrong

    ~charTwoStrongHeard = true
    ~totalChats = totalChats + 1

    You start chatting with {charTwoName}. After a short conversation, you ask {charTwoObject} to tell you a bit more about {charTwoPossessiveAdj} strengths to get a sense for how {charTwoSingular} might lead the team best in a dangerous situation. # CLASS: playernotes

    {charTwoName}:# CLASS: green
    "When I was really young, I enjoyed hunting with my dad because it was a way that we could spend time together out in nature. It was one of our favorite things in the world.  When I got a little older I started to question what we were doing, and once I did, I decided I couldn't hurt another animal. I still remembers the arguements with my dad when I told him I was vegan. I loved being out in nature, though, and if I'm honest, I even can't shake the thrill of hunting and stalking an animal.  So I honed my sneaking skills while working as a cameraperson for nature documentaries, and I actually became an expert at sneaking around in the forest and even at keeping a crew full of people with equipment quiet." #CLASS: green

        +You ask {charTwoObject} what happened next. # CLASS: playernotes

        {charTwoName}: #CLASS: green
        "My work had recently been featured on several famous nature documentaries, and my career was really starting to pick up.  Of course, that was when the world ended and everything in nature either died or started trying to kill you. Oh well, at least my sneaking skills turned out to be even more useful once that happened!" # CLASS: green
            ->partyChat

    =charTwoWeak

    You start chatting with {charTwoName}. After a short conversation, you ask {charTwoObject} to tell you a bit more about {charTwoPossessiveAdj} weaknesses so that you can try to keep the team safe on the road by avoiding them. # CLASS: playernotes

    ~charTwoWeakHeard = true
    ~totalChats = totalChats + 1

    {charTwoName}:# CLASS: green
    "I'd always been terrified of aliens, even before the apocalypse - the concept of extraterrestrial beings always freaked me out, even when I was a kid. I don't know what it was about them, but I had nightmares about alien invasions after seeing my first sci fi movie, and I did my best to avoid anything of the sort afterwards." #CLASS: green

        +You ask {charTwoObject} why aliens scare her so much. # CLASS: playernotes

        {charTwoName}: #CLASS: green
        "I think the idea of creatures from another planet always seemed to come with the concept of the end of the world to me, and that was something that I had always been scared of too. I'd always had a weird hunch that I would actually end up seeing it.  When the spaceships finally showed up alongside an everythng else in the apocalpse, all of my worst fears had been recognized." # CLASS: green
            ->partyChat

    =charTwoStory

    ~charTwoStoryHeard = true
    ~totalChats = totalChats + 1

    You start chatting with {charTwoName}. After a short conversation, you ask {charTwoObject} to tell you a bit more about {charTwoPossessiveAdj} life to get a sense for how {charTwoSingular} might fit into the community. Since you have already chatted quite a bit with {charTwoName}, {charTwoSingular} is willing to talk more about {charTwoPossessiveAdj} personal life. # CLASS: playernotes

    {charTwoName}:# CLASS: green 
    "My life was pretty relaxed growing up - we lived out in the country, and I had a lot of freedom to do what I wanted out there. Even though I liked being out in nature, I got along pretty well with people and had a lot of friends: as you can probably tell, I like to talk!" #CLASS: green
    
        +You ask {charTwoObject} about their relationships. #CLASS: playernotes
    
        "Dating was always weird to me - I'd never really understood the idea of only being attracted to one particular gender or kind of person and never really got why other people thought that was how it was supposed to be. I developed strong feelings for all kinds of people over the years, and some times it made dating hard, though I also had lots of great relationships." #CLASS: green 

            ++You ask {charTwoObject} how things are now. # CLASS: playernotes

            "It's actually easier in some ways! Sometimes it was tricky to explain things to people before. I came out as pansexual to my family first since I thought they would have a lot of questions, but my mom and dad both just accepted it and thankfully spared me the interrogation. Their acceptance really helped me and I don't feel like I have to hide it anymor -  and now that the apocalypse has happened, people don't seem to care as much about who you want to date anyway!"  # CLASS: green
                ->partyChat

==charThreeChats

~charThreeChatted = true

{charThreeStrong:{charThreeWeak:{charThreeStory:You have finished {charThreeName}'s chats!->partyChat}}}

+Message {charThreeName} and chat. # CLASS: playernotes
->charThreeRandChat

+Talk to someone else. # CLASS: playernotes
->partyChat

    =charThreeRandChat

    {~->randYes|->randYes|->randYes|->randNo}

    =randNo

    {charThreeName} is not in the mood for chatting right now. # CLASS: orange
    ->partyChat

    =randYes
   
    {charThreeStrongHeard and charThreeWeakHeard and not charThreeStoryHeard: ->charThreeStory}
    {charThreeStrongHeard:->charThreeWeak}
    {charThreeWeakHeard:->charThreeStrong}
    {not charThreeStrongHeard and not charOneWeakHeard:{~->charThreeStrong|->charThreeWeak|}}


    =charThreeStrong

    ~charThreeStrongHeard = true
    ~totalChats = totalChats + 1

    You start chatting with {charThreeName}. After a short conversation, you ask {charThreeObject} to tell you a bit more about {charThreePossessiveAdj} strengths to get a sense for how {charThreeSingular} might lead the team best in a dangerous situation. # CLASS: playernotes

    {charThreeName}: # CLASS: orange
    "When I was a kid, I always wanted to be a doctor! I idolized the idea of a career in medicine and knew that was what I wanted to do. I took all the science classes I could, volunteered at hospitals as a teenager, and then went straight into a pre-med chemistry program in college. If I am honest, I was great at my work and most things about medicine just seemed to come naturally to me." #CLASS: orange 

        +You ask how {charThreePossessiveAdj} career went. # CLASS: playernotes

        {charThreeName}: # CLASS: orange
        "I had gotten into one of the top med schools in the country and had done great there... so of course, I had just finished clinicals was looking forward to starting my career when the apocalypse hit. I've been helping and healing people ever since, and I've only gotten better at it as time has passed, though mostly out of necessity: nothing hones your skills like the apocalypse!" # CLASS: orange
            ->partyChat

    =charThreeWeak

    ~charThreeWeakHeard = true
    ~totalChats = totalChats + 1

    You start chatting with {charThreeName}. After a short conversation, you ask {charThreeObject} to tell you a bit more about {charThreePossessiveAdj} weaknesses so that you can try to keep the team safe on the road by avoiding them. # CLASS: playernotes

    {charThreeName}: # CLASS: orange
    "Though I was great at almost everything related to being a doctor, there was one thing I always had trouble with - talking to patients. Despite everything I tried, I had a terrible bedside manner. It wasn't necessarily that I hated talking to people or even that my patients didn't like me. It was hard for me to convince patients to do things because I couldn't see why someone wouldn't just take my advice!" # CLASS: orange

        +You ask if {charThreeSingular} should avoid negotiating with bandits. # CLASS: playernotes

        {charThreeName}: # CLASS: orange
        "Yeah, negotiation is not my strong suit. Whenever it came time to tell a patient what they needed to do, it always came across as if I was giving my patients orders or preaching at them, and the patients usually became resistant. I prefer to let others do the talking whenver I can, so I shouldn't be the one chatting up a group of murderous bandits." # CLASS: orange
            ->partyChat

    =charThreeStory

    ~charThreeStoryHeard = true
    ~totalChats = totalChats + 1

    You start chatting with {charThreeName}. After a short conversation, you ask {charThreeObject} to tell you a bit more about {charThreePossessiveAdj} life to get a sense for how {charThreeSingular} might fit into the community. Since you have already chatted quite a bit with {charThreeName}, {charThreeSingular} is willing to talk more about {charThreePossessiveAdj} personal life. # CLASS: playernotes

    {charThreeName}:# CLASS: orange 
    "I had a good childhood - I didn't always have many friends when I was younger because I was a bit bossy, but I worked on that as I got older and was close with a lot of people. My moms always encouraged me to express myself in lots of ways, and when I became a teenager and started to explore my relationship to gender they were ver much there for me. After doing some reading online I realized that I was nonbinary." #CLASS: orange

        +You ask about {charThreePossessiveAdj} experience with relationships. # CLASS: playernotes

        {charThreeName}: # CLASS: orange
        "At first, I struggled with relationships, mostly because monogamy never seemed to work for me. By 21, I knew that I didn't conform to the "standard" rules of relationships either  - the idea of limiting your love to just one person didn't seem to make sense. Once I started exploring polyamory, I knew it was what worked for me, and I had several great relationships." # CLASS: orange
                
                ++You ask {charThreeObject} how things are now. #CLASS: playernotes
                
                "When the world ended things were hard for me at first: I felt like I had finally figured things out, and then suddnely almost everyone I knew was dead and gone.  Now I have learned not to worry about it as much, though it would be nice to get away from all the death once in awhile." # CLASS: orange
                    ->partyChat

==charFourChats

~charFourChatted = true

{charFourStrong:{charFourWeak:{charFourStory:You have finished {charFourName}'s chats!->partyChat}}} # CLASS: green

+Message {charFourName} and chat. # CLASS: playernotes
->charFourRandChat

+Talk to someone else. # CLASS: playernotes
->partyChat

    =charFourRandChat
   
    {~->randYes|->randYes|->randYes|->randNo}

    =randNo

    {charFourName} is not in the mood for chatting right now. # CLASS: purple
    ->partyChat

    =randYes

    {charFourStrongHeard and charFourWeakHeard and not charFourStoryHeard: ->charFourStory}
    {charFourStrongHeard:->charFourWeak}
    {charFourWeakHeard:->charFourStrong}
    {not charFourStrongHeard and not charFourWeakHeard:{~->charFourStrong|->charFourWeak|}}
    
    =charFourStrong

    ~charFourStrongHeard = true
    ~totalChats = totalChats + 1

    You start chatting with {charFourName}. After a short conversation, you ask {charFourObject} to tell you a bit more about {charFourPossessiveAdj} strengths to get a sense for how {charFourSingular} might lead the team best in a dangerous situation. # CLASS: playernotes

    {charFourName}:# CLASS: purple 
    "I started working with machines at a young age since mom and dad were both computer programmers and liked to work on machines and build computers for fun in their spare time. I always loved helping them put stuff together and figuring out how things worked and I was fascinated by software. I was coding by 8 years old and built my first computer by the time I was 10, and I kept up with it as a hobby all the way until college when I decided to go to school for video game design." #CLASS: purple  
    
        +You ask {charFourObject} how things went after the apocalypse. # CLASS: playernotes

        {charFourName}: # CLASS: purple
        "I had actually gone to work for a pretty big company and was working on their next big release when, all of the sudden, the end of the world happened. At first I figured a computer nerd like me wouldn't make it, but it turned out working with machines was pretty useful when killer robots suddely started roaming the earth." # CLASS: purple
        ->partyChat

    =charFourWeak

    ~charFourWeakHeard = true
    ~totalChats = totalChats + 1

    You start chatting with {charFourName}. After a short conversation, you ask {charFourObject} to tell you a bit more about {charFourPossessiveAdj} weaknesses so that you can try to keep the team safe on the road by avoiding them. # CLASS: playernotes

    {charFourName}:# CLASS: purple 
    "I never got everyone's fascination with the undead  - it was always weird to me. Frankly, the idea of things like zombies had always scared me a little bit, and I stayed away from a lot of video games because of it.  The idea of being eaten alive always freaked me out too, and I never liked dead bodies, much less ones that walked around, so the idea of them getting up, shambling about, and eating people really bothered me." #CLASS: purple  

        +You ask if the team should keep {charFourObject} away from any zombies. # CLASS: playernotes

        {charFourName}: #CLASS: purple
        "Definitely. Unluckily for me, zombies aren't fictional anymore - the apocalypse happened and they started walking around the earth for real. Maybe if I had known that was going to happen I'd have paid more attention to all those movies and shows and games. But it would be awesome if someone else could handle the flesh-eating corpses, if that's alright with you." # CLASS: purple
        ->partyChat

    =charFourStory

    ~charFourStoryHeard = true
    ~totalChats = totalChats + 1

    You start chatting with {charFourName}. After a short conversation, you ask {charFourObject} to tell you a bit more about {charFourPossessiveAdj} life to get a sense for how {charFourSingular} might fit into the community. Since you have already chatted quite a bit with {charFourName}, {charFourSingular} is willing to talk more about {charFourPossessiveAdj} personal life. # CLASS: playernotes # CLASS: playernotes

    {charFourName}:# CLASS: purple
    "I was always close with my parents while I was growing up. I was close with my wider family too, and some of my best friends were cousins. None of them seemed to mind when I began transitioning in high school - in fact, they were some of my strongest supporters! The only problems I had ever faced came from other people, but my family always had my back." #CLASS: purple
    
        +You ask about {charThreePossessiveAdj} experience with relationships. # CLASS: playernotes
        
        {charFourName}: # CLASS: purple
        "Relationships were tricky for me at first, but a lot of that was my fault: I can be a bit standoffish in person, though talking on the computer like this makes it easier for me. Online dating helped me a lot with that since I was more comfortable talking with people that way, and I had a few steady boyfriends before the world fell apart." # CLASS: purple

            ++You ask if things have been easier or harder since the apocalypse hit. # CLASS: playernotes

            {charFourName}: # CLASS: purple
            "Honestly, missing out on my love life hasn't been much of a big deal to me - losing my family during the apocalypse hit me much harder. At least they were spared the hell of trying to survive now. That being said, it seems like people care so much about survival that they aren't worried about anything like dating, so I guess it's gotten easier in some ways." # CLASS: purple
                ->partyChat

==endings //The game uses one big knot to keep track of endings with lots of stitches and conditionals inside.  This structure allows the game to keep track of the game state and what the player has done and then to show the player ending content based on those factors. You can make lots of modifications to the way the game ends by editing the various stitches inside this knot, so if you want to add a new ending or more ending content this is where you should start!

The team makes it to the gates of the safe zone. You can take a moment to review your notes about their journey or simply start inviting people into the safe haven. # CLASS: playernotes

+Review your notes about which encounters the team survived. # CLASS: playernotes
->encounterEndings

+Decide who to invite in. # CLASS: playernotes
->finalChoice

    =encounterEndings //This stitch tracks how far the player got. You do not need to modify it unless you want to add more than 8 encoutners. 

    The team survived the following encounters: # CLASS: playernotes

    {encounters > 0:Encounter 1} # CLASS: playernotes
    {encounters > 1:Encounter 2} # CLASS: playernotes
    {encounters > 2:Encounter 3} # CLASS: playernotes
    {encounters > 3:Encounter 4} # CLASS: playernotes
    {encounters > 4:Encounter 5} # CLASS: playernotes
    {encounters > 5:Encounter 6} # CLASS: playernotes
    {encounters > 6:Encounter 7} # CLASS: playernotes
    {encounters == 8:Encounter 8} # CLASS: playernotes

    +{charDeath.charOne or charDeath.charTwo or charDeath.charThree or charDeath.charFour}Review your notes about which members of the team died. # CLASS: playernotes
    ->deaths

    +{abilities.guyMcMannis}Review your notes about who abandoned the team. # CLASS: playernotes
    ->abandons

    +{not charDeath.charOne and not charDeath.charTwo and not charDeath.charThree and not charDeath.charFour and not abilities.guyMcMannis}Review your notes about who you chatted with. # CLASS: playernotes
    ->chats

    +Decide who to invite in. # CLASS: playernotes
    ->finalChoice

    =deaths //This stitch tracks character deaths. You do not need to modify it unless you add a new character or change the death system.

    The following characters died: # CLASS: playernotes

    {charDeath.charOne:{charOneName}} # CLASS: blue
    {charDeath.charTwo:{charTwoName}} # CLASS: green
    {charDeath.charThree:{charThreeName}} # CLASS: orange
    {charDeath.charFour:{charFourName}} # CLASS: purple
    
    +{abilities.guyMcMannis}Review your notes about who abandoned the team. # CLASS: playernotes
    ->abandons

    +{not abilities.guyMcMannis} Review your notes about who you chatted with. # CLASS: playernotes
    ->chats

    +Decide who to invite in. # CLASS: playernotes
    ->finalChoice

    =abandons //This stitch tracks character abandons. You do not need to modify it unless you add a new character or change the abandon system.

    {abilities.guyMcMannis:You got {abilities.guyMcMannis==4:4}{abilities.guyMcMannis == 3:3}{abilities.guyMcMannis == 2:2}{abilities.guyMcMannis == 1:1} people to abandon the team by advising the team to take the violent route. Maybe it would be better to try another way next time?} # CLASS: red

    but.. # CLASS: playernotes

    {charAbandon.charOne:Luckily, {charOneName} made it to the safe haven alone!} # CLASS: blue
    {charAbandon.charTwo:Luckily, {charTwoName} made it to the safe haven alone!} # CLASS: green
    {charAbandon.charThree:Luckily, {charThreeName} made it to the safe haven alone!} # CLASS: orange
    {charAbandon.charFour:Luckily, {charFourName} made it to the safe haven alone!} # CLASS: purple

    +Review your notes about who you chatted with.
    ->chats

    +Decide who to invite in. # CLASS: playernotes
    ->finalChoice

    =chats //This stitch tracks what conversations the player had. You do not need to modify it unles you change the dialogue system; if you add a new character, you can simply copy the code here. Note that the current tracking system will need to be changed heavily if you add new chats other than the "strong," "weak," and "backstory" chats because this code is designed to check for any potential combination of those three.

    These were the results of your conversations: # CLASS: playernotes

    //Char1 tracking

    {charOneStrongHeard:{charOneWeakHeard:{charOneStoryHeard:You heard all of {charOneName}'s chats!}}} # CLASS: blue
    {not charOneStrongHeard:{not charOneWeakHeard:{not charOneStoryHeard:You didn't hear any of {charOneName}'s chats.}}} # CLASS: blue
    {charOneStrongHeard:{not charOneWeakHeard:{not charOneStoryHeard:You found out about {charOneName}'s strengths, but not {charOnePossessiveAdj} weaknesses or backstory.}}} # CLASS: blue
    {charOneWeakHeard:{not charOneStrongHeard:{not charOneStoryHeard:You found out about {charOneName}'s weaknesses, but not {charOnePossessiveAdj} strengths or backstory.}}} # CLASS: blue
    {charOneStrongHeard:{charOneWeakHeard:{not charOneStoryHeard:You heard about {charOneName}'s strengths and weaknesses, but not {charOnePossessiveAdj} backstory.}}} # CLASS: blue

    //Char2 tracking

    {charTwoStrongHeard:{charTwoWeakHeard:{charTwoStoryHeard:You heard all of {charTwoName}'s chats!}}} # CLASS: green
    {not charTwoStrongHeard:{not charTwoWeakHeard:{not charTwoStoryHeard:You didn't hear any of {charTwoName}'s chats.}}} # CLASS: green
    {charTwoStrongHeard:{not charTwoWeakHeard:{not charTwoStoryHeard:You found out about {charTwoName}'s strengths, but not {charTwoPossessiveAdj} weaknesses or backstory.}}} # CLASS: green
    {charTwoWeakHeard:{not charTwoStrongHeard:{not charTwoStoryHeard:You found out about {charTwoName}'s weaknesses, but not {charTwoPossessiveAdj} strengths or backstory.}}} # CLASS: green
    {charTwoStrongHeard:{charTwoWeakHeard:{not charTwoStoryHeard:You heard about {charTwoName}'s strengths and weaknesses, but not {charTwoPossessiveAdj} backstory.}}} # CLASS: green

    //Char3 tracking

    {charThreeStrongHeard:{charThreeWeakHeard:{charThreeStoryHeard:You heard all of {charThreeName}'s chats!}}} # CLASS: orange
    {not charThreeStrongHeard:{not charThreeWeakHeard:{not charThreeStoryHeard:You didn't hear any of {charThreeName}'s chats.}}} # CLASS: orange
    {charThreeStrongHeard:{not charThreeWeakHeard:{not charThreeStoryHeard:You found out about {charThreeName}'s strengths, but not {charThreePossessiveAdj} weaknesses or backstory.}}} # CLASS: orange
    {charThreeWeakHeard:{not charThreeStrongHeard:{not charThreeStoryHeard:You found out about {charThreeName}'s weaknesses, but not {charThreePossessiveAdj} strengths or backstory.}}} # CLASS: orange
    {charThreeStrongHeard:{charThreeWeakHeard:{not charThreeStoryHeard:You heard about {charThreeName}'s strengths and weaknesses, but not {charThreePossessiveAdj} backstory.}}} # CLASS: orange
 

    //Char4 tracking

    {charFourStrongHeard:{charFourWeakHeard:{charFourStoryHeard:You heard all of {charFourName}'s chats!}}} # CLASS: purple
    {not charFourStrongHeard:{not charFourWeakHeard:{not charFourStoryHeard:You didn't hear any of {charFourName}'s chats.}}} # CLASS: purple
    {charFourStrongHeard:{not charFourWeakHeard:{not charFourStoryHeard:You found out about {charFourName}'s strengths, but not {charFourPossessiveAdj} weaknesses or backstory.}}} # CLASS: purple
    {charFourWeakHeard:{not charFourStrongHeard:{not charFourStoryHeard:You found out about {charFourName}'s weaknesses, but not {charFourPossessiveAdj} strengths or backstories.}}} # CLASS: purple
    {charFourStrongHeard:{charFourWeakHeard:{not charFourStoryHeard:You heard about {charFourName}'s strengths and weaknesses, but not {charFourPossessiveAdj} backstory.}}} # CLASS: purple

    
    +Decide who to invite in. # CLASS: playernotes
    ->finalChoice

    =finalChoice //At this point, the game branches slightly - if the player has only chosen the violent route, the final choice does not happen and the player gets the "worst" ending. If not, the player gets the chance to invite people in to the safe haven. If you add a  new character you will need to modify this section accordingly.

    {abilities.guyMcMannis == 4:You directed Guy McMannis to lead the team over and over again, leading everyone else on the team to abandon him to the wasteland because of his violent approach. Luckily, everyone else on the team made it to the safe haven on their own. Eventually GuyMcMannis shoots his way to the safe haven; when he arrives, everyone else is bewildered, as none of them can understand why you thought he would be a useful contribution to the community. His former comrades tell their stories, reminding everyone that they abandoned him because of his senseless, violent approach. The community decides on a simple solution: since you seem to prefer the violent lifestyle of people like GuyMcMannis, you are exiled from the safe haven along with him, and the two of you can wander the megapocalypse for the rest of your short lives.->finalEnd} # CLASS: red

    You finish reviewing your notes about the journey as the team arrives at the gate.  Now you have one final job - offering these hardened survivors refuge in the hopes that they will lend their valuable skills into the community. # CLASS: playernotes

    *{not charDeath.charOne and not charAbandon.charOne}<p style = "color:skyblue;">Offer {charOneName} a place in the safe haven.</p> # CLASS: blue
    ->charOneFinal

    *{not charDeath.charTwo and not charAbandon.charTwo}<p style = "color:lightgreen;">Offer {charTwoName} a place in the safe haven.</p> # CLASS: green
    ->charTwoFinal

    *{not charDeath.charThree and not charAbandon.charThree}<p style = "color:yellow;">Offer {charThreeName} a place in the safe haven.</p> # CLASS: orange
    ->charThreeFinal

    *{not charDeath.charFour and not charAbandon.charFour}<p style = "color:violet;">Offer {charFourName} a place in the safe haven.</p> # CLASS: purple
    ->charFourFinal 

    *<p style = "color:red;">Offer Guy McMannis a place in the safe haven.</p> # CLASS: red
    ->mcMannisFinal

    *I am done offering people a place in the safe haven. # CLASS: playernotes
    ->storyEnd

    =charOneFinal //This section checks to see if the player fully explored each character's chats.  If the player did, the character will join the safe haven; if the player did not, the character will refuse.

    {charOneWeakHeard == true and charOneStrongHeard == true and charOneStoryHeard == true: ->charOneSafe} 
    {charOneName} considers his options but is not interested in entering the safe haven because {charOneSingular} hasn't heard much about it. # CLASS: blue
    ->finalChoice

    =charOneSafe

    {charOneName} considers {charOnePossessiveAdj} options and since {charOneSingular} has communicated with you a lot {charOneSingular} decides to enter the safe haven. # CLASS: blue

    ->finalChoice

    =charTwoFinal

    {charTwoWeakHeard == true and charTwoStrongHeard == true and charTwoStoryHeard == true: ->charTwoSafe} 
    {charTwoName} considers {charTwoPossessiveAdj} options but is not interested in entering the safe haven because {charTwoSingular} hasn't heard much about it. # CLASS: green
    ->finalChoice

    =charTwoSafe

    {charTwoName} considers {charTwoPossessiveAdj} options and since {charTwoSingular} has communicated with you a lot {charTwoSingular} decides to enter the safe haven. # CLASS: green
    ->finalChoice

    =charThreeFinal

    {charThreeWeakHeard == true and charThreeStrongHeard == true and charThreeStoryHeard == true: ->charThreeSafe} 
    {charThreeName} considers {charThreePossessiveAdj} options but is not interested in entering the safe haven because {charThreeSingular} haven't heard much about it. # CLASS: orange
    ->finalChoice

    =charThreeSafe

    {charThreeName} considers {charThreePossessiveAdj} options and since {charThreeSingular} have communicated with you a lot {charThreeSingular} decide to enter the safe haven. # CLASS: orange
    ->finalChoice

    =charFourFinal

    {charFourWeakHeard == true and charFourStrongHeard == true and charFourStoryHeard == true: ->charFourSafe} 
    {charFourName} considers {charFourPossessiveAdj} options but is not interested in entering the safe haven because {charFourSingular} hasn't heard much about it. # CLASS: purple
    ->finalChoice

    =charFourSafe

    {charFourName} considers {charFourPossessiveAdj} options and since {charFourSingular} has communicated with you a lot {charFourSingular} decides to enter the safe haven. # CLASS: purple
    ->finalChoice

    =mcMannisFinal //This section checks to see if the player offers GuyMcMannis a spot in the safe haven and immediately ends the game if the player does.

    ->storyEnd

    =storyEnd  //This stitch ends the story after the final choice and provides the final story content of the game. You can modify this content to change the game's endings, and if you add a new character you can use this content as a guide for what you need to include.

    You finished deciding who to invite in to the safe haven.  These were the results of your choices: # CLASS: playernotes

    {mcMannisFinal:You tried to allow Guy McMannis into the safe haven, but everyone else voted you down and decided that you should be exiled alongside him instead.->finalEnd} # CLASS: red
    {charDeath.charOne:{charOneName} died before reaching the safe haven.} # CLASS: blue
    {charDeath.charTwo:{charTwoName} died before reaching the safe haven.} # CLASS: green
    {charDeath.charThree:{charThreeName} died before reaching the safe haven.} # CLASS: orange
    {charDeath.charFour:{charFourName} died before reaching the safe haven.} # CLASS: purple

    {charAbandon.charOne:{charOneName} got separated from the team but made it to the safe haven on {charOnePossessiveAdj} own.} # CLASS: blue
    {charAbandon.charTwo:{charTwoName} got separated from the team but made it to the safe haven on {charTwoPossessiveAdj} own.} # CLASS: green
    {charAbandon.charThree:{charThreeName} got separated from the team but made it to the safe haven on {charThreePossessiveAdj} own.} # CLASS: orange
    {charAbandon.charFour:{charFourName} got separated from the team but made it to the safe haven on {charFourPossessiveAdj} own.} # CLASS: purple
    {not charDeath.charOne and not charAbandon.charOne and not charOneFinal:You did not invite {charOneName} into the safe haven.} # CLASS: blue
    {not charDeath.charTwo and not charAbandon.charTwo and not charTwoFinal:You did not invite {charTwoName} into the safe haven.} # CLASS: green
    {not charDeath.charThree and not charAbandon.charThree and not charThreeFinal:You did not invite {charThreeName} into the safe haven.} # CLASS: orange
    {not charDeath.charFour and not charAbandon.charFour and not charFourFinal:You did not invite {charFourName} into the safe haven.} # CLASS: purple

    {charOneFinal and not charOneSafe:What {charOneName} did after deciding not to enter the safe haven is unknown, but you have to wonder if {charOneSingular} could actually survive out there.} # CLASS: blue
    {charTwoFinal and not charTwoSafe:{charTwoName} decided that the wilderness was the best place for {charTwoObject}.  You never heard from {charTwoObject} again, and you can't help but wonder whether {charTwoPossessiveAdj} nature skills helped {charTwoObject} survive.} # CLASS: green
    {charThreeFinal and not charThreeSafe:{charThreeName} headed back out into the apocalypse after all - perhaps {charThreeSingular} thought {charThreeSingular} could help people out there more than in here.  You can't help but wonder if {charThreeSingular} are still out there keeping others alive.} # CLASS: orange
    {charFourFinal and not charFourSafe:{charFourName} decided to try to survive out in the apocalypse, and you can't help but wonder whether or not {charFourPossessiveAdj} computer skills came in handy out there.} # CLASS: purple

    {charOneSafe:{charOneName} fit in well - it turns out people actually wanted someone who knew history and could teach it to the young people of the community. Once {charOneSingular} became an established speaker, {charOneSingular} ended up as one of the foremost experts on the "prepocalypse," and the study of prepocalypse history became one of the most popular subjects in school.} # CLASS: blue
    {charTwoSafe:{charTwoName} ended up becoming a critical figure in the community - {charTwoSingular} became the leader of a team of rangers who went out into the apocalypse and slowly began mapping the areas near the safe haven.  {charTwoSingular} brought in several new people, and {charTwoPossessiveAdj} documentaries about the apocalyptic landscape became an invaluable resource.} # CLASS: green
    {charThreeSafe:{charThreeName}'s medical skills were quite important to the community, and {charThreeSingular} became a leader among the safe haven's doctors because of {charThreePossessiveAdj} talents.  Eventually, {charThreeSingular} set up a school to train new doctors, ensuring that no one would be without medical attention again.} # CLASS: orange
    {charFourSafe:{charFourName}'s computer skills were essential in the community - as it turned out, they were relying on very old hardware and software and had been struggling to find new people who could fix and upgrade it for years.  {charFourName} managed to update their systems so much that they were using video chat to find new survivors within months.} # CLASS: purple

    ->finalEnd

    =finalEnd //This stich ends the story; it is separate from all the rest so that the game can easily create an ending whenever necessary and to allow for restarts.

    *[Restart the game?] (NOTE - ONLY WORKS IN WEB VERSION)
    # RESTART
    ->END
    *[Nah I am good!]
    ->END