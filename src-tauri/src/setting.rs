use serde::{Deserialize, Serialize};
use std::fs::create_dir;
use std::sync::Mutex;
use crate::{error::unwrap_or_return_to_string};
use tauri::{api::path::picture_dir, AppHandle, State};

pub struct  SettingState(pub Mutex<Setting>);

#[derive(Debug,Serialize, Deserialize,Clone)]
pub struct Setting {
    version: u8,
    path: String,
    setting_path: String,
}

impl Setting {
    pub fn get(app_handle: &AppHandle) -> Self {
        let mut app_dir = match app_handle.path_resolver().app_dir() {
            Some(dir) => dir,
            None => { 
                println!("App dir not found");
                return Setting::default();
            }
        };
        if !app_dir.exists() {
            match create_dir(&app_dir) {
                Ok(it) => it,
                Err(err) => println!("Error while creating app dir {:?}" ,err),
            }
        }
        app_dir.push(r#"settings.yml"#);
        let config_path = app_dir.clone();
        let mut setting = match confy::load_path(&config_path){
            Ok(conf) => conf,
            Err(_) => Setting::default(),
        };
        if setting.setting_path.is_empty() {
            setting.setting_path = config_path.to_string_lossy().to_string();
            confy::store_path(config_path, &setting).unwrap();
        }
        setting
    }


    pub fn path(&self) -> &str {
        self.path.as_ref()
    }
}

/// `Setting` implements `Default`
impl ::std::default::Default for Setting {
    fn default() -> Self {
        let image_dir = match  picture_dir(){
            Some(value)=> value.to_string_lossy().to_string(),
            None => "~/Pictures".to_string()
        };

        Self {
            version: 0,
            path:image_dir,
            setting_path: "".to_string(),
        }
    }
}

#[tauri::command]
pub fn get_user_settings(state: State<SettingState>) -> Result<Setting, String> {
    let setting = state.0.lock().unwrap();
    Ok(setting.clone())
}
//FIXME coonfiguration save sometime corrupt the file 
//change configuration system or ...
#[tauri::command]
pub fn change_root(state: State<SettingState>,new_root:String)-> Result<(),String> {
    let mut setting = state.0.lock().unwrap();
    setting.path = new_root;
    let setting_path = setting.setting_path.as_str();
    Ok(unwrap_or_return_to_string!(confy::store_path(setting_path,setting.clone())))
}

pub fn show_config(app_handle: &AppHandle) {
    let app_dir = match app_handle.path_resolver().app_dir() {
        Some(dir) => dir,
        None => { 
            println!("App dir not found");
            return ;
        }
    };
    let setting = Setting::get(app_handle);
    println!("Settings");
    println!("version : {}",setting.version);
    println!("App dir : {}",app_dir.to_string_lossy());
    println!("path : {}",setting.path);
}