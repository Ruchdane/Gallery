import { beforeAll, describe, it, expect } from "vitest";

import { randomFillSync } from "crypto";
import { mockIPC } from "@tauri-apps/api/mocks";
import { faker } from "@faker-js/faker";
import Index from "../Galery/galery.jsx";
import mq from "mithril-query";

// jsdom doesn't come with a WebCrypto implementation
beforeAll(() => {
    // @ts-ignore
    window.crypto = {
        getRandomValues: function (buffer) {
            return randomFillSync(buffer);
        },
    };
});
function waitForUi(ms) {
    return new Promise((resolve) => setTimeout(resolve, 10 || ms));
}
function setup(length, _name) {
    const size = length || faker.datatype.number(500);
    const medias = Array.from(Array(size), () => ({
        src: faker.image.abstract(),
        type: "image",
    }));
    const name = _name || faker.system.fileName();
    const path = `${faker.system.directoryPath()}/${name}`;
    const thumbnail = `${path}/${faker.system.fileName()}`;
    const galery = { name, path, size, thumbnail };

    return { galery, medias };
}

describe("Galery index view", () => {
    it("Render", async () => {
        const { galery, medias } = setup(10);
        mockIPC((cmd, args) => {
            if (cmd === "get_galery_media") {
                return medias;
            }
        });
        const view = mq(Index, { galery });
        await waitForUi(100).then(() => {
            view.redraw();
        });
    });

    it("Info is correct", async () => {
        const name = faker.system.fileName();
        const { galery, medias } = setup(10, name);
        let getGaleryMediaCallCount = 0;
        mockIPC((cmd, args) => {
            if (cmd === "get_galery_media") {
                getGaleryMediaCallCount += 1;
                return medias;
            }
        });
        const view = mq(Index, { galery });
        await waitForUi(100).then(() => {
            view.redraw();
            expect(getGaleryMediaCallCount).toBe(1);
            expect(view.contains(name)).toBe(true);
            expect(view.contains(medias.length)).toBe(true);
        });
    });
});
