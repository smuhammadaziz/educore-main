import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function AllBlogsList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          'https://f091-185-230-206-33.ngrok-free.app/api/get/all/blog',
          {
            method: 'get',
            headers: {
              'ngrok-skip-browser-warning': '69420',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data = await response.json();
        // console.log(data);
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div className="right-0 top-0 mx-auto">
        <h2 className="text-2xl mb-5">
          All <span className="underline">Blogs</span> List
        </h2>
        <NavLink
          to="/dashboard/admin/add/new/course"
          className="text-sm  py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add new Blog
        </NavLink>
      </div>
      <div className="bg-gray-100 ">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl py-8 sm:py-24 lg:max-w-none lg:py-32">
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {blogs.map((blog) => (
                <div key={blog.title} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={blog.img}
                      alt={blog.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-xl text-gray-800">
                    <a href="#">{/* Update with appropriate link */}</a>
                    {blog.title}
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {blog.descr}
                  </p>
                  <button className="bg-primary px-8 py-1 text-white rounded mt-5 mb-5">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
