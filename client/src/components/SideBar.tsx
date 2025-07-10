import { SideBarType } from "@/types/Sidebar";
import React from "react";

type SideBarProps = {
  sidebarName: string;
  datas: SideBarType[];
  view: React.ReactNode;
  setView: (view: React.ReactNode) => void;
};

const SideBar = ({ sidebarName, datas, view, setView }: SideBarProps) => {
  return (
    <div className="flex min-h-[80vh]">
      <aside className="w-64 h-fit bg-zinc-900/90 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)] border border-zinc-700 p-6">
        <h2 className="text-xl font-semibold mb-6 text-purple-300">
          {sidebarName}
        </h2>
        <ul className="space-y-1">
          {datas.map((data, inx) => {
            const isActive = view === data.value;
            return (
              <li key={inx}>
                <button
                  onClick={() => setView(data.value)}
                  className={`flex items-center w-full text-left px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "hover:bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {data.name}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
      <main className="flex-1 p-6">{view}</main>
    </div>
  );
};

export default SideBar;
