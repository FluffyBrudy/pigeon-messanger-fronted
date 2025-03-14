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
      className="absolute z-[100] w-[50vw] lg:w-[300px] rounded-md shadow-xl 
                 flex justify-center bg-gray-800/90 border border-gray-600 backdrop-blur-md"
    >
      {children}
    </div>
  );
};

export default Menu;
