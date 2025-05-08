import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
        <ol className="list-inside list-decimal text-xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2 tracking-[-.01em]">
        STRATA SCHEMES MANAGEMENT ACT 2015
        <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
        </code>
        </li>
        <li className="tracking-[-.01em]">
        - As at 2 March 2025
        </li>
      </ol>
        <a
          href="/apage.html"
          className="text-sm underline text-blue-600 hover:text-blue-800"
        >
          Feedbackform
        </a>

        <a
          href="/page2.html"
          className="text-sm underline text-green-600 hover:text-green-800"
        >
          Notices Page
        </a>

        <a
          href="/page3.html"
          className="text-sm underline text-green-600 hover:text-green-800"
        >
          STRATA SCHEMES MANAGEMENT ACT PART 1
        </a>

        <a
          href="/page4.html"
          className="text-sm underline text-green-600 hover:text-green-800"
        >
          STRATA SCHEMES MANAGEMENT ACT PART 2
        </a>

        <a
          href="/page5.html"
          className="text-sm underline text-green-600 hover:text-green-800"
        >
          STRATA SCHEMES MANAGEMENT ACT PART 3
        </a>
        <a
          href="/api/index.php"
          className="text-sm underline text-green-600 hover:text-green-800"
        >
          Strata PHP
        </a>

        <a
          href="/page6.html"
          className="text-sm underline text-green-600 hover:text-green-800"
        >
          login
        </a>
      </main>
    </div>
  );
}
