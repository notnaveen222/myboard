"use client";

import Link from "next/link";

interface RouterProps {
  path: String;
  title: String;
  className: String;
}
export default function RouterButton({ path, title, className }: RouterProps) {
  return (
    <div className={`${className} cursor-pointer`}>
      <Link href={`/${path}`}>{title}</Link>
    </div>
  );
}
