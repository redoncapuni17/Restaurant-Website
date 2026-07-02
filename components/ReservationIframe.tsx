import {
  RESDIARY_WIDGET_HEIGHT,
  RESDIARY_WIDGET_URL,
} from "@/lib/resdiary";

/** Server-rendered so the browser starts fetching ResDiary with the initial HTML. */
export default function ReservationIframe() {
  return (
    <iframe
      src={RESDIARY_WIDGET_URL}
      title="Book a table at Pupa Restaurant & Bar"
      loading="eager"
      className="block w-full bg-white"
      style={{
        height: `${RESDIARY_WIDGET_HEIGHT}px`,
        border: "0",
      }}
    />
  );
}
