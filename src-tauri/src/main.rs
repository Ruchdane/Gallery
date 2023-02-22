#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use crate::prelude::*;
use std::sync::Mutex;

use setting::{Setting, SettingState};
use tauri::Manager;

mod db;
mod error;
mod galery;
mod prelude;
mod setting;
fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            let setting = Setting::get(&handle);
            app.asset_protocol_scope()
                .allow_directory(setting.allowed_directory(), true)?;
            // .allow_file(setting.allowed_directory())?;
            app.manage(SettingState(Mutex::new(setting)));
            app.manage(app.asset_protocol_scope());
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
