'use strict';

let sec, min, hours, days, month, calcTime;
let myAnniversaryDays = new Date(1990, 1, 1, 0, 0);
let anniversaryYear = 1990;
let anniversaryMonth = 1;
let anniversaryDays = 1;
let anniversaryHours = 0;
let anniversaryMin = 0;
let anniversarySec = 0;
let now = new Date();
let jisa = 540;
let jisaSec = jisa *60 *1000;
let anniversaryTime = 0;
let nowTime = 0;


// 入力された日時を取得
document.getElementById('calendar').onchange = function () {
    const num = document.getElementById('calendar').value;
    myAnniversaryDays = new Date(num);
    console.log(myAnniversaryDays);
    // 西暦を取得
    anniversaryYear = myAnniversaryDays.getFullYear();

    // 誕生月を取得
    anniversaryMonth = myAnniversaryDays.getMonth() + 1;

    // 誕生日を取得
    anniversaryDays = myAnniversaryDays.getDate();

}

//時間が入力されたら時間を取得
document.getElementById('hours').onchange = function () {

    const num = document.getElementById('hours').value;
    //時間を設定
    myAnniversaryDays.setHours(num);
    //anniversaryHoursに時間を代入
    anniversaryHours = myAnniversaryDays.getHours();

}

//分が入力されたら分を取得
document.getElementById('min').onchange = function () {

    const num = document.getElementById('min').value;
    //分を設定
    myAnniversaryDays.setMinutes(num);
    //anniversaryHoursに分を代入
    anniversaryMin = myAnniversaryDays.getMinutes();

}

//ボタンが押されたらfunctionを実行
document.getElementById("calc").onclick = function () {
    myAnniversaryCountFull();
}

//登録ボタンが押された時
document.getElementById("create").onclick = function () {

    //入力されたtextを取得
    let title = document.getElementById("createTitle").value
    console.log(title);
    //option要素を作成
    const elementAtg = document.createElement("option");
    //optionにvalue属性を追加し登録された日付を値にする
    elementAtg.value = myAnniversaryDays;
    console.log(myAnniversaryDays);
    //Nodeに変換
    const str = document.createTextNode(title);
    //optionの子要素に追加
    elementAtg.appendChild(str);
    //selectの子要素としてoptionを追加
    document.getElementById("titleName").appendChild(elementAtg);

    console.log(title);
}

//bookmarkが変更された時に日時を変える
document.getElementById("titleName" ).onchange = function(){
    myAnniversaryDays = document.getElementById("titleName" ).value;
    console.log(myAnniversaryDays);
    chYear = myAnniversaryDays.getFullYear();
    chMonth = myAnniversaryDays.getMonth();
    chDay = myAnniversaryDays.getDate();
    console.log(chYear);
    console.log(chMonth);
    console.log(chDay);
    document.getElementById("calendar").value = (chYear-chMonth-chDay);
    // const calendarYear = myAnniversaryDays.getFullYear();
    // const calendarMonth = myAnniversaryDays.getMonth();
    // const calendarDay = myAnniversaryDays.getDate();
   // document.getElementById("calendar").value = calendarYear,calendarMonth,calendarDay;
}

// 誕生日の時間から現在までの時間を秒で取得
function myAnniversaryCount(myAnniversaryDays) {
    now = new Date();
    nowTime = now.getTime();
    const num = document.getElementById('calendar').value;
    myAnniversaryDays = new Date(num);
    anniversaryTime = myAnniversaryDays.getTime() -jisaSec;
    const time = (nowTime - anniversaryTime) / 1000;
    return time;
}

// 生まれてからの時間を年から表示
function myAnniversaryCountFull() {
    calcTime = myAnniversaryCount(myAnniversaryDays);
    sec = Math.floor(calcTime) % 60;
    min = Math.floor(calcTime / 60) % 60;
    hours = Math.floor(calcTime / 60 / 60) % 24;
    days = Math.floor(calcTime / 60 / 60 / 24);
    const nowMonth = now.getMonth() + 1;
    const nowDay = now.getDate();
    const nowHours = now.getHours();
    const nowMin = now.getMinutes();
    const nowSec = now.getSeconds();
    const nowYear = now.getFullYear();
    let now_anniversaryYear = nowYear - anniversaryYear;
    let now_anniversaryMonth = 0;
    let now_anniversaryDay = 0;

    // 誕生月より今月の方が大きい時
    if (nowMonth > anniversaryMonth) {

        // 誕生日より今日の方が大きい
        if (nowDay > anniversaryDays ||
            // 日付が同じ時、現在の時間の方が大きい
            (nowDay === anniversaryDays && (nowHours > anniversaryHours
                // 時間も同じ時、現在の分の方が大きい
                || (nowHours === anniversaryHours && (nowMin > anniversaryMin
                    // 分も同じ時、現在の秒の方が大きい
                    || (nowMin === anniversaryMin && (nowSec >= anniversarySec))))))
        ) {

            now_anniversaryMonth = nowMonth - anniversaryMonth;
            now_anniversaryDay = nowDay - anniversaryDays;

            // 誕生日より今日のほうが小さい
        } else if (nowDay < anniversaryDays ||
            // 日付が同じ時、現在の時間の方が小さい
            (nowDay === anniversaryDays && (nowHours > anniversaryHours
                // 時間も同じ時、現在の分の方が小さい
                || (nowHours === anniversaryHours && (nowMin > anniversaryMin
                    // 分も同じ時、現在の秒の方が小さい
                    || (nowMin === anniversaryMin && (nowSec >= anniversarySec))))))
        ) {
            now_anniversaryMonth = nowMonth - anniversaryMonth - 1;

            // 先月が2月だった場合
            if (nowMonth === 3) {

                // うるう年か判別
                if (nowYear % 400 === 0 || (nowYear % 100 != 0 && nowYear % 4 === 0)) {
                    now_anniversaryDay = 29 - (anniversaryDays - nowDay);
                } else {
                    now_anniversaryDay = 28 - (anniversaryDays - nowDay);
                }

                // 先月が30日の月だった場合の日付
            } else if (nowMonth === 5 || nowMonth === 7 || nowMonth === 10 || nowMonth === 12) {
                now_anniversaryDay = 30 - (anniversaryDays - nowDay);

                // 先月が31日の月だった場合の日付
            } else {
                now_anniversaryDay = 31 - (anniversaryDays - nowDay);
            }
        }

        // 誕生月より今月の方が小さい時
    } else if (nowMonth < anniversaryMonth) {

        now_anniversaryYear -= 1;
        // 誕生日より今日の方が大きい
        if (nowDay > anniversaryDays ||
            // 日付が同じ時、現在の時間の方が大きい
            (nowDay === anniversaryDays && (nowHours > anniversaryHours
                // 時間も同じ時、現在の分の方が大きい
                || (nowHours === anniversaryHours && (nowMin > anniversaryMin
                    // 分も同じ時、現在の秒の方が大きい
                    || (nowMin === anniversaryMin && (nowSec >= anniversarySec))))))
        ) {

            now_anniversaryMonth = nowMonth + (12 - anniversaryMonth);
            now_anniversaryDay = nowDay - anniversaryDays;

            // 誕生日より今日のほうが小さい
        } else if (nowDay < anniversaryDays ||
            // 日付が同じ時、現在の時間の方が小さい
            (nowDay === anniversaryDays && (nowHours > anniversaryHours
                // 時間も同じ時、現在の分の方が小さい
                || (nowHours === anniversaryHours && (nowMin > anniversaryMin
                    // 分も同じ時、現在の秒の方が小さい
                    || (nowMin === anniversaryMin && (nowSec >= anniversarySec))))))
        ) {
            now_anniversaryMonth = nowMonth + (12 - anniversaryMonth) - 1;

            // 先月が2月だった場合
            if (nowMonth === 3) {

                // うるう年か判別
                if (nowYear % 400 === 0 || (nowYear % 100 != 0 && nowYear % 4 === 0)) {
                    now_anniversaryDay = 29 - (anniversaryDays - nowDay);
                } else {
                    now_anniversaryDay = 28 - (anniversaryDays - nowDay);
                }

                // 先月が30日の月だった場合の日付
            } else if (nowMonth === 5 || nowMonth === 7 || nowMonth === 10 || nowMonth === 12) {
                now_anniversaryDay = 30 - (anniversaryDays - nowDay);

                // 先月が31日の月だった場合の日付
            } else {
                now_anniversaryDay = 31 - (anniversaryDays - nowDay);
            }
        }
        // 誕生月と今月が同じ時
    } else if (nowMonth === anniversaryMonth) {

        // 誕生日より今日の方が大きい
        if (nowDay > anniversaryDays ||
            // 日付が同じ時、現在の時間の方が大きい
            (nowDay === anniversaryDays && (nowHours > anniversaryHours
                // 時間も同じ時、現在の分の方が大きい
                || (nowHours === anniversaryHours && (nowMin > anniversaryMin
                    // 分も同じ時、現在の秒の方が大きい
                    || (nowMin === anniversaryMin && (nowSec >= anniversarySec))))))
        ) {
            now_anniversaryMonth = nowMonth - anniversaryMonth;
            now_anniversaryDay = nowDay - anniversaryDays;

            // 誕生日より今日のほうが小さい
        } else if (nowDay < anniversaryDays ||
            // 日付が同じ時、現在の時間の方が小さい
            (nowDay === anniversaryDays && (nowHours > anniversaryHours
                // 時間も同じ時、現在の分の方が小さい
                || (nowHours === anniversaryHours && (nowMin > anniversaryMin
                    // 分も同じ時、現在の秒の方が小さい
                    || (nowMin === anniversaryMin && (nowSec >= anniversarySec))))))
        ) {
            now_anniversaryYear -= 1;
            now_anniversaryMonth = 11;

            // 先月が2月だった場合
            if (nowMonth === 3) {

                // うるう年か判別
                if (nowYear % 400 === 0 || (nowYear % 100 != 0 && nowYear % 4 === 0)) {
                    now_anniversaryDay = 29 - (anniversaryDays - nowDay);
                } else {
                    now_anniversaryDay = 28 - (anniversaryDays - nowDay);
                }

                // 先月が30日の月だった場合の日付
            } else if (nowMonth === 5 || nowMonth === 7 || nowMonth === 10 || nowMonth === 12) {
                now_anniversaryDay = 30 - (anniversaryDays - nowDay);

                // 先月が31日の月だった場合の日付
            } else {
                now_anniversaryDay = 31 - (anniversaryDays - nowDay);
            }
        }
    }

    document.getElementById('fullTimer').textContent = `${now_anniversaryYear}年${now_anniversaryMonth}ヶ月${now_anniversaryDay}日${hours}時間${min}分${sec}秒経過`;

    refreshFull();
}

function refreshFull() {
    setTimeout(myAnniversaryCountFull, 1000);
}


//生まれてからの時間を月から表示
function myAnniversaryCountMonth() {
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
function myAnniversaryCountDay() {
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
function myAnniversaryCountHours() {
    myTime = countdown(myBirthDays);
    sec = Math.floor(myTime) % 60;
    min = Math.floor(myTime / 60) % 60;
    hours = Math.floor(myTime / 60 / 60);
    const minTime = String(min).padStart(2, '0');
    const secTime = String(sec).padStart(2, '0');
    document.getElementById('hoursTimer').textContent = `${hours}時間${minTime}分${secTime}秒経過`;

}

// function refreshHours(){
//     setTimeout(myBirthHours, 1000);
// }

//生まれてからの時間を分から表示
function myAnniversaryCountMin() {
    myTime = countdown(myBirthDays);
    sec = Math.floor(myTime) % 60;
    min = Math.floor(myTime / 60);
    const secTime = String(sec).padStart(2, '0');
    document.getElementById('minTimer').textContent = `${min}分${secTime}秒経過`;
    refreshMin();
}

function refreshMin() {
    setTimeout(myBirthMin, 1000);
}

//生まれてからの時間を秒で表示
function myAnniversaryCountSec() {
    sec = Math.floor(countdown(myBirthDays));
    document.getElementById('secTimer').textContent = `${sec}秒経過`;
    refreshSec();
}

function refreshSec() {
    setTimeout(myBirthSec, 1000);
}

