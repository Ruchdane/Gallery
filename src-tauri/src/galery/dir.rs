use super::*;
use crate::prelude::*;
use serde::{Deserialize, Serialize};
// use std::{io, path::Path};

#[derive(Debug, Serialize, Deserialize, Eq, PartialEq)]
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
        galerys.sort();
        Ok(galerys)
    }
}
impl Ord for Dir {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.path.cmp(&other.path)
    }
}

impl PartialOrd for Dir {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.path.cmp(&other.path))
    }
}
