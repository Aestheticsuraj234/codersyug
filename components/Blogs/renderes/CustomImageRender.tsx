'use client';

import Image from 'next/image';

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;
  const aspectRatio = 16 / 9; // Change this value based on your image's aspect ratio

  return (
    <div className='relative w-full'>
      <Image alt='image' className='object-contain' src={src} layout="responsive" width={120} height={100 / aspectRatio} />
    </div>
  );
}

export default CustomImageRenderer;
