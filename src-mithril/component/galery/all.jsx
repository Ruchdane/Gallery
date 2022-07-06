import m from "mithril";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import "./index.scss";

function All(initialVnode) {
  return {
    view(vnode) {
      return (
        <div class="imgs-container">
          {vnode.attrs.elements.map((element, id) => (
            <img class="fill" key={id} src={convertFileSrc(element.src)} />
          ))}
        </div>
      );
    },
  };
}
export default All;
