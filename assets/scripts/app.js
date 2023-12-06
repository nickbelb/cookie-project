'use strict';

import * as utils from "./utils.js";

const acceptBtn = utils.selectObject('.accept-btn');
const settingsBtn = utils.selectObject('.settings-btn');
const cookiesBox = utils.selectObject('.cookies-box');
const settingsBox = utils.selectObject('.settings-box'); 
const browserCookies = utils.selectAll('.browser-cookie');
const saveBtn = utils.selectObject('.save-button');
const main = utils.selectObject('main');
let operatingSystem;
let screenWidth;
let screenHeight;
let browser;


function getWindowHeight() {
    screenHeight  = window.innerHeight;
}

function getWindowWidth() {
    screenWidth = window.innerWidth;
}

function getOPeratingSystem(){
    const operatingSystems =['Linux','Windows','Mac'];
    operatingSystems.forEach(element => {
        if(navigator.userAgent.includes(element)){
            operatingSystem=element;
        }
    });
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

function getBrowser(){
    const browsers=['Chrome','Firefox'];
    browsers.forEach(element => {
        if(navigator.userAgent.includes(element)){
            browser=element;
        }
    });
}

function getAllCookiesValues() {
    getOPeratingSystem();
    getWindowHeight();
    getWindowWidth();
    getBrowser();
    setCookie('OS',operatingSystem);
    setCookie('Browser',browser);
    setCookie('Width',screenWidth);
    setCookie('Height',screenHeight);
    hideCookiesBox();
    console.log('Cookies saved successfully');
}

function setCookie(key,value){
    document.cookie=`${key}=${value}; max-age=15`;
}

function showSettingsBox() {
    cookiesBox.classList.add('hidden');
    settingsBox.classList.remove('hidden');
}

function getCookiesToSet() {
    browserCookies.forEach(cookie => {
        if(cookie.checked == true){
           setSpecificCookie(cookie.value);
        }
    });
    console.log('Cookies saved successfully');
    hideSettingsBox();
}

function setSpecificCookie(cookie) {
    switch(cookie){
        case 'browser':
            getBrowser();
            setCookie('Browser',browser);
            break;
        case 'os':
            getOPeratingSystem();
            setCookie('OS',operatingSystem);
            break;
        case 'width':
            getWindowWidth();
            setCookie('Width',screenWidth);
            break;
        default:
            getWindowHeight();
            setCookie('Height',screenHeight);
    }
}

function printCookies(){
    console.log(getCookie('Browser') ? `Browser: ${getCookie('Browser')}` : 'Browser: rejected');
    console.log(getCookie('OS') ? `Operating system: ${getCookie('OS')}` : 'OS: rejected');
    console.log(getCookie('Width') ? `Browser: ${getCookie('Width')}` : 'Width: rejected' );
    console.log(getCookie('Height') ? `Browser: ${getCookie('Height')}` : 'Height: rejected' );
}

function checkCookies(){
    document.cookie ? printCookies() :setTimeout(showCookiesBox, 2000);
}

function showCookiesBox(){
    cookiesBox.classList.remove('hidden');
    cookiesBox.classList.add('visible');
    main.classList.add('opacity-visible')
}

function hideCookiesBox(){
    cookiesBox.classList.add('hidden');
    cookiesBox.classList.remove('visible');
    main.classList.remove('opacity-visible')
}

function hideSettingsBox(){
    settingsBox.classList.add('hidden');
    settingsBox.classList.remove('visible');
    main.classList.remove('opacity-visible')
}

function setPage() {
    
    selectAllCookies()
}

function selectAllCookies(){
    browserCookies.forEach(cookie => {
        cookie.checked=true;
    });
}

utils.onEvent('load',window,checkCookies);
utils.onEvent('click',saveBtn,getCookiesToSet);
utils.onEvent('click',acceptBtn,getAllCookiesValues);
utils.onEvent('click',settingsBtn,showSettingsBox);