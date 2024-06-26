import React, { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import backurl from '../../../../links';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

function OneBlogGetAdmin() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { blog_id } = useParams();
  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(`${backurl}/api/get/blog/${blog_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        setBlog(data.Data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to fetch blog', {
          position: 'top-right',
        });
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [blog_id]);

  async function deleteItem() {
    try {
      const response = await fetch(
        `${backurl}/api/admin/delete/blog/${blog_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }
      toast.success('Successfully deleted blog', {
        position: 'top-right',
      });
      navigate('/dashboard/blogs');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog', {
        position: 'top-right',
      });
    }
  }

  if (loading) {
    return (
      <DefaultLayoutAdmin>
        <div className="bg-white dark:bg-black p-4 py-5 w-full max-w-4xl mx-auto">
          <p className="text-center">Loading blog details...</p>
        </div>
      </DefaultLayoutAdmin>
    );
  }

  if (!blog) {
    return (
      <DefaultLayoutAdmin>
        <div className="bg-white dark:bg-black p-4 py-5 w-full max-w-4xl mx-auto">
          <p className="text-center">No blog details found.</p>
        </div>
      </DefaultLayoutAdmin>
    );
  }

  const CourseDescription = ({ description }) => {
    return <div dangerouslySetInnerHTML={{ __html: description }} />;
  };

  const description = blog.descr || 'No description available';

  return (
    <DefaultLayoutAdmin>
      <ToastContainer />
      <div className="bg-white dark:bg-black p-4 px-5 py-5 w-full max-w-4xl mx-auto">
        <img
          src={`${backurl}upload/${blog.img || 'default-image.png'}`}
          alt="Blog"
          className="w-full h-100 max-w-lg object-cover"
        />
        <h2 className="text-2xl sm:text-4xl mt-5 text-black dark:text-white">
          {blog.title}
        </h2>
        <div className="mt-5 dark:text-gray-300">
          <CourseDescription description={description} />
        </div>
        <p className="mt-5 dark:text-gray-300">
          {moment(blog.created_at).format('LL')}
        </p>

        <div className="mt-5">
          <button
            onClick={deleteItem}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Delete Blog
          </button>
        </div>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default OneBlogGetAdmin;
