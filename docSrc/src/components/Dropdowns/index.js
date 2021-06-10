import React from 'react';
import { Link } from 'react-router-dom';
import { createPopper } from '@popperjs/core';

const IndexDropdown = ({ items, label, onClick }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <div className="mb-4 right-0">
      <a
        className="github-star text-white font-bold px-8 py-2 rounded outline-none focus:outline-none bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        {label}
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        {items &&
          items.map((item, index) => {
            let itemView = null;
            switch (item.type) {
              case 'hr':
                itemView = (
                  <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
                );
                break;
              case 'menu':
                itemView = (
                  <a
                    key={`item-${index}`}
                    className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap text-blueGray-700 hover:bg-blue-300 cursor-pointer"
                    onClick={() => {
                      closeDropdownPopover();
                      onClick && onClick(item);
                    }}
                  >
                    {item.label}
                  </a>
                );
                break;
              case 'category':
                itemView = (
                  <span
                    className={
                      'text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400'
                    }
                  >
                    {item.label}
                  </span>
                );
              default:
            }
            return itemView;
          })}
      </div>
    </div>
  );
};

export default IndexDropdown;
