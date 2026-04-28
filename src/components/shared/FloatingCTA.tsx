import { Calendar } from 'lucide-react';

const FloatingCTA = () => {
  return (
    <a href="#book-now" className="fixed bottom-8 right-8 z-[999] md:hidden bg-brand-yellow text-black p-5 rounded-full shadow-2xl animate-bounce">
      <Calendar className="w-6 h-6" />
    </a>
  );
};
export default FloatingCTA;