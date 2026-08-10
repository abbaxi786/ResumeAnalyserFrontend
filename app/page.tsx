'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import appContexts from "./lib/context";
import ResumeResults from "./lib/landingContent";


export default function Home() {

  const { user } = React.useContext(appContexts);

  return (
    <ResumeResults/>
  );
}
