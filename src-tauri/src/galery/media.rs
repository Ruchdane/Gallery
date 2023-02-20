// use crate::prelude::*;
use serde::{Deserialize, Serialize};
use std::path::Path;

#[derive(Debug, Serialize, Deserialize, Eq, PartialEq)]
pub struct Media {
    src: String,
    r#type: String,
}

impl Media {
    pub fn new(path: &Path) -> Self {
        let src = path.to_string_lossy().to_string();
        let r#type = "image".to_string();
        Self { src, r#type }
    }
}

impl Ord for Media {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.src.cmp(&other.src)
    }
}

impl PartialOrd for Media {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.src.cmp(&other.src))
    }
}
