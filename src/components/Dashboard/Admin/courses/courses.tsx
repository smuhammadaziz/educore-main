import { NavLink } from 'react-router-dom';

const callouts = [
  {
    name: 'IELTS',
    description: 'Learn ielts',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'SAT',
    description: 'Learn ielts',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt:
      'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'AS/A-LEVEL',
    description: 'Daily commute essentials',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'GSCE',
    description: 'Daily commute essentials',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
];

export default function AllCoursesList() {
  return (
    <>
      <div className="right-0 top-0 mx-auto">
        <h2 className="text-2xl mb-5">
          All <span className="underline">Courses</span> List
        </h2>
        <NavLink
          to="/dashboard/admin/add/new/course"
          className="text-sm  py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add new Course
        </NavLink>
      </div>
      <div className="bg-gray-100 ">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl py-8 sm:py-24 lg:max-w-none lg:py-32">
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-xl text-gray-800">
                    <a href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {callout.description}
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
