import React from 'react';
import { NavLink } from 'react-router-dom';

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
    name: 'IGCSE',
    img: 'https://www.dutchinternationalschools.nl/wp-content/uploads/2016/07/igcse.png',
  },
  {
    id: 4,
    name: 'AS/A-LEVELS',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzy0nTApZ1wq_-2k1fszMGwnyxOCda5Ltw2avzRamJLw&s',
  },
];

function ViewAllTypesCouseStudent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {courses.map((e: any) => {
        return (
          <NavLink
            to={`/dashboard/student/view/${e.name}`}
            key={e.id}
            className="rounded-lg dark:bg-strokedark hover:shadow-2xl dark:shadow-slate-800 shadow-lg px-20 py-6 bg-white dark:bg-gray-800 dark:text-white text-black hover:shadow-2xl cursor-pointer"
          >
            <img
              src={e.img}
              alt={e.name}
              className="w-50 h-50 object-contain mb-5 mx-auto"
            />
            <h3 className="text-xl text-center md:text-2xl lg:text-3xl font-bold">
              {e.name}
            </h3>
          </NavLink>
        );
      })}
    </div>
  );
}

export default ViewAllTypesCouseStudent;
