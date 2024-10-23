import projectsRoutes from './routes/projectRoutes.js'
import userRoutes from './routes/userRoutes.js'

import express from 'express'
const app = express();
const port = 3000

app.use(express.json());

app.use('/api/projects' , projectsRoutes);
app.use('/api/user' , userRoutes);

app.listen(port, ()=>{
  console.log(` App listening on port ${port}`)
})