import TimeBooker from "@/components/TimeBooker"
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <TimeBooker />

      <Link href="/todo" passHref>
        <Button className="mt-4">Go to TODO page</Button>
      </Link>
    </main>
  );
}
