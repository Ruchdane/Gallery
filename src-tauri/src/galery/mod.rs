use crate::setting::SettingState;
use std::{fs, path::Path};
use tauri::State;

mod dir;
mod galery;
mod media;

pub use dir::Dir;
pub use galery::Galery;
pub use media::Media;

#[tauri::command]
pub fn get_galery(state: State<SettingState>) -> Result<Galery, String> {
    let setting = state.0.lock().unwrap();
    Ok(Galery::new(Path::new(setting.path()))?)
}

#[tauri::command]
pub fn get_galeries(state: State<SettingState>) -> Result<Vec<Galery>, String> {
    let setting = state.0.lock().unwrap();
    let path = Path::new(setting.path());
    Dir::get_galeries(path).map_err(|err| err.to_string())
}

#[tauri::command]
pub fn get_galery_media(path: String) -> Result<Vec<Media>, String> {
    Ok(Galery::get_galery_medias(Path::new(&path))?)
}
