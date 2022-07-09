import { describe, expect, it } from "vitest";
import mq from "mithril-query";
import "mithril";
import Navigation, { NavigationObject } from "../navigation/navigation";
// TODO ADD test case for random button
describe("Navigation props", () => {
    it("First button working", () => {
        let navigation = NavigationObject(10, 20);
        const out = mq(Navigation, {
            navigation,
            update(value) {
                navigation = value;
            },
        });
        expect(navigation.index).toBe(10);
        out.click("button");
        expect(navigation.index).toBe(0);
    });

    it("First and Prev button disabled when on first ", () => {
        let navigation = NavigationObject(0, 20);
        const out = mq(Navigation, {
            navigation,
            update(value) {
                navigation = value;
            },
        });
        expect(out.find("button[disabled][aria-label='First']").length).toBe(1);
        expect(out.find("button[disabled][aria-label='Previous']").length).toBe(
            1
        );
    });

    it("Last button working", () => {
        let navigation = NavigationObject(10, 20);
        const out = mq(Navigation, {
            navigation,
            update(value) {
                navigation = value;
            },
        });
        out.click("button[aria-label='Last']");
        expect(navigation.index).toBe(19);
    });

    it("Last and Next button disabled when on last", () => {
        let navigation = NavigationObject(19, 20);
        const out = mq(Navigation, {
            navigation,
            update(value) {
                navigation = value;
            },
        });
        expect(out.find("button[disabled][aria-label='Last']").length).toBe(1);
        expect(out.find("button[disabled][aria-label='Next']").length).toBe(1);
    });

    it("Next button working", () => {
        let navigation = NavigationObject(10, 20);
        const out = mq(Navigation, {
            navigation,
            update(value) {
                navigation = value;
            },
        });
        out.click("button[aria-label='Next']");
        expect(navigation.index).toBe(11);
    });
    it("Prev button working", () => {
        let navigation = NavigationObject(10, 20);
        const out = mq(Navigation, {
            navigation,
            update(value) {
                navigation = value;
            },
        });
        out.click("button[aria-label='Previous']");
        expect(navigation.index).toBe(9);
    });

    it("Label working", () => {
        const navigation = NavigationObject(0, 20);
        const out = mq(Navigation, { navigation });
        expect(navigation.index).toBe(0);
        expect(out.contains("1")).toBe(true);
    });

    it("Label edit toogle working", () => {
        let navigation = NavigationObject(10, 20);
        const out = mq(Navigation, {
            navigation,
            update(value) {
                navigation = value;
            },
        });
        out.click("label");
        expect(navigation.edit).toBe(true);
    });

    it("Label edit working", () => {
        let navigation = NavigationObject(10, 20);
        const out = mq(Navigation, {
            navigation,
            update(value) {
                navigation = value;
            },
        });
        out.click("label");
        out.setValue("input", 16);
        expect(navigation.index).toBe(15);
    });
});
