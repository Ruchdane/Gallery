import m from "mithril";
import mq from "mithril-query";
import o from "ospec";

o.spec("MyComponent", function () {
    o("Test", function () {
        const out = mq({ view: (vnode) => m("", "Hello") });
        out.should.contain("Hello");
    });
});
