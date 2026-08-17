import { Router } from 'express'
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js'
import requireAuth from '../middleware/auth.middleware.js'
import { validateBody } from '../middleware/validateBody.js'

import { projectSchema, updateProjectSchema } from '../schemas/ProjectSchemas.js'
const router = Router()

router.get('/', getProjects)
router.get('/:id', getProjectById)

router.post('/', requireAuth, validateBody(projectSchema), createProject)

router.put(
  '/:id',
  requireAuth,
  validateBody(updateProjectSchema),
  updateProject
)
router.delete('/:id', requireAuth, deleteProject)

export default router
