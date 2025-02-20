const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

module.exports = (on, config) => {
  on('task', {
    resetDb() {
      const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.DB_HOST || 'localhost',
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: 5432,
      })

      return client
        .connect()
        .then(() => {
          let initFilePath = path.join(__dirname, '../../../init.sql')
          try {
            fs.accessSync(initFilePath)
          } catch {
            initFilePath = path.join(__dirname, '../../init.sql')
          }
          const initSql = fs.readFileSync(initFilePath, 'utf8')
          return client.query(initSql)
        })
        .then(() => client.end())
        .then(() => {
          console.log('Tietokanta alustettu.')
          return null
        })
        .catch((err) => {
          console.error('Virhe tietokantaa alustettaessa', err)
          throw err
        })
    },
  })

  return config
}
