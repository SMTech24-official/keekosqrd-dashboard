import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image";

interface DriverCardProps {
  name: string;
  avatarUrl: string | StaticImageData;
  className?: string;
}

export function DriverCard({ name, avatarUrl, className }: DriverCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors",
        className
      )}
    >
      <Avatar>
        <AvatarImage src={typeof avatarUrl === "string" ? avatarUrl : avatarUrl.src} alt={name} />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <span className="text-[18px] text-[#515661]">{name}</span>
    </div>
  );
}
