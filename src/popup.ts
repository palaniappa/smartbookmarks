import * as moment from 'moment';
import * as $ from 'jquery';
import { PopupController } from "./controllers/popupcontroller";

//@ts-ignore
(function (i, s, o, g, r, a, m) {
  let d = new Date() as any;
  //@ts-ignore
  i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = (1 * d); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics_debug.js', 'ga');

ga('create', 'UA-175467824-1', {'cookieDomain': 'none'});
ga('set', 'checkProtocolTask', function(){ /* nothing */ });
ga('send', 'pageview');


let count = 0;

$(function () {

  $(document).ready(() => {
    PopupController.instance.render();
  });

  var coll = document.getElementsByClassName("collapsible");
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

