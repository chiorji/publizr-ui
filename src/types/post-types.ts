export type PostStatus = 'Draft' | 'Published' | 'Archived';

export interface Post {
  username: string
  author_id: number
  id: number
  title: string
  excerpt: string
  content: string
  posted_on: number
  last_updated: number
  category: string
  tags: string
  url: string
  status: string
  featured: boolean
  read_time: number
}
export interface NewPostFormData {
  title: string
  content: string
  category: string
  poster_card: null | File
  featured: boolean
  tags: string[]
  status: PostStatus
  excerpt?: string
}

export interface NewPostRequest {
  title: string
  content: string
  author_id: number
  category: string
  poster_card: null | File
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
