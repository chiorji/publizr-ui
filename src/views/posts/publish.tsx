import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Image, Tags, AlertCircle } from 'lucide-react';
import { NewPostFormData, NewPostErrors, NewPostRequest } from '../../types/post-types';
import { usePublishPostMutation } from '../../app/api-upload';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useToast } from '../../components/ui/toast/toast-context';
import { processRequestError } from '../../lib';
import { useGetAllCategories } from '../../hooks/category-hook';

const Publish = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');
  const [formData, setFormData] = useState<NewPostFormData>({
    title: 'Hello',
    excerpt: 'excerpt',
    category: 1,
    tags: ['java'],
    content: 'Content',
    poster_card: null,
    status: 'Published',
    featured: false
  });
  const toast = useToast();
  const navigate = useNavigate();
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<NewPostErrors>({});
  const [createHandler, { isLoading }] = usePublishPostMutation();
  const { data: categories } = useGetAllCategories();
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, poster_card: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: NewPostFormData) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev: NewPostErrors) => ({ ...prev, [name]: undefined }));
    }
  };

  interface HandleTagAddEvent extends React.MouseEvent<HTMLButtonElement> { }

  const handleTagAdd = (e: HandleTagAddEvent) => {
    e.preventDefault();
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
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

  const validateForm = (): NewPostErrors => {
    const newErrors: NewPostErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.poster_card) newErrors.poster_card = "Please provide cover image for post"
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      const payload = new FormData();
      (Object.keys(formData) as (keyof NewPostFormData)[]).forEach((k) => {
        payload.append(k, formData[k] as any);
      });
      payload.delete("tags");
      payload.append("tags", formData.tags.join(', '))
      payload.append("author_id", `${user.id}`);
      createHandler(payload as unknown as NewPostRequest).unwrap().then(() => {
        setFormData({
          title: '',
          excerpt: '',
          category: 1,
          tags: [],
          content: '',
          poster_card: null,
          status: 'Draft',
          featured: false
        });
        setErrors({});
        toast.open({
          message: 'Post created successfully',
          variant: "success",
        });
        navigate('/dashboard')
      }).catch((e) => {
        toast.open({
          message: processRequestError(e, 'Failed to create post. Please try again later.'),
          variant: "destructive",
        });
      });
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
                  <option key={category.value} value={category.value}>{category.label}</option>
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
                {formData.tags.map((tag: string) => (
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
                          setFormData(prev => ({ ...prev, poster_card: null }));
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
                          htmlFor="poster_card"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="poster_card"
                            name="poster_card"
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
              {errors.poster_card && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.poster_card}</AlertDescription>
                </Alert>
              )}
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
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <div className="flex items-center space-x-4">
                <label className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer ${formData.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-white text-gray-700'}`}>
                  <input
                    type="radio"
                    name="status"
                    value="Draft"
                    checked={formData.status === 'Draft'}
                    onChange={() => setFormData(prev => ({ ...prev, status: 'Draft' }))}
                    className="hidden"
                  />
                  <span>Draft</span>
                </label>
                <label className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer ${formData.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-white text-gray-700'}`}>
                  <input
                    type="radio"
                    name="status"
                    value="Published"
                    checked={formData.status === 'Published'}
                    onChange={() => setFormData(prev => ({ ...prev, status: 'Published' }))}
                    className="hidden"
                  />
                  <span>Publish</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                disabled={isLoading}
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