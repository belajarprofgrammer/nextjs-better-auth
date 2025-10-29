"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

export default function AccountDropdown() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { data: session } = authClient.useSession();

  const signOut = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-gray-600 cursor-pointer">
          {!session?.user ? (
            <Skeleton className="h-4 w-[150px]" />
          ) : session?.user?.name}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <button
            type="button"
            className="w-full cursor-pointer disabled:pointer-events-none disabled:opacity-50"
            onClick={signOut}
            disabled={isPending}
          >
            <LogOut className="mr-1 h-4 w-4" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
