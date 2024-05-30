import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import backurl from '../../../../links';

const products = [
  {
    id: 1,
    name: 'SAT with Sardor',
    price: '320.000 UZS',
    course: 'SAT course',
    rating: '⭐⭐⭐⭐⭐',
  },
];

const courses = [
  {
    id: 1,
    name: 'SAT',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/SAT_logo_%282017%29.svg/1200px-SAT_logo_%282017%29.svg.png',
  },
  {
    id: 2,
    name: 'IELTS',
    img: 'https://i.ytimg.com/vi/C3XwcFQmQA4/maxresdefault.jpg',
  },
  {
    id: 3,
    name: 'CAMBRIDGE',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzy0nTApZ1wq_-2k1fszMGwnyxOCda5Ltw2avzRamJLw&s',
  },
];

export default function AllGroupsListTeacher() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backurl}/api/get/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const reversed = data.Data.reverse();

        // console.log(reversed);

        setCourses(reversed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="right-0 top-0 mx-auto">
        <h2 className="text-2xl mb-5">
          My <span className="underline">Groups</span> List
        </h2>
      </div>
      <div className="bg-gray-100 my-20">
        <h2 className="text-left font-bold text-xl">
          Which course do you want to add Group? Select and Add your Groups
        </h2>
        <div className="mt-2 grid lg:grid-cols-3">
          {courses && courses
            ? courses.map((e: any) => (
                <div
                  className="my-10 mx-4  block p-4 bg-white rounded"
                  key={e.course_id}
                >
                  <h2 className="text-2xl mt-5">{e.title}</h2>
                  <NavLink
                    to={`/dashboard/teacher/group/${e.course_id}`}
                    className="bg-blue-600 py-2 px-5 text-white rounded hover:bg-blue-400 mt-5 inline-block"
                  >
                    Add to this course
                  </NavLink>
                </div>
              ))
            : "user don't have any courses"}
        </div>
      </div>
    </>
  );
}
