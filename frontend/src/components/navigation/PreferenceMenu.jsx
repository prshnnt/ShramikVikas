import { useEffect, useId, useRef, useState } from "react";
import { Check } from "lucide-react";
export function PreferenceMenu({ label, icon, value, options, onChange, description, showValue = false }) {
    const [open, setOpen] = useState(false);
    const id = useId();
    const root = useRef(null);
    const trigger = useRef(null);
    const current = options.find(option => option.value === value);
    function close(restore = false) { setOpen(false); if (restore)
        trigger.current?.focus(); }
    useEffect(() => {
        if (!open)
            return;
        root.current?.querySelector('[aria-checked="true"]')?.focus();
        function outside(event) { if (!root.current?.contains(event.target))
            setOpen(false); }
        function escape(event) {
            if (event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                setOpen(false);
                trigger.current?.focus();
            }
        }
        document.addEventListener("pointerdown", outside);
        const node = root.current;
        node?.addEventListener("keydown", escape);
        return () => { document.removeEventListener("pointerdown", outside); node?.removeEventListener("keydown", escape); };
    }, [open]);
    return <div className="preference-menu" ref={root} onBlur={event => {
            if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget))
                setOpen(false);
        }}>
    <button ref={trigger} type="button" className="preference-trigger" aria-label={label + ": " + current.label} aria-haspopup="menu" aria-expanded={open} aria-controls={open ? id : undefined} onClick={() => setOpen(!open)} onKeyDown={event => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                setOpen(true);
            }
        }}>{icon}<span lang={current.lang}>{showValue ? current.label : label}</span></button>
    {open && <div className="preference-popover">
      <div role="menu" id={id} aria-label={label} aria-describedby={description ? id + "-note" : undefined} onKeyDown={event => {
                const items = Array.from(event.currentTarget.querySelectorAll('[role="menuitemradio"]'));
                const index = items.indexOf(document.activeElement);
                const next = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : event.key === "ArrowDown" ? (index + 1) % items.length : event.key === "ArrowUp" ? (index - 1 + items.length) % items.length : -1;
                if (next >= 0) {
                    event.preventDefault();
                    items[next]?.focus();
                }
                if (event.key === "Tab")
                    close(true);
            }}>
        {options.map(option => <button key={option.value} type="button" role="menuitemradio" aria-checked={option.value === value} tabIndex={-1} onClick={() => { onChange(option.value); close(true); }}>
          {option.icon}<span lang={option.lang}>{option.label}</span>{option.value === value && <Check size={16} aria-hidden="true"/>}
        </button>)}
      </div>
      {description && <p id={id + "-note"}>{description}</p>}
    </div>}
  </div>;
}
