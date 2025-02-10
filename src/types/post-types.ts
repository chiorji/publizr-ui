export interface Post {
  username: string
  author_id: number
  post_id: number
  title: string
  excerpt: string
  content: string
  posted_on: string
  last_updated: string
  category: string
  tags: string
  poster_card: string
  status: string
  featured: boolean
  read_time?: number
}
export interface NewPostFormData {
  title: string
  content: string
  author_id: number
  category: string
  poster_card: string
  featured: boolean
  tags: string
  status: string
  excerpt?: string
}

export interface Errors {
  title?: string;
  content?: string;
  category?: string;
  [key: string]: string | undefined;
}

export interface GetResponse<T> {
  success: boolean
  message: string
  data: T
  size: number
}
