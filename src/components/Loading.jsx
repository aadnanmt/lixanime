import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-purple-400">
        <Loader2 size={60} className="animate-spin" />
        <p className="text-sm font-medium animate-pulse">Sedang memuat data nih, sabar dulu...</p>
    </div>
  );
};
export default Loading;