use std::path::PathBuf;

use crate::folder::error::FolderError;

use super::*;

#[derive(Default, Clone, Debug, PartialEq, Eq)]
struct MockBuilder {
    name: bool,
    path: bool,
    size: bool,
    cover: bool,
}

fn folder_default() -> Folder {
    Folder::new(
        "".to_string(),
        Uri::Local(PathBuf::new()),
        0,
        Uri::Local(PathBuf::new()),
    )
}

#[test]
fn test_folder_director_new_sets_builder() {
    let builder = MockBuilder::default();
    let director = FolderDirector::new(builder.clone());
    assert_eq!(&builder, &director.0)
}

impl FolderBuilder for MockBuilder {
    fn build_name(&mut self, uri: &Uri) -> Result<&mut Self> {
        self.name = true;
        Ok(self)
    }

    fn build_path(&mut self, uri: &Uri) -> Result<&mut Self> {
        self.path = true;
        Ok(self)
    }

    fn build_size(&mut self, uri: &Uri) -> Result<&mut Self> {
        self.size = true;
        Ok(self)
    }

    fn build_cover(&mut self, uri: &Uri) -> Result<&mut Self> {
        self.cover = true;
        Ok(self)
    }

    fn is_ready(&self) -> bool {
        self.name && self.path && self.size && self.cover
    }

    fn build(&self) -> Result<Folder> {
        if self.is_ready() {
            return Ok(folder_default());
        }
        Err(FolderError::IncompleteBuilding)
    }
}

#[test]
fn test_folder_director_constructs_folder_using_builder() {
    let builder = MockBuilder::default();
    let direcor = FolderDirector::new(builder);
    let uri = Uri::Local(PathBuf::new());
    let result = direcor.construct(&uri);
    assert!(result.is_ok())
}

// return an error if the bool value is set to true
struct FaultyBuilder {
    name: bool,
    path: bool,
    size: bool,
    cover: bool,
}

impl FolderBuilder for FaultyBuilder {
    fn build_name(&mut self, uri: &Uri) -> Result<&mut Self> {
        if !self.name {
            Ok(self)
        } else {
            Err(FolderError::NameBuilding("foo".to_string()))
        }
    }

    fn build_path(&mut self, uri: &Uri) -> Result<&mut Self> {
        if !self.path {
            Ok(self)
        } else {
            Err(FolderError::PathBuilding("foo".to_string()))
        }
    }

    fn build_size(&mut self, uri: &Uri) -> Result<&mut Self> {
        if !self.size {
            Ok(self)
        } else {
            Err(FolderError::SizeBuilding("foo".to_string()))
        }
    }

    fn build_cover(&mut self, uri: &Uri) -> Result<&mut Self> {
        if !self.cover {
            Ok(self)
        } else {
            Err(FolderError::CoverBuilding("foo".to_string()))
        }
    }

    fn is_ready(&self) -> bool {
        true
    }

    fn build(&self) -> Result<Folder> {
        Ok(folder_default())
    }
}

#[test]
fn test_folder_director_construct_fails_when_building_name_fails() {
    let builder = FaultyBuilder {
        name: true,
        path: false,
        size: false,
        cover: false,
    };
    let director = FolderDirector::new(builder);
    let uri = Uri::Local(PathBuf::new());
    let result = director.construct(&uri);
    assert!(result.is_err());
    assert!(result.unwrap_err().is_name_building());
}

#[test]
fn test_folder_director_construct_fails_when_building_path_fails() {
    let builder = FaultyBuilder {
        name: false,
        path: true,
        size: false,
        cover: false,
    };
    let director = FolderDirector::new(builder);
    let uri = Uri::Local(PathBuf::new());
    let result = director.construct(&uri);
    assert!(result.is_err());
    assert!(result.unwrap_err().is_path_building());
}

#[test]
fn test_folder_director_construct_fails_when_building_size_fails() {
    let builder = FaultyBuilder {
        name: false,
        path: false,
        size: true,
        cover: false,
    };
    let director = FolderDirector::new(builder);
    let uri = Uri::Local(PathBuf::new());
    let result = director.construct(&uri);
    assert!(result.is_err());
    assert!(result.unwrap_err().is_size_building());
}

#[test]
fn test_folder_director_construct_fails_when_building_cover_fails() {
    let builder = FaultyBuilder {
        name: false,
        path: false,
        size: false,
        cover: true,
    };
    let director = FolderDirector::new(builder);
    let uri = Uri::Local(PathBuf::new());
    let result = director.construct(&uri);
    assert!(result.is_err());
    assert!(result.unwrap_err().is_cover_building());
}
