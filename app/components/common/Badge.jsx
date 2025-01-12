export default function Badge({ icon, text, className }) {
    return <div className={`bg-white text-black font-mono rounded-lg py-1 px-3 ${className}`}>
        {text}
    </div>
}