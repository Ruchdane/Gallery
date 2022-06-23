import { invoke } from '@tauri-apps/api/tauri'
import { log } from '../config/error'

/**
 * @typedef {Object} Galery 
 * @property {string} path - Chemin vers le fichier
 * @property {number} size - Le nombre de fichier dans le dossier
 * @property {string} thumbnail - an optional number property of SpecialType
 */


export function get_galeries(callback) {
    invoke("get_galeries")
    .then(value=>callback(value))
    .catch(error=>log(error))
}

export function get_galery_element(galery, callback) {
    callback([{src: "foo"},{src: "tmp"}])
}