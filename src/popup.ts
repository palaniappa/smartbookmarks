import * as moment from 'moment';
import * as $ from 'jquery';
import { PopupController } from "./controllers/popupcontroller";

let count = 0;

$(function () {

  $(document).ready(() => {
    PopupController.instance.render();
  });

  var coll =document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }

  // const queryInfo = {
  //   active: true,
  //   currentWindow: true
  // };

  // chrome.tabs.query(queryInfo, function(tabs) {
  //   $('#url').text(tabs[0].url);
  //   $('#time').text(moment().format('YYYY-MM-DD HH:mm:ss'));
  // });

  // chrome.browserAction.setBadgeText({text: count.toString()});
  // $('#countUp').click(()=>{
  //   chrome.browserAction.setBadgeText({text: (++count).toString()});
  // });

  // $('#changeBackground').click(()=>{
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, {
  //       color: '#555555'
  //     },
  //     function(msg) {
  //       console.log("result message:", msg);
  //     });
  //   });
  // });


});

