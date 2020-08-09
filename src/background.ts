import { Store } from "./controllers/store";

function polling() {
    console.log('polling');
    setTimeout(polling, 1000 * 30);
}

polling();


chrome.runtime.onInstalled.addListener(function () {
    Store.instance.initialize().then(() => {
        console.log("Initialize completed");
    });

    chrome.storage.sync.set({ color: '#3aa757' }, function () {
      console.log("The color is green.");
    });
  });