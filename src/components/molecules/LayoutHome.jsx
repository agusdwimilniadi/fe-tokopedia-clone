import { Navbar } from './Navbar';

export const LayoutHome = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row ">
        <div className="p-10 w-full">{children}</div>
      </div>
    </div>
  );
};
