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

#[cfg(test)]
pub mod test {
    use super::*;

    pub struct FakeFactory;
    pub struct FakeBook;
    pub struct FakeChapter;

    impl ArticleComponentFactory for FakeFactory {
        fn create_book(&self, uri: &Uri) -> Result<Box<dyn Book>> {
            // implementation for creating a book
            Ok(Box::new(FakeBook))
        }

        fn create_chapter(&self, uri: &Uri) -> Result<Box<dyn Chapter>> {
            // implementation for creating a chapter
            Ok(Box::new(FakeChapter))
        }

        fn create_page(&self, uri: &Uri) -> Result<Page> {
            // implementation for creating a page
            Ok(Page::Manga(PathBuf::from("page_path")))
        }
    }

    impl Book for FakeBook {
        fn get_chapter(&self, factory: &dyn ArticleComponentFactory) -> Vec<Box<dyn Chapter>> {
            // implementation for getting chapters
            vec![Box::new(FakeChapter)]
        }
    }

    impl Chapter for FakeChapter {
        fn get_page(&self, factory: &dyn ArticleComponentFactory) -> Vec<Page> {
            // implementation for getting pages
            vec![Page::Manga(PathBuf::from("page_path"))]
        }
    }
}
