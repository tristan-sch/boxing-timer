"use client";
import { useState } from "react";
import Link from "next/link";
import {
  XMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";

type Props = {
  onSoundIconClick: () => void;
  isSoundActive: boolean;
};

export default function Header({ isSoundActive, onSoundIconClick }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-md items-center justify-between bg-gray-100 p-6"
          aria-label="Global"
        >
          <div className="flex flex-1">
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-sm font-semibold text-gray-900"
                onClick={() => setMobileMenuOpen(true)}
              >
                Timer App
              </button>
            </div>
          </div>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={onSoundIconClick}
          >
            <span className="sr-only">Turn off sound</span>
            {isSoundActive ? (
              <SpeakerWaveIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <SpeakerXMarkIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
          <div className="flex flex-1 justify-end">
            <Link
              href="#"
              className="text-sm font-semibold leading-6 text-indigo-600"
            >
              Muay Thai
            </Link>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-1">
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-1 justify-end">Info about App</div>
            </div>
            <div className="mt-6 space-y-2">App du chef tavu</div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}
