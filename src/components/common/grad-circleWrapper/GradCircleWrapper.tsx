export default function GradCircleWrapper({
    children,
    className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
    return (
        <div className={`flex flex-col relative items-center justify-center w-full ${className}`}>
            <div className="z-20">
            {children}
            </div>
            <div className="absolute bg-gradient-to-b from-white to-[#F5EEF3] xl:p-64 lg:p-60 sm:p-52 p-40  rounded-full">
            </div>
        </div>
    );
}
