export type PostCategoryDefinition = 'Technology' | 'Programming' | 'Design' | 'Career' | 'Productivity' | 'Tutorial' | 'Architecture' | 'Development' | 'Best Practices';

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  read_time: string;
  category: PostCategoryDefinition;
  image_url: File | string | null ;
  featured?: boolean;
  tags: string[];
  content: string;
  status: 'draft' | 'published';
}

export interface NewPostFormData {
  title: string;
  subtitle: string;
  category: PostCategoryDefinition;
  tags: string[];
  content: string;
  image_url: File | null;
  is_draft: boolean;
}

export interface Errors {
  title?: string;
  content?: string;
  category?: string;
  [key: string]: string | undefined;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Getting Started with React: A Beginner's Guide",
    excerpt: "Learn the fundamentals of React, from components to hooks. This comprehensive guide will take you from novice to confident React developer.",
    content: "This is the content of the post.",
    author: "Sarah Johnson",
    date: "2025-01-28",
    read_time: "8 min read",
    category: "Development",
    image_url: "https://unsplash.com/photos/the-sun-is-setting-under-a-pier-at-the-beach-ZuLQbR3-BUk",
    featured: true,
    tags: ["React", "JavaScript", "Beginner"],
    status: 'published'
  },
  {
    id: 2,
    title: "10 Tips for Better State Management",
    excerpt: "State management can be tricky. Here are 10 battle-tested tips to help you manage state more effectively in your React applications.",
    content: "This is the content of the post.",
    author: "Mike Chen",
    date: "2025-01-25",
    read_time: "5 min read",
    category: "Best Practices",
    image_url: "https://unsplash.com/photos/the-sun-is-setting-under-a-pier-at-the-beach-ZuLQbR3-BUk",
    featured: false,
    tags: ["React", "JavaScript", "State Management"],
    status: 'published'
  },
  {
    id: 3,
    title: "Building Scalable Applications",
    excerpt: "Discover the architecture patterns and best practices that help you build applications that can grow with your user base.",
    content: "This is the content of the post.",
    author: "Alex Rivera",
    date: "2025-01-22",
    read_time: "12 min read",
    category: "Architecture",
    image_url: "https://unsplash.com/photos/the-sun-is-setting-under-a-pier-at-the-beach-ZuLQbR3-BUk",
    featured: false,
    tags: ["React", "JavaScript", "Scalability"],
    status: 'published'
  },
  {
    id: 4,
    title: 'A Day in the Life of a Hacker',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut neque vel neque ultricies semper. Nullam tempor, ex ut bibendum volutpat, enim velit pellentesque ipsum, at consectetur enim nunc nec turpis. Aliquam erat volutpat. Nulla facilisi.',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut neque vel neque ultricies semper. Nullam tempor, ex ut bibendum volutpat, enim velit pellentesque ipsum, at consectetur enim nunc nec turpis. Aliquam erat volutpat. Nulla facilisi.`,
    image_url: 'https://unsplash.com/photos/the-sun-is-setting-under-a-pier-at-the-beach-ZuLQbR3-BUk',
    author: 'John Doe',
    date: '2021-01-25',
    read_time: '3 minutes',
    category: 'Technology',
    tags: ['programming', 'hacking'],
    status: 'published'
  },
  {
    id: 5,
    title: "Getting Started with React: A Beginner's Guide",
    excerpt: "Learn the fundamentals of React, from components to hooks. This comprehensive guide will take you from novice to confident React developer.",
    content: "This is the content of the post.",
    image_url: 'https://unsplash.com/photos/a-couple-of-palm-trees-sitting-next-to-each-other-QNb02C_HyxQ',
    author: 'John Doe',
    date: '2021-01-25',
    read_time: '3 minutes',
    category: 'Technology',
    tags: ['react', 'javascript'],
    status: 'published'
  },
  {
    id: 6,
    title: "10 Tips for Better State Management",
    excerpt: "State management can be tricky. Here are 10 battle-tested tips to help you manage state more effectively in your React applications.",
    content: "This is the content of the post.",
    image_url: 'https://unsplash.com/photos/a-couple-of-palm-trees-sitting-next-to-each-other-QNb02C_HyxQ',
    author: 'Jane Smith',
    date: '2021-01-20',
    read_time: '2 minutes',
    category: 'Development',
    tags: ['state management', 'react'],
    status: 'draft'
  }
];