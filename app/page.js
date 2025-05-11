"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )client_user=([^;]*)/);
    if (match) {
      setUsername(decodeURIComponent(match[1]));
    }
  }, []);

  return (
    <div className="relative min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">

      {/* 🔧 Top-right settings link */}
      {username && (
        <a
          href="/settings.html"
          className="absolute top-4 right-6 text-sm underline text-purple-600 hover:text-purple-800"
        >
          Settings
        </a>
      )}

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div style={{ position: "relative", width: "300px", height: "auto" }}>
            <Image
              src="/strata.png"
              alt="STRATA SCHEMES MANAGEMENT ACT 2015"
              layout="intrinsic"
              width={300}
              height={100}
              objectFit="contain"
            />
          </div>

                    {/* 👤 Conditionally show username or Login */}
          <div>{username ? (
            <p className="text-sm text-gray-800">Logged in as <strong>{username}</strong></p>
          ) : (
            <a href="/page6.html" className="text-sm underline text-green-600 hover:text-green-800">
              Login
            </a>
          )}
          </div>
          
          <ol className="list-inside list-decimal text-xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              STRATA SCHEMES MANAGEMENT ACT 2015
            </li>
            <li className="tracking-[-.01em]">- As at 2 March 2025</li>
          </ol>

          <a href="/apage.html" className="text-sm underline text-blue-600 hover:text-blue-800">
            Feedbackform
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
