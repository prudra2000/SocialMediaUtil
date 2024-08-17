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
} from "@/app/components/twitterCard copy";
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
import { FaRegCalendarAlt } from "react-icons/fa";


import { Slider } from "@/components/ui/slider";
import TimePicker from "./components/timePicker";

export default function Home() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [tweetContent, settweetContent] = useState("");
  const [verified, setVerified] = useState(false);
  const [platfromType, setPlatfromType] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [date, setDate] = React.useState<Date>();
  const [cardWidth, setCardWidth] = useState(300); // Set initial width
  const [sliderMax, setSliderMax] = useState(300); // Set initial max width
  const cardRef = useRef<HTMLDivElement>(null);
  const [quote, setQuote] = useState("");
  const [quoteAuthor, setquoteAuthor] = useState("");
  useEffect(() => {
    setSliderMax(window.innerWidth); // Set max width to the width of the screen
  }, []); // Run once on mount

  const divRef = useRef<HTMLDivElement>(null);
  const handleExport = async () => {
    if (divRef.current === null) {
      return;
    }
    const dataUrl = await toPng(divRef.current);
    const link = download(dataUrl, "exported-div.png");
  };

  const handleMouseDown = (e: React.MouseEvent, isRight: boolean) => {
    const startX = e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = isRight
        ? cardWidth + (moveEvent.clientX - startX)
        : cardWidth - (moveEvent.clientX - startX);
      const maxWidth = window.innerWidth - 20; // Adjust for padding/margins
      // Ensure newWidth is within bounds
      setCardWidth(Math.min(Math.max(newWidth, 100), maxWidth)); // Set width between 100 and maxWidth
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (cardRef.current) {
      setSliderMax(window.innerWidth); // Update max width based on card width
    }
  }, [cardWidth]); // Update when cardWidth changes

  useEffect(() => {
    const fetchQuotes = async () => {
      const response = await fetch('/sampleData.json');
      const data = await response.json();
      if (data.quotes && data.quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.quotes.length); // Get a random index
        setquoteAuthor(data.quotes[randomIndex].author); // Set name to the author of the random quote
        setQuote(data.quotes[randomIndex].quote); // Set quote to the random quote
      }
    };

    fetchQuotes();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-5 md:px-10 xl:px-20 2xl:px-20">
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
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setAvatarURL(reader.result as string); // Set the avatar URL to the file's data URL
              };
              reader.readAsDataURL(file);
            }
          }}
          className="p-2 border rounded col-span-2"
        />
        <Textarea
          placeholder="Tweet Content"
          value={tweetContent}
          onChange={(e) => settweetContent(e.target.value)}
          className="p-2 border rounded col-span-2"
        />
        <DatePicker date={date} setDate={setDate} />
        <TimePicker />

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
        {/* <Select onValueChange={(value) => setDeviceType(value)}>
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
        </Select> */}
        <div className="flex flex-col space-y-2 justify-center col-span-2">
          <p className="text-sm">Card Width:</p>
          <Slider
            defaultValue={[cardWidth]} // Wrap in an array
            min={250} // Wrap in an array
            max={sliderMax - sliderMax * 0.1} // Use dynamic max value set in useEffect
            step={1}
            onValueChange={(value) => setCardWidth(value[0])} // Set card width directly
            slideValue={cardWidth}
          />
        </div>
      </div>
      <div ref={divRef} className={`py-10 `} style={{ width: cardWidth }}>
        <Card ref={cardRef} device={deviceType} style={{ width: cardWidth }}>
          {/* <div
            onMouseDown={(e) => handleMouseDown(e, false)}
            className="cursor-ew-resize"
            style={{
              width: "10px",
              background: "black",
              position: "absolute",
              height: cardRef.current ? `${cardRef.current.clientHeight}px` : "10%",
            }}
          /> */}
          <CardHeader
            name={name || quoteAuthor}
            username={username || quoteAuthor.toLowerCase().replace(/\s+/g, '.')}
            avatarURL={avatarURL}
            platfromIcon={platfromType}
            verified={verified}
          />
          <hr className="px-6 pt-2" />
          <CardContent tweetContent={tweetContent || quote} device={deviceType} />
          <hr className="px-6 pt-2" />
          <CardFooter className="">
            {date && <FaRegCalendarAlt className="mr-1"/>}
            {date && <p>{date.toDateString()}</p>}
          </CardFooter>
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
