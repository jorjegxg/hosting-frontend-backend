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

    const y = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <button id={id} type="button" onClick={handleClick} className={className}>
      {label}
    </button>
  );
}
