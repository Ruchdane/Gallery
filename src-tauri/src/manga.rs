use crate::folder::FolderDirector;
use crate::prelude::*;
use crate::reader::{ArticleComponentFactory, Book, Chapter, Page};
use crate::uri::Uri;
use std::path::PathBuf;

mod manga_book;
mod manga_chapter;

pub struct MangaPage {
    path: PathBuf,
}

pub struct MangaFactory {}

impl ArticleComponentFactory for MangaFactory {
    fn create_book(&self, uri: &Uri) -> Result<Box<dyn Book>> {
        unimplemented!()
    }

    fn create_chapter(&self, uri: &Uri) -> Result<Box<dyn Chapter>> {
        unimplemented!()
    }

    fn create_page(&self, uri: &Uri) -> Result<Page> {
        unimplemented!()
    }
}
