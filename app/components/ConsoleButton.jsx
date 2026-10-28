"use client"
import { openConsole } from "./Console";

export default function ConsoleButton() {
    return (
        <button type="button" className="link" onClick={openConsole}>
            Console <kbd className="font-mono">⌘K</kbd>
        </button>
    );
}
