import mysql from 'mysql2'

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'maximelprojets' ,
  waitForConnections : true ,
  connectionLimit: 10,
  queueLimit : 10
});


export default connection