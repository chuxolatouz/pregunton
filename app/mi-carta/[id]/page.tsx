import type { Metadata } from "next";
import { CustomCardClient } from "@/components/CustomCardClient";
export const metadata: Metadata = {
  title: "Mi carta",
  robots: { index: false, follow: false },
};
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CustomCardClient key={id} id={id} />;
}
