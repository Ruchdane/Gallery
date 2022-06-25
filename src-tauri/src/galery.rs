use crate::error::unwrap_or_return_to_string;
use crate::setting::get_user_settings;
use serde::{Deserialize, Serialize};
use std::fs;
use std::io;
use std::io::{Error, ErrorKind};
use std::path::Path;

#[derive(Debug, Serialize, Deserialize)]
pub struct Galery {
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
    // TODO Si un dossier  ne contient aucun fichier on revoie une erreur
    // Ajouter un parametre pour ajouter le dossier vide
    fn get_galery_thumbnail(path: &Path) -> io::Result<String> {
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            if !path.is_dir() {
                return Ok(path.to_string_lossy().to_string());
            }
        }
        let error = format!("Aucun fichier retrouver dans le dossier {}", path.display());
        Err(Error::new(ErrorKind::Other, error))
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
        let path = galery_path.to_string_lossy().to_string();
        let size = Self::get_galery_size(galery_path)?;
        let thumbnail = Self::get_galery_thumbnail(galery_path)?;
        let thumbnail = Media::convert_url(&thumbnail);
        Ok(Self {
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
        let src = Self::convert_url(&src);
        let r#type = "image".to_string();
        Ok(Self { src, r#type })
    }
    pub fn convert_url(url: &String) -> String{
        format!("outside://{}",url)
    }
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

