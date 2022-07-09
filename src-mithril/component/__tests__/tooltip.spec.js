import { describe, expect, it } from "vitest";
import { m } from "mithril";
import mq from "mithril-query";
import Tooltip, { setupTooltip } from "../tooltip/tooltip.js";

describe("Tooltip", () => {
    it("Tooltip message is correct", () => {
        const out = mq(Tooltip, "Hello");
        out.should.contain("Hello");
    });

    // FIXME poperjs stderr: invalid dom provided
    it("Tooltip setup function allow to show tip", () => {
        const view = {
            oncreate(vnode) {
                setupTooltip(vnode.dom, {});
            },
            view(vnode) {
                return m(
                    ".main",
                    m(Tooltip, "Tip"),
                    m("span", "Hover this text")
                );
            },
        };
        const out = mq(view);
        expect(out.find(".tooltip").length).toBe(1);
        out.trigger(".main", "mouseenter");
        expect(out.find(".tooltip[data-show]").length).toBe(1);
        out.trigger(".main", "mouseleave");
        expect(out.find(".tooltip[data-show]").length).toBe(0);
    });
});
