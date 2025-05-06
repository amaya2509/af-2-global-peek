'use client';
// import Image from 'next/image';
import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from './Progress-Slider';

const items = [
  {
    img: './asia.jpeg',
    title: 'ASIA',
    desc: 'A breathtaking view of a city illuminated by countless lights, showcasing the vibrant and bustling nightlife.',
    sliderName: 'bridge',
  },
  {
    img: '/africa.jpg',
    title: 'Africa',
    desc: 'A serene lake reflecting the surrounding mountains and trees, creating a mirror-like surface.',
    sliderName: 'mountains',
  },
  {
    img: '/europe.jpg',
    title: 'Europe',
    desc: 'A picturesque path winding through a dense forest adorned with vibrant autumn foliage.',
    sliderName: 'autumn',
  },
  {
    img: '/americas.jpg',
    title: 'Americas',
    sliderName: 'foggy',
    desc: 'A stunning foggy view over the foresh, with the sun casting a golden glow across the forest. ',
  },
    {
        img: '/oceania.jpeg',
        title: 'Oceania',
        sliderName: 'sunset',
        desc: 'A breathtaking sunset over a calm ocean, with the sun casting a warm golden hue across the water.',
    },
    {
        img: '/antarctica.jpg',
        title: 'Antarctica',
        sliderName: 'snowy-mountains',
        desc: 'A majestic view of snow-capped mountains under a clear blue sky, with a hint of sunlight illuminating the peaks.',
    },
];

export default function index() {
  return (
    <>
      <ProgressSlider vertical={false} activeSlider="bridge">
        <SliderContent>
          {items.map((item, index) => (
            <SliderWrapper key={index} value={item?.sliderName}>
              <img
                className="rounded-xl 2xl:h-[500px] h-[350px] object-cover"
                src={item.img}
                width={1900}
                height={1080}
                alt={item.desc}
              />
            </SliderWrapper>
          ))}
        </SliderContent>

        <SliderBtnGroup className="absolute bottom-0 h-fit dark:text-white text-black dark:bg-black/40 bg-white/40  backdrop-blur-md overflow-hidden grid grid-cols-2 md:grid-cols-3  rounded-md">
          {items.map((item, index) => (
            <SliderBtn
              key={index}
              value={item?.sliderName}
              className="text-left  p-3 border-r"
              progressBarClass="dark:bg-black bg-white h-full">
              <h2 className="relative px-4 rounded-full w-fit dark:bg-white dark:text-black text-white bg-gray-900 mb-2">
                {item.title}
              </h2>
              <p className="text-sm font-medium  line-clamp-2">{item.desc}</p>
            </SliderBtn>
          ))}
        </SliderBtnGroup>
      </ProgressSlider>
    </>
  );
}
