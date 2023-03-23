use super::FolderBuildStep;

#[derive(Debug, thiserror::Error)]
pub enum FolderError {
    #[error("Io error")]
    Io(#[from] std::io::Error),

    #[error("Build failed at {0:?} because {1}")]
    IncompleteBuilding(FolderBuildStep, String),
}

impl FolderError {
    /// Returns `true` if the folder error is [`IncompleteBuilding`].
    ///
    /// [`IncompleteBuilding`]: FolderError::IncompleteBuilding
    pub fn is_incomplete_building(&self) -> bool {
        matches!(self, Self::IncompleteBuilding(_, _))
    }

    /// Returns `true` if the folder error is [`Io`].
    ///
    /// [`Io`]: FolderError::Io
    pub fn is_io(&self) -> bool {
        matches!(self, Self::Io(..))
    }
}
