"use client";

import Image from "next/image";
import {
  SignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useSession,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const files = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFile);
  const session = useSession();
  return (
    <main className=' grid justify-center items-center mt-40'>
      <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>

      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}

      <Button
        onClick={() => {
          createFile({
            name: "hello world",
          });
        }}
      >
        Click me
      </Button>
    </main>
  );
}
