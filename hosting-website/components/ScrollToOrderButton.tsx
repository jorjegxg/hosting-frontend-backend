"use client";

type ScrollToOrderButtonProps = {
  label: string;
  className?: string;
  id?: string;
};

export default function ScrollToOrderButton({
  label,
  className,
  id,
}: ScrollToOrderButtonProps) {
  function handleClick() {
    const target = document.getElementById("start-your-order");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", window.location.pathname);
  }

  return (
    <button id={id} type="button" onClick={handleClick} className={className}>
      {label}
    </button>
  );
}
