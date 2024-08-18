import React, { useState } from "react"; // Add useState import
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const TimePicker: React.FC<{ getTime: (time: string) => void; button: React.ReactNode }> = ({
  getTime,
  button,
}) => {
  const [hour, setHour] = useState<number>(1);
  const [minute, setMinute] = useState<number>(1); // Initialize as a number
  const [time, setTime] = useState<string>("");

  const MIN_HOUR = 0; // Minimum hour value
  const MAX_HOUR = 11; // Maximum hour value
  const MIN_MINUTE = 0; // Minimum minute value
  const MAX_MINUTE = 59; // Maximum minute value

  const incrementHour = () => {
    setHour((prev) => (prev < MAX_HOUR ? prev + 1 : MAX_HOUR)); // Increment hour logic with max limit
  };

  const decrementHour = () => {
    setHour((prev) => (prev > MIN_HOUR ? prev - 1 : MIN_HOUR)); // Decrement hour logic with min limit
  };

  const incrementMinute = () => {
    setMinute((prev) => (prev < MAX_MINUTE ? prev + 1 : MAX_MINUTE)); // Increment minute logic with max limit
  };

  const decrementMinute = () => {
    setMinute((prev) => (prev > MIN_MINUTE ? prev - 1 : MIN_MINUTE)); // Decrement minute logic with min limit
  };

  const timeSetter = () => {
    let formattedMinute = minute <= 9 ? "0" + minute : minute;
    setTime(`${hour}:${formattedMinute}`);
    getTime(`${hour}:${formattedMinute}`);
    console.log(`${hour}:${minute}`);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          {button}
        </PopoverTrigger>
        <PopoverContent className="flex flex-col justify-center items-center space-y-2">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center w-min">
              <Button
                variant={"outline"}
                className="rounded-t-full"
                onClick={incrementHour}
              >
                <FaChevronUp className="h-4 w-4" />
              </Button>
              <div>
                <Input
                  type="text"
                  value={hour.toString()} // Bind input value to state
                  onChange={(e) => setHour(parseInt(e.target.value))} // Update state on input change
                  className="border rounded text-center"
                />
              </div>
              <Button
                variant={"outline"}
                className="rounded-b-full"
                onClick={decrementHour}
              >
                <FaChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <p className="px-1">:</p>
            <div className="flex flex-col justify-center w-min">
              <Button
                variant={"outline"}
                className="rounded-t-full"
                onClick={incrementMinute}
              >
                <FaChevronUp className="h-4 w-4" />
              </Button>
              <div>
                <Input
                  type="text"
                  value={minute.toString()} // Bind input value to state
                  onChange={(e) => setMinute(parseInt(e.target.value))} // Update state on input change
                  className="border rounded text-center"
                />
              </div>
              <Button
                variant={"outline"}
                className="rounded-b-full"
                onClick={decrementMinute}
              >
                <FaChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button onClick={timeSetter}>Set Time</Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimePicker;