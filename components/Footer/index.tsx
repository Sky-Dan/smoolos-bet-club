import { BsDiscord, BsLink45Deg } from 'react-icons/bs';
import { CustomLink } from '../CustomLink';

export const Footer = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center justify-center gap-6">
        <hr className="w-10 bg-white" />
        <CustomLink href="https://opensea.io/collection/smoolos">
          <BsLink45Deg color="white" />
        </CustomLink>
        <CustomLink href="https://discord.com/invite/jmR6yyf3Qus">
          <BsDiscord color="white" />
        </CustomLink>
        <hr className="w-10 bg-white" />
      </div>
    </div>
  );
};
