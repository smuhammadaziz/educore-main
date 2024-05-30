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

        const reversed = data;
        // console.log(reversed);

        setCourses(reversed.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);

  function ContentCard({
    blog_id,
    title,
    descr,
    img,
    created_at,
  }: ContentCardPropsType) {
    const CourseDescription = ({ description }) => {
      return <div dangerouslySetInnerHTML={{ __html: description }} />;
    };

    // const description = course && course ? course.descr : 'Lorem ipsum';
    let textBlog: string = '';

    course.map((e: any) => {
      let descriptionBlog = e.descr;

      textBlog = descriptionBlog;

      // console.log(textBlog);

      // console.log(descriptionBlog);
    });

    console.log(textBlog);

    const truncatedDesc = truncateText(textBlog, 12);

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
          {/* <Typography
            variant="paragraph"
            color="white"
            className="my-2 font-normal"
          >
            {truncatedDesc}
          </Typography> */}
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
              {moment(created_at).format('LT')} {''}
              {moment(created_at).format('l')}
            </Typography>
          </div>
        </CardBody>
      </Card>
    );
  }

  // console.log(textBlog);

  return (
    <div className="relative isolate overflow-hidden bg-white sm:py-0 lg:px-8 mt-20">
      <section className="container mx-auto px-8 py-10 lg:py-28 ">
        <Typography
          variant="h2"
          color="blue-gray"
          className="!text-4xl !leading-snug lg:!text-5xl text-center"
        >
          {content[selectedLang as string].blogs.blogs}
        </Typography>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-4">
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
    </div>
  );
}

export default Blog;
