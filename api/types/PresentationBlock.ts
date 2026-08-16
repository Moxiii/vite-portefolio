
export type PresentationBlock =
  | {
      id: string
      type: 'title'
      content: string
    }
  | {
      id: string
      type: 'paragraph'
      content: string
    }
  | {
      id: string
      type: 'list'
      content: string[]
    }
