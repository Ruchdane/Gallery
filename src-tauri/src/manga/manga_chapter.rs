use crate::{
    folder::{Folder, FolderBuilder, Result as FolderResult},
    reader::{ArticleComponentFactory, Chapter, Page},
    uri::Uri,
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

pub struct MangaChapterFolderBuilder {
    factory: Box<dyn ArticleComponentFactory>,
    name: Option<String>,
    path: Option<Uri>,
    size: Option<u32>,
    cover: Option<Uri>,
}

impl MangaChapterFolderBuilder {
    pub fn new(factory: Box<dyn ArticleComponentFactory>) -> Self {
        Self {
            factory,
            name: None,
            path: None,
            size: None,
            cover: None,
        }
    }
}

impl FolderBuilder for MangaChapterFolderBuilder {
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
        unimplemented!()
    }

    fn build(&self) -> FolderResult<Folder> {
        unimplemented!()
    }
}

#[cfg(test)]
mod test {

    use std::fs::File;

    use crate::{reader::test::FakeFactory, test_folder_builder};
    use tempdir::TempDir;

    use super::*;

    fn setup_manga_book() -> (MangaChapterFolderBuilder, Uri, TempDir) {
        let temp_dir = TempDir::new("Manga").unwrap();
        let uri = temp_dir.path();
        for i in 1..10 {
            let file = uri.clone();
            File::create(file.join(format!("{0}", i))).unwrap();
        }
        (
            MangaChapterFolderBuilder::new(Box::new(FakeFactory)),
            Uri::Local(uri.into()),
            temp_dir,
        )
    }

    test_folder_builder!(test_manga_book_folder_builder, { setup_manga_book() });
}
