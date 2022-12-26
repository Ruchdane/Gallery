use super::*;
use serde::{Deserialize, Serialize};
// use std::{io, path::Path};

#[derive(Debug, Serialize, Deserialize)]
pub struct Dir {
    path: String,
    size: u16,
}

impl Dir {
    pub fn get_galeries(path: &Path) -> Result<Vec<Galery>> {
        let mut galerys = vec![];
        for entry in fs::read_dir(path)? {
            let entry = entry?.path();
            if entry.is_dir() {
                let galery = Galery::new(&entry)?;
                if !galery.is_empty() {
                    galerys.push(galery)
                }
            }
        }
        Ok(galerys)
    }
}
