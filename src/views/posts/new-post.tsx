import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Image, Tags, AlertCircle } from 'lucide-react';
import { NewPostFormData, Errors, PostCategoryDefinition } from '../../types/post-types';
import { useCreatePostMutation } from '../../app/api/post-slice';

const BlogCreationForm = () => {
  const [formData, setFormData] = useState<NewPostFormData>({
    title: 'Post title',
    subtitle: 'Post subtitle or excerpt',
    category: 'Architecture',
    tags: ['programming', 'hacking'],
    content: 'Here lies the post content. Lorem ipsum dolor sit amet tempor invidunt ut labore et dolore magna aliqu sapiente consequ sed diam nonumy eirmod tempor invidunt ut labore et dol',
    image_url: null,
    is_draft: false
  });

  const navigate = useNavigate();
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [createHandler, { isLoading }] = useCreatePostMutation();

  const categories: PostCategoryDefinition[] = [
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: Errors) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, cover_image: file }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev: NewPostFormData) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
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

      createHandler(formData).then((response) => {
        if (response && response.data) {
          console.log('Post created successfully:', response);
          // Reset form and clear errors
          setFormData({
            title: '',
            subtitle: '',
            category: '' as PostCategoryDefinition,
            tags: [],
            content: '',
            image_url: null,
            is_draft: false
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
          <CardTitle>Create New Blog Post</CardTitle>
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
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                Subtitle
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a subtitle (optional)"
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
                {formData.tags.map(tag => (
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
              <label htmlFor="cover-image" className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {preview ? (
                    <div className="relative">
                      <img
                        src={typeof preview === 'string' ? preview : undefined}
                        alt="Preview"
                        className="mx-auto h-32 w-auto"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setFormData(prev => ({ ...prev, cover_image: null }));
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="cover-image"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="cover-image"
                            name="cover-image"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </>
                  )}
                </div>
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
                onClick={() => setFormData(prev => ({ ...prev, is_draft: true }))}
                className="px-4 py-2 rounded-md bg-red-400 hover:bg-red-600 text-white"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={isLoading}
                onClick={() => setFormData(prev => ({ ...prev, is_draft: false }))}
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

export default BlogCreationForm;