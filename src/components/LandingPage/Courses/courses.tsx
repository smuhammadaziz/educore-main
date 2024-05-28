import { NavLink } from 'react-router-dom';

// const products = [
//   {
//     id: 1,
//     name: 'IELTS Course',
//     href: '#',
//     imageSrc:
//       'https://thumbs.dreamstime.com/z/ielts-words-wooden-blocks-letters-education-courses-tests-english-as-foreign-language-concept-d-illustration-249592301.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '230.000 UZS',
//     color: 'Black',
//   },
// ];

import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';
import { useEffect, useState } from 'react';
import backurl from '../../../links';
import { Rating } from '@material-tailwind/react';

export default function Courses() {
  const [selectledLang] = useLang();
  const [coursess, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}/api/get/best/courses`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const reversed = data.CoursIELTSes.slice(-4);

        // console.log(reversed);

        setCourses(reversed);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  // console.log(coursess);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {content[selectledLang as string].popularCourse.popularcourses}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {coursess.map((product: any) => (
            <div key={product.course_id} className=" relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                <img
                  src={`${backurl}upload/${product.image}`}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <NavLink to={`/all/courses/${product.course_id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </NavLink>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    <Rating value={5} />
                  </p>

                  <button className="mt-6 bg-fuchsia-300 primary text-black px-5 py-1 button rounded">
                    {content[selectledLang as string].popularCourse.more} →
                  </button>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price} 000 so'm
                </p>
              </div>
            </div>
          ))}
        </div>
        <NavLink
          to="/all/courses"
          className="bg-fuchsia-900 mt-10 inline-block text-white px-10 py-3 rounded-full hover:bg-fuchsia-700 text-center"
        >
          {content[selectledLang as string].popularCourse.explore} →
        </NavLink>
      </div>
    </div>
  );
}
