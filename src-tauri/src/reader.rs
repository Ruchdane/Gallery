use crate::{prelude::*, uri::Uri};
use std::path::PathBuf;

pub enum Page {
    Manga(PathBuf),
}

pub trait Book {
    fn get_chapter(&self, factory: &dyn ArticleComponentFactory) -> Vec<Box<dyn Chapter>>;
}

pub trait Chapter {
    fn get_page(&self, factory: &dyn ArticleComponentFactory) -> Vec<Page>;
}

pub trait ArticleComponentFactory {
    fn create_book(&self, uri: &Uri) -> Result<Box<dyn Book>>;
    fn create_chapter(&self, uri: &Uri) -> Result<Box<dyn Chapter>>;
    fn create_page(&self, uri: &Uri) -> Result<Page>;
}
