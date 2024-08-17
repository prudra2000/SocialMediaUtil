import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  border?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, border = false }) => {
  const borderClasses = border ? 'border-2 border-gray-600' : '';

  return (
    <div 
      className={`relative rounded-full overflow-hidden
                  w-12 h-12 
                  ${borderClasses}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 3rem, (max-width: 768px) 4rem, (max-width: 1024px) 5rem, (max-width: 1280px) 6rem, 8rem"
        className="rounded-full object-cover"
      />
    </div>
  );
};

export default Avatar;