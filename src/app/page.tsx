"use client";
import { useState, useEffect } from "react";

import { Card, CardHeader } from "@/app/components/twitterCard";
export default function Home() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [verified, setVerified] = useState(false);
  

  useEffect(() => {
    if (name === "") {
      setVerified(false);
    }
  }, [name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (newName === "") {
      setVerified(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatarURL}
          onChange={(e) => setAvatarURL(e.target.value)}
          className="p-2 border rounded"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
            className="mr-2"
          />
          Verified
        </label>
      </div>
      
      <Card>
        <CardHeader name={name} username={username} avatarURL={avatarURL} verified={verified}/>
      </Card>
    </main>
  );
}