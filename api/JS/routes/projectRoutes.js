import db from '../db.js'
import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
  const query = `
      SELECT p.id, p.title, p.description,
             i.src AS image_src, i.isMock AS image_isMock, i.title AS image_title
      FROM projects p
      LEFT JOIN images i ON p.id = i.project_id
      WHERE i.isMock = 1
  `;

  db.query(query, (err, results) => {
    
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Transformation des résultats pour le format désiré
    const projects = results.reduce((acc, row) => {
      const project = acc.find(p => p.id === row.id);
      if (project) {
        // Ajout des images si le projet existe déjà
        project.img.push({
          isMock: row.image_isMock,
          src: row.image_src,
          title: row.image_title
        });
      } else {
        // Créer un nouveau projet avec la première image
        acc.push({
          id: row.id,
          title: row.title,
          description: row.description,
          img: [{
            isMock: row.image_isMock,
            src: row.image_src,
            title: row.image_title
          }]
        });
      }
      return acc;
    }, []);

    res.json(projects);
  });
});

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  const query = `
      SELECT p.id, p.title, p.presentation, p.fini,p.deploy,
             i.src AS image_src, i.isMock AS image_isMock, i.title AS image_title,
             l.name AS link_name, l.url AS link_url,
             t.name as tech_name , t.icon as tech_icon
            
      FROM projects p
      LEFT JOIN images i ON p.id = i.project_id AND i.isMock = 0
      LEFT JOIN links l ON p.id = l.project_id
      LEFT JOIN technos t on p.id = t.project_id
      WHERE p.id = ?
  `;

  db.query(query, [projectId], (err, results) => {
    
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Si aucun projet n'est trouvé
    if (results.length === 0) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }

    // Transformation des résultats
    const project = {
      title: results[0].title,
      presentation: JSON.parse(results[0].presentation),
      links: [],
      img: [],
      technologies:[],
      fini:results[0].fini,
      deploy:results[0].deploy,
    };

    const uniqueLinks = new Set();
    const uniqueImages = new Set();
    const uniqueTech = new Set();

    results.forEach(row => {
      if (row.link_name && row.link_url) {
        const linkKey = `${row.link_name}_${row.link_url}`;
        if (!uniqueLinks.has(linkKey)) {
          uniqueLinks.add(linkKey);
          project.links.push({ name: row.link_name, url: row.link_url });
        }
      }

      if (row.image_src) {
        const imageKey = row.image_src;
        if (!uniqueImages.has(imageKey)) {
          uniqueImages.add(imageKey);
          project.img.push({ isMock: row.isMock, src: row.image_src, title: row.image_title });
        }
      }
      if(row.tech_name && row.tech_icon){
        const techKey = `${row.tech_name}_${row.tech_icon}`;
        if(!uniqueTech.has(techKey)){
          uniqueTech.add(techKey);
          project.technologies.push({name:row.tech_name,icon:row.tech_icon})
        }
      }
    });

    res.json(project);
  });
});

router.post('/', (req, res) => {
  const { title, description, presentation, fini, deploy, links, images } = req.body;

  // Insérer le projet principal
  db.query('INSERT INTO projects (title, description, presentation, fini, deploy) VALUES (?, ?, ?, ?, ?)',
    [title, description, JSON.stringify(presentation), fini, deploy],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const projectId = results.insertId;

      // Insérer les liens
      if (links && links.length > 0) {
        const linkQueries = links.map(link =>
          db.query('INSERT INTO links (project_id, name, url) VALUES (?, ?, ?)',
            [projectId, link.name, link.url])
        );

        Promise.all(linkQueries)
          .then(() => {
            // Insérer les images
            if (images && images.length > 0) {
              const imageQueries = images.map(image =>
                db.query('INSERT INTO images (project_id, src, title, isMock) VALUES (?, ?, ?, ?)',
                  [projectId, image.src, image.title, image.isMock])
              );

              Promise.all(imageQueries)
                .then(() => {
                  res.status(201).json({ id: projectId, title, description, presentation, fini, deploy, links, images });
                })
                .catch(err => res.status(500).json({ error: err.message }));
            } else {
              res.status(201).json({ id: projectId, title, description, presentation, fini, deploy, links });
            }
          })
          .catch(err => res.status(500).json({ error: err.message }));
      } else if (images && images.length > 0) {
        const imageQueries = images.map(image =>
          db.query('INSERT INTO images (project_id, src, title, isMock) VALUES (?, ?, ?, ?)',
            [projectId, image.src, image.title, image.isMock])
        );

        Promise.all(imageQueries)
          .then(() => {
            res.status(201).json({ id: projectId, title, description, presentation, fini, deploy, images });
          })
          .catch(err => res.status(500).json({ error: err.message }));
      } else {
        res.status(201).json({ id: projectId, title, description, presentation, fini, deploy });
      }
      
    });
});

router.put('/' ,(req,res)=>{
  const projectId = req.params.id;
  const { title, description, presentation, fini, deploy } = req.body;

  const updates = [];
  const params = [];

  if (title) {
    updates.push('title = ?');
    params.push(title);
  }
  if (description) {
    updates.push('description = ?');
    params.push(description);
  }
  if (presentation) {
    updates.push('presentation = ?');
    params.push(JSON.stringify(presentation));
  }
  if (fini) {
    updates.push('fini = ?');
    params.push(fini);
  }
  if (deploy) {
    updates.push('deploy = ?');
    params.push(deploy);
  }

  // Si aucun champ à mettre à jour
  if (updates.length === 0) {
    return res.status(400).json({ error: 'Aucun champ à mettre à jour.' });
  }

  params.push(projectId);

  const query = `UPDATE projects SET ${updates.join(', ')} WHERE id = ?`;

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }

    res.json({ message: 'Projet mis à jour' });
  });
})

router.delete('/:id' ,(req,res)=>{
  const projectId = req.params.id;

  // Supprimer d'abord les liens et les images associés
  db.query('DELETE FROM links WHERE project_id = ?', [projectId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.query('DELETE FROM images WHERE project_id = ?', [projectId], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Supprimer le projet
      db.query('DELETE FROM projects WHERE id = ?', [projectId], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Projet non trouvé' });
        }
        
        res.json({ message: 'Projet supprimé' });
      });
    });
  });
} );

export default router