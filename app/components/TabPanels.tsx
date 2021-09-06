import { Tab } from "@headlessui/react";
import React from "react";

export const TabPanels = ({ categories, children }) => (
  <Tab.Panels className="mt-2">
    {Object.keys(categories).map((_, idx) => (
      <Tab.Panel key={idx} className="p-3 bg-white rounded-2xl focus:outline-none">
        {children}
      </Tab.Panel>
    ))}
  </Tab.Panels>
);
