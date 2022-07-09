import { describe, expect, it } from "vitest";
import mq from "mithril-query";
import "mithril";
import Select from "../select/select";
describe("Select props", () => {
    it("Select options are correct", () => {
        const selectOptions = Array.from(Array(10), (v, i) => 2 * i);
        const out = mq(Select, {
            options: selectOptions,
        });
        const outSelectOptions = out.find("option");
        expect(outSelectOptions.length).toBe(selectOptions.length);
        const outSelectOptionsValue = outSelectOptions.map((option) => {
            return Number(option.value);
        });
        expect(outSelectOptionsValue).toStrictEqual(selectOptions);
    });
    it("Selcet onchange props working", () => {
        const selectOptions = Array.from(Array(10), (v, i) => 2 * i);
        let value = 10;
        let onChangeCallCount = 0;
        function onchange(change) {
            onChangeCallCount++;
            value = change;
        }
        const out = mq(Select, {
            class: "main",
            options: selectOptions,
            onchange,
        });
        out.setValue(".main", 6);
        expect(value).toBe(selectOptions[3]);
        expect(onChangeCallCount).toBe(1);
    });

    it.skip("Select tooltip props working", () => {
        const out = mq(Select, { tooltip: "tip" });
        const tootltips = out.find(".tooltip");
        expect(tootltips.length).toBe(1);
    });
});
