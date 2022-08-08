import { beforeAll, describe, it, expect } from "vitest";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { randomFillSync } from "crypto";
import { mockIPC } from "@tauri-apps/api/mocks";
import { faker } from "@faker-js/faker";
import Index from "../Galery/index.jsx";
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
function waitForUi() {
    return new Promise((resolve) => setTimeout(resolve, 100));
}
function setup(length, _name) {
    const name = _name || faker.system.fileName();
    const path = `${faker.system.directoryPath()}/${name}`;
    const size = length;
    const thumbnail = `${path}/${faker.system.fileName()}`;
    const galery = { name, path, size, thumbnail };
    const galeries = Array.from(Array(length), () => {
        const gName = faker.system.fileName();
        const gPath = `${path}/${gName}`;
        return {
            name: gName,
            path: gPath,
            size: faker.datatype.number(1),
            thumbnail: `${gPath}/${faker.system.fileName()}`,
        };
    });
    return { galery, galeries };
}
describe("Galery index view", () => {
    it("Galery Name is correct", async () => {
        const name = faker.system.fileName();
        const { galery, galeries } = setup(10, name);
        let getGaleryNameCommandCallCount = 0;
        mockIPC((cmd, args) => {
            if (cmd === "get_galery") {
                getGaleryNameCommandCallCount += 1;
                return galery;
            }
            if (cmd === "get_galeries") {
                return galeries;
            }
        });
        const view = mq(Index);
        await waitForUi().then(() => {
            view.redraw();
            expect(getGaleryNameCommandCallCount).toBe(1);
            expect(view.contains(name)).toBe(true);
        });
    });
    // TODO Check for thumbnail label to make sur galery name and size are correct
    it("Galery Thubnail count whenn size < pagination limit", async () => {
        const count = faker.datatype.number(16);
        const { galery, galeries } = setup(count);
        let getGaleriesCommandCallCount = 0;
        mockIPC((cmd, args) => {
            if (cmd === "get_galery") {
                return galery;
            }
            if (cmd === "get_galeries") {
                getGaleriesCommandCallCount += 1;
                return galeries;
            }
        });
        const view = mq(Index);
        await waitForUi().then(() => {
            view.redraw();
            expect(getGaleriesCommandCallCount).toBe(1);
            const thumbs = view.find("article > article");
            expect(thumbs.length).toBe(count);
        });
    });

    it("Galery Thubnail count whenn size >= pagination limit", async () => {
        const count = faker.datatype.number({ min: 16, max: 100 });
        const { galery, galeries } = setup(count);
        let getGaleriesCommandCallCount = 0;
        mockIPC((cmd, args) => {
            if (cmd === "get_galery") {
                return galery;
            }
            if (cmd === "get_galeries") {
                getGaleriesCommandCallCount += 1;
                return galeries;
            }
        });
        const view = mq(Index);
        await waitForUi().then(() => {
            view.redraw();
            expect(getGaleriesCommandCallCount).toBe(1);
            const thumbs = view.find("article > article");
            expect(thumbs.length).toBe(16);
        });
    });

    it("Galery filter work", async () => {
        const count = faker.datatype.number({ min: 16, max: 100 });
        const { galery, galeries } = setup(count);
        let getGaleriesCommandCallCount = 0;
        mockIPC((cmd, args) => {
            if (cmd === "get_galery") {
                return galery;
            }
            if (cmd === "get_galeries") {
                getGaleriesCommandCallCount += 1;
                return galeries;
            }
        });
        const view = mq(Index);
        await waitForUi().then(() => {
            view.redraw();
            view.setValue("input", galeries[0].name);
            expect(getGaleriesCommandCallCount).toBe(1);
            const thumbs = view.find("article > article");
            // FIXME Perhaps there are other name that contains the first
            expect(thumbs.length).toBe(1);
        });
    });

    it("Galery Thubnail count whenn size < pagination limit", async () => {
        const count = faker.datatype.number(16);
        const { galery, galeries } = setup(count);
        let getGaleriesCommandCallCount = 0;
        mockIPC((cmd, args) => {
            if (cmd === "get_galery") {
                return galery;
            }
            if (cmd === "get_galeries") {
                getGaleriesCommandCallCount += 1;
                return galeries;
            }
        });
        const view = mq(Index);
        await waitForUi().then(() => {
            view.redraw();
            expect(getGaleriesCommandCallCount).toBe(1);
            const thumbs = view.find("article > article");
            expect(thumbs.length).toBe(count);
        });
    });

    it("Galery Thubnail count whenn size >= pagination limit", async () => {
        const count = faker.datatype.number({ min: 16, max: 100 });
        const { galery, galeries } = setup(count);
        let getGaleriesCommandCallCount = 0;
        mockIPC((cmd, args) => {
            if (cmd === "get_galery") {
                return galery;
            }
            if (cmd === "get_galeries") {
                getGaleriesCommandCallCount += 1;
                return galeries;
            }
        });
        const view = mq(Index);
        await waitForUi().then(() => {
            view.redraw();
            expect(getGaleriesCommandCallCount).toBe(1);
            const thumbs = view.find("article > article");
            expect(thumbs.length).toBe(16);
        });
    });

    it("Galery thumbnail are correct", async () => {
        const count = faker.datatype.number({ min: 16, max: 100 });
        const { galery, galeries } = setup(count);
        let getGaleriesCommandCallCount = 0;
        mockIPC((cmd, args) => {
            if (cmd === "get_galery") {
                return galery;
            }
            if (cmd === "get_galeries") {
                getGaleriesCommandCallCount += 1;
                return galeries;
            }
        });
        const view = mq(Index);
        await waitForUi().then(() => {
            view.redraw();
            expect(getGaleriesCommandCallCount).toBe(1);
            expect(view.should.have(16, "article")).toBe(true);
            for (let i = 0; i < 16; i++) {
                const img = view.first(`article#galery-${i + 1} img`);
                const nameLabel = view.first(
                    `article#galery-${i + 1} label.name`
                );
                const sizeLabel = view.first(
                    `article#galery-${i + 1} label.size`
                );
                const value = galeries[i];
                expect(nameLabel.textContent).toBe(value.name);
                expect(Number(sizeLabel.textContent)).toBe(value.size);
                expect(img.src).toBe(convertFileSrc(value.thumbnail));
            }
        });
    });
});
