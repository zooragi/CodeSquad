(function(){
    "use strict"

    const qs = x => document.querySelector(x);

    const currentState = {
        strike : [],
        ball : [],
        out : [],
        hit : [],

    }
    function baseBallGame(){

        function init(){
            GameStart();
        }

        function GameStart(){
            qs(".game-start-button").addEventListener("click", e =>{
                
            })
        }

        init();
    }
    baseBallGame();
})();