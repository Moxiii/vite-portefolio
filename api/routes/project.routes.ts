import { Router } from 'express'
import {
  getProjects,
  getPublicProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.ts'
import requireAuth from '../middleware/auth.middleware.ts'
import { validateBody } from '../middleware/validateBody.ts'

import {
  projectSchema,
  updateProjectSchema,
} from '../schemas/ProjectSchemas.ts'
const router = Router()

router.get('/public', getPublicProjects)
router.get('/', requireAuth, getProjects)

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
