import { FC } from 'react';

type LogoProps = {
  size?: string;
};

export const Logo: FC<LogoProps> = ({ size = 'text-lg' }) => {
  return (
    <div
      className={`flex items-center ${size} gap-1 font-audiowide tracking-wide`}
    >
      <span className="font-semibold text-white ">SMOOLOS</span>
      <div className="pl-2 pr-4 bg-purple-500 rounded-r-full">
        <span className="font-semibold text-neutral-800">CLUB</span>
      </div>
    </div>
  );
};
