import Image from "next/image";
import Link from "next/link";

export default function SideAd() {
  return (
    <div className="sticky top-24 text-left opacity-80 hover:opacity-100 transition-opacity duration-300">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-gray-400 text-sm uppercase tracking-widest font-light">
          Need a website that works?
        </p>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent leading-tight">
          Better Call Mo
        </h3>
        <div className="mt-2">
          <Image
            src="/images/saul-2.png"
            alt="Website design illustration"
            width={300}
            height={300}
            className="opacity-70 hover:opacity-100 transition-all duration-500"
          />
        </div>

        <Link
          href="#contact"
          className="mt-4 inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300"
        >
          Book a Call
        </Link>
      </div>
    </div>
  );
}
