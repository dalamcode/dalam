import { type ComponentProps } from "solid-js"

export const Mark = (props: { class?: string }) => {
  return (
    <svg
      data-component="logo-mark"
      classList={{ [props.class ?? ""]: !!props.class }}
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip-mark">
          <circle cx="140" cy="140" r="135" />
        </clipPath>
      </defs>
      <g clip-path="url(#clip-mark)">
        <rect x="0" y="0" width="280" height="280" fill="#6b00ff" />
        <circle cx="80" cy="100" r="120" fill="#00f0ff" opacity="0.8" />
        <circle cx="200" cy="180" r="100" fill="#ff0099" opacity="0.8" />
        <circle cx="140" cy="60" r="90" fill="#8b5cf6" opacity="0.7" />
        <circle cx="50" cy="200" r="80" fill="#6b00ff" opacity="0.6" />
      </g>
      <ellipse cx="90" cy="80" rx="40" ry="30" fill="white" opacity="0.4" />
      <ellipse cx="100" cy="90" rx="20" ry="15" fill="white" opacity="0.6" />
      <circle cx="140" cy="140" r="135" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
    </svg>
  )
}

export const Splash = (props: Pick<ComponentProps<"svg">, "ref" | "class">) => {
  return (
    <svg
      ref={props.ref}
      data-component="logo-splash"
      classList={{ [props.class ?? ""]: !!props.class }}
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip-splash">
          <circle cx="140" cy="140" r="135" />
        </clipPath>
      </defs>
      <g clip-path="url(#clip-splash)">
        <rect x="0" y="0" width="280" height="280" fill="#6b00ff" />
        <circle cx="80" cy="100" r="120" fill="#00f0ff" opacity="0.8" />
        <circle cx="200" cy="180" r="100" fill="#ff0099" opacity="0.8" />
        <circle cx="140" cy="60" r="90" fill="#8b5cf6" opacity="0.7" />
        <circle cx="50" cy="200" r="80" fill="#6b00ff" opacity="0.6" />
      </g>
      <ellipse cx="90" cy="80" rx="40" ry="30" fill="white" opacity="0.4" />
      <ellipse cx="100" cy="90" rx="20" ry="15" fill="white" opacity="0.6" />
      <circle cx="140" cy="140" r="135" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
    </svg>
  )
}

export const Logo = (props: { class?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 280"
      fill="none"
      classList={{ [props.class ?? ""]: !!props.class }}
    >
      <defs>
        <clipPath id="clip-logo">
          <circle cx="140" cy="140" r="135" />
        </clipPath>
      </defs>
      <g clip-path="url(#clip-logo)">
        <rect x="0" y="0" width="280" height="280" fill="#6b00ff" />
        <circle cx="80" cy="100" r="120" fill="#00f0ff" opacity="0.8" />
        <circle cx="200" cy="180" r="100" fill="#ff0099" opacity="0.8" />
        <circle cx="140" cy="60" r="90" fill="#8b5cf6" opacity="0.7" />
        <circle cx="50" cy="200" r="80" fill="#6b00ff" opacity="0.6" />
      </g>
      <ellipse cx="90" cy="80" rx="40" ry="30" fill="white" opacity="0.4" />
      <ellipse cx="100" cy="90" rx="20" ry="15" fill="white" opacity="0.6" />
      <circle cx="140" cy="140" r="135" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
    </svg>
  )
}
