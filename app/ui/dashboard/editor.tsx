'use client';
import { useState, useEffect, useActionState } from 'react';
import { Inter, Roboto, Open_Sans, Lato, Montserrat, Oswald, Raleway, Ubuntu, Besley, Poppins, Merriweather, Nunito, Playfair_Display, PT_Serif, Noto_Sans, Fira_Sans, Josefin_Sans, Cabin, Cedarville_Cursive, Playwrite_IN } from 'next/font/google';
import clsx from 'clsx';
import { addEntry, EntryForm, updateEntry } from '@/app/lib/actions';
import { Button } from '../button';
import { Entry } from '@/app/lib/definitions';
import {AdjustmentsHorizontalIcon} from '@heroicons/react/24/solid';
import {XMarkIcon} from '@heroicons/react/24/outline';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ style: 'italic', weight: '700', subsets: ['latin'] });
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
const cedarvilleCursive = Cedarville_Cursive({ subsets: ['latin'], weight: '400' });
const playwriteindia = Playwrite_IN({ weight: '200'})

export default function Editor({
  entry,
  journalId,
  mode
}: {
  entry?: Entry | string;
  journalId: string;
  mode: 'new' | 'edit';
}) {
  const [id] = useState<string>(journalId);
  const initialState = { message: '', errors: {} };
  const [entryId, setEntryId] = useState('');
  const addEntryWithId = addEntry.bind(null, id);
  const updateEntryWithId = updateEntry.bind(null, id, entryId);
  const [state, formAction] = useActionState<EntryForm | string, FormData>(
    mode === 'edit' ? updateEntryWithId : addEntryWithId,
    initialState
  );

  useEffect(() => {
    if ( typeof state === 'string') {
      window.location.href = state;
    }
  }, [state, mode]);

  const [bgColor, setBgColor] = useState('#121825');
  const [textColor, setTextColor] = useState('#ffffff');
  const [font, setFont] = useState(inter.className);
  const [fontSize, setFontSize] = useState(16);
  const [content, setContent] = useState(typeof entry === 'string' ? entry : '');
  const [bgImage, setBgImage] = useState('default');
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (mode === 'edit' && typeof entry !== 'string' && entry) {
      setBgColor(entry.background_color || '#121825');
      setTextColor(entry.text_color || '#ffffff');
      console.log(entry.font);
      
      setFont(entry.font || inter.className);
      setFontSize(entry.font_size || 16);
      setContent(entry.content || '');
      setBgImage(entry.background_image || 'default');
      setEntryId(entry.id);
    }
  }, [mode, entry]);

  return (
    <form action={formAction}>
      <div className={
        clsx("border border-black p-6 bg-no-repeat bg-cover h-screen w-auto relative",
          { "bg-[url('/beach.jpg')] text-black": bgImage === 'beach' },
          { "bg-[url('/christmas.jpg')] text-white": bgImage === 'christmas' },
          { "bg-[url('/forest.jpg')] text-black": bgImage === 'forest' },
          { "bg-[url('/night.jpg')] text-white": bgImage === 'night' },
          { "bg-gray-900": bgImage === 'default' },

        )
      }>

        <div className="md:hidden w-full flex justify-between items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
          <span className="text-lg font-semibold">Settings</span>
          <button onClick={(e) => {
            e.preventDefault(); // Prevents the page refresh
            setIsOpen((prev) => !prev); // Toggle menu state
          }} className="text-xl">
            {isOpen ? <XMarkIcon className='h-6 w-6'/> : <AdjustmentsHorizontalIcon className='h-6 w-6'/>}
          </button>
        </div>
        <div className="mb-4 space-y-2 flex flex-col sm:flex-row justify-between items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg px-0 md:px-4 md:py-2 rounded-lg shadow-md">

          <div className={clsx(`md:flex md:flex-wrap justify-between space-y-2 md:space-y-0 md:space-x-4 w-full transition-all delay-300 origin-top ease-in-out`,
            { 'flex flex-col space-y-2 absolute top-0 left-0 w-full z-10 p-4': isOpen === true },
            { 'hidden': isOpen === false },
            { "bg-white text-black sm:bg-transparent": bgImage === 'beach' },
            { "bg-gray-900 text-white sm:bg-transparent": bgImage === 'christmas' },
            { "bg-white text-black sm:bg-transparent": bgImage === 'forest' },
            { "bg-gray-900 text-white sm:bg-transparent": bgImage === 'night' },
            { "bg-gray-900 sm:bg-transparent": bgImage === 'default' },

          )}>
            <label className="flex items-center w-full md:w-auto">
              Notes Color:
              <input
                id="background_color"
                name="background_color"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="ml-2 mt-1 block w-7 rounded-full bg-transparent border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="flex items-center w-full md:w-auto">
              Text Color:
              <input
                id="text_color"
                name="text_color"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="ml-2 mt-1 block w-7 rounded-full bg-transparent border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="flex items-center w-full md:w-auto">
              <span className="mr-3">Theme:</span>
              <input type="hidden" id='background_image' name="background_image" value={bgImage} />
              <select
                value={bgImage}
                onChange={(e) => setBgImage(e.target.value)}
                className="bg-gray-50 h-8 p-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="default">Default</option>
                <option value="beach">Beach</option>
                <option value="christmas">Christmas</option>
                <option value="forest">Forest</option>
                <option value="night">Night</option>
              </select>
            </label>
            <label className="flex items-center w-full md:w-auto">
              <span className="mr-3">Font:</span>
              <input type="hidden" name="font" value={font} />
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="bg-gray-50 h-8 p-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
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
                <option value={playwriteindia.className}>Playwrite India</option>
              </select>
            </label>
            <label className="flex items-center w-full md:w-auto">
              <span className="mr-3">Font Size:</span>
              <select
                name='font_size'
                id='font_size'
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bg-gray-50 h-8 p-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={12}>12</option>
                <option value={14}>14</option>
                <option value={16}>16</option>
                <option value={18}>18</option>
                <option value={20}>20</option>
                <option value={24}>24</option>
                <option value={28}>28</option>
                <option value={32}>32</option>
                <option value={36}>36</option>
              </select>
            </label>
          </div>
        </div>

        <textarea
          style={{
            background: bgColor,
            color: textColor,
            fontSize: fontSize,
          }}
          className={`w-full h-4/5 border-none outline-none line-height-7 p-2 box-border resize-none ${font}`}
          placeholder="Type away..."
          id='content'
          name='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button className="w-fit">Save</Button>

      </div>
    </form>

  );
}
