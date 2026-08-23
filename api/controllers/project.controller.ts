import { response, type Request, type Response } from 'express'
import Project from '../models/Project.ts'
import mongoose from 'mongoose'
export async function getProjects(req: Request, res: Response) {
  console.log('🔥 GET ALL PROJECTS')
  try {
    const projects = await Project.find()

    res.status(200).json(projects)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to retrieve projects',
    })
  }
}
export async function getPublicProjects(req: Request, res: Response) {
  console.log('🔥 GET VISIBLE PROJECTS')
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
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid project id',
    })
  }
  try {
    const project = await Project.findById(id)

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
