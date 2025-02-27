/* eslint-disable @typescript-eslint/no-explicit-any */
import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon | string | any;
  change: number;
  color: "orange" | "blue" | "teal" | "red";
  progress?: number;
}

export function MetricCard({ title, value, icon: Icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6 text-text_color">
        <div className="flex justify-between">
          {/* first card */}
          {/* card icon */}
          <div className="flex items-center mb-4 gap-3">
            <div className={`p-3 rounded-full bg-[#ECF5FA]`}>
              <Image src={Icon} alt="icon" className="w-7 h-7" />
            </div>
            {/* icon left side text */}
            <div className="space-y-3">
              <p className="text-[20px] text-default font-medium">{title}</p>
              <h2 className="text-xl lg:text-2xl font-extrabold text-heading_color">
                {value.toLocaleString()}
              </h2>
            </div>
          </div>
          {/* second card */}
        </div>
      </CardContent>
    </Card>
  );
}
