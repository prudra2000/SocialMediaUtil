import * as React from "react";
import Avatar from "./avatar";
import { MdVerified } from "react-icons/md";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className="rounded-2xl border border-slate-200 " {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { username: string } & {
    name: string;
  } & { verified: boolean } & { avatarURL: string }
>(({ className, name, username, verified, avatarURL, ...props }, ref) => (
  <div ref={ref} className="flex flex-row space-x-7 space-y-1.5 p-6" {...props}>
    {avatarURL && (
      <Avatar
        src={avatarURL}
        alt="" // Tailwind supports w-16 (4rem) as size class
        border={true}
      />
    )}
    <div>
      <div className="flex flex-row text-center justify-center align-middle space-x-2">
        <h1>{name}</h1>
        {name && verified && (
          <div>
            <MdVerified />
          </div>
        )}
      </div>

      <h1>{username}</h1>
    </div>
  </div>
));
CardHeader.displayName = "CardHeader";

export { Card, CardHeader };
