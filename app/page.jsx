import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl">Home Page</h1>
      <Link href="properties">Go to properties</Link>
    </div>
  );
};

export default HomePage;
