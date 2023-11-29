"use client"

import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import GPTList from '@/components/GPTList';
import { getGPTsData } from '@/hooks/utilityFunctions';

const features = [
  {
    title: 'Feature One',
    description: 'Description of feature one.',
    icon: './favicon.ico',
  },
  {
    title: 'Feature Two',
    description: 'Description of feature two.',
    icon: './favicon.ico',
  },

  {
    title: 'Feature Three',
    description: 'Description of feature three.',
    icon: './favicon.ico',
  },
];

export default function Home() {
  // const groupedGPTs = await getGPTsData();
  return (
    <>
      <HeroSection />
      {/* <div className="flex flex-wrap justify-center items-center mb-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div> */}
      {/* <GPTList groupedGPTs={groupedGPTs}/> */}
      <GPTList/>
    </>
  );
}
