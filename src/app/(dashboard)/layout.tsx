import Header from "@/src/components/compounds/Layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="max-w-[78.125rem] px-5 pt-11 mx-auto">
        {children}
      </main>
    </>
  );
} 