'use strict';

let hoge = document.getElementsByClassName(calendar).value;
console.log(hoge);

let sec,min,hours,days,month,myTime;
let myBirthDays = 0;
let birthYear = 0;
let birthMonth = 0;
let birthDays = 0;
let now = 0;

//入力された日時を取得
document.getElementById('calendar').onchange = function () {
    const num = document.getElementById('calendar').value;
    myBirthDays = new Date(num);
    alert(myBirthDays);
    birthYear = myBirthDays.getFullYear();
    console.log(birthYear);
    birthMonth = myBirthDays.getMonth();
    console.log(birthMonth);
    birthDays = myBirthDays.getDate();
    console.log(birthDays);
    setInterval(myBirthHours, 1000);
}

//誕生日の時間から現在までの時間を秒で取得
function countdown(birth){
    now = new Date();
    const time = ( now.getTime() - birth.getTime() ) /1000;
    return time;
}

//生まれてからの時間を年から表示
function myBirthFull(){
    myTime = countdown(myBirthDays);
    sec = Math.floor(myTime) % 60;
    min = Math.floor(myTime / 60) % 60;
    hours = Math.floor(myTime / 60 / 60) % 24;
    days = Math.floor(myTime / 60 / 60 / 24);
    const nowMonth = now.getMonth() + 1;
    const birthMonth = myBirth.getMonth() + 1;
    const nowDay = now.Date();
    const birthDay = myBirth.getDate();
    const birthHours = myBirth.getHours();
    const nowHours = now.getHours();
    const birthMin = myBirth.getMinutes();
    const nowMin = now.getMinutes();
    const birthSec = myBirth.getSeconds();
    const nowSec = now.getSeconds();

    const nowYear = now.getFullYear();
    const birthYear = myBirth.getFullYear();
    const now_birthYear = nowYear - birthYear;

// 誕生月より今月の方が大きい場合
    if(nowMonth > birthMonth){

        //誕生月が2月だった場合
        if( birthMonth === 2){

        
        //誕生日より今日の方が大きい
        }else if(nowDay > birthDay || 
            //日付が同じ時、時間は大きい
            (nowDay === birthDay && (nowHours > birthHours 
                //時間も同じ時、分は大きい
                || (nowHours === birthHours && (nowMin > birthMin 
                    //分も同じ時、秒は大きい
                    || (nowMin === birthMin && (nowSec >= birthSec))))))
                    ){

                        now_birthMonth = nowMonth - birthMonth
                        now_birthDay = nowDay - birthDay
        
        //誕生日より今日のほうが小さい
        }else if(nowDay < birthDay ||
            //
            (nowDay === birthDay && ( nowHours > birthHours
                //
                || (nowHours === birthHours && ( nowMin > birthMin
                    //
                    || ( nowMin === birthMin && ( nowSec >= birthSec))))))
                    ){

        }
    }



// 現在の月が誕生月より大きい、現在の日は誕生日より小さい
    else if(nowMonth > birthMonth && (nowDay < birthDay || (nowDay === birthDay && (nowHours < birthHours || (nowHours === birthHours && (nowMin < birthMin || (nowMin === birthMin && (nowSec < birthSec)))))))){
        
        now_birthMonth = nowMonth - birthMonth -1;
        
        // 誕生月が30日の月だった場合の日付
        if(birthDay === 4 || birthDay === 6 || birthDay === 9 || birthDay === 11){
            
            now_birthDay = nowDay + (30 - birthDay);
        // 誕生月が2月だった場合の日付
        }else if (birthDay === 2 ){
            // うるう年か判別させる
            if((birthYear % 400 ===0) || ((birthYear % 100 !=0) && (birthYear % 4 ===0))){
                now_birthDay = nowDay + (29 - birthDay);
            }else{
                now_birthDay = nowDay + (28 - birthDay);
            }
        }else {
        // 誕生月が31日の月だった場合の日付
            now_birthDay = nowDay + (31 - birthDay);
        }
// 現在の月が誕生月よ小さい、現在の日は誕生日より大きい
    }else if(nowMonth < birthMonth && (nowDay > birthDay || (nowDay === birthDay && (nowHours > birthHours || (nowHours === birthHours && (nowMin > birthMin || (nowMin === birthMin && (nowSec >= birthSec)))))))){

    }
// 現在は誕生日より月、日、時間すべて小さい
// 現在と誕生月が同じ
    document.getElementById('fullTimer').textContent = `${now_birthYear}年${days}日${hours}時間${min}分${sec}秒経過`;
    //refreshFull();
}

// function refreshFull(){
//     setTimeout(myBirthFull, 1000);
// }


//生まれてからの時間を月から表示
function myBirthMonth(){
    myTime = countdown(myBirthDays);
    sec = Math.floor(myTime) % 60;
    min = Math.floor(myTime / 60) % 60;
    hours = Math.floor(myTime / 60 / 60) % 24;
    days = Math.floor(myTime / 60 / 60 / 24);
    const day = String(days).padStart(2, '0');
    const hoursTime = String(hours).padStart(2, '0');
    const minTime = String(min).padStart(2, '0');
    const secTime = String(sec).padStart(2, '0');
    document.getElementById('timer').textContent = `${month}月${day}日${hoursTime}時間${minTime}分${secTime}秒経過`;

}

//生まれてからの時間を日から表示
function myBirthDay(){
    myTime = countdown(myBirthDays);
    sec = Math.floor(myTime) % 60;
    min = Math.floor(myTime / 60) % 60;
    hours = Math.floor(myTime / 60 / 60) % 24;
    days = Math.floor(myTime / 60 / 60 / 24);
    const hoursTime = String(hours).padStart(2, '0');
    const minTime = String(min).padStart(2, '0');
    const secTime = String(sec).padStart(2, '0');
    document.getElementById('timer').textContent = `${days}日${hoursTime}時間${minTime}分${secTime}秒経過`;

}

//生まれてからの時間を時から表示
function myBirthHours(){
    myTime = countdown(myBirthDays);
    sec = Math.floor(myTime) % 60;
    min = Math.floor(myTime / 60) % 60;
    hours = Math.floor(myTime / 60 / 60);
    const minTime = String(min).padStart(2,'0');
    const secTime = String(sec).padStart(2, '0');
    document.getElementById('hoursTimer').textContent = `${hours}時間${minTime}分${secTime}秒経過`;

}

// function refreshHours(){
//     setTimeout(myBirthHours, 1000);
// }

//生まれてからの時間を分から表示
function myBirthMin(){
    myTime = countdown(myBirthDays);
    sec = Math.floor(myTime) % 60;
    min = Math.floor(myTime / 60);
    const secTime = String(sec).padStart(2, '0');
    document.getElementById('minTimer').textContent = `${min}分${secTime}秒経過`;
    refreshMin();
}

function refreshMin(){
    setTimeout(myBirthMin, 1000);
}

//生まれてからの時間を秒で表示
function myBirthSec(){
    sec = Math.floor(countdown(myBirthDays));
    document.getElementById('secTimer').textContent = `${sec}秒経過`;
    refreshSec();
}

function refreshSec(){
    setTimeout(myBirthSec, 1000);
}

//myBirthFull();
