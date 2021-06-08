import React from 'react';
import { Link } from 'react-router-dom';

const renderMenuItem = (route, i) => (
  <li key={'li-item-' + i} className="items-center">
    <Link
      className={
        'text-xs uppercase py-3 font-bold block ' +
        (window.location.href.indexOf('/admin/dashboard') !== -1
          ? 'text-lightBlue-500 hover:text-lightBlue-600'
          : 'text-blueGray-700 hover:text-blueGray-500')
      }
      to={route.path}
    >
      <i
        className={
          route.icon +
          ' mr-2 text-sm ' +
          (window.location.href.indexOf('/admin/dashboard') !== -1
            ? 'opacity-75'
            : 'text-blueGray-300')
        }
      ></i>
      {route.name}
    </Link>
  </li>
);

const renderMenus = (route, i) => (
  <React.Fragment key={'li-menu-' + i}>
    <hr className="my-4 md:min-w-full" />
    <h6
      key={'sub' + i}
      className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
    >
      <i className={route.icon}></i>
      {route.name}
    </h6>
    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
      {renderRoutes(route.routes)}
    </ul>
  </React.Fragment>
);
const renderNavs = (route, i) => (route.routes ? renderMenus(route, i) : renderMenuItem(route, i));
const renderRoutes = (routes) =>
  routes && routes.filter((route) => Boolean(route.name)).map(renderNavs);

export default ({ routes, ...rest }) => {
  return (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        <Link
          className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          to="/"
        >
          JXML React
        </Link>
        <div
          className={
            'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded '
          }
        >
          {renderRoutes(routes)}
        </div>
      </div>
    </nav>
  );
};
