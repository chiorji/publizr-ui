import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Tags } from 'lucide-react';
import { NewPostFormData, NewPostErrors, NewPostRequest } from '../../types/post-types';
import { usePublishPostMutation } from '../../app/api-upload';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../../components/ui/toast/toast-context';
import { imageExtensions, processRequestError } from '../../lib';
import { useGetAllCategories } from '../../hooks/category-hook';
import { resetNewPostFormValues } from '../../app/states/post-state';
import { RadioInput, SelectField, TextAreaInput, TextInput } from '../../components/ui/input';
import { FileUploader } from '../../lib/file-uploader';

const Publish = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const { currentPost } = useSelector((state: RootState) => state.postSlice);
  const [formData, setFormData] = useState<NewPostFormData>(currentPost);
  const toast = useToast();
  const navigate = useNavigate();
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<NewPostErrors>(Object);

  const [createHandler, { isLoading }] = usePublishPostMutation();
  const { data: categories } = useGetAllCategories();

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

    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return false;
    }

    const payload = new FormData();
    (Object.keys(formData) as (keyof NewPostFormData)[]).forEach((k) => {
      payload.append(k, formData[k] as any);
    });
    payload.delete("tags");
    payload.append("tags", formData.tags.join(', '))
    payload.append("author_id", `${user.id}`);

    createHandler(payload as unknown as NewPostRequest).unwrap().then(() => {
      dispatch(resetNewPostFormValues());
      setErrors({});
      toast.open({
        message: 'Successful',
        variant: "success",
      });
      navigate('/dashboard')
    }).catch((e) => {
      toast.open({
        message: processRequestError(e, 'Failed to create post. Please try again later.'),
        variant: "destructive",
      });
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
              label='Title *'
              error={errors.title}
              placeholder="Enter your blog post title"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <TextInput
              label='Excerpt'
              placeholder="Enter an excerpt (optional)"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
            />

            <SelectField
              id="category"
              name="category"
              selectedValue={formData.category}
              onChange={handleInputChange}
              label='Category *'
              error={errors.category}
              options={categories}
            />

            <TextInput
              label='Tags'
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add tags"
              suffix={
                <button
                  onClick={handleTagAdd}
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Tags className="h-4 w-4 mr-2" />
                  Add
                </button>
              }
            />
            {formData.tags.length > 0 &&
              <div className="flex flex-wrap gap-2 mb-2">
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
            }
            <FileUploader
              accept={Object.keys(imageExtensions)}
              changeHandler={(file) => setFormData(prev => ({ ...prev, poster_card: file }))}
            />

            <TextAreaInput
              error={errors.content}
              label='Content *'
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog post content here..."
            />

            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <div className="flex items-center space-x-4">
                <RadioInput
                  type="radio"
                  name="status"
                  value="Draft"
                  onChange={() => setFormData(prev => ({ ...prev, status: 'Draft' }))}
                  active={formData.status === 'Draft'}
                  label='Draft'
                />

                <RadioInput
                  type="radio"
                  name="status"
                  value="Draft"
                  onChange={() => setFormData(prev => ({ ...prev, status: 'Published' }))}
                  active={formData.status === 'Published'}
                  label='Published'
                />
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
    </div >
  );
};

export default Publish;