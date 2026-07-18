import { createUniqueId, type ComponentProps } from "solid-js"

export function WordmarkV2(props: Pick<ComponentProps<"svg">, "class">) {
  const mask = createUniqueId()
  const maskGradient = createUniqueId()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 461 129"
      fill="none"
      classList={{ [props.class ?? ""]: !!props.class }}
    >
      <g opacity="0.6">
        <g mask={`url(#${mask})`}>
          <g opacity="0.16">
            {/* d */}
            <path
              opacity="0.7"
              d="M55.3846 36.8571H18.4615V92.1429H55.3846V36.8571ZM73.8462 110.571H0V18.4286H55.3846V0H73.8462V110.571Z"
              fill="currentColor"
            />
            {/* a */}
            <path
              opacity="0.7"
              d="M147.385 73.2857H110.462V91.7143H147.385V73.2857ZM165.846 110.143H92V54.8571H147.385V36.4286H92V18H165.846V110.143Z"
              fill="currentColor"
            />
            {/* l */}
            <path
              opacity="0.7"
              d="M230.154 110.143H211.692V0H230.154V110.143Z"
              fill="currentColor"
            />
            {/* a */}
            <path
              opacity="0.7"
              d="M331.385 73.2857H294.462V91.7143H331.385V73.2857ZM349.846 110.143H276V54.8571H331.385V36.4286H276V18H349.846V110.143Z"
              fill="currentColor"
            />
            {/* m */}
            <path
              opacity="0.7"
              d="M460.308 110.143H441.846V36.4286H423.385V110.143H404.923V36.4286H386.462V110.143H368V18H460.308V110.143Z"
              fill="currentColor"
            />
          </g>
        </g>
      </g>
      <defs>
        <mask id={mask} style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="461" height="129">
          <rect width="461" height="129" fill={`url(#${maskGradient})`} />
        </mask>
        <linearGradient id={maskGradient} x1="230.5" y1="68" x2="230.5" y2="129" gradientUnits="userSpaceOnUse">
          <stop stop-color="white" stop-opacity="0.7" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
