// http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/ 

jQuery(document).ready(function($) {

 $('.smoothscroll').click(function(e) {
        console.log("ascs");
         if (this.hash !== "") {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function() {
            window.location.hash = target;
        });
        }
    });
 
});





function randomChar(type) {
    var pool = "";

    if (type == "lowerLetter") {
        pool = "abcdefghijklmnopqrstuvwxyz0123456789";
    } else if (type == "upperLetter") {
        pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    } else if (type == "symbol") {
        pool = ",.?/\\(^)![]{}*&^%$#'\"";
    }

    var arr = pool.split('');
    return arr[Math.floor(Math.random() * arr.length)];
}


$.fn.shuffleLetters = function(prop) {

    var options = $.extend({
        "step": 8, // How many times should the letters be changed
        "fps": 25, // Frames Per Second
        "text": "" // Use this text instead of the contents
    }, prop)

    return this.each(function() {

        var el = $(this),
            str = "";

        if (options.text) {
            str = options.text.split('');
        } else {
            str = el.text().split('');
        }

        // The types array holds the type for each character;
        // Letters holds the positions of non-space characters;

        var types = [],
            letters = [];

        // Looping through all the chars of the string

        for (var i = 0; i < str.length; i++) {

            var ch = str[i];

            if (ch == " ") {
                types[i] = "space";
                continue;
            } else if (/[a-z]/.test(ch)) {
                types[i] = "lowerLetter";
            } else if (/[A-Z]/.test(ch)) {
                types[i] = "upperLetter";
            } else {
                types[i] = "symbol";
            }

            letters.push(i);
        }

        el.html("");

        // Self executing named function expression:

        (function shuffle(start) {

            // This code is run options.fps times per second
            // and updates the contents of the page element

            var i,
                len = letters.length,
                strCopy = str.slice(0); // Fresh copy of the string

            if (start > len) {
                return;
            }

            // All the work gets done here
            for (i = Math.max(start, 0); i < len; i++) {

                // The start argument and options.step limit
                // the characters we will be working on at once

                if (i < start + options.step) {
                    // Generate a random character at this position
                    strCopy[letters[i]] = randomChar(types[letters[i]]);
                } else {
                    strCopy[letters[i]] = "";
                }
            }

            el.text(strCopy.join(""));

            setTimeout(function() {

                shuffle(start + 1);

            }, 1000 / options.fps);

        })(-options.step);

    });
};

$(function() {

    // container is the DOM element;
    // userText is the textbox

    var containername = $("#containername")
    var containerinfo = $("#containerinfo")
    var userText = $('#userText');
    // Shuffle the contents of container
    containername.shuffleLetters();



    setTimeout(function() {
        containerinfo.shuffleLetters({
            "text": "I'm frontend web developer"
        });

   /*   setTimeout(function() {
            userText.val("ask me!!!").fadeIn();
        }, 2000);
*/
    }, 1000);
    var home = ['', 'photo', 'picture', 'home-'];
    var about = ['old', 'from', 'long', 'experience', 'Email', 'email', 'phone', 'number','about-' ];
    var contact = ['name', 'address', 'live', 'where', 'phone', 'telephon', 'number', 'contact-'];
    var education = ['School', 'background', 'study', 'certificate', 'university', 'education-'];
    var work = ['Senior', 'Designer', 'work-'];

    var links = [home, about, education, work,contact, skill];
    var inputValArry;
    matche = function(input, array) {
        for (i in input) {
            for (b in array) {
                if (input[i] === array[b]) {
                    console.log(array[array.length - 1]);
                    document.getElementById(array[array.length - 1]).click();
                };
            };
        };
    };
    matches = function(input, linksArry) {
        for (i in linksArry) {
            matche(input, linksArry[i])
        };
    };


    // Bind events
    userText.click(function() {

        userText.val("");

    }).bind('keypress', function(e) {

        if (e.keyCode == 13  ) {

            // The return key was pressed
            inputValArry = userText.val().split(' ');
            console.log(inputValArry);
            matches(inputValArry, links);
            userText.val("");
        }

    }).hide();

});
