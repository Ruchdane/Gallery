use crate::error::unwrap_or_return_to_string;
use crate::setting::get_user_settings;
use serde::{Deserialize, Serialize};
use std::fs;
use std::io;
use std::path::Path;

#[derive(Debug, Serialize, Deserialize)]
pub struct Galery {
    name:String,
    path: String,
    size: u16,
    thumbnail: String,
}

impl Galery {
    fn get_galery_size(path: &Path) -> io::Result<u16> {
        let mut size: u16 = 0;
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            if !path.is_dir() {
                size += 1;
            }
        }
        Ok(size)
    }
    fn get_galery_thumbnail(path: &Path) -> io::Result<String> {
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            //TODO check file type if it's a video make a thumbnail 
            if !path.is_dir() {
                return Ok(path.to_string_lossy().to_string());
            }
        }
        // HACK
        // Using default thumbnail none for now
        return Ok("unknown/thumbnail".to_string())
    }
    fn get_galery_medias(path: String) -> io::Result<Vec<Media>> {
        let mut medias = vec![];
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            if !path.is_dir() {
                let media = Media::new(&path)?;
                medias.push(media)
            }
        }
        Ok(medias)
    }
    fn new(galery_path: &Path) -> io::Result<Galery> {
        let name = match galery_path.file_name() {
            Some(name) => name.to_string_lossy().to_string(),
            None => "".to_string()
        };
        let path = galery_path.to_string_lossy().to_string();
        let size = Self::get_galery_size(galery_path)?;
        let thumbnail = Self::get_galery_thumbnail(galery_path)?;
        Ok(Self {
            name,
            path,
            size,
            thumbnail,
        })
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Media {
    src: String,
    r#type: String,
}

impl Media {
    pub fn new(path: &Path) -> io::Result<Self> {
        
        let src = path.to_string_lossy().to_string();
        let r#type = "image".to_string();
        Ok(Self { src, r#type })
    }
}

#[tauri::command]
pub fn get_galery() -> Result<Galery, String> {
    let path = get_user_settings().unwrap().path;
    let path = Path::new(&path);
    Ok(unwrap_or_return_to_string!(Galery::new(path)))
}

#[tauri::command]
pub fn get_galeries() -> Result<Vec<Galery>, String> {
    let path = get_user_settings().unwrap().path;
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
            galerys.push(unwrap_or_return_to_string!(Galery::new(&entry.as_path())))
        }
    }

    Ok(galerys)
}

#[tauri::command]
pub fn get_galery_media(path:String) -> Result<Vec<Media>,String> {
    let galery = unwrap_or_return_to_string!(Galery::get_galery_medias(path));
    Ok(galery)
}

