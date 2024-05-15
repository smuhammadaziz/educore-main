import { Typography, Card, CardBody } from '@material-tailwind/react';
import useLang from '../../../hooks/useLang';
import content from '../../../localization/content';
import { NavLink } from 'react-router-dom';

interface ContentCardPropsType {
  img: string;
  title: string;
  desc: string;
  date: string;
}

const truncateText = (text: string, numWords: number) => {
  const words = text.split(' ');
  if (words.length > numWords) {
    return words.slice(0, numWords).join(' ') + ' ...';
  }
  return text;
};

const contents = [
  {
    img: 'https://www.material-tailwind.com/image/blog-11.jpeg',
    title: 'Search and Discovery',
    desc: 'Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards we tend to offer.',
    date: '12.05.2024',
  },
  {
    img: 'https://www.material-tailwind.com/image/blog-11.jpeg',
    title: 'Search and Discovery',
    desc: 'Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards we tend to offer.',
    date: '12.05.2024',
  },
  {
    img: 'https://www.material-tailwind.com/image/blog-11.jpeg',
    title: 'Search and Discovery',
    desc: 'Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards we tend to offer.',
    date: '12.05.2024',
  },
  {
    img: 'https://www.material-tailwind.com/image/blog-11.jpeg',
    title: 'Search and Discovery',
    desc: 'Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards we tend to offer.',
    date: '12.05.2024',
  },
  {
    img: 'https://www.material-tailwind.com/image/blog-11.jpeg',
    title: 'Search and Discovery',
    desc: 'Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards we tend to offer.',
    date: '12.05.2024',
  },
  {
    img: 'https://www.material-tailwind.com/image/blog-11.jpeg',
    title: 'Search and Discovery',
    desc: 'Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards we tend to offer.',
    date: '12.05.2024',
  },
  {
    img: 'https://www.material-tailwind.com/image/blog-11.jpeg',
    title: 'Search and Discovery',
    desc: 'Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards we tend to offer.',
    date: '12.05.2024',
  },
  {
    img: 'https://www.material-tailwind.com/image/blog-11.jpeg',
    title: 'Search and Discovery',
    desc: 'Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards we tend to offer.',
    date: '12.05.2024',
  },
];

export function AllBlogsLandingPage() {
  const [selectedLang] = useLang();

  function ContentCard({ img, title, desc, date }: ContentCardPropsType) {
    const truncatedDesc = truncateText(desc, 20);

    return (
      <Card
        className="relative grid min-h-[30rem] items-end overflow-hidden rounded-xl transform 
                                        transition duration-1000 
                                        hover:scale-110"
        color="transparent"
      >
        <img
          src={img}
          alt="bg"
          className="absolute inset-0 h-full w-full object-cover  object-center "
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
              to="/all/blogs/1"
              className="my-2 font-normal text-center bg-fuchsia-800 w-40 py-2 text-white hover:bg-fuchsia-600 active:bg-fuchsia-500"
            >
              {content[selectedLang as string].blogs.more}
            </NavLink>
            <Typography
              variant="paragraph"
              color="white"
              className="my-2 font-normal text-right"
            >
              {date}
            </Typography>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="relative isolate overflow-hidden bg-white sm:py-10 lg:px-8 ">
      <section className="container mx-auto px-8 py-10 lg:py-28 ">
        <Typography
          variant="h2"
          color="blue-gray"
          className="!text-4xl !leading-snug lg:!text-5xl text-center"
        >
          {content[selectedLang as string].blogs.blogs}
        </Typography>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-4">
          {contents.map(({ img, title, desc, date }) => (
            <ContentCard
              key={title}
              img={img}
              title={title}
              desc={desc}
              date={date}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default AllBlogsLandingPage;
