export interface PoemStanza {
  lines: string[]
}

export interface ContentConfig {
  title: string
  monthsaryDateLabel: string
  dedication: string
  poem: {
    title: string
    stanzas: PoemStanza[]
  }
  music: {
    src: string
    title: string
  }
  closing: {
    signature: string
  }
  moment: {
    caption: string
    gifSrc: string
  }
  blog: {
    title: string
    date: string
    lede: string
    paragraphs: string[]
  }
}
