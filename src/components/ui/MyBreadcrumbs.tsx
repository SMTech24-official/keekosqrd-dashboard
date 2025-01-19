import { cn } from "@/lib/utils";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";

interface BreadcrumbLink {
  name: string;
  href?: string | null;
}

interface BookDetailsComponentProps {
  breadcrumbLinks: BreadcrumbLink[] | undefined;
  className?: string;
}
const MyBreadcrumbs = ({ breadcrumbLinks, className }: BookDetailsComponentProps) => {
  return (
    <>
      <Breadcrumbs className={cn(className)}>
        {breadcrumbLinks?.map((crumb, index) => (
          <BreadcrumbItem key={index}>
            {crumb.href ? (
              <Link href={crumb.href}>{crumb.name}</Link>
            ) : (
              crumb.name
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </>
  );
};

export default MyBreadcrumbs;
