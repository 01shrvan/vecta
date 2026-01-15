import Link from "next/link";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <Link href={url} className="w-fit flex items-center gap-2">
      <div className="flex aspect-square size-12 items-center justify-center rounded-md overflow-hidden">
        <img
          src="/logo-light.svg"
          alt="Logo"
          className="size-full scale-[1.8]"
        />
      </div>

      <div className="flex text-left text-base leading-tight">
        <span className="font-medium">vecta</span>
      </div>
    </Link>
  );
};

export default Logo;
