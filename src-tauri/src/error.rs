#[macro_export]
macro_rules! unwrap_or_return {
    ( $e:expr,$d:expr ) => {
        match $e {
            Ok(x) => x,
            Err(_) => return $d,
        }
    };
}
