use crate::prelude::*;
use crate::setting::SettingState;
use std::{fs, path::Path};
use tauri::State;

mod dir;
mod galery;
mod media;

pub use dir::Dir;
pub use galery::{Galery, GaleryError};
pub use media::Media;

#[tauri::command]
pub fn get_galery(state: State<SettingState>) -> Result<Galery> {
    let setting = state.0.lock().unwrap();
    Ok(Galery::new(Path::new(setting.path()))?)
}

#[tauri::command]
pub fn get_galeries(state: State<SettingState>) -> Result<Vec<Galery>> {
    let setting = state.0.lock().unwrap();
    Dir::get_galeries(Path::new(setting.path()))
}

#[tauri::command]
pub fn get_galery_media(path: String) -> Result<Vec<Media>> {
    Ok(Galery::get_galery_medias(Path::new(&path))?)
}
