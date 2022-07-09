import { describe, expect, it } from "vitest";
import mq from "mithril-query";
import "mithril";
import Thumbnail from "../thumbnail";
import { convertFileSrc } from "@tauri-apps/api/tauri";
describe("Thumbnail props", () => {
    it("Thumbnail name is correct", () => {
        const out = mq(Thumbnail, {
            name: "Kono dio da",
        });
        expect(out.contains("Kono dio da")).toBe(true);
    });
    it("Thumbnail size is correct", () => {
        const out = mq(Thumbnail, {
            size: "9001",
        });
        expect(out.contains("9001")).toBe(true);
    });
    it("Thumbnail image is correct", () => {
        const src = "http://lorem.picsum.com/wall/400/600";
        const out = mq(Thumbnail, { thumbnail: src });
        const img = out.first("img");
        expect(img.src).toBe(convertFileSrc(src));
    });
});
