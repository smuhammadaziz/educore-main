import useLang from '../../../hooks/useLang';
import Brand from '../../../images/brand/brand2.svg';
import content from '../../../localization/content';

export default function AboutMore() {
  const [selectedLanguage] = useLang();
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto lg:max-w-4xl">
        <img
          className="justify-center mx-auto"
          src={Brand}
          alt="Brand logo"
          width="300"
        />
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>{content[selectedLanguage as string].aboutIntro.desc}</p>
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
