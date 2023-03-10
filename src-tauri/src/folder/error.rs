#[derive(Debug, thiserror::Error)]
pub enum FolderError {
    #[error("Io error")]
    Io(#[from] std::io::Error),

    #[error("Unknown error")]
    IncompleteBuilding,

    #[error("Could not build name because :{0}")]
    NameBuilding(String),

    #[error("Could not build name because :{0}")]
    PathBuilding(String),

    #[error("Could not build name because :{0}")]
    SizeBuilding(String),

    #[error("Could not build name because :{0}")]
    CoverBuilding(String),
}

impl FolderError {
    /// Returns `true` if the folder error is [`NameBuilding`].
    ///
    /// [`NameBuilding`]: FolderError::NameBuilding
    #[must_use]
    pub fn is_name_building(&self) -> bool {
        matches!(self, Self::NameBuilding(..))
    }

    /// Returns `true` if the folder error is [`SizeBuilding`].
    ///
    /// [`SizeBuilding`]: FolderError::SizeBuilding
    #[must_use]
    pub fn is_size_building(&self) -> bool {
        matches!(self, Self::SizeBuilding(..))
    }

    /// Returns `true` if the folder error is [`CoverBuilding`].
    ///
    /// [`CoverBuilding`]: FolderError::CoverBuilding
    #[must_use]
    pub fn is_cover_building(&self) -> bool {
        matches!(self, Self::CoverBuilding(..))
    }

    /// Returns `true` if the folder error is [`IncompleteBuilding`].
    ///
    /// [`IncompleteBuilding`]: FolderError::IncompleteBuilding
    #[must_use]
    pub fn is_incomplete_building(&self) -> bool {
        matches!(self, Self::IncompleteBuilding)
    }

    /// Returns `true` if the folder error is [`Io`].
    ///
    /// [`Io`]: FolderError::Io
    #[must_use]
    pub fn is_io(&self) -> bool {
        matches!(self, Self::Io(..))
    }

    /// Returns `true` if the folder error is [`PathBuilding`].
    ///
    /// [`PathBuilding`]: FolderError::PathBuilding
    #[must_use]
    pub fn is_path_building(&self) -> bool {
        matches!(self, Self::PathBuilding(..))
    }
}
