import AccountDropdown from "@/components/account-dropdown";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <div className="bg-muted min-h-svh w-full">
      <header className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">NextJS</h1>
          <AccountDropdown />
        </div>
      </header>
      <main className="w-full max-w-4xl mx-auto p-6">{children}</main>
    </div>
  );
}
