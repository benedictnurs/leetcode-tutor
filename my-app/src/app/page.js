"use client";
import Image from "next/image";
import { Ide } from "./components/Ide/Ide";
import { divider } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";

export default function Home() {
  return (
    <NextUIProvider>
      <main className="bg-gray-50">
        <Header />
        <div className="m-6">
          <Ide />
        </div>
      </main>
    </NextUIProvider>
  );
}
