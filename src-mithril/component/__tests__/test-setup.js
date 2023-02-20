import { after } from "ospec";
import { JSDOM } from "jsdom";

// Require Mithril.js to make sure it loads properly.
import "mithril";
const dom = new JSDOM("", {
    // So we can get `requestAnimationFrame`
    pretendToBeVisual: true,
});

// Fill in the globals Mithril.js needs to operate. Also, the first two are often
// useful to have just in tests.
global.window = dom.window;
global.document = dom.window.document;
global.requestAnimationFrame = dom.window.requestAnimationFrame;

// And now, make sure JSDOM ends when the tests end.
after(function () {
    dom.window.close();
});
