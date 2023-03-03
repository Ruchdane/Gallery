use crate::prelude::*;
use crate::reader::URI;

pub struct Folder {
    name: String,
    path: URI,
    size: u32,
    cover: URI,
}

impl Folder {
    pub fn new(name: String, path: URI, size: u32, cover: URI) -> Self {
        Self {
            name,
            path,
            size,
            cover,
        }
    }
}

pub trait FolderBuilder {
    fn build_name(&mut self, uri: &URI) -> &mut Self;
    fn build_path(&mut self, uri: &URI) -> &mut Self;
    fn build_size(&mut self, uri: &URI) -> &mut Self;
    fn build_cover(&mut self, uri: &URI) -> &mut Self;
    fn is_ready(&self) -> bool;
    fn build(&self) -> Result<Folder>;
}

pub struct FolderDirector<T: FolderBuilder>(T);

impl<T: FolderBuilder> FolderDirector<T> {
    pub fn construct(&mut self, uri: &URI) -> Result<Folder> {
        self.0
            .build_name(uri)
            .build_path(uri)
            .build_name(uri)
            .build_size(uri)
            .build()
    }

    pub(crate) fn new(folder_builder: T) -> Self {
        FolderDirector(folder_builder)
    }
}
