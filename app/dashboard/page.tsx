import { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">You are logged in!</p>
      </CardContent>
    </Card>
  );
}
