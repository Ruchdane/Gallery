use std::path::PathBuf;

#[derive(Debug, Clone)]
pub enum Uri {
    Local(PathBuf),
}

impl From<PathBuf> for Uri {
    fn from(v: PathBuf) -> Self {
        Self::Local(v)
    }
}

impl Uri {
    fn try_into_local(self) -> Result<PathBuf, Self> {
        match self {
            Self::Local(v) => Ok(v),
        }
    }
}
