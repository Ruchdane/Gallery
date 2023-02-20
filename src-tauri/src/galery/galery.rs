use super::*;
use crate::prelude::*;
use serde::{Deserialize, Serialize};
use std::path::Path;

#[derive(Debug, Serialize, Deserialize, Eq, PartialEq)]
pub struct Galery {
    name: String,
    path: String,
    size: u16,
    thumbnail: String,
}

impl Ord for Galery {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.path.cmp(&other.path)
    }
}

impl PartialOrd for Galery {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.path.cmp(&other.path))
    }
}
impl Galery {
    fn get_galery_size(path: &Path) -> Result<u16> {
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
    fn get_galery_thumbnail(path: &Path) -> Result<String> {
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
        Ok("unknown/thumbnail".to_string())
    }
    pub fn get_galery_medias(path: &Path) -> Result<Vec<Media>> {
        let mut medias = vec![];
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            if !path.is_dir() {
                let media = Media::new(&path);
                medias.push(media)
            }
        }
        medias.sort();
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
