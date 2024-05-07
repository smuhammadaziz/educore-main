import { NavLink } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'IELTS Course',
    href: '#',
    imageSrc:
      'https://thumbs.dreamstime.com/z/ielts-words-wooden-blocks-letters-education-courses-tests-english-as-foreign-language-concept-d-illustration-249592301.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '230.000 UZS',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://satcenter.s3.amazonaws.com/courses/uploads/2021/08/29085731/sat2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://images.ctfassets.net/szez98lehkfm/28882FqjsThXzB6jTlSldB/5e9b326cbeff65e5d0bb6e60040ebfad/MyIC_Article_89035?fm=webp',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://satcenter.s3.amazonaws.com/courses/uploads/2021/08/29085731/sat2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://satcenter.s3.amazonaws.com/courses/uploads/2021/08/29085731/sat2.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://thumbs.dreamstime.com/z/ielts-words-wooden-blocks-letters-education-courses-tests-english-as-foreign-language-concept-d-illustration-249592301.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://thumbs.dreamstime.com/z/ielts-words-wooden-blocks-letters-education-courses-tests-english-as-foreign-language-concept-d-illustration-249592301.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
];

export default function Courses() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Popular Courses
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <NavLink
              to="/all/courses/1"
              key={product.id}
              className="group relative"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <NavLink to="/all/courses/1">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </NavLink>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>

                  <button className="mt-6 bg-white primary text-black button rounded">
                    more →
                  </button>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
        <NavLink
          to="/all/courses"
          className="bg-primary mt-10 inline-block text-white px-10 py-3 rounded-full hover:bg-sky-700 tex-center"
        >
          Explore more courses →
        </NavLink>
      </div>
    </div>
  );
}
