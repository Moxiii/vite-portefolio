import { Request, Response } from 'express'
import Project from '../models/Project'

export async function getProjects(req: Request, res: Response) {
  try {
    const projects = await Project.find({ visible: true })

    res.status(200).json(projects)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to retrieve projects',
    })
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      visible: true,
    })

    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      })
    }

    res.status(200).json(project)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to retrieve project',
    })
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to create project',
    })
  }
}
export async function updateProject(req: Request, res: Response) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      })
    }
    res.status(200).json(project)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to update project',
    })
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      })
    }
    res.status(204).send()
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to delete project',
    })
  }
}
