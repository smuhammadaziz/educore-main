import { Typography, Card, CardBody } from '@material-tailwind/react';
import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import backurl from '../../../links';

import moment from 'moment';

interface ContentCardPropsType {
  blog_id: string;
  img: string;
  title: string;
  descr: string;
  created_at: string;
}

const contents = [
  {
    img: 'https://www.material-tailwind.com/image/blog-11.jpeg',
    title: 'Search and Discovery',
    desc: 'Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards we tend to offer.',
    date: '15.05.2024',
  },
];

export function Blog() {
  const [selectedLang] = useLang();

  const truncateText = (text: string, numWords: number) => {
    const words = text.split(' ');
    if (words.length > numWords) {
      return words.slice(0, numWords).join(' ') + ' ...';
    }
    return text;
  };

  const [course, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backurl}api/get/all/blog`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const reversed = data.slice(1).slice(-3);
        // console.log(reversed);

        setCourses(reversed);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  // console.log(course);

  function ContentCard({
    blog_id,
    title,
    descr,
    img,
    created_at,
  }: ContentCardPropsType) {
    const truncatedDesc = truncateText(descr, 12);

    return (
      <Card
        className="relative grid min-h-[30rem] items-end overflow-hidden rounded-xl transform 
                                        transition duration-1000 
                                        hover:scale-110"
        color="transparent"
        key={blog_id}
      >
        <img
          src={`${backurl}upload/${
            course
              ? img
              : '128-1280406_view-user-icon-png-user-circle-icon-png.png'
          }`}
          alt="image"
          className="absolute inset-0 h-full w-full object-cover  object-center"
        />
        <div className="absolute inset-0 bg-black/80" />
        <CardBody className="relative flex flex-col justify-end">
          <Typography variant="h4" color="white">
            {title}
          </Typography>
          <Typography
            variant="paragraph"
            color="white"
            className="my-2 font-normal"
          >
            {truncatedDesc}
          </Typography>
          <div className="flex justify-between items-center mt-5">
            <NavLink
              to={`/all/blogs/${blog_id}`}
              className="my-2 font-normal text-center bg-fuchsia-800 w-40 py-2 text-white hover:bg-fuchsia-600 active:bg-fuchsia-500"
            >
              {content[selectedLang as string].blogs.more}
            </NavLink>
            <Typography
              variant="paragraph"
              color="white"
              className="my-2 font-normal text-right"
            >
              {moment(created_at).subtract(10, 'days').calendar()}
            </Typography>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="relative isolate overflow-hidden bg-white sm:py-32 lg:px-8 mt-20">
      <section className="container mx-auto px-8 py-10 lg:py-28 ">
        <Typography
          variant="h2"
          color="blue-gray"
          className="!text-4xl !leading-snug lg:!text-5xl text-center"
        >
          {content[selectedLang as string].blogs.blogs}
        </Typography>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {course.map(({ blog_id, img, title, descr, created_at }) => (
            <ContentCard
              key={blog_id}
              blog_id={blog_id}
              img={img}
              title={title}
              descr={descr}
              created_at={created_at}
            />
          ))}
        </div>
      </section>
      <NavLink
        to="/all/blogs"
        className="bg-fuchsia-800 mt-5 text-white py-3 px-10 text-center mx-auto block w-75 mb-20 rounded-ss-2xl rounded-ee-2xl hover:bg-fuchsia-600"
      >
        {content[selectedLang as string].blogs.btn}
      </NavLink>
    </div>
  );
}

export default Blog;
