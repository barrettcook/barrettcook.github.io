import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-white to-gray-100 dark:from-[#18181b] dark:to-[#23272f] px-4 py-10">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center gap-8 mx-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Barrett Cook</div>
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mb-1" />
          </div>
          <nav className="w-full flex flex-col gap-4 mt-4">
            {/* <a
              href="mailto:barrett@example.com"
              className="w-full py-3 px-6 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md hover:bg-blue-50 dark:hover:bg-zinc-800 transition text-center font-medium text-lg text-gray-900 dark:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email
            </a> */}
            <a
              href="https://github.com/barrettcook"
              className="w-full py-3 px-6 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition text-center font-medium text-lg text-gray-900 dark:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/barrettcook/"
              className="w-full py-3 px-6 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md hover:bg-blue-100 dark:hover:bg-zinc-800 transition text-center font-medium text-lg text-gray-900 dark:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            {/* <a
              href="/BarrettCook_Resume.pdf"
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-600 transition text-center text-lg border-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a> */}
          </nav>
        </div>
      </div>
      <footer className="text-xs text-zinc-500 dark:text-zinc-400 text-center w-full mt-8 mb-2">
        © {new Date().getFullYear()} Barrett Cook
      </footer>
    </div>
  );
}
