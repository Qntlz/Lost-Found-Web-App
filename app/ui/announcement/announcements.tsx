import Image from 'next/image';
import { inter } from '../fonts';

export default function Announcements (){
    return (
        <div className="relative">
            <h2 className={`${inter.className} font-bold`}>Announcements</h2>
            <div className="mt-3 mx-3">
              <div className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Profile"
                  width={100}
                  height={100}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold text-lg">Carl Omega</h3>
                  <p className="text-sm text-gray-400">Racist Department Admin</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda labore, dolores voluptatum rerum non officia, saepe at placeat natus, vel eos voluptates commodi unde cupiditate! Obcaecati placeat quod eos natus!</p>
            </div>
        </div>
    );
}