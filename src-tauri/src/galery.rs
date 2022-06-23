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
    fn new(galery_path: &Path) -> io::Result<Galery> {
        let path = galery_path.to_string_lossy().to_string();
        let size = Self::get_galery_size(galery_path)?;
        let thumbnail = Self::get_galery_thumbnail(galery_path)?;
        Ok(Self {
            path,
            size,
            thumbnail,
        })
    }
}

pub struct Media {}
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
        let entry = match entry {
            Ok(value) => value,
            Err(error) => return Err(error.to_string()),
        };
        if entry.is_dir() {
            galerys.push(match Galery::new(&entry.as_path()) {
                Ok(value) => value,
                Err(error) => return Err(error.to_string()),
            })
        }
    }
    Ok(galerys)
}
