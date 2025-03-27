import TimeProgress from '@/components/ui/time-progress';

const CURRENT_YEAR = new Date().getFullYear();

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-background">
      <header>
        <h1 className="text-7xl sm:text-8xl font-medium flex items-center">
          #{CURRENT_YEAR + 1}
          <span className="text-sky-500">Live</span>
        </h1>
        <div className="mt-10">
          <TimeProgress />
        </div>
      </header>
    </main>
  );
}
