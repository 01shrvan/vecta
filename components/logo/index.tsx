import Link from "next/link";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <Link href={url} className="w-fit flex items-center gap-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-md overflow-hidden bg-primary text-primary-foreground">
        <img src="/logo.svg" alt="Logo" width={36} height={36} />
      </div>

      <div className="flex text-left text-base leading-tight">
        <span className="font-medium">vecta</span>
      </div>
    </Link>
  );
};

export default Logo;
