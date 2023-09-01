"use client";
import { useState } from "react";
import Link from "next/link";
import {
  XMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Switch } from "@headlessui/react";
import { classNames } from "utils/helpers";

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
              <SpeakerWaveIcon
                // className="h-6 w-6 dark:text-white"
                className="h-6 w-6"
                aria-hidden="true"
              />
            ) : (
              <SpeakerXMarkIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
          <div className="flex flex-1 justify-end">
            <Link
              href="#"
              // className="text-sm font-semibold leading-6 text-indigo-600 dark:text-gray-100"
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
            <div className="mt-6 space-y-2">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Language and dates
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Choose what language and date format to use throughout your
                  account.
                </p>

                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      Language
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">English</div>
                      <button
                        type="button"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Update
                      </button>
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      Date format
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">DD-MM-YYYY</div>
                      <button
                        type="button"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Update
                      </button>
                    </dd>
                  </div>
                  <Switch.Group as="div" className="flex pt-6">
                    <Switch.Label
                      as="dt"
                      className="flex-none pr-6 font-medium text-gray-900 sm:w-64"
                      passive
                    >
                      Automatic timezone
                    </Switch.Label>
                    <dd className="flex flex-auto items-center justify-end">
                      <Switch
                        checked={true}
                        // onChange={setAutomaticTimezoneEnabled}
                        className={classNames(
                          // automaticTimezoneEnabled ? 'bg-indigo-600' : 'bg-gray-200',
                          "flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            // automaticTimezoneEnabled ? 'translate-x-3.5' : 'translate-x-0',
                            "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                          )}
                        />
                      </Switch>
                    </dd>
                  </Switch.Group>
                </dl>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}
