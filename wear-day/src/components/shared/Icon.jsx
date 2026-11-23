function Icon({ name, size = 20, fill = "none" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill,
    stroke: "currentColor",
    strokeWidth: 1.65,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.2 4.2" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.5-3.5 3.2-5.3 7-5.3s6.5 1.8 7 5.3" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l1 12H4L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    heart: (
      <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z" />
    ),
    arrow: (
      <>
        <path d="M4 12h15" />
        <path d="m13 5 7 7-7 7" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    star: (
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    ),
    check: <path d="m5 12 4 4L19 6" />,
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    tag: (
      <>
        <path d="M20 13 13 20 4 11V4h7l9 9Z" />
        <circle cx="8" cy="8" r="1" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    facebook: (
      <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9a1 1 0 0 1 1-1Z" />
    ),
    pinterest: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m10 17 2-6m-2.2 1.2c-.8-3.4 4.2-4.8 5-1.6.7 2.7-2 5.7-4.2 3.8-.7-.6-.9-1.3-.8-2" />
      </>
    ),
    truck: (
      <>
        <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
        <circle cx="7.5" cy="19" r="1.5" />
        <circle cx="17.5" cy="19" r="1.5" />
      </>
    ),
    return: (
      <>
        <path d="M4 7v5h5M4.6 12A8 8 0 1 0 7 6.2L4 12" />
        <path d="M12 8v4l3 2" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 1 1 8 0v3" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4c-9 0-15 3-15 10a6 6 0 0 0 6 6c7 0 9-7 9-16Z" />
        <path d="M5 19c3-4 6-7 11-10" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] ?? null}</svg>;
}

export default Icon;
