#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use mime_guess;
use std::fs::{canonicalize, read};
use tauri::http::ResponseBuilder;
use tauri::Manager;
mod galery;
mod setting;
mod error;
fn main() {
    galery::get_galeries().unwrap();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            setting::get_user_settings,
            galery::get_galeries
        ])
        .register_uri_scheme_protocol("outside", move |app, request| {
            let not_found = ResponseBuilder::new().status(404).body(Vec::new());
            let internal_error = ResponseBuilder::new().status(500).body(Vec::new());
            let path = request.uri().replace("outside://", "");
            let content = unwrap_or_return!(
                read(unwrap_or_return!(canonicalize(&path), not_found)),
                not_found
            );
            let guess = mime_guess::from_path(path).first_or_text_plain();
            let meta = guess.to_string();
            ResponseBuilder::new().mimetype(&meta).body(content)
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
