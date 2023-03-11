use crate::folder::FolderDirector;
use crate::prelude::*;
use crate::reader::{ArticleComponentFactory, Book, Chapter, Page};
use crate::uri::Uri;
use std::path::PathBuf;

mod manga_book;
mod manga_chapter;

use self::manga_book::{MangaBook, MangaBookFolderBuilder};
use self::manga_chapter::{MangaChapter, MangaChapterFolderBuilder};

pub struct MangaPage {
    path: PathBuf,
}

pub struct MangaFactory {}

impl ArticleComponentFactory for MangaFactory {
    fn create_book(&self, uri: &Uri) -> Result<Box<dyn Book>> {
        let folder_builder = MangaBookFolderBuilder::new(self);
        let mut folder_director = FolderDirector::new(folder_builder);
        let folder = folder_director.construct(uri)?;

        Ok(Box::new(MangaBook::new(folder)))
    }

    fn create_chapter(&self, uri: &Uri) -> Result<Box<dyn Chapter>> {
        let folder_builder = MangaChapterFolderBuilder::new(self);
        let mut folder_director = FolderDirector::new(folder_builder);
        let folder = folder_director.construct(uri)?;

        Ok(Box::new(MangaChapter::new(folder)))
    }

    fn create_page(&self, uri: &Uri) -> Result<Page> {
        // TODO Check if it's an image
        todo!()
    }
}
