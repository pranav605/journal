'use client';
import { useState, useEffect, useActionState } from 'react';
import { Inter, Roboto, Open_Sans, Lato, Montserrat, Oswald, Raleway, Ubuntu, Besley, Poppins, Merriweather, Nunito, Playfair_Display, PT_Serif, Noto_Sans, Fira_Sans, Josefin_Sans, Cabin, Cedarville_Cursive, Playwrite_IN } from 'next/font/google';
import clsx from 'clsx';
import { addEntry, deleteEntry, EntryForm, updateEntry } from '@/app/lib/actions';
import { Button } from '../button';
import { Entry } from '@/app/lib/definitions';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';

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
const playwriteindia = Playwrite_IN({ weight: '200' })

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
    if (typeof state === 'string') {
      window.location.href = state;
    }
  }, [state, mode]);

  const [bgColor, setBgColor] = useState('#121825');
  const [textColor, setTextColor] = useState('#ffffff');
  const [font, setFont] = useState('Inter');
  const [fontSize, setFontSize] = useState(16);
  const [content, setContent] = useState(typeof entry === 'string' ? entry : '');
  const [bgImage, setBgImage] = useState('default');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)"); // 'md' breakpoint in Tailwind

    const handleResize = () => {
        if (mediaQuery.matches) {
            setIsOpen(false); // Only close when screen is big
        }
    };

    handleResize(); // Set initial state

    mediaQuery.addEventListener("change", handleResize);

    return () => {
        mediaQuery.removeEventListener("change", handleResize);
    };
}, []);

  const fontList: { [key: string]: string } = {
    "Inter": inter.className,
    'Roboto': roboto.className,
    'Open Sans': openSans.className,
    'Lato': lato.className,
    'Montserrat': montserrat.className,
    'Oswald': oswald.className,
    'Raleway': raleway.className,
    'Ubuntu': ubuntu.className,
    'Besley': besley.className,
    'Poppins': poppins.className,
    'Merriweather': merriweather.className,
    'Nunito': nunito.className,
    'Playfair Display': playfairDisplay.className,
    'PT Serif': ptSerif.className,
    'Noto Sans': notoSans.className,
    'Fira Sans': firaSans.className,
    'Josefin Sans': josefinSans.className,
    'Cabin': cabin.className,
    'Cedarville Cursive': cedarvilleCursive.className,
    'Playwrite India': playwriteindia.className
  };

  useEffect(() => {
    if (mode === 'edit' && typeof entry !== 'string' && entry) {
      setBgColor(entry.background_color || '#121825');
      setTextColor(entry.text_color || '#ffffff');
      setFont(entry.font);
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
          { "bg-[url('/floral.jpg')] text-white": bgImage === 'floral' },
          { "bg-[url('/clouds.jpg')] text-white": bgImage === 'clouds' },
          { "bg-[url('/mythical.jpg')] text-white": bgImage === 'mythical' },
          { "bg-[url('/pirate.jpg')] text-white": bgImage === 'pirate' },
          { "bg-gray-900": bgImage === 'default' },

        )
      }>

        <div className="md:hidden w-full flex justify-between items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
          <div className="flex space-x-2 items-center ">
            <Button className="w-fit">Save</Button>
            {mode === 'edit' && (
              <Button
                type="button"
                className="w-fit bg-red-500 hover:bg-red-700 text-white"
                onClick={async () => {
                  if (mode === 'edit' && entryId) {
                    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
                    if (confirmDelete) {
                      console.log(`Entry with id ${entryId} deleted`);
                      const res = await deleteEntry(entryId, journalId);
                      if (res === 'Error') {
                        alert("Unable to delete the entry, please try again");
                      } else {
                        redirect(`/dashboard/${journalId}/new`);
                      }
                    }
                  }
                }}
              >
                Delete entry
              </Button>
            )}
          </div>
          <button onClick={(e) => {
            e.preventDefault(); // Prevents the page refresh
            setIsOpen((prev) => !prev); // Toggle menu state
          }} className="text-xl">
            {isOpen ? <XMarkIcon className='h-6 w-6' /> : <AdjustmentsHorizontalIcon className='h-6 w-6' />}
          </button>
        </div>
        <div className="mb-4 space-y-2 flex flex-col sm:flex-row justify-between items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg px-0 md:px-4 md:py-2 rounded-lg shadow-md">


          <div className={clsx(`md:flex md:flex-wrap justify-between space-y-2 md:space-y-0 md:space-x-4 w-full transition-all delay-300 origin-top ease-in-out`,
            { 'flex flex-col space-y-2 absolute top-0 left-0 w-full z-10 p-4': isOpen === true },
            { 'hidden': isOpen === false },
            { "bg-white text-black md:bg-transparent": bgImage === 'beach' },
            { "bg-gray-900 text-white md:bg-transparent": bgImage === 'christmas' },
            { "bg-white text-black md:bg-transparent": bgImage === 'forest' },
            { "bg-gray-900 text-white md:bg-transparent": bgImage === 'night' },
            { "bg-gray-900 md:bg-transparent": bgImage === 'default' },

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
                <option value="floral">Floral</option>
                <option value="night">Night</option>
                <option value="clouds">Clouds</option>
                <option value="mythical">Mythical</option>
                <option value="pirate">Pirate</option>
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
                <option className={` ${fontList['Inter']}`} value={'Inter'}>Inter</option>
                <option className={` ${fontList['Roboto']}`} value={'Roboto'}>Roboto</option>
                <option className={` ${fontList['Open Sans']}`} value={'Open Sans'}>Open Sans</option>
                <option className={` ${fontList['Lato']}`} value={'Lato'}>Lato</option>
                <option className={` ${fontList['Montserrat']}`} value={'Montserrat'}>Montserrat</option>
                <option className={` ${fontList['Oswald']}`} value={'Oswald'}>Oswald</option>
                <option className={` ${fontList['Raleway']}`} value={'Raleway'}>Raleway</option>
                <option className={` ${fontList['Ubuntu']}`} value={'Ubuntu'}>Ubuntu</option>
                <option className={` ${fontList['Besley']}`} value={'Besley'}>Besley</option>
                <option className={` ${fontList['Poppins']}`} value={'Poppins'}>Poppins</option>
                <option className={` ${fontList['Merriweather']}`} value={'Merriweather'}>Merriweather</option>
                <option className={` ${fontList['Nunito']}`} value={'Nunito'}>Nunito</option>
                <option className={` ${fontList['Playfair Display']}`} value={'Playfair Display'}>Playfair Display</option>
                <option className={` ${fontList['PT Serif']}`} value={'PT Serif'}>PT Serif</option>
                <option className={` ${fontList['Noto Sans']}`} value={'Noto Sans'}>Noto Sans</option>
                <option className={` ${fontList['Fira Sans']}`} value={'Fira Sans'}>Fira Sans</option>
                <option className={` ${fontList['Josefin Sans']}`} value={'Josefin Sans'}>Josefin Sans</option>
                <option className={` ${fontList['Cabin']}`} value={'Cabin'}>Cabin</option>
                <option className={` ${fontList['Cedarville Cursive']}`} value={'Cedarville Cursive'}>Cedarville Cursive</option>
                <option className={` ${fontList['Playwrite India']}`} value={'Playwrite India'}>Playwrite India</option>

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
          className={`w-full h-4/5 border-none outline-none line-height-7 p-2 box-border resize-none ${fontList[font]}`}
          placeholder="Type away..."
          id='content'
          name='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="hidden md:flex justify-between items-center mt-4">
          <Button className="w-fit">Save</Button>
          {mode === 'edit' && (
            <Button
              type="button"
              className="w-fit bg-red-500 hover:bg-red-700 text-white"
              onClick={async () => {
                if (mode === 'edit' && entryId) {
                  const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
                  if (confirmDelete) {
                    console.log(`Entry with id ${entryId} deleted`);
                    const res = await deleteEntry(entryId, journalId);
                    if (res === 'Error') {
                      alert("Unable to delete the entry, please try again");
                    } else {
                      redirect(`/dashboard/${journalId}/new`);
                    }
                  }
                }
              }}
            >
              Delete entry
            </Button>
          )}
        </div>
      </div>
    </form>

  );
}
