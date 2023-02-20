import m from "mithril";
import Navigation, { NavigationObject } from "../navigation/navigation.jsx";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { rounded } from "../../utility.js";
import "./index.scss";
// TODO add test for file
function Single(initialVnode) {
    let medias;
    let navigation;
    function keyHandler(e) {
        if (e.key === "ArrowRight") {
            navigation.index = rounded(navigation.index + 1, medias.length);
            m.redraw();
        } else if (e.key === "ArrowLeft") {
            navigation.index = rounded(navigation.index - 1, medias.length);
            m.redraw();
        }
    }
    function clickHandler(e) {
        const step = e.x > e.target.scrollWidth / 2 ? 1 : -1;
        navigation.index = rounded(navigation.index + step, medias.length);
    }
    return {
        oninit(vnode) {
            medias = vnode.attrs.medias;
            navigation = NavigationObject(vnode.attrs.index, medias.length);
            document.addEventListener("keydown", keyHandler);
        },
        onremove() {
            document.removeEventListener("keydown", keyHandler);
        },
        view(vnode) {
            return (
                <div class="viewport">
                    <Navigation
                        navigation={navigation}
                        update={(value) => (navigation = value)}
                    />
                    <div class="img-container" onclick={clickHandler}>
                        <img
                            class="fit"
                            src={convertFileSrc(medias[navigation.index].src)}
                        />
                    </div>
                    <Navigation
                        navigation={navigation}
                        update={(value) => (navigation = value)}
                    />
                </div>
            );
        },
    };
}
export default Single;
