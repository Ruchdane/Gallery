use super::*;
use serde::{Deserialize, Serialize};
use std::{io, path::Path};

#[derive(Debug, Serialize, Deserialize)]
pub struct Galery {
    name: String,
    path: String,
    size: u16,
    thumbnail: String,
}

#[derive(Debug, thiserror::Error, Serialize)]
pub enum GaleryError {
    /// The provided path doesn’t exist.
    #[error("{0} doesn't exist")]
    InvalidPath(String),
    /// The process lacks permissions to view the contents.
    #[error("You cannot acces {0}")]
    AccessDenied(String),
    /// The path points at a non-directory file.
    #[error("This {0} is not a directoty")]
    NotADir(String),

    #[error("Unknown error")]
    Other(String),
}
impl From<io::Error> for GaleryError {
    fn from(value: std::io::Error) -> Self {
        GaleryError::Other(value.to_string())
    }
}

fn read_dir(path: &Path) -> Result<fs::ReadDir> {
    fs::read_dir(path).map_err(|err| {
        let path = path.to_str().unwrap_or("failed to read pathname").into();
        match err.kind() {
            io::ErrorKind::NotFound => GaleryError::InvalidPath(path),
            io::ErrorKind::PermissionDenied => GaleryError::AccessDenied(path),
            _ => GaleryError::NotADir(path),
        }
    })
}
pub type Result<T> = std::result::Result<T, GaleryError>;
impl Galery {
    fn get_galery_size(path: &Path) -> Result<u16> {
        let mut size: u16 = 0;
        for entry in read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            if !path.is_dir() {
                size += 1;
            }
        }
        Ok(size)
    }
    fn get_galery_thumbnail(path: &Path) -> Result<String> {
        for entry in read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            //TODO check file type if it's a video make a thumbnail
            if !path.is_dir() {
                return Ok(path.to_string_lossy().to_string());
            }
        }
        // HACK
        // Using default thumbnail none for now
        Ok("unknown/thumbnail".to_string())
    }
    pub fn get_galery_medias(path: &Path) -> Result<Vec<Media>> {
        let mut medias = vec![];
        for entry in read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            if !path.is_dir() {
                let media = Media::new(&path);
                medias.push(media)
            }
        }
        Ok(medias)
    }
    pub fn new(galery_path: &Path) -> Result<Galery> {
        let name = match galery_path.file_name() {
            Some(name) => name.to_string_lossy().to_string(),
            None => "".to_string(),
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
    pub fn is_empty(&self) -> bool {
        self.size == 0
    }
}
