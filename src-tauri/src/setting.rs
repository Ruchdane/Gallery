use serde::{Deserialize, Serialize};

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
    match confy::load("galery") {
        Ok(cfg) => Ok(cfg),
        Err(error) => Err(error.to_string()),
    }
}
