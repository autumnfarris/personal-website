import { HeartIcon } from '@heroicons/react/24/solid';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-amber-200/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side */}
          <div className="mb-4 md:mb-0">
            {/* <p className="text-gray-700 flex items-center">
              Made with <HeartIcon className="h-4 w-4 text-red-500 mx-1" /> and lots of coffee
            </p> */}
          </div>

          {/* Right side */}
          <div className="text-sm text-gray-600">
            <p>
              © {new Date().getFullYear()} Autumn Farris. Built with Next.js & Tailwind CSS 🍂
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}