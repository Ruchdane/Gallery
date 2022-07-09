import { describe, expect, it } from "vitest";
import mq from "mithril-query";
import "mithril";
import Navbar from "../navbar/navbar";

describe("Navabar props", () => {
    it("Navbar with no actions actions are correct", () => {
        const out = mq(Navbar);
        expect(out.find("button").length).toBe(0);
    });
    it.skip("Actions", () => {
        let var1 = 0;
        let var2 = 0;
        function action1() {
            var1 += 1;
        }
        function action2() {
            var2 += 2;
        }
        const out = mq(Navbar, {
            actions: [
                {
                    icon: "o",
                    perform: action1,
                    tooltip: "Increment var1",
                },
                {
                    icon: "g",
                    perfom: action2,
                    tooltip: "Increment var2",
                },
            ],
        });
        expect(out.find("button").length).toBe(2);
        out.click("button[aria-label='Increment var1']");
        out.click("button[aria-label='Increment var1']");
        out.click("button[aria-label='Increment var2']");
        expect(var1).toBe(2);
        expect(var2).toBe(2);
    });
});
