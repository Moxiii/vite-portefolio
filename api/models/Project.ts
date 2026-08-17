import mongoose, { Schema, Document } from 'mongoose'
import { PresentationBlock } from '../types/PresentationBlock.ts'

export interface IProject extends Document {
  title: string
  description: string
  presentation: PresentationBlock[]

  technologies: {
    name: string
    icon: string
  }[]

  links: {
    name: string
    url: string
  }[]

  images: {
    isMock: boolean
    src: string
    title?: string
  }[]

  category: string[]
  visible: boolean

  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    presentation: {
      type: Schema.Types.Mixed,
      default: [],
    },

    technologies: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          icon: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },

    links: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },

    images: {
      type: [
        {
          isMock: {
            type: Boolean,
            default: false,
          },
          src: {
            type: String,
            required: true,
          },
          title: {
            type: String,
          },
        },
      ],
      default: [],
    },

    category: {
      type: [String],
      default: [],
    },

    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IProject>('Project', ProjectSchema)
