import knex from 'knex'
const ssl = process.env.MYSQL_SSL === 'true' ? 'Amazon RDS' : false;
const options = {
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        pool: {
            min: 2,
            max: 10
        },
        ssl
    }
}
const Knex = knex(options)
export default Knex