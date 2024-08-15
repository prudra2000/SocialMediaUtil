import * as React from "react";
import Avatar from "./avatar";
import { MdVerified } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { BsFillThreadsFill } from "react-icons/bs";
import { BsFillQuestionCircleFill } from "react-icons/bs";



const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { device: string }
>(({ className, device, ...props }, ref) => (
  <div ref={ref} className={`rounded-2xl border border-slate-200 bg-white shadow-md ${device === 'mobile' ? 'w-96': device === 'desktop' ? 'w-fill' : ''}`} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { username: string } & {
    name: string;
  } & { verified: boolean } & { avatarURL: string } & { platfromIcon: string }
>(({ className, name, username, verified, avatarURL, platfromIcon, ...props }, ref) => (
  <div
    ref={ref}
    className="flex flex-row justify-between p-6 items-center space-x-5 space-y-1.5 text-xs md:text-sm xl:text-lg 2xl:text-xl"
    {...props}
  >
    <div className="flex flex-row items-center space-x-2 md:space-x-2 xl:space-x-5 2xl:space-x-5">
      <Avatar src={avatarURL || "/avatar-svgrepo-com.svg"} alt="" border={true} />
      <div className="text-left">
        <div className="flex flex-row space-x-1 items-center">
          <h1>{name}</h1>
          {name && verified && (
            <div>
              <MdVerified />
            </div>
          )}
        </div>

        <h1>{`@${username}`}</h1>
      </div>
    </div>
    <div>
      {platfromIcon === '' && <BsFillQuestionCircleFill className="size-5 md:size-7 xl:size-8 2xl:size-10" />}
      {platfromIcon === 'X' && <FaXTwitter className="size-5 md:size-7 xl:size-8 2xl:size-10" />}
      {platfromIcon === 'FB' && <FaFacebookF className="size-5 md:size-7 xl:size-8 2xl:size-10" />}
      {platfromIcon === 'Threads' && <BsFillThreadsFill className="size-5 md:size-7 xl:size-8 2xl:size-10" />}
  </div>
  </div>
));
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { tweetContent: string } & { device: string }
>(({ className, tweetContent, device, ...props }, ref) => (
  <div
    ref={ref}
    className="px-10 pb-6 text-xs md:text-sm xl:text-lg 2xl:text-xl"
    {...props}
  >
    <p className={`${device === 'mobile' ? 'text-xs': device === 'desktop' ? '' : ''}`}>{tweetContent}</p>
  </div>
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="flex items-center px-6 pb-6 text-xs md:text-sm xl:text-lg 2xl:text-xl text-gray-500"
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };