import { StaticImageData } from "next/image";

export interface Metric {
  title: string;
  value: number;
  description: string;
  icon: StaticImageData;
  change: number;
}
