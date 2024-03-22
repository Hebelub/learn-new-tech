import TimeBooker from "@/components/TimeBooker"
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <TimeBooker />

      <div className="flex mt-4 gap-4"> {/* Added a wrapper div with flex display and gap */}
        <Link href="/todos" passHref>
          <Button>Go to TODOs page</Button>
        </Link>

        <Link href="/events" passHref>
          <Button>Go to Events page</Button>
        </Link>
      </div>
    </main>
  );
}
