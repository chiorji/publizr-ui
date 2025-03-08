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
  category: number
  poster_card: null | File
  featured: boolean
  tags: string
  status: PostStatus
  excerpt?: string
}

export interface NewPostRequest extends NewPostFormData {
  author_id: number
}

export interface NewPostErrors {
  title?: string;
  content?: string;
  category?: string;
  [key: string]: string | undefined;
}

export interface UpdatePostRequest {
  title: string
  content: string
  tags: string
  category: number
  status: string
  author_id: number
  id: number
  excerpt?: string
}
export type DeletePostParams = Pick<UpdatePostRequest, 'author_id' | 'id'>;