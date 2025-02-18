import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Tags, AlertCircle } from 'lucide-react';
import { NewPostFormData, Errors } from '../../types/post-types';
import { useCreatePostMutation } from '../../app/api/post-slice';

const Publish = () => {
  const [formData, setFormData] = useState<NewPostFormData>({
    author_id: 1,
    title: 'Post title',
    excerpt: 'Post subtitle or excerpt',
    category: 'Technology',
    tags: 'programming, hacking',
    content: 'Here lies the post content. Lorem ipsum dolor sit amet tempor invidunt ut labore et dolore magna aliqu sapiente consequ sed diam nonumy eirmod tempor invidunt ut labore et dol',
    poster_card: '',
    status: 'DRAFT',
    featured: false
  });

  const navigate = useNavigate();
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [createHandler, { isLoading }] = useCreatePostMutation();

  const categories: string[] = [
    'Technology',
    'Programming',
    'Design',
    'Career',
    'Productivity',
    'Tutorial',
    'Architecture',
    'Best Practices',
    'Development'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: NewPostFormData) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev: Errors) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTagAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData((prev: NewPostFormData) => ({
        ...prev,
        tags: prev.tags.concat(currentTag.trim())
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.split(',').filter(tag => tag.trim() !== tagToRemove).join(',')
    }));
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {

      createHandler({
        ...formData,
        tags: formData.tags
      }).then((response) => {
        if (response && response.data) {
          console.log('Post created successfully:', response);
          setFormData({
            title: '',
            excerpt: '',
            category: '',
            tags: '',
            content: '',
            poster_card: '',
            status: 'DRAFT',
            author_id: 1,
            featured: false
          });
          setErrors({});
          navigate('/posts')
        }
      }).catch((e) => {
        console.error('Failed to create post' + e);
        setErrors((prev: Errors) => ({ ...prev, serverError: 'Failed to create post. Please try again later.' }));
      });
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your blog post title"
              />
              {errors.title && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.title}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                Excerpt
              </label>
              <input
                type="text"
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter an excerpt (optional)"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.category}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add tags"
                />
                <button
                  onClick={handleTagAdd}
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Tags className="h-4 w-4 mr-2" />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.split(',').map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog post content here..."
              />
              {errors.content && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.content}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setFormData(prev => ({ ...prev, status: 'Draft' }))}
                className="px-4 py-2 rounded-md bg-red-400 hover:bg-red-600 text-white"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={isLoading}
                onClick={() => setFormData(prev => ({ ...prev, status: 'Published' }))}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Publish
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Publish;