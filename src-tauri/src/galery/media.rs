use serde::{Deserialize, Serialize};
use std::{io, path::Path};

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
