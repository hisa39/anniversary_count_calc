'use strict';

let saveDays = document.getElementById('calendar').value;
let sec, min, hours, days, month, secTime, minTime, hoursTime, dayTime, monthTime, calcTime, monthNum, timerId;
let myAnniversaryDays = new Date(saveDays);
let anniversaryYear = 2000;
let anniversaryMonth = 1;
let anniversaryDays = 1;
let anniversaryHours = 0;
let anniversaryMin = 0;
let anniversarySec = 0;
let now = new Date();
let jisa = 540;
let jisaSec = jisa * 60 * 1000;
let anniversaryTime = 0;
let nowTime = 0;
const cookies = decodeURIComponent(document.cookie); //cookieを読み込み
let cookieList;

if(cookies !== null){
    onload();
}

//cookieを取得
function onload() {

    //nameとvalueごとに配列に代入
    for (var i = 0; i < cookieList.length; i++) {
        console.log(cookieList[i]);
        var item = cookieList[i].split('=');
        //nameとvalueそれぞれ別の配列に代入
        for (var j = 0; j < item.length; j++){
            if(j != 0 || j % 2 != 0){

        //option要素を作成
        const elementAtg = document.createElement('option');
        //optionにcookieのvalueを登録
        elementAtg.value = item[j];
        //cookieのnameをNodeに変換
        const str = document.createTextNode(item[j-1]);
        //optionの子要素に追加
        elementAtg.appendChild(str);
        //selectの子要素としてoptionを追加
        document.getElementById('titleName').appendChild(elementAtg);
            }

        }

    }
    
}
//cookie全削除
document.getElementById('delete').onclick = function() {
    var now = new Date();
    now.setFullYear(now.getFullYear() -1);
    for(let i of cookieList){
        console.log(i);
        let cookieArray = i.split('=');
        document.cookie = cookieArray[0] + '=;max-age=0';
        document.cookie = cookieArray[0] + '=;expires=' + now.toGMTString();
    }
}
//cookie選択削除
document.getElementById('choiceDelete').onclick = function() {
    for (var i = 0; i < cookieList.length; i++) {
        console.log(cookieList[i]);
        var item = cookieList[i].split('=');
        //nameとvalueそれぞれ別の配列に代入
        for (var j = 0; j < item.length; j++){
            if(j != 0 || j % 2 != 0){

        //option要素を作成
        const elementAtg = document.createElement('option');
        //optionにcookieのvalueを登録
        elementAtg.value = item[j];
        //cookieのnameをNodeに変換
        const str = document.createTextNode(item[j-1]);
        //optionの子要素に追加
        elementAtg.appendChild(str);
        //selectの子要素としてoptionを追加
        document.getElementById('bookmarkAnniv').appendChild(elementAtg);
            }
        }
    }
    let element = document.getElementById('bookmarkList');
    element.hidden = false;
    
}


// 入力された日時を取得
document.getElementById('calendar').onchange = function () {

    const num = document.getElementById('calendar').value;
    myAnniversaryDays = new Date(num);
    saveDays = num;

    console.log(myAnniversaryDays);
    console.log(num);

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
document.getElementById('calc').onclick = function () {

    let displayTime = document.getElementById('displayTime').value;


    console.log(document.getElementById('calendar').value);

    if (displayTime === 'full') {

        myAnniversaryCountFull();

    } else if (displayTime === 'month') {

        myAnniversaryCountMonth();

    } else if (displayTime === 'day') {

        myAnniversaryCountDay();

    } else if (displayTime === 'hours') {

        myAnniversaryCountHours();

    } else if (displayTime === 'min') {

        myAnniversaryCountMin();

    } else if (displayTime === 'sec') {

        myAnniversaryCountSec();
    }

    const element = document.getElementById('clearTime');
    element.hidden = false;

}

//停止ボタンが押された時の処理
document.getElementById('clearTime').onclick = function () {

    clearTimeout(timerId);
    console.log('停止');
    const element = document.getElementById('clearTime');
    element.hidden = true;

};

//登録ボタンが押された時

document.getElementById('create').onclick = function () {

    //textのIDを取得
    let text = document.getElementById('createTitle');
    //入力されたtextを取得
    let title = text.value
    console.log(title);
    //option要素を作成
    const elementAtg = document.createElement('option');
    //optionにvalue属性を追加し登録された日付を値にする
    elementAtg.value = saveDays;
    console.log(saveDays);
    //Nodeに変換
    const str = document.createTextNode(title);
    //optionの子要素に追加
    elementAtg.appendChild(str);
    //selectの子要素としてoptionを追加
    document.getElementById('titleName').appendChild(elementAtg);
    text.value = '';


    //titleと日付をcookieに保存
    document.cookie = encodeURIComponent(title) + '=' + encodeURIComponent(saveDays);

    // this.onload();
}

//bookmarkが変更された時に日時を変える
document.getElementById('titleName').onchange = function () {

    //選択された値を取得
    const titleValue = document.getElementById('titleName').value;
    //値をカレンダーに代入
    document.getElementById('calendar').value = titleValue;

    //値を日付に設定
    myAnniversaryDays = new Date(titleValue);

    // 西暦を取得
    anniversaryYear = myAnniversaryDays.getFullYear();

    // 誕生月を取得
    anniversaryMonth = myAnniversaryDays.getMonth() + 1;

    // 誕生日を取得
    anniversaryDays = myAnniversaryDays.getDate();


}

// 誕生日の時間から現在までの時間を秒で取得
function myAnniversaryCount(myAnniversaryDays) {
    now = new Date();
    nowTime = now.getTime();
    const num = document.getElementById('calendar').value;
    myAnniversaryDays = new Date(num);
    anniversaryTime = myAnniversaryDays.getTime() - jisaSec;
    const time = (nowTime - anniversaryTime) / 1000;
    return time;
}

// 時間経過を年から表示
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

    monthTime = String(now_anniversaryMonth).padStart(2, '0');
    dayTime = String(now_anniversaryDay).padStart(2, '0');
    hoursTime = String(hours).padStart(2, '0');
    minTime = String(min).padStart(2, '0');
    secTime = String(sec).padStart(2, '0');
    document.getElementById('timer').textContent = `${now_anniversaryYear} 年 ${monthTime} ヶ月 ${dayTime} 日 ${hoursTime} 時間 ${minTime} 分 ${secTime} 秒経過`;

    refreshFull();
}

function refreshFull() {
    timerId = setTimeout(myAnniversaryCountFull, 1000);
}


//時間経過を月から表示
function myAnniversaryCountMonth() {
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

            monthNum = nowMonth - anniversaryMonth;
            now_anniversaryMonth = now_anniversaryYear * 12 + monthNum;
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

            monthNum = nowMonth - anniversaryMonth - 1;
            now_anniversaryMonth = now_anniversaryYear * 12 + monthNum;

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

            monthNum = nowMonth + (12 - anniversaryMonth);
            now_anniversaryMonth = now_anniversaryYear * 11 + monthNum;
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

            monthNum = nowMonth + (12 - anniversaryMonth) - 1;
            now_anniversaryMonth = now_anniversaryYear * 11 + monthNum;

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
            now_anniversaryMonth = now_anniversaryYear * 12;
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

            now_anniversaryMonth = now_anniversaryYear * 11 + 11;

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

    dayTime = String(now_anniversaryDay).padStart(2, '0');
    hoursTime = String(hours).padStart(2, '0');
    minTime = String(min).padStart(2, '0');
    secTime = String(sec).padStart(2, '0');
    document.getElementById('timer').textContent = `${now_anniversaryMonth} ヶ月 ${dayTime} 日 ${hoursTime} 時間 ${minTime} 分 ${secTime} 秒経過`;

    refreshMonth();

}
function refreshMonth() {
    timerId = setTimeout(myAnniversaryCountMonth, 1000);
}

//生まれてからの時間を日から表示
function myAnniversaryCountDay() {
    calcTime = myAnniversaryCount(myAnniversaryDays);
    sec = Math.floor(calcTime) % 60;
    min = Math.floor(calcTime / 60) % 60;
    hours = Math.floor(calcTime / 60 / 60) % 24;
    days = Math.floor(calcTime / 60 / 60 / 24);
    hoursTime = String(hours).padStart(2, '0');
    minTime = String(min).padStart(2, '0');
    secTime = String(sec).padStart(2, '0');
    document.getElementById('timer').textContent = `${days} 日 ${hoursTime} 時間 ${minTime} 分 ${secTime} 秒経過`;

    refreshDay();
}

function refreshDay() {
    timerId = setTimeout(myAnniversaryCountDay, 1000);
}

//生まれてからの時間を時から表示
function myAnniversaryCountHours() {
    calcTime = myAnniversaryCount(myAnniversaryDays);
    sec = Math.floor(calcTime) % 60;
    min = Math.floor(calcTime / 60) % 60;
    hours = Math.floor(calcTime / 60 / 60);
    minTime = String(min).padStart(2, '0');
    secTime = String(sec).padStart(2, '0');
    document.getElementById('timer').textContent = `${hours} 時間 ${minTime} 分 ${secTime} 秒経過`;

    refreshHours();
}

function refreshHours() {
    timerId = setTimeout(myAnniversaryCountHours, 1000);
}

//生まれてからの時間を分から表示
function myAnniversaryCountMin() {
    calcTime = myAnniversaryCount(myAnniversaryDays);
    sec = Math.floor(calcTime) % 60;
    min = Math.floor(calcTime / 60);
    secTime = String(sec).padStart(2, '0');
    document.getElementById('timer').textContent = `${min} 分 ${secTime} 秒経過`;

    refreshMin();
}

function refreshMin() {
    timerId = setTimeout(myAnniversaryCountMin, 1000);
}

//生まれてからの時間を秒で表示
function myAnniversaryCountSec() {
    sec = Math.floor(myAnniversaryCount(myAnniversaryDays));
    document.getElementById('timer').textContent = `${sec}  秒経過`;

    refreshSec();
}

function refreshSec() {
    timerId = setTimeout(myAnniversaryCountSec, 1000);
}

