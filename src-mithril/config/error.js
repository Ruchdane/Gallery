import { message } from "@tauri-apps/api/dialog";

export function log(err) {
    message(err, { title: "Galery", type: "error" });
}
