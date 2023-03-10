use crate::prelude::*;
use std::path::PathBuf;

pub enum Page {
    Manga(PathBuf),
}

#[derive(Debug, Clone)]
pub enum Uri {
    Local(PathBuf),
}
impl Uri {
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
    fn create_book(&self, uri: &Uri) -> Result<Box<dyn Book>>;
    fn create_chapter(&self, uri: &Uri) -> Result<Box<dyn Chapter>>;
    fn create_page(&self, uri: &Uri) -> Result<Page>;
}

mod test {

    #[test]
    fn to_path_buf_work_on_local_uri() {
        let mut path = std::path::PathBuf::new();
        path.push("a");
        path.push("b");
        path.push("c");
        let uri = super::Uri::Local(path.clone());
        assert_eq!(path, uri.to_path_buf())
    }
}
