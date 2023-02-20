import { describe, it, expect } from "vitest";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import mq from "mithril-query";
import { faker } from "@faker-js/faker";
import Single from "../galery/single.jsx";
import { NavigationObject } from "../navigation/navigation";
describe("Galery single image", () => {
    it("Renders", () => {
        const size = faker.datatype.number(500);
        const medias = Array.from(Array(size), () => ({
            src: faker.image.abstract(),
            type: "image",
        }));
        const index = 0;
        mq(Single, { medias, index });
    });

    it("image is at good index", () => {
        const size = faker.datatype.number(500);
        const medias = Array.from(Array(size), () => ({
            src: faker.image.abstract(),
            type: "image",
        }));
        const index = 0;
        const out = mq(Single, { medias, index });
        const img = out.first("img");
        expect(img.src).toBe(convertFileSrc(medias[index].src));
    });

    describe("Navigation is working", () => {
        const size = faker.datatype.number({ max: 500, min: 10 });
        const medias = Array.from(Array(size), () => ({
            src: faker.image.abstract(),
            type: "image",
        }));
        function setup(navIndex) {
            const index = faker.datatype.number({ max: size, min: 3 });
            const out = mq(Single, { medias, index });
            const img = out.first("img");
            const navigations = out.find("nav");
            expect(navigations.length).toBe(2);
            const navigation = navigations[navIndex];
            return { index, img, navigation };
        }
        function navTest(navIndex) {
            const { index, img, navigation } = setup(navIndex);
            const navObject = NavigationObject(index, medias.length);
            it("Next button working", () => {
                navigation.click("button[aria-label='Next']");
                navObject.next();
                expect(img.src).toBe(
                    convertFileSrc(medias[navObject.index].src)
                );
            });
            it("Prev button working", () => {
                navigation.click("button[aria-label='Previous']");
                navObject.prev();
                expect(img.src).toBe(
                    convertFileSrc(medias[navObject.index].src)
                );
            });
            it("First button working", () => {
                navigation.click("button[aria-label='First']");
                navObject.first();
                expect(img.src).toBe(
                    convertFileSrc(medias[navObject.index].src)
                );
            });
            it("Last button working", () => {
                navigation.click("button[aria-label='Last']");
                navObject.last();
                expect(img.src).toBe(
                    convertFileSrc(medias[navObject.index].src)
                );
            });
        }

        describe("First Navigation ", () => {
            navTest(0);
        });
        describe("Second Navigation ", () => {
            navTest(1);
        });
    });

    describe("Navigation is working", () => {
        const size = faker.datatype.number({ max: 500, min: 10 });
        const medias = Array.from(Array(size), () => ({
            src: faker.image.abstract(),
            type: "image",
        }));
        function setup(navIndex) {
            const labelIndex = navIndex === 0 ? 1 : 0;
            const index = faker.datatype.number({ max: size, min: 3 });
            const out = mq(Single, { medias, index });
            const navigations = out.find("nav");
            const navigation = navigations[navIndex];
            const label = navigations[labelIndex];
            expect(navigations.length).toBe(2);
            return { index, label, navigation };
        }
        function navTest(navIndex) {
            const { index, label, navigation } = setup(navIndex);
            const navObject = NavigationObject(index, medias.length);
            it("Next button working mak", () => {
                navigation.click("button[aria-label='Next']");
                navObject.next();
                expect(label.contains(navObject.index + 1));
            });
            it("Prev button working", () => {
                navigation.click("button[aria-label='Previous']");
                navObject.prev();
                expect(label.contains(navObject.index + 1));
            });
            it("First button working", () => {
                navigation.click("button[aria-label='First']");
                navObject.first();
                expect(label.contains(navObject.index + 1));
            });
            it("Last button working", () => {
                navigation.click("button[aria-label='Last']");
                navObject.last();
                expect(label.contains(navObject.index + 1));
            });
        }

        describe("First Navigation is sync with second Navigation", () => {
            navTest(0);
        });
        describe("Second Navigation is sync with first Navigation", () => {
            navTest(1);
        });
    });

    // TODO text onclick for naviagtion change
});
