#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("Io error")]
    Io(#[from] std::io::Error),

    #[error("Unknown error")]
    Other(String),
}
impl From<Error> for String {
    fn from(value: Error) -> Self {
        value.to_string()
    }
}
