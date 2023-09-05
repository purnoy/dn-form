import Locafont from '@next/font/local';
import DynamicForm from '../components/DynamicForm';

// Downloaded Font
export const lobster = Locafont({
  src: '../font/Lobster-Regular.ttf',
  variable: '--lobster',
});

export default function Home() {
  return (
    <div className="flex items-center justify-center w-[100%] h-full">
      <DynamicForm />
    </div>
  );
}
