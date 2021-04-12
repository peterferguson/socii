
// Requires at least imageUrl to be passed
export default function SmallCardComponent(props) {
  return(
    <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
      <div className="flex-shrink-0">
        <img src={`${props.imageUrl}`} alt="" className="h-12 w-12" />
      </div>
      <div className="ml-6 pt-1">
        <h4 className="text-xl text-gray-900">props.headerText</h4>
        <p className="text-base text-gray-600">props.message</p>
      </div>
    </div>
  );
}
