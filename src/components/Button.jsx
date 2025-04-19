import '../styles/Button.css';

export default function Button({ children, onClick, color = "red" }) {
    return (
        <button
            className={`btn btn-${color}`}
            onClick={onClick}
        >
            {children}
        </button >
    )
}