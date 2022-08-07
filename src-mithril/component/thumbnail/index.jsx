import m from "mithril";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { setupTooltip } from "../tooltip/tooltip";
import "./index.scss";

const Thumbnail = {
    oncreate(vnode) {
        setupTooltip(vnode.dom, {
            modifiers: [
                {
                    name: "offset",
                    options: {
                        offset: [0, 8],
                    },
                },
                {
                    name: "arrow",
                    options: {
                        padding: ({ popper, reference, placement }) =>
                            popper.width / reference.width,
                    },
                },
            ],
        });
    },
    view(vnode) {
        /**
         * @type galery
         */
        const galery = vnode.attrs.galery;
        if (galery.thumbnail.endsWith("mp4")) galery.thumbnail = undefined;
        return galery === undefined ? null : (
            <>
                <div class={`thumbnail ${vnode.attrs.class || ""}`}>
                    <img src={convertFileSrc(galery.thumbnail)}> </img>
                    <div class="description">
                        <label class="name">{galery.name || ""}</label>
                        <label class="size">{galery.size || ""}</label>
                    </div>
                </div>
            </>
        );
    },
};
export default Thumbnail;
