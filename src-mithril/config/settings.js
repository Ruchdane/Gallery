import { invoke } from "@tauri-apps/api/tauri";
import m from "mithril";
import { log } from "./error";
let setting = {
  version: 0,
  path: "",
};
export function setup() {
  invoke("get_user_settings")
    .then((value) => {
      setting = value;
      m.redraw();
    })
    .catch((err) => log(err));
}

export function get() {
  return setting;
}
