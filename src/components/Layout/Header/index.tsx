import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="text-white p-4 bg-zinc-900/50 border-b-[1px] border-zinc-800 rounded-xl">
      <div className="w-full max-w-[1440px] flex items-center justify-between mx-auto px-10">
        <div className="flex justify-between items-center gap-10">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo/logo.svg"
                alt="Planner Logo"
                width={160}
                height={160}
                className="mr-4"
              />
            </Link>
          </div>

          <nav className="flex gap-6">
            <Link href="/">
              <div className="hover:underline">Home</div>
            </Link>
            <Link href="/trip">
              <div className="hover:underline">Trips</div>
            </Link>
          </nav>
        </div>
        <div className="text-sm w-fit">
          <span>Explore Your Next Adventure</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
