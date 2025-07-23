import Header from "@/src/components/compounds/Layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="max-w-[1250px] px-5 pt-11 mx-auto">
        {children}
      </div>
    </>
  );
} 