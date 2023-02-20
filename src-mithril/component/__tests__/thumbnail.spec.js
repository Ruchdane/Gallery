import { describe, expect, it } from "vitest";
import mq from "mithril-query";
import "mithril";
import Thumbnail from "../thumbnail";
import { convertFileSrc } from "@tauri-apps/api/tauri";
describe("Thumbnail props", () => {
    it("Thumbnail name is correct", () => {
        const name = "Kono dio da";
        const out = mq(Thumbnail, {
            galery: {
                name,
            },
        });
        expect(out.contains(name)).toBe(true);
    });
    it("Thumbnail size is correct", () => {
        const size = "9001";
        const out = mq(Thumbnail, {
            galery: {
                size,
            },
        });
        expect(out.contains(size)).toBe(true);
    });
    it("Thumbnail image is correct", () => {
        const thumbnail = "http://lorem.picsum.com/wall/400/600";
        const out = mq(Thumbnail, { galery: { thumbnail } });
        const img = out.first("img");
        expect(img.src).toBe(convertFileSrc(thumbnail));
    });
});
