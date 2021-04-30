// Loading Spinner
export default function Loader({ show, className }) {
  return show ? <div className={`loader ${className}`}></div> : null;
}
