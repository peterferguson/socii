export default function OutlineButton({ href, text, className }) {
  return (
    <a
      href={href}
      className={`bg-transparent mr-auto hover:bg-teal-500 text-brand-light hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-brand-light hover:border-transparent ${className}`}
    >
      {text}
    </a>
  )
}
