// use rusqlite::{params, Connection};
// pub struct Db {
//     conn: Connection,
// }

// impl Db {
//     fn setup(&self) -> Result<()> {
//         self.conn.execute(
//             "CREATE TABLE directory (
//             id   INTEGER PRIMARY KEY,
//             path TEXT NOT NULL,
//             last_modified DATETIME
//         )",
//             params![],
//         )
//         Ok(())
//     }
// }
