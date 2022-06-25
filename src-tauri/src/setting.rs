use serde::{Deserialize, Serialize};
use crate::error::unwrap_or_return_to_string;

#[derive(Serialize, Deserialize)]
pub struct Setting {
    pub version: u8,
    pub path: String,
}

/// `Setting` implements `Default`
impl ::std::default::Default for Setting {
    fn default() -> Self {
        Self {
            version: 0,
            path: "/home/ruchdane/Pictures/walpaper".into(),
        }
    }
}

#[tauri::command]
pub fn get_user_settings() -> Result<Setting, String> {
    Ok(unwrap_or_return_to_string!(confy::load("galery")))    
}
//FIXME coonfiguration save sometime corrupt the file 
//change configuration system or ...
#[tauri::command]
pub fn change_root(new_root:String)-> Result<(),String> {
    let mut cfg : Setting = unwrap_or_return_to_string!(confy::load("galery"));
    cfg.path = new_root;
    Ok(unwrap_or_return_to_string!(confy::store("galery",cfg)))
}
