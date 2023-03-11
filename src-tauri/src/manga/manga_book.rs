use crate::{
    folder::{Folder, FolderBuilder, Result as FolderResult},
    reader::{ArticleComponentFactory, Book, Chapter},
    uri::Uri,
};

use super::MangaFactory;
pub struct MangaBook {
    folder: Folder,
}

impl MangaBook {
    pub fn new(folder: Folder) -> Self {
        Self { folder }
    }
}

impl Book for MangaBook {
    fn get_chapter(&self, factory: &dyn ArticleComponentFactory) -> Vec<Box<dyn Chapter>> {
        todo!()
    }
}
pub struct MangaBookFolderBuilder<'a> {
    factory: &'a MangaFactory,
    name: Option<String>,
    path: Option<Uri>,
    size: Option<u32>,
    cover: Option<Uri>,
}

impl<'a> MangaBookFolderBuilder<'a> {
    pub fn new(factory: &'a MangaFactory) -> Self {
        Self {
            factory,
            name: None,
            path: None,
            size: None,
            cover: None,
        }
    }
}

impl<'a> FolderBuilder for MangaBookFolderBuilder<'a> {
    fn build_name(&mut self, uri: &Uri) -> FolderResult<&mut Self> {
        todo!()
    }

    fn build_path(&mut self, uri: &Uri) -> FolderResult<&mut Self> {
        todo!()
    }

    fn build_size(&mut self, uri: &Uri) -> FolderResult<&mut Self> {
        todo!()
    }

    fn build_cover(&mut self, uri: &Uri) -> FolderResult<&mut Self> {
        todo!()
    }

    fn is_ready(&self) -> bool {
        self.name.is_some() && self.path.is_some() && self.size.is_some() && self.cover.is_some()
    }

    fn build(&self) -> FolderResult<Folder> {
        Ok(Folder::new(
            self.name.clone().unwrap(),
            self.path.clone().unwrap(),
            self.size.unwrap(),
            self.cover.clone().unwrap(),
        ))
    }
}
