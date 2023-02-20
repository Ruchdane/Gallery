import { invoke } from "@tauri-apps/api/tauri";
import { log } from "../config/error";
import { open } from "@tauri-apps/api/dialog";

/**
 * @typedef {Object} Galery
 * @property {string} path - Chemin vers le fichier
 * @property {number} size - Le nombre de fichier dans le dossier
 * @property {string} thumbnail - an optional number property of SpecialType
 */

export function getGalery(callback) {
    invoke("get_galery")
        .then((value) => callback(value))
        .catch((error) => log(error));
}
export function getGaleries(callback) {
    invoke("get_galeries")
        .then((value) => callback(value))
        .catch((error) => log(error));
}

export function getGaleryMedia(galery, callback) {
    invoke("get_galery_media", { path: galery.path })
        .then((value) => callback(value))
        .catch((error) => log(error));
}

export function changeRoot(callback) {
    open({
        directory: true,
        multiple: false,
        title: "Change root folder",
    })
        .then((newRoot) => {
            if (newRoot !== null)
                invoke("change_root", { newRoot })
                    .then(callback)
                    .catch((error) => log(error));
        })
        .catch((error) => log(error));
}
