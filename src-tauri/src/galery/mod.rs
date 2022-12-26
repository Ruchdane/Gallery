use crate::prelude::*;
use crate::setting::SettingState;
use std::{fs, path::Path};
use tauri::State;

mod dir;
mod galery;
mod media;

pub use galery::{Galery, GaleryError};
pub use media::Media;
// use dir::Dir;

#[tauri::command]
pub fn get_galery(state: State<SettingState>) -> Result<Galery> {
    let setting = state.0.lock().unwrap();
    Ok(Galery::new(Path::new(setting.path()))?)
}

#[tauri::command]
pub fn get_galeries(state: State<SettingState>) -> Result<Vec<Galery>> {
    let setting = state.0.lock().unwrap();
    let path = setting.path();
    let entries = fs::read_dir(path)?
        .map(|res| res.map(|e| e.path()))
        .filter(|path| path.is_ok());
    let mut galerys = vec![];
    for entry in entries {
        let entry = entry?;
        if entry.is_dir() {
            let galery = Galery::new(entry.as_path())?;
            if !galery.is_empty() {
                galerys.push(galery)
            }
        }
    }

    Ok(galerys)
}

#[tauri::command]
pub fn get_galery_media(path: String) -> Result<Vec<Media>> {
    let galery = Galery::get_galery_medias(Path::new(&path))?;
    Ok(galery)
}
