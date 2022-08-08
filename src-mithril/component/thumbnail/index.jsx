import m from "mithril";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import "./index.scss";
import { Tooltip } from "construct-ui";

const Thumbnail = {
    view(vnode) {
        /**
         * @type galery
         */
        const galery = vnode.attrs.galery;
        // TODO preview for all filetype
        if (galery.thumbnail?.endsWith("mp4")) galery.thumbnail = undefined;
        return galery === undefined ? null : (
            <Tooltip
                content={galery.name || ""}
                trigger={
                    <div class={`thumbnail ${vnode.attrs.class || ""}`}>
                        <img src={convertFileSrc(galery.thumbnail)}> </img>
                        <div class="description">
                            <label class="name">{galery.name || ""}</label>
                            <label class="size">{galery.size || ""}</label>
                        </div>
                    </div>
                }
            />
        );
    },
};
export default Thumbnail;
