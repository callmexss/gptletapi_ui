import Heading from '@/components/Heading';

export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <>
      <Heading>About</Heading>
      <div className='text-sm md:text-base lg:text-xl'>
        <p>
          A website to provide small but powerful APPs by leveraging OpenAI ChatGPT API.
        </p>
      </div>
    </>
  );
}
