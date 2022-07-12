# DB Module 

## Usage

``` JS
const setupDatabase = require('database_name')

setupDabase(config).then(db = >{
    const {Agent, Metric } = db

}).catch(err => console.error(err))

``` 

# para ejecutar coomando con variables de entorno manejarlo de la siguiente forma( set DB_PASS='foo' && npm run setup)