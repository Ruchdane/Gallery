use crate::galery::GaleryError;

#[derive(Debug, thiserror::Error, serde::Serialize)]
pub enum Error {
    #[error(transparent)]
    Galery(#[from] GaleryError),
    #[error("Unknown error")]
    Other(String),
}
impl From<std::io::Error> for Error {
    fn from(value: std::io::Error) -> Self {
        Error::Other(value.to_string())
    }
}
