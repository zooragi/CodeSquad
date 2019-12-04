(function(){
    "use strict"

    const qs = x => document.querySelector(x);

    const currentState = {
        strike : 0,
        ball : 0,
        out : 0,
        hit : 0,
        $field : qs(".baseball-field")

    }
    function baseBallGame(){

        let totalComment = "";
        const firstComment = `<br><div>신나는 야구 게임!<br>
        첫 번째 타자가 타석에 입장했습니다.</div><br>`;

        const currentSituation = {
            1 : strikeSituation,
            2 : ballSituation,
            3 : outSituation,
            4 : hitSituation
        };
        let playing;
        function init(){
            GameStart();
        }
        
        function GameStart(){
            qs(".game-start-button").addEventListener("click", e =>{
                totalComment += firstComment;
                currentState.$field.innerHTML = totalComment;
                playing = setInterval(() =>{
                    let randomSituation = Math.floor(Math.random()*4)+1;
                    gameCurrentState(randomSituation);
                }, 1000);
            });
        }
        
        function gameCurrentState(randomSituation){
            return currentSituation[randomSituation]();
        }

        function gameEndState(){
            console.log("게임끝")
            const gameEndComment = `<div>최종 안타수: ${currentState.hit}<br>
            GAME OVER</div><br>`;
            totalComment += gameEndComment;
            currentState.$field.innerHTML = totalComment;
            clearInterval(playing);
        }

        function strikeSituation(){

            const strikeCommnet = `<div>스트라이크!<br>
            ${currentState.strike}S ${currentState.ball}B ${currentState.out}O</div><br>`;

            const strikeOutCommnet = `<div>스트라이크!<br>
            아웃! 다음 타자가 타석에 입장했습니다.
            ${currentState.strike}S ${currentState.ball}B ${currentState.out}O</div><br>`;

            console.log("스트라이크");
            currentState.strike++;
            console.log(currentState.strike);
            if(currentState.strike === 3){
                currentState.strike = 0;
                currentState.ball = 0;
                currentState.out++;
                if(currentState.out === 3){
                    gameEndState();
                }
                totalComment += strikeOutCommnet;
                currentState.$field.innerHTML = totalComment;
            }
            totalComment += strikeCommnet;
            currentState.$field.innerHTML = totalComment;
        }

        function ballSituation(){

            const ballCommnet = `<div>볼!<br>
            ${currentState.strike}S ${currentState.ball}B ${currentState.out}O</div><br>`;

            const ballHitCommnet = `<div>4볼! 안타!!!<br>
            ${currentState.strike}S ${currentState.ball}B ${currentState.out}O</div><br>`;
            
            console.log("ball");
            currentState.ball++;
            if(currentState.ball === 4){
                currentState.strike = 0;
                currentState.ball = 0;
                currentState.hit++;
                totalComment += ballHitCommnet;
                currentState.$field.innerHTML = totalComment;
            }
            totalComment += ballCommnet;
            currentState.$field.innerHTML = totalComment;

        }

        function outSituation(){

            currentState.out++;
            if(currentState.out === 3){
                currentState.strike = 0;
                currentState.ball = 0;
                gameEndState();
                return;
            }

            const outComment = `<div>아웃! 다음 타자가 타석에 입장했습니다.<br>
            ${currentState.strike}S ${currentState.ball}B ${currentState.out}O</div><br>`;

            console.log("out",currentState.out);
            
            currentState.strike = 0;
            currentState.ball = 0;

            totalComment += outComment;
            currentState.$field.innerHTML = totalComment;

        }
        
        function hitSituation(){

            const hitComment = `<div>안타! 다음 타자가 타석에 입장했습니다.<br>
            ${currentState.strike}S ${currentState.ball}B ${currentState.out}O</div><br>`;

            console.log("hit");
            currentState.strike = 0;
            currentState.ball = 0;
            currentState.hit++;

            totalComment += hitComment;
            currentState.$field.innerHTML = totalComment;
        }

        init();
    }
    baseBallGame();
})();