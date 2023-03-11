mod error;
mod test;

pub use error::FolderError;

use crate::uri::Uri;
pub type Result<T> = std::result::Result<T, FolderError>;
#[derive(Debug)]
pub struct Folder {
    name: String,
    path: Uri,
    size: u32,
    cover: Uri,
}

impl Folder {
    pub fn new(name: String, path: Uri, size: u32, cover: Uri) -> Self {
        Self {
            name,
            path,
            size,
            cover,
        }
    }
}

pub trait FolderBuilder {
    fn build_name(&mut self, uri: &Uri) -> Result<&mut Self>;
    fn build_path(&mut self, uri: &Uri) -> Result<&mut Self>;
    fn build_size(&mut self, uri: &Uri) -> Result<&mut Self>;
    fn build_cover(&mut self, uri: &Uri) -> Result<&mut Self>;
    fn is_ready(&self) -> bool;
    fn build(&self) -> Result<Folder>;
}

pub struct FolderDirector<T: FolderBuilder>(T);

impl<T: FolderBuilder> FolderDirector<T> {
    pub fn construct(&mut self, uri: &Uri) -> Result<Folder> {
        self.0
            .build_name(uri)?
            .build_path(uri)?
            .build_size(uri)?
            .build_cover(uri)?
            .build()
    }

    pub(crate) fn new(folder_builder: T) -> Self {
        Self(folder_builder)
    }
}
