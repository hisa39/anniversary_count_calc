'use strict';

const myBirth = new Date(1989,3,4);

//誕生日の時間から現在までの時間を秒で取得
function countdown(birth){
    const now = new Date();
    const time = ( now.getTime() - birth.getTime() ) /1000;
    return time;
}

//生まれてからの時間を日から表示
function myBirthFull(){
    const myTime = countdown(myBirth);
    const sec = Math.floor(myTime) % 60;
    const min = Math.floor(myTime / 60) % 60;
    const hours = Math.floor(myTime / 60 / 60) % 24;
    const days = Math.floor(myTime / 60 / 60 / 24);
    const fullCount = [days, hours, min, sec];
    document.getElementById('timer').textContent = `${fullCount[0]}日${fullCount[1]}時間${fullCount[2]}分${fullCount[3]}秒経過`;
    refreshFull();
}

function refreshFull(){
    setTimeout(myBirthFull, 1000);
}

//生まれてからの時間を時から表示
function myBirthHours(){
    const myTime = countdown(myBirth);
    const sec = Math.floor(myTime) % 60;
    const min = Math.floor(myTime / 60) % 60;
    const hours = Math.floor(myTime / 60 / 60);
    const fullCount = [hours, min, sec];
    document.getElementById('timer').textContent = `${fullCount[0]}時間${fullCount[1]}分${fullCount[2]}秒経過`;
    refreshHours();
}

function refreshHours(){
    setTimeout(myBirthHours, 1000);
}

//生まれてからの時間を分から表示
function myBirthMin(){
    const myTime = countdown(myBirth);
    const sec = Math.floor(myTime) % 60;
    const min = Math.floor(myTime / 60);
    const secTime = String(sec).padStart(2, '0');
    document.getElementById('timer').textContent = `${min}分${secTime}秒経過`;
    refreshMin();
}

function refreshMin(){
    setTimeout(myBirthMin, 1000);
}

//生まれてからの時間を秒で表示
function myBirthSec(){
    const sec = Math.floor(countdown(myBirth));
    document.getElementById('timer').textContent = `${sec}秒経過`;
    refreshSec();
}

function refreshSec(){
    setTimeout(myBirthSec, 1000);
}

myBirthSec();

console.log(countdown(myBirth));
