import { describe, expect, it } from "vitest";
import mq from "mithril-query";
import "mithril";
import Button from "../button/button";

describe("Button props", () => {
    it("Button onclick props working", () => {
        let clickCount = 0;
        function clickHandler() {
            clickCount++;
        }
        const out = mq(Button, { onclick: clickHandler });
        out.click("button");
        expect(clickCount).toBe(1);
    });
    it("Button type props working", () => {
        const out = mq(Button, { type: "submit" });
        expect(out.find("button[type='submit']").length).toBe(1);
    });
    it("Button disabled props making onclick not work", () => {
        let clickCount = 0;
        function clickHandler() {
            clickCount++;
        }
        const out = mq(Button, { onclick: clickHandler, disabled: true });
        out.click("button.disabled");
        expect(clickCount).toBe(0);
    });
    it("Button tooltip props working", () => {
        const out = mq(Button, { tooltip: "tip" });
        const tootltips = out.find(".tooltip");
        expect(tootltips.length).toBe(1);
    });
    it("Button aria-label props working", () => {
        const out = mq(Button, { tooltip: "not-good", "aria-label": "good" });
        expect(out.find("[aria-label='not-good']").length).toBe(0);
        expect(out.find("[aria-label='good']").length).toBe(1);
    });
    it("Button disabled props making tooltip not work", () => {
        const out = mq(Button, { disabled: true, tooltip: "tip" });
        const tootltips = out.find(".tooltip");
        expect(tootltips.length).toBe(0);
    });
});
