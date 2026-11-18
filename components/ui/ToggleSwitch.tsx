import { useState } from "react";

interface ToggleSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export default function ToggleSwitch({ checked, onChange, disabled = false }: ToggleSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(false);

  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internalChecked;

  const toggle = () => {
    if (disabled) return;

    const nextValue = !isOn;

    if (!isControlled) {
      setInternalChecked(nextValue);
    }

    onChange?.(nextValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={toggle}
      className={`
        relative inline-flex h-7 w-12 shrink-0
        items-center rounded-full transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${isOn ? "bg-[var(--primary)]" : "bg-gray-400"}
      `}>
      <span
        className={`
          inline-block h-5 w-5 rounded-full bg-white shadow-sm
          transition-transform duration-200
          ${isOn ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}
