/*eslint-disable*/
import React from 'react';
export default function Navbar(props) {
  return (
    <>
      <nav className="top-0 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blue-400">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
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
                  href="/docs/playground"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-tv text-lg leading-lg mr-2" />{' '}
                  Playground
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Share</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/creativetimofficial/notus-react?ref=nr-auth-navbar"
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
