import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import backurl from '../../../../links';

export default function AllBlogsList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${backurl}/api/get/all/blog`, {
          method: 'get',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data = await response.json();
        // console.log(data);

        const reversedData = data.reverse();
        setBlogs(reversedData);
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
          to="/dashboard/admin/add/new/blog"
          className="text-sm  py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add new Blog
        </NavLink>
      </div>
      <div className="bg-gray-100 ">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl py-8 sm:py-24 lg:max-w-none lg:py-32">
            <div className="mt-10  lg:grid lg:grid-cols-3 lg:gap-x-6  ">
              {blogs &&
                blogs.map((blog) => (
                  <div key={blog.blog_id} className="bg-white p-3 my-5 rounded">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      <img
                        src={`${backurl}upload/${blog.img}`}
                        alt={blog.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-6 text-xl text-gray-800">{blog.title}</h3>
                    <NavLink
                      to={`/dashboard/admin/edit/blog/${blog.blog_id}`}
                      className="bg-primary px-8 py-1 text-white rounded mt-5 inline-block mb-5"
                    >
                      Edit
                    </NavLink>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
