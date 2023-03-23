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
        };
        panic!("Folder Director try builded while builder not ready")
    }
}

#[test]
fn test_folder_director_constructs_folder_using_builder() {
    let builder = MockBuilder::default();
    let mut direcor = FolderDirector::new(builder);
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

// assert that the build failed at this step
pub fn assert_incomplete_building_at(step: FolderBuildStep, error: &FolderError) {
    match error {
        FolderError::IncompleteBuilding(s, _) if *s == step => {}
        _ => panic!(
            "Expected IncompleteBuilding error at step {:?}, got {:?}",
            step, error
        ),
    }
}

//  create an error at
fn incomplet_building_at(step: FolderBuildStep) -> FolderError {
    FolderError::IncompleteBuilding(step, "".to_string())
}

impl FolderBuilder for FaultyBuilder {
    fn build_name(&mut self, uri: &Uri) -> Result<&mut Self> {
        if !self.name {
            Ok(self)
        } else {
            Err(incomplet_building_at(FolderBuildStep::Name))
        }
    }

    fn build_path(&mut self, uri: &Uri) -> Result<&mut Self> {
        if !self.path {
            Ok(self)
        } else {
            Err(incomplet_building_at(FolderBuildStep::Path))
        }
    }

    fn build_size(&mut self, uri: &Uri) -> Result<&mut Self> {
        if !self.size {
            Ok(self)
        } else {
            Err(incomplet_building_at(FolderBuildStep::Size))
        }
    }

    fn build_cover(&mut self, uri: &Uri) -> Result<&mut Self> {
        if !self.cover {
            Ok(self)
        } else {
            Err(incomplet_building_at(FolderBuildStep::Cover))
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
    let mut director = FolderDirector::new(builder);
    let uri = Uri::Local(PathBuf::new());
    let result = director.construct(&uri);
    assert!(result.is_err());
    match result.unwrap_err() {
        FolderError::IncompleteBuilding(step, _) => assert_eq!(step, FolderBuildStep::Name),
        _ => panic!("Expected Incomplete Building error"),
    }
}

#[test]
fn test_folder_director_construct_fails_when_building_path_fails() {
    let builder = FaultyBuilder {
        name: false,
        path: true,
        size: false,
        cover: false,
    };
    let mut director = FolderDirector::new(builder);
    let uri = Uri::Local(PathBuf::new());
    let result = director.construct(&uri);
    assert!(result.is_err());
    assert_incomplete_building_at(FolderBuildStep::Path, &result.err().unwrap())
}

#[test]
fn test_folder_director_construct_fails_when_building_size_fails() {
    let builder = FaultyBuilder {
        name: false,
        path: false,
        size: true,
        cover: false,
    };
    let mut director = FolderDirector::new(builder);
    let uri = Uri::Local(PathBuf::new());
    let result = director.construct(&uri);
    assert!(result.is_err());
    assert_incomplete_building_at(FolderBuildStep::Path, &result.err().unwrap())
}

#[test]
fn test_folder_director_construct_fails_when_building_cover_fails() {
    let builder = FaultyBuilder {
        name: false,
        path: false,
        size: false,
        cover: true,
    };
    let mut director = FolderDirector::new(builder);
    let uri = Uri::Local(PathBuf::new());
    let result = director.construct(&uri);
    assert!(result.is_err());
    assert_incomplete_building_at(FolderBuildStep::Path, &result.err().unwrap())
}

#[macro_export]
macro_rules! test_folder_builder {
    ($prefix:ident, $info: expr) => {
        mod $prefix {
            use super::*;
            use crate::folder::test::assert_incomplete_building_at;
            use crate::folder::*;

            #[test]
            fn test_is_not_ready_when_name_not_called() {
                let (mut builder, uri, temp) = $info;
                builder.build_path(&uri).unwrap();
                builder.build_size(&uri).unwrap();
                builder.build_cover(&uri).unwrap();
                assert_eq!(builder.is_ready(), false);
            }

            #[test]
            fn test_is_not_ready_when_path_not_called() {
                let (mut builder, uri, temp) = $info;
                builder.build_name(&uri).unwrap();
                builder.build_size(&uri).unwrap();
                builder.build_cover(&uri).unwrap();
                assert_eq!(builder.is_ready(), false);
            }

            #[test]
            fn test_is_not_ready_when_size_not_called() {
                let (mut builder, uri, temp) = $info;
                builder.build_name(&uri).unwrap();
                builder.build_path(&uri).unwrap();
                builder.build_cover(&uri).unwrap();
                assert_eq!(builder.is_ready(), false);
            }

            #[test]
            fn test_is_not_ready_when_cover_not_called() {
                let (mut builder, uri, temp) = $info;
                builder.build_name(&uri).unwrap();
                builder.build_path(&uri).unwrap();
                builder.build_size(&uri).unwrap();
                assert_eq!(builder.is_ready(), false);
            }

            #[test]
            fn test_build_fail_when_name_not_called() {
                let (mut builder, uri, temp) = $info;
                builder.build_path(&uri).unwrap();
                builder.build_size(&uri).unwrap();
                builder.build_cover(&uri).unwrap();
                assert_incomplete_building_at(FolderBuildStep::Name, &builder.build().unwrap_err());
            }

            #[test]
            fn test_build_fail_when_path_not_called() {
                let (mut builder, uri, temp) = $info;
                builder.build_name(&uri).unwrap();
                builder.build_size(&uri).unwrap();
                builder.build_cover(&uri).unwrap();
                assert_incomplete_building_at(FolderBuildStep::Path, &builder.build().unwrap_err());
            }

            #[test]
            fn test_build_fail_when_size_not_called() {
                let (mut builder, uri, temp) = $info;
                builder.build_name(&uri).unwrap();
                builder.build_path(&uri).unwrap();
                builder.build_cover(&uri).unwrap();
                assert_incomplete_building_at(FolderBuildStep::Size, &builder.build().unwrap_err());
            }
        }
    };
}
