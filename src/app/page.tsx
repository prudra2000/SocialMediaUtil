"use client";
import { useState, useEffect } from "react";
import React, { useRef } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { DraggableCore } from "react-draggable";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/app/components/twitterCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./components/datePicker";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MdVerified } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { MdDownloadForOffline } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { BsFillThreadsFill } from "react-icons/bs";
import { IoDesktopOutline } from "react-icons/io5";
import { IoPhonePortraitOutline } from "react-icons/io5";


export default function Home() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [tweetContent, settweetContent] = useState("");
  const [verified, setVerified] = useState(false);
  const [platfromType, setPlatfromType] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [date, setDate] = React.useState<Date>();

  const divRef = useRef<HTMLDivElement>(null);
  const handleExport = async () => {
    if (divRef.current === null) {
      return;
    }
    const dataUrl = await toPng(divRef.current);
    const link = download(dataUrl, "exported-div.png");
  };
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-20">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={() => setVerified(!verified)}
            className="flex items-center justify-center "
          >
            <MdVerified color={verified ? "green" : "gray"} />
          </button>
          <Separator orientation="vertical" />
        </div>

        <div className="flex items-center">
          <span className="mr-2">@</span>
          <Input
            type="text"
            placeholder="Username"
            value={username} // Use username directly
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <Input
          type="text"
          placeholder="Avatar URL"
          value={avatarURL}
          onChange={(e) => setAvatarURL(e.target.value)}
          className="p-2 border rounded col-span-2"
        />
        <Textarea
          placeholder="Tweet Content"
          value={tweetContent}
          onChange={(e) => settweetContent(e.target.value)}
          className="p-2 border rounded col-span-2"
        />
        <DatePicker date={date} setDate={setDate} />

        <Select onValueChange={(value) => setPlatfromType(value)}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="X">
              <div className="flex flex-row items-center gap-2">
                <FaXTwitter />
                <h1>X</h1>
              </div>
            </SelectItem>
            <SelectItem value="FB">
              <div className="flex flex-row items-center gap-2">
                <FaFacebookF />
                <h1>Facebook</h1>
              </div>
            </SelectItem>
            <SelectItem value="Threads">
              <div className="flex flex-row items-center gap-2">
                <BsFillThreadsFill />
                <h1>Threads</h1>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Select Device" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mobile">
              <div className="flex flex-row items-center gap-2">
              <IoPhonePortraitOutline />
                <h1>Mobile</h1>
              </div>
            </SelectItem>
            <SelectItem value="desktop">
              <div className="flex flex-row items-center gap-2">
              <IoDesktopOutline />
                <h1>Desktop</h1>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div ref={divRef} className={`py-10 `}>
        <Card>
          <CardHeader
            name={name}
            username={username}
            avatarURL={avatarURL}
            platfromIcon={platfromType}
            verified={verified}
          />
          <CardContent tweetContent={tweetContent} />
          <hr className="px-6 pt-2" />
          <CardFooter>{date && <p>{date.toDateString()}</p>}</CardFooter>
        </Card>
      </div>

      <Button variant="default" onClick={handleExport}>
        <div className="flex gap-3 items-center">
          <h1>Download</h1>
          <MdDownloadForOffline />
        </div>
      </Button>
    </main>
  );
}
