import { describe, expect, it } from "vitest";
import { PaginationObject } from "../pagination/pagination";

describe("Pagination object", () => {
    it("Pagination Object prev is disabled with limit >= size at index 0", () => {
        const pagination = new PaginationObject(16, 0, 16);
        expect(pagination.prevDisabled()).toBe(true);
    });

    it("Pagination Object next button is disabled with limit >= size at index max", () => {
        const pagination = new PaginationObject(25, 4, 5);
        // 25/5 = 4 so the last index is 4
        expect(pagination.nextDisabled()).toBe(true);
    });

    it("Pagination Object with index not in range set to biggest in range", () => {
        const pagination = new PaginationObject(10, 4, 5);
        expect(pagination.isCurrent(1)).toBe(true);
    });

    it("Pagination Object limit change from smaller than size to bigger", () => {
        const pagination = new PaginationObject(17, 1, 16);
        pagination.limit = 100;
        expect(pagination.isCurrent(0)).toBe(true);
    });
    it("Pagination Object limit change from bigger than size to smaller ", () => {
        const pagination = new PaginationObject(20, 3, 5);
        expect(pagination.isCurrent(3)).toBe(true);
        pagination.limit = 7;
        expect(pagination.isCurrent(2)).toBe(true);
    });
    it("Pagination Object size change from  bigger than limit to smaller", () => {
        const pagination = new PaginationObject(2, 0, 5);
        expect(pagination.isCurrent(0)).toBe(true);
        pagination.size = 6;
        expect(pagination.isCurrent(0)).toBe(true);
    });
    it("Pagination Object size change from  smaller than limit to bigger", () => {
        const pagination = new PaginationObject(20, 4, 5);
        expect(pagination.isCurrent(3)).toBe(true);
        pagination.size = 4;
        expect(pagination.isCurrent(0)).toBe(true);
    });
});
