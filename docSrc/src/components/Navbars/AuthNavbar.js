/*eslint-disable*/
import React from 'react';
export default function Navbar(props) {
  return (
    <>
      <nav className="top-0 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-lightBlue-400 sticky">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
              type="button"
              onClick={props.onClickMenuButton}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none block rounded shadow-lg'
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/playground/livecode"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-tv text-lg leading-lg mr-2" />
                  Playground
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/etamity/jxml-react"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Star</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
