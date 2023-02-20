import m from "mithril";
import Navigation from "../navigation/navigation.jsx";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { rounded } from "../../utility.js";
import "./index.scss";

let elements = [];
function Single(initialVnode) {
    let index = 0;
    function keyHandler(e) {
        if (e.key === "ArrowRight") {
            index = rounded(index + 1, elements.length);
            m.redraw();
        } else if (e.key === "ArrowLeft") {
            index = rounded(index - 1, elements.length);
            m.redraw();
        }
    }
    function clickHandler(e) {
        const step = e.x > e.target.scrollWidth / 2 ? 1 : -1;
        index = rounded(index + step, elements.length);
    }
    return {
        oninit(vnode) {
            elements = vnode.attrs.elements;
            document.addEventListener("keydown", keyHandler);
        },
        onremove() {
            document.removeEventListener("keydown", keyHandler);
        },
        view(vnode) {
            elements = vnode.attrs.elements;
            return (
                <div class="viewport">
                    <Navigation
                        index={index}
                        limit={elements.length}
                        onchange={(value) => (index = value)}
                    />
                    <div class="img-container" onclick={clickHandler}>
                        <img
                            class="fit"
                            src={convertFileSrc(elements[index].src)}
                        />
                    </div>
                    <Navigation
                        index={index}
                        limit={elements.length}
                        onchange={(value) => (index = value)}
                    />
                </div>
            );
        },
    };
}
export default Single;
