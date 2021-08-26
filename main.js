'use strict';

let sec,min,hours,days,month,myTime;
let myBirthDays = 0;
let birthYear = 0;
let birthMonth = 0;
let birthDays = 0;
let now = 0;

// 入力された日時を取得
document.getElementById('calendar').onchange = function () {
    const num = document.getElementById('calendar').value;
    myBirthDays = new Date(num);
    // 西暦を取得
    birthYear = myBirthDays.getFullYear();
    console.log(birthYear);
    // 誕生月を取得
    birthMonth = myBirthDays.getMonth();
    console.log(birthMonth);
    // 誕生日を取得
    birthDays = myBirthDays.getDate();
    console.log(birthDays);

    alert(`あなたの誕生日は${birthYear}年${birthMonth+1}月${birthDays}日ですね!`);
     setInterval(myBirthFull, 1000);
}

// 誕生日の時間から現在までの時間を秒で取得
function countdown(birth){
    now = new Date();
    const time = ( now.getTime() - birth.getTime() ) /1000;
    return time;
}

// 生まれてからの時間を年から表示
function myBirthFull(){
    myTime = countdown(myBirthDays);
    sec = Math.floor(myTime) % 60;
    min = Math.floor(myTime / 60) % 60;
    hours = Math.floor(myTime / 60 / 60) % 24;
    days = Math.floor(myTime / 60 / 60 / 24);
    const nowMonth = now.getMonth() + 1;
    const birthMonth = myBirthDays.getMonth() + 1;
    const nowDay = now.getDate();
    const birthDay = myBirthDays.getDate();
    const birthHours = myBirthDays.getHours();
    const nowHours = now.getHours();
    const birthMin = myBirthDays.getMinutes();
    const nowMin = now.getMinutes();
    const birthSec = myBirthDays.getSeconds();
    const nowSec = now.getSeconds();

    const nowYear = now.getFullYear();
    const birthYear = myBirthDays.getFullYear();
    const now_birthYear = nowYear - birthYear;
    let now_birthMonth = 0;
    let now_birthDay = 0;

// 誕生月より今月の方が大きい時
    if(nowMonth > birthMonth){

        // 誕生日より今日の方が大きい
        if(nowDay > birthDay || 
            // 日付が同じ時、現在の時間の方が大きい
            (nowDay === birthDay && (nowHours > birthHours 
                // 時間も同じ時、現在の分の方が大きい
                || (nowHours === birthHours && (nowMin > birthMin 
                    // 分も同じ時、現在の秒の方が大きい
                    || (nowMin === birthMin && (nowSec >= birthSec))))))
                    ){

                        now_birthMonth = nowMonth - birthMonth;
                        now_birthDay = nowDay - birthDay;
        
        // 誕生日より今日のほうが小さい
        }else if(nowDay < birthDay ||
            // 日付が同じ時、現在の時間の方が小さい
            (nowDay === birthDay && ( nowHours > birthHours
                // 時間も同じ時、現在の分の方が小さい
                || (nowHours === birthHours && ( nowMin > birthMin
                    // 分も同じ時、現在の秒の方が小さい
                    || ( nowMin === birthMin && ( nowSec >= birthSec))))))
                    ){
                        now_birthMonth = nowMonth - birthMonth - 1;

                        // 誕生月が2月だった場合
                        if(birthMonth === 2){
                            
                            // うるう年か判別
                            if(nowYear % 400 === 0 || (nowYear % 100 != 0 && nowYear % 4 === 0)){
                                now_birthDay = nowDay + (29 - birthDay);
                            } else {
                                now_birthDay = nowDay + (28 - birthDay);
                            }

                            // 誕生月が30日の月だった場合の日付
                        }else if(birthMonth === 4 || birthMonth === 6 || birthMonth === 9 || birthMonth === 11){
                            now_birthDay = nowDay + (30 - birthDay);

                            // 誕生月が31日の月だった場合の日付
                        } else {
                            now_birthDay = nowDay + (31 - birthDay);
                        }
        }

    // 誕生月より今月の方が小さい時
    }else if(nowMonth < birthMonth){
        now_birthYear -= 1;
                // 誕生日より今日の方が大きい
                if(nowDay > birthDay || 
                    // 日付が同じ時、現在の時間の方が大きい
                    (nowDay === birthDay && (nowHours > birthHours 
                        // 時間も同じ時、現在の分の方が大きい
                        || (nowHours === birthHours && (nowMin > birthMin 
                            // 分も同じ時、現在の秒の方が大きい
                            || (nowMin === birthMin && (nowSec >= birthSec))))))
                            ){

                                now_birthMonth = nowMonth + (12-birthMonth);
                                now_birthDay = nowDay - birthDay;
                
                // 誕生日より今日のほうが小さい
                }else if(nowDay < birthDay ||
                    // 日付が同じ時、現在の時間の方が小さい
                    (nowDay === birthDay && ( nowHours > birthHours
                        // 時間も同じ時、現在の分の方が小さい
                        || (nowHours === birthHours && ( nowMin > birthMin
                            // 分も同じ時、現在の秒の方が小さい
                            || ( nowMin === birthMin && ( nowSec >= birthSec))))))
                            ){
                                now_birthMonth = nowMonth + (12-birthMonth) -1;
        
                                // 先月が2月だった場合
                                if(nowMonth === 3){
                                    
                                    // うるう年か判別
                                    if(nowYear % 400 === 0 || (nowYear % 100 != 0 && nowYear % 4 === 0)){
                                        now_birthDay = 29 - (birthDay - nowDay);
                                    } else {
                                        now_birthDay = 28 - ( birthDay - nowDay);
                                    }
        
                                    // 先月が30日の月だった場合の日付
                                }else if(nowMonth === 5 || nowMonth === 7 || nowMonth === 10 || nowMonth === 12){
                                    now_birthDay = 30 - (birthDay - nowDay);
        
                                    // 先月が31日の月だった場合の日付
                                } else {
                                    now_birthDay = 31 - (birthDay - nowDay);
                                }
                            }
    // 誕生月と今月が同じ時
    }else if (nowMonth === birthMonth){

                // 誕生日より今日の方が大きい
                if(nowDay > birthDay || 
                    // 日付が同じ時、現在の時間の方が大きい
                    (nowDay === birthDay && (nowHours > birthHours 
                        // 時間も同じ時、現在の分の方が大きい
                        || (nowHours === birthHours && (nowMin > birthMin 
                            // 分も同じ時、現在の秒の方が大きい
                            || (nowMin === birthMin && (nowSec >= birthSec))))))
                            ){
                                now_birthMonth = nowMonth - birthMonth;
                                now_birthDay = nowDay - birthDay;
                
                // 誕生日より今日のほうが小さい
                }else if(nowDay < birthDay ||
                    // 日付が同じ時、現在の時間の方が小さい
                    (nowDay === birthDay && ( nowHours > birthHours
                        // 時間も同じ時、現在の分の方が小さい
                        || (nowHours === birthHours && ( nowMin > birthMin
                            // 分も同じ時、現在の秒の方が小さい
                            || ( nowMin === birthMin && ( nowSec >= birthSec))))))
                            ){
                                now_birthYear -= 1;
                                now_birthMonth = 11;
        
                                // 先月が2月だった場合
                                if(nowMonth === 3){
                                    
                                    // うるう年か判別
                                    if(nowYear % 400 === 0 || (nowYear % 100 != 0 && nowYear % 4 === 0)){
                                        now_birthDay = 29 - (birthDay - nowDay);
                                    } else {
                                        now_birthDay = 28 - ( birthDay - nowDay);
                                    }
        
                                    // 先月が30日の月だった場合の日付
                                }else if(nowMonth === 5 || nowMonth === 7 || nowMonth === 10 || nowMonth === 12){
                                    now_birthDay = 30 - (birthDay - nowDay);
        
                                    // 先月が31日の月だった場合の日付
                                } else {
                                    now_birthDay = 31 - (birthDay - nowDay);
                                }
                            }
    }

    document.getElementById('fullTimer').textContent = `${now_birthYear}年${now_birthMonth}ヶ月${now_birthDay}日${hours}時間${min}分${sec}秒経過`;
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

