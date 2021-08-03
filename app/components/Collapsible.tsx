
import React, { useState } from "react";
import {PortfolioSummary } from "@components/DropdownPortfolioRow"

interface IProps {
  open?: boolean;
  // openContnet: Element
  // closedContent: Element
  group: String
}

const Collapsible: React.FC<IProps> = ({ open, children, group }) => {
  const [isOpen, setIsOpen] = useState(closed);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="items-center w-full p-1 p-2 bg-gray-300 shadow-md cursor-pointer hover:bg-gray150- rounded-md" onClick={handleFilterOpening}>
        <div>
          {/* //{!isOpen ? ( */}
            <div className="justify-content-between font-weight-bold divide-y-4">{<PortfolioSummary group = {group}/>} </div>
         {/* // ) : ( */}
            {/* <div className="p-1 bg-purple-500 justify-content-between font-weight-bold" > {<PortfolioDetails/>} </div> */}
         {/* // )
         // } */}
          
        </div>

        <div className="border-bottom">
          <div>{isOpen && <div className="p-3">{children}</div>}</div>
        </div>
      </div>
    </>
  );
};

export default Collapsible;



// function Accordion(props) {
//  return (
//    <div className="flex flex-col">
//      <button className="flex items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-200">
//        <p className="text-sm font-semibold">{props.title}</p>
//      </button>
//      <div className="overflow-hidden bg-white">
//        <div
//          className="p-4 text-sm font-normal"
//          dangerouslySetInnerHTML={{ __html: props.content }}
//        />
//      </div>
//    </div>
//  );
// }

// export default Accordion;