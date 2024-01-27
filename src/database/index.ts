import * as SQLite from 'expo-sqlite'
import { sessionInsert } from '../data/objectTypes'

const db = SQLite.openDatabase('sessions.db')

export const init = () => {
   const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
         tx.executeSql(
            `CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL,
            email TEXT NOT NULL, token TEXT NOT NULL)`,
            [],
            (result) => resolve(result),
            (error) => {
               reject(error)
               return true
            }
            
         )
      })
   })
   return promise
}
export const insertSession = ({localId,email,token}: sessionInsert) => {
   const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
         tx.executeSql(
            `INSERT INTO sessions (localId,email,token) VALUES (?,?,?)`,
            [localId,email,token],
            (_,result) => resolve(result),
            (_,error) => {
               reject(error)
               return true
            }
            
         )
      })
   })
   return promise
}
export const fetchSession = ():Promise<SQLite.SQLResultSet> => {
   const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
      db.transaction(tx => {
         tx.executeSql(
            `SELECT * FROM sessions`,
            [],
            (_,result) => resolve(result),
            (_,error) => {
               reject(error)
               return true
            }
            
         )
      })
   })
   return promise
}
export const deleteSession = (localId: string): Promise<SQLite.SQLResultSet> => {
   const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
      db.transaction(tx => {
         tx.executeSql(
            `DELETE FROM sessions WHERE localId = ?`,
            [localId],
            (_,result) => resolve(result),
            (_,error) => {
               reject(error)
               return true
            }
            
         )
      })
   })
   return promise
}
export const deleteTable = (): Promise<SQLite.SQLResultSet> => {
   const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
      db.transaction(tx => {
         tx.executeSql(
            `DROP TABLE sessions`,
            [],
            (_,result) => resolve(result),
            (_,error) => {
               reject(error)
               return true
            }
            
         )
      })
   })
   return promise
}