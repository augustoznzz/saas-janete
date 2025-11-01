import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';

type Course = {
  slug: string;
  title: string;
  description: string;
  price: string;
  image: string;
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-black/10 bg-white hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3]">
        <Image src={course.image} alt={course.title} fill className="object-cover" />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-serif text-xl">{course.title}</h3>
        <p className="text-sm text-black/70 line-clamp-3">{course.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold">{course.price}</span>
          <Button href={`/cursos/${course.slug}`}>Ver detalhes</Button>
        </div>
      </div>
    </div>
  );
}

