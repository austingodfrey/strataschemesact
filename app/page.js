"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Safely get and decode the cookie
    const match = document.cookie.match(/(?:^|; )client_user=([^;]*)/);
    if (match) {
      try {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        if (parsed?.username) {
          setUsername(parsed.username);
        }
      } catch (err) {
        console.warn("Failed to parse client_user cookie:", err);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen p-8 pb-20 font-sans">
      {/* Top-right Settings link */}
      {username && (
        <a
          href="/settings.html"
          className="absolute top-4 right-6 text-sm underline text-purple-600 hover:text-purple-800"
        >
          Settings
        </a>
      )}

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

          {/* Logo */}
          <div style={{ position: "relative", width: 300, height: 100 }}>
            <Image
              src="/strata.png"
              alt="STRATA SCHEMES MANAGEMENT ACT 2015"
              width={300}
              height={100}
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* User Info */}
          <div>
            {username ? (
              <p className="text-sm text-gray-800">
                Logged in as <strong>{username}</strong>
              </p>
            ) : (
              <a href="/page6.html" className="text-sm underline text-green-600 hover:text-green-800">
                Login
              </a>
            )}
          </div>

          {/* Content Links */}
          <ol className="list-inside list-decimal text-xl text-center sm:text-left font-mono">
            <li className="mb-2 tracking-tight">STRATA SCHEMES MANAGEMENT ACT 2015</li>
            <li className="tracking-tight">- As at 2 March 2025</li>
          </ol>

          <a href="/apage.html" className="text-sm underline text-blue-600 hover:text-blue-800">
            Feedback Form
          </a>
          <a href="/page2.html" className="text-sm underline text-green-600 hover:text-green-800">
            Notices Page
          </a>
          <a href="/page3.html" className="text-sm underline text-green-600 hover:text-green-800">
            STRATA SCHEMES MANAGEMENT ACT PART 1
          </a>
          <a href="/page4.html" className="text-sm underline text-green-600 hover:text-green-800">
            STRATA SCHEMES MANAGEMENT ACT PART 2
          </a>
          <a href="/page5.html" className="text-sm underline text-green-600 hover:text-green-800">
            STRATA SCHEMES MANAGEMENT ACT PART 3
          </a>
          <a href="/api/index.php" className="text-sm underline text-green-600 hover:text-green-800">
            strata php
          </a>
          <a href="/page8.html" className="text-sm underline text-green-600 hover:text-green-800">
            Change Password
          </a>
        </main>
      </div>
    </div>
  );
}
