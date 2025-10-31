import Image from "next/image";
import Article from "@/components/Article";

export const metadata = {
  title: "Info — Ceylin",
  description: "About / Info",
};

export default function InfoPage() {
  return (
    <Article title="Info" headerBg="#FFF1B5">
      <p>
        Merhaba! 
      </p>

      <Image
        src="/pic11.jpeg"
        alt="Example"
        width={1200}
        height={800}
      />

      <p>
        paragraflar
      </p>
    </Article>
  );
}
