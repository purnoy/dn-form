import Image from 'next/image';
import DynamicForm from '@/components/DynamicForm';


export default function Home() {
  return (
   <div className={`flex items-center justify-center `}>
      <DynamicForm/>
   </div>
  )
}
