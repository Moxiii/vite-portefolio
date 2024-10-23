import mysql from 'mysql2'

const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'maximelprojets' });

connection.connect((err) => {
  if (err) {console.error('Erreur de connexion : ' + err.stack);
    return;
  }
  console.log('Connecté en tant que id ' + connection.threadId);
});

export default connection