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
pub struct MangaBookFolderBuilder {
    factory: Box<dyn ArticleComponentFactory>,
    name: Option<String>,
    path: Option<Uri>,
    size: Option<u32>,
    cover: Option<Uri>,
}

impl MangaBookFolderBuilder {
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

impl FolderBuilder for MangaBookFolderBuilder {
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
        todo!()
    }

    fn build(&self) -> FolderResult<Folder> {
        todo!()
    }
}

#[cfg(test)]
mod test {

    use std::fs::{create_dir, File};

    use crate::{reader::test::FakeFactory, test_folder_builder};
    use tempdir::TempDir;

    use super::*;

    fn setup_manga_book() -> (MangaBookFolderBuilder, Uri, TempDir) {
        let temp_dir = TempDir::new("Manga").unwrap();
        let uri = temp_dir.path();
        for i in 1..10 {
            let dir = uri.clone();
            create_dir(dir.join(format!("{0}", i))).unwrap();
            for i in 1..10 {
                let file = dir.clone();
                File::create(file.join(format!("{0}", i))).unwrap();
            }
        }
        (
            MangaBookFolderBuilder::new(Box::new(FakeFactory)),
            Uri::Local(uri.into()),
            temp_dir,
        )
    }

    test_folder_builder!(test_manga_chapter_folder_builder, { setup_manga_book() });
}
