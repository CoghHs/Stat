import TabBar from "@/components/common/TabBar";

export default async function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TabBar username="user" />
      {children}
    </div>
  );
}
