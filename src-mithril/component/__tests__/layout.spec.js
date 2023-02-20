import mq from "mithril-query";
import Layout from "../layout/layout";
import { describe, expect, it } from "vitest";
describe("Layout props", () => {
    it("Layout label is correct", () => {
        const out = mq(Layout, { label: "lorem" });
        expect(out.contains("lorem"));
    });
});
