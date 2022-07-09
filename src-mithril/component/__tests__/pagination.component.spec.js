import { describe, expect, it } from "vitest";
import mq from "mithril-query";
import "mithril";
import { Pagination, PaginationObject } from "../pagination/pagination";

describe("Pagination component", () => {
    it("Pagination component with undefined pagination", () => {
        const pagination = undefined;
        const out = mq(Pagination, { pagination });
        expect(out.find("button").length).toBe(0);
        expect(out.find("select").length).toBe(0);
    });

    it("Pagination component prev button  disbled when on first index", () => {
        const pagination = new PaginationObject(32, 0, 16);
        const out = mq(Pagination, { pagination });
        out.click("button[disabled][aria-label='Previous']");
        expect(pagination.index).toBe(0);
        expect(out.find("button[disabled][aria-label='Previous']").length).toBe(
            1
        );
    });

    it("Pagination component next button  disbled when on last index", () => {
        const pagination = new PaginationObject(32, 1, 16);
        const out = mq(Pagination, { pagination });
        out.click("button[disabled][aria-label='Next']");
        expect(pagination.index).toBe(1);
        expect(out.find("button[disabled][aria-label='Next']").length).toBe(1);
    });

    it("Pagination button next work", () => {
        let pagination = new PaginationObject(16 * 6, 0, 16);
        const out = mq(Pagination, {
            pagination,
            onchange: (value) => (pagination = value),
        });
        out.click("button[aria-label='Next']");
        expect(pagination.index).toBe(1);
    });

    it("Paginationn middle buttons work", () => {
        let pagination = new PaginationObject(16 * 6, 0, 16);
        const out = mq(Pagination, {
            pagination,
            onchange: (value) => (pagination = value),
        });
        const buttons = out.find("button");
        for (let index = 1; index < buttons.length - 1; index++) {
            buttons[index].click();
            expect(pagination.index).toBe(index - 1);
        }
    });
    it("Pagination button prev work", () => {
        let pagination = new PaginationObject(16 * 6, 1, 16);
        const out = mq(Pagination, {
            pagination,
            onchange: (value) => (pagination = value),
        });
        out.click("button[aria-label='Previous']");
        expect(pagination.index).toBe(0);
    });
});
