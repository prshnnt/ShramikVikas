export function Button({ variant = "primary", pending = false, disabled, className = "", ...props }) {
    return <button type="button" className={`button button-${variant} ${className}`} {...props} disabled={disabled || pending} aria-busy={pending || undefined}/>;
}
export function PrimaryButton(props) { return <Button {...props} variant="primary"/>; }
export function SecondaryButton(props) { return <Button {...props} variant="secondary"/>; }
export function IconButton({ label, pending = false, disabled, className = "", ...props }) {
    return <button type="button" aria-label={label} title={label} className={`icon-button ${className}`} {...props} disabled={disabled || pending} aria-busy={pending || undefined}/>;
}
