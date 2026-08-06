export type MemoryIcon = 'heart' | 'message' | 'sunrise' | 'laugh' | 'moon' | 'sparkles'

export interface Memory {
  id: string
  date: string
  title: string
  description: string
  icon: MemoryIcon
}

export interface Reason {
  id: string
  title: string
  description: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
}

export interface Quote {
  id: string
  text: string
  author?: string
}

export interface ContentConfig {
  girlfriendName: string
  monthsaryDate: string
  relationshipStartDate: string
  hero: {
    title: string
    subtitle: string
    cta: string
  }
  memories: Memory[]
  reasons: Reason[]
  loveLetter: {
    greeting: string
    lines: string[]
    closing: string
    signature: string
  }
  gallery: GalleryImage[]
  quotes: Quote[]
  music: {
    src: string
    title: string
  }
  surprise: {
    buttonLabel: string
    message: string[]
  }
  footer: string
}
