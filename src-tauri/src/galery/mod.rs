use crate::error::unwrap_or_return_to_string;
use crate::setting::SettingState;
use std::{fs, path::Path};
use tauri::State;

mod dir;
mod galery;
mod media;

use galery::Galery;
use media::Media;
// use dir::Dir;

#[tauri::command]
pub fn get_galery(state: State<SettingState>) -> Result<Galery, String> {
    let setting = state.0.lock().unwrap();
    Ok(unwrap_or_return_to_string!(Galery::new(Path::new(
        setting.path()
    ))))
}

#[tauri::command]
pub fn get_galeries(state: State<SettingState>) -> Result<Vec<Galery>, String> {
    let setting = state.0.lock().unwrap();
    let path = setting.path();
    let entries = match fs::read_dir(path) {
        Ok(value) => value
            .map(|res| res.map(|e| e.path()))
            .filter(|path| path.is_ok()),
        Err(error) => return Err(error.to_string()),
    };
    let mut galerys = vec![];
    for entry in entries {
        let entry = unwrap_or_return_to_string!(entry);
        if entry.is_dir() {
            let galery = unwrap_or_return_to_string!(Galery::new(&entry.as_path()));
            if !galery.is_empty() {
                galerys.push(galery)
            }
        }
    }

    Ok(galerys)
}

#[tauri::command]
pub fn get_galery_media(path: String) -> Result<Vec<Media>, String> {
    let galery = unwrap_or_return_to_string!(Galery::get_galery_medias(path));
    Ok(galery)
}
