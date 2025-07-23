
"use client";

import React from "react";
import Image from "next/image";

import image1 from './CF-FF_ADS_CAROUSEL-1080-x-1080-px-2-e1745984599904-1024x996.webp'
import image3 from './CF-FF_ADS_CAROUSEL.webp'
import image4 from './FF-FULLVIEW1-e1746439033331-1536x1395.webp'
import client from './client2.jpeg'

import before from './ezgif.com-video-to-gif-converter.gif'
import after from './ScreenRecording2025-03-30at7.19.04PM-ezgif.com-video-to-gif-converter.gif'
import { HomeUI } from "@/components/ui/home-ui";


export default function Home() {

  return (
    <HomeUI
      image1={image1}
      image3={image3}
      image4={image4}
      client={client}
      before={before}
      after={after}
    />
  );
}
