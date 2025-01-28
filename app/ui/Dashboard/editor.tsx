'use client';
import { useState, useEffect } from 'react';
import { Inter, Roboto, Open_Sans, Lato, Montserrat, Oswald, Raleway, Ubuntu, Besley, Poppins, Merriweather, Nunito, Playfair_Display, PT_Serif, Noto_Sans, Fira_Sans, Josefin_Sans, Cabin, Cedarville_Cursive } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ style: 'italic', weight: '700' });
const openSans = Open_Sans({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: '300' });
const montserrat = Montserrat({ subsets: ['latin'] });
const oswald = Oswald({ subsets: ['latin'] });
const raleway = Raleway({ subsets: ['latin'] });
const ubuntu = Ubuntu({ subsets: ['latin'], weight: '300' });
const besley = Besley({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: '300' });
const merriweather = Merriweather({ subsets: ['latin'], weight: '300' });
const nunito = Nunito({ subsets: ['latin'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'] });
const ptSerif = PT_Serif({ subsets: ['latin'], weight: '400' });
const notoSans = Noto_Sans({ subsets: ['latin'] });
const firaSans = Fira_Sans({ subsets: ['latin'], weight: '300' });
const josefinSans = Josefin_Sans({ subsets: ['latin'] });
const cabin = Cabin({ subsets: ['latin'] });
const cedarvilleCursive = Cedarville_Cursive({ subsets: ['latin'] , weight: '400' });

export default function Editor({  
  journalId,
}: {
  journalId: string;
}) {
  const [id, setId] = useState<string | null>(journalId);
  const [bgColor, setBgColor] = useState('#121825');
  const [textColor, setTextColor] = useState('#ffffff');
  const [font, setFont] = useState(inter.className);

  useEffect(() => {
    console.log(bgColor, textColor, font);
  }, [bgColor, textColor, font]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add save logic here
    console.log('Saved ');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-black p-6 bg-teal-800 h-screen w-auto relative">
        <div className="mb-4 space-y-2 flex flex-row justify-between items-center">
          <label className="flex items-center">
            Background Color:
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="ml-2 mt-1 block w-7 rounded-full bg-transparent border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <label className="flex items-center">
            Text Color:
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="ml-2 mt-1 block w-7 rounded-full bg-transparent border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <label className="flex items-center">
            <span className='mr-3'>Font:</span>
            <select value={font} onChange={(e) => setFont(e.target.value)} className="bg-gray-50 h-8 p-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value={inter.className}>Inter</option>
              <option value={roboto.className}>Roboto</option>
              <option value={openSans.className}>Open Sans</option>
              <option value={lato.className}>Lato</option>
              <option value={montserrat.className}>Montserrat</option>
              <option value={oswald.className}>Oswald</option>
              <option value={raleway.className}>Raleway</option>
              <option value={ubuntu.className}>Ubuntu</option>
              <option value={besley.className}>Besley</option>
              <option value={poppins.className}>Poppins</option>
              <option value={merriweather.className}>Merriweather</option>
              <option value={nunito.className}>Nunito</option>
              <option value={playfairDisplay.className}>Playfair Display</option>
              <option value={ptSerif.className}>PT Serif</option>
              <option value={notoSans.className}>Noto Sans</option>
              <option value={firaSans.className}>Fira Sans</option>
              <option value={josefinSans.className}>Josefin Sans</option>
              <option value={cabin.className}>Cabin</option>
              <option value={cedarvilleCursive.className}>Cedarville Cursive</option>
            </select>
          </label>
        </div>
        <textarea
          style={{
            background: bgColor,
            color: textColor,
          }}
          className={`w-full h-4/5 border-none outline-none line-height-7 p-2 box-border resize-none ${font}`}
          placeholder="Type your notes here..."
        />
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Save</button>
      </div>
    </form>
  );
}
