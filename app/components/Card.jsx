import { string } from "prop-types";
import React from "react";

SmallCardComponent.propTypes = {
  imageUrl: string,
  headerText: string,
  message: string,
};

// TODO: set up propTypes Requires at least imageUrl to be passed
export default function SmallCardComponent(props) {
  return(
    <div className="flex max-w-sm p-6 mx-auto rounded-lg shadow-xl bg-gray-50">
      <div className="flex-shrink-0">
        <img src={`${props.imageUrl}`} alt="" className="w-12 h-12" />
      </div>
      <div className="pt-1 ml-6">
        <h4 className="text-xl text-gray-900">props.headerText</h4>
        <p className="text-base text-gray-600">props.message</p>
      </div>
    </div>
  );
}
