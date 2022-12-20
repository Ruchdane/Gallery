#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::sync::Mutex;

use setting::{Setting, SettingState};
use tauri::Manager;

mod db;
mod error;
mod galery;
mod setting;
fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            let setting = Setting::get(&handle);
            app.manage(SettingState(Mutex::new(setting)));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            setting::get_user_settings,
            setting::change_root,
            galery::get_galery,
            galery::get_galery_media,
            galery::get_galeries
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
