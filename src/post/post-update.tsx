import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/card"
import { NewPostErrors, UpdatePostRequest } from "./post-types";
import { processRequestError } from "../lib";
import { useToast } from "../components/toast/toast-context";
import { RadioInput, TextAreaInput, TextInput } from "../components/input";
import { useGetAllCategories } from "../category/category-hook";
import { useUpdatePostMutation } from "./post-slice";

export default function UpdatePost() {
  const { state } = useLocation();
  const toast = useToast();
  const navigate = useNavigate();
  const [updateHandler, { isLoading }] = useUpdatePostMutation();
  const { data: categories } = useGetAllCategories();

  const [formValue, setFormValue] = useState<UpdatePostRequest>(state?.post as UpdatePostRequest);
  const [errors, setErrors] = useState<NewPostErrors>(Object);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValue((prev: UpdatePostRequest) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev: NewPostErrors) => ({ ...prev, [name]: undefined }));
    }
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { author_id, category, content, id, status, title, excerpt } = formValue;
    // TODO: Fix updating categories
    const categoryId = categories.find((option) => option.label === category as unknown);
    updateHandler({
      author_id,
      category: categoryId?.value as number,
      content,
      id,
      status,
      title,
      excerpt,
      tags: [...new Set([formValue.tags])].map((v) => v).join(', ')
    }).unwrap().then(() => {
      toast.open({
        message: 'Successful',
        variant: "success",
      });
      navigate('/author')
    }).catch((e) => {
      toast.open({
        message: processRequestError(e, 'Failed to update post. Please try again later.'),
        variant: "destructive",
      });
    });
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="!shadow-none">
        <CardHeader>
          <CardTitle>Update Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
              label='Title *'
              error={errors.title}
              placeholder="Enter your blog post title"
              id="title"
              name="title"
              value={formValue.title}
              onChange={handleInputChange}
            />

            <TextInput
              label='Excerpt'
              placeholder="Enter an excerpt (optional)"
              id="excerpt"
              name="excerpt"
              value={formValue.excerpt}
              onChange={handleInputChange}
            />

            <TextInput
              label='Tags (comma-separated)'
              id="tags"
              name="tags"
              value={formValue.tags}
              onChange={handleInputChange}
              placeholder="Add tags"
            />

            <TextAreaInput
              error={errors.content}
              label='Content *'
              id="content"
              name="content"
              value={formValue.content}
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
                  onChange={() => setFormValue(prev => ({ ...prev, status: 'Draft' }))}
                  active={formValue.status === 'Draft'}
                  label='Draft'
                />

                <RadioInput
                  type="radio"
                  name="status"
                  value="Draft"
                  onChange={() => setFormValue(prev => ({ ...prev, status: 'Published' }))}
                  active={formValue.status === 'Published'}
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
                Update
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}