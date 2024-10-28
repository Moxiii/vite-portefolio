import db from '../db.js'
import express from 'express'
import bcrypt from 'bcrypt';



const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get('/', (req, res) => {
  db.query('SELECT id, username FROM user', (err, results) => {
    
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); // Retourne tous les utilisateurs sans mot de passe
  });
});

// Route pour récupérer un utilisateur par ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT id, username FROM user WHERE id = ?', [userId], (err, results) => {
    
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    res.json(results[0]);
  });
});

// Route pour s'inscrire
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  db.query('SELECT * FROM user WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) return res.status(400).json({ error: 'L\'utilisateur existe déjà.' });

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données
    db.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
      
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, username });
    });
  });
});

// Route pour se connecter
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe
  db.query('SELECT * FROM user WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });

    const user = results[0];

    // Vérifier le mot de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });

    res.json({ message: 'Connexion réussie', userId: user.id });
  });
});

// Route pour supprimer un utilisateur
router.delete('/:id', (req, res) => {
  const userId = req.params.id;

  db.query('DELETE FROM user WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

    res.json({ message: 'Utilisateur supprimé.' });
  });
});

export default router;
