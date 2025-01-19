"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface TabPageProps {
  tabs: {
    label: string;
    value: string;
    icon?: JSX.Element;
    component: React.ReactNode;
  }[];
  defaultTab: string;
}



export default function TabPage({ tabs, defaultTab }: TabPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<string>(searchParams.get("tab") ?? defaultTab);

  const handleTab = (category: string) => {
    setTab(category);
    const params = new URLSearchParams(searchParams?.toString());
    params.set("tab", category);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
     {/* <MyBreadcrumbs breadcrumbLinks={breadcrumbLinks} className="mb-4"/> */}
      <div className="border-t ">
        <Tabs
          defaultValue={tab}
          className="sm:grid sm:grid-cols-6 xl:grid-cols-5 min-h-screen"
        >
          <div className="pt-4 col-span-2 xl:col-span-1 sm:border-r w-full h-full sticky sm:block top-[49px]">
            <TabsList className="sm:flex sm:flex-col items-start justify-center sm:justify-start sm:pr-4 sm:sticky sm:top-20 top-16 bg-white xl:block w-full min-h-14 ">
              {tabs?.map((tabItem) => (
                <TabsTrigger
                  key={tabItem.value}
                  onClick={() => handleTab(tabItem.value)}
                  className="sm:text-base w-full text-nowrap"
                  value={tabItem.value}
                >
                  {tabItem?.icon}
                  {tabItem.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="col-span-4 pt-4 z-20">
            {tabs.map((tabItem) => (
              <TabsContent key={tabItem.value} value={tabItem.value}>
                {tabItem.component}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
