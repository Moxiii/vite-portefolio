import { Router } from 'express'
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller'
import requireAuth from '../middleware/auth.middleware'
import { validateBody } from '../middleware/validateBody'

import { projectSchema, updateProjectSchema } from '../schemas/ProjectSchemas'
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
