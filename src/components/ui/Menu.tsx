import React from "react";

interface MenuProps {
  children?: React.ReactNode;
  pos?: { top: number; left: number };
}

const Menu: React.FC<MenuProps> = ({ children, pos = { top: 0, left: 0 } }) => {
  return (
    <div
      style={{
        top: `${pos.top}px`,
        left: `${pos.left}px`,
      }}
      className="absolute bg-white shadow-lg rounded-lg p-3 min-w-[150px] z-50 transition-opacity duration-200 opacity-100"
    >
      {children}
    </div>
  );
};

export default Menu;
