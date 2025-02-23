"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen w-screen justify-center items-center flex flex-col gap-4 bg-white">
      <p>Currently this Project is under dev Mode</p>
      <Link className="underline" href={"/questions"}>
        Go to Questions page
      </Link>
      <Link
        className="underline"
        href={"https://github.com/orgs/Frontend-Forge"}
      >
        Contribute on Github
      </Link>
    </div>
  );
}
