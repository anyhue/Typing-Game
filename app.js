const GAME_TIME = 9;

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

let score = 0; //score는 변경 가능하도록 let으로 설정, 0으로 초기화시켜놓기
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];

init();

function init() {
    getWords();
    wordInput.addEventListener("input", checkMatch);
}

// 게임 실행
function run() {
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus(); // 게임 실행되면 마우스 포커스가 입력창으로 가게 하기
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50); // 50ms마다 게임 실행 상태 확인
    buttonChange("게임중");
}

// 게임 실행 상태 확인
function checkStatus() {
    if(!isPlaying && time ===0) {
        buttonChange("게임시작");
        clearInterval();
    }
}

// 단어 불러오기
function getWords() {
    words = ["Hello", "Array", "Keep", "Apple"];
    buttonChange("게임시작");
}

// 단어일치 체크
function checkMatch() {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value ="";
        if(!isPlaying) {
            return;
        } // 게임이 실행중이지 않을 때 값 입력해도 점수 안 오르게 함, return 실행되면 밑에 있는 연산은 실행 안 됨
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME; // 단어 맞히면 시간 다시 시작
        const radomWords = Math.floor(Math.random()*words.length); // 랜덤한 단어 불러오기
        wordDisplay.innerText = words[radomWords];
    };
};

function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying) {
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.innerText = text;
    text === "게임시작" ? button.classList.remove("loading") : button.classList.add("loading");
}