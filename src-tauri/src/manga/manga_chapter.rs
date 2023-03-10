use crate::{
    folder::{Folder, FolderBuilder, Result as FolderResult},
    reader::{ArticleComponentFactory, Chapter, Page, Uri},
};

use super::MangaFactory;

pub struct MangaChapter {
    folder: Folder,
}

impl MangaChapter {
    pub fn new(folder: Folder) -> Self {
        Self { folder }
    }
}

impl Chapter for MangaChapter {
    fn get_page(&self, factory: &dyn ArticleComponentFactory) -> Vec<Page> {
        // TODO: Implement the method for getting pages from the folder
        unimplemented!()
    }
}

pub struct MangaChapterFolderBuilder<'a> {
    factory: &'a MangaFactory,
    name: Option<String>,
    path: Option<Uri>,
    size: Option<u32>,
    cover: Option<Uri>,
}

impl<'a> MangaChapterFolderBuilder<'a> {
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

impl<'a> FolderBuilder for MangaChapterFolderBuilder<'a> {
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
