#[macro_export]
macro_rules! unwrap_or_return {
    ( $e:expr,$d:expr ) => {
        match $e {
            Ok(x) => x,
            Err(_) => return $d,
        }
    };
}
macro_rules! unwrap_or_return_to_string {
    ( $e:expr ) => {
        match $e {
            Ok(x) => x,
            Err(err) => return Err(err.to_string()),
        }
    };
}
pub(crate) use unwrap_or_return_to_string;
