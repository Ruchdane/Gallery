use crate::prelude::*;
use std::path::PathBuf;

pub enum Page {
    Manga(PathBuf),
}

#[derive(Clone)]
pub enum URI {
    Local(PathBuf),
}
impl URI {
    pub(crate) fn to_path_buf(&self) -> PathBuf {
        todo!()
    }
}

pub trait Book {
    fn get_chapter(&self, factory: &dyn ArticleComponentFactory) -> Vec<Box<dyn Chapter>>;
}

pub trait Chapter {
    fn get_page(&self, factory: &dyn ArticleComponentFactory) -> Vec<Page>;
}

pub trait ArticleComponentFactory {
    fn create_book(&self, uri: &URI) -> Result<Box<dyn Book>>;
    fn create_chapter(&self, uri: &URI) -> Result<Box<dyn Chapter>>;
    fn create_page(&self, uri: &URI) -> Result<Page>;
}
