import { invoke } from '@tauri-apps/api/tauri'
import { log } from '../config/error'

/**
 * @typedef {Object} Galery 
 * @property {string} path - Chemin vers le fichier
 * @property {number} size - Le nombre de fichier dans le dossier
 * @property {string} thumbnail - an optional number property of SpecialType
 */


export function get_galeries(callback) {
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
//    invoke("get_galeries")
//    .then(value=>callback(value))
//    .catch(error=>log(error))
}

export function get_galery_element(galery, callback) {
    callback(Array.from(
	    ['wallpaperflare.com_wallpaper.jpg'
,'112131.jpg', '215588.jpg', '415519.jpg', '640956.jpg', 
		    '689602.png', '707447.png', '744194.png', '82284.jpg',
		    '205913.jpg', '415511.jpg', '418724.png', '673189.png', 
		    '703728.png', '736461.png', '762408.png']
	    ,photos => ({src:new URL(`${galery}/${photos}`,import.meta.url).href})
    )
    )
}
