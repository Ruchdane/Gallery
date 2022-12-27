// use crate::prelude::*;
use serde::{Deserialize, Serialize};
use std::path::Path;

#[derive(Debug, Serialize, Deserialize)]
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
