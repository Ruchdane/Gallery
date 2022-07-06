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
    /*
	 * Decommennt to use in frontend without rust
	callback([
	{
	    path: '/wallpaper/a',
	    size: 16,
	    thumbnail: '/wallpaper/a/736461.png'
	}, {
	    path: '/wallpaper/b',
	    size: 16,
	    thumbnail: '/wallpaper/b/wallpaperflare.com_wallpaper.jpg'
	}])
	*/
    /*
     * Decoment to call backend funnction
     */
    invoke("get_galeries")
        .then((value) => callback(value))
        .catch((error) => log(error));
}

export function getGaleryMedia(galery, callback) {
    /*
	 * Decommennt to use in frontend without rust
	callback([
    callback(Array.from(
	    ['wallpaperflare.com_wallpaper.jpg'
,'112131.jpg', '215588.jpg', '415519.jpg', '640956.jpg', 
		    '689602.png', '707447.png', '744194.png', '82284.jpg',
		    '205913.jpg', '415511.jpg', '418724.png', '673189.png', 
		    '703728.png', '736461.png', '762408.png']
	    ,photos => ({src:new URL(`${galery}/${photos}`,import.meta.url).href})
    )
    )
    */
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
