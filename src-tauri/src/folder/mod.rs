mod error;
mod test;

use crate::reader::Uri;
pub use error::FolderError;
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
    pub fn construct(&self, uri: &Uri) -> Result<Folder> {
        todo!()
    }

    pub(crate) fn new(folder_builder: T) -> Self {
        todo!()
    }
}
