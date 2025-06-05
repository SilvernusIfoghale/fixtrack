import BottomNavigation from "../components/bottom-navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <BottomNavigation />
    </div>
  );
}
