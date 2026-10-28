"use client"
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const TIMEOUT_MS = 2000;
const WELCOME = {
    kind: "info",
    text: 'Try  sim.check(500)  or  sim.run({ seed: 7, events: [[12, "kill:payment"]] })  or  help()',
};

export function openConsole() {
    window.dispatchEvent(new Event("console-open"));
}

export default function Console() {
    const dialogRef = useRef(null);
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const workerRef = useRef(null);
    const pending = useRef(new Map());
    const nextId = useRef(1);
    const [entries, setEntries] = useState([WELCOME]);
    const [history, setHistory] = useState([]);
    const [cursor, setCursor] = useState(-1);
    const [busy, setBusy] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const spawn = () => {
        const worker = new Worker(new URL("../../lib/console/console.worker.ts", import.meta.url), { type: "module" });
        worker.onmessage = (event) => {
            const msg = event.data;
            const entry = pending.current.get(msg.id);
            if (!entry) return;
            clearTimeout(entry.timer);
            pending.current.delete(msg.id);
            entry.resolve(msg);
        };
        workerRef.current = worker;
        return worker;
    };

    const execute = (code) =>
        new Promise((resolve) => {
            const worker = workerRef.current ?? spawn();
            const id = nextId.current++;
            // A runaway loop can't freeze the page: kill the worker and start a fresh one.
            const timer = setTimeout(() => {
                pending.current.delete(id);
                worker.terminate();
                workerRef.current = null;
                resolve({ id, ok: false, error: `Timed out after ${TIMEOUT_MS / 1000} s. The worker was terminated and will restart.`, ms: TIMEOUT_MS });
            }, TIMEOUT_MS);
            pending.current.set(id, { resolve, timer });
            worker.postMessage({ id, code });
        });

    useEffect(() => {
        const open = () => {
            const dialog = dialogRef.current;
            if (dialog && !dialog.open) {
                dialog.showModal();
                inputRef.current?.focus();
            }
        };
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                const dialog = dialogRef.current;
                if (dialog?.open) dialog.close();
                else open();
            }
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("console-open", open);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("console-open", open);
            workerRef.current?.terminate();
        };
    }, []);

    useEffect(() => {
        outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
    }, [entries]);

    const submit = async (e) => {
        e.preventDefault();
        const code = inputRef.current.value.trim();
        if (!code || busy) return;
        inputRef.current.value = "";
        setHistory((h) => [code, ...h.filter((c) => c !== code)].slice(0, 50));
        setCursor(-1);

        if (code === "clear") {
            setEntries([]);
            return;
        }

        setEntries((list) => [...list, { kind: "input", text: code }]);
        setBusy(true);
        const result = await execute(code);
        setBusy(false);
        setEntries((list) => [
            ...list,
            result.ok
                ? { kind: "output", text: result.text, ms: result.ms }
                : { kind: "error", text: result.error, ms: result.ms },
        ]);

        if (result.ok && result.hash) {
            if (pathname === "/") window.location.hash = result.hash;
            else router.push(`/#${result.hash}`);
            dialogRef.current?.close();
        }
    };

    const onInputKey = (e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            if (history.length === 0) return;
            e.preventDefault();
            const next = e.key === "ArrowUp" ? Math.min(cursor + 1, history.length - 1) : Math.max(cursor - 1, -1);
            setCursor(next);
            inputRef.current.value = next === -1 ? "" : history[next];
        } else if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            setEntries([]);
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className="console"
            aria-label="Console"
            data-xray="client"
            data-xray-label="Console · client island + sandboxed worker"
            onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        >
            <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-2.5 font-mono text-xs text-muted">
                <span><b className="font-medium text-ink">Console</b> · sandboxed Web Worker, no DOM or network</span>
                <span>esc</span>
            </div>
            <div ref={outputRef} className="max-h-[50vh] min-h-[120px] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-[1.6]" aria-live="polite">
                {entries.map((entry, i) => (
                    <div key={i} className={`console-entry console-${entry.kind}`}>
                        {entry.kind === "input" && <span className="select-none text-muted">› </span>}
                        <span className="whitespace-pre-wrap break-words">{entry.text}</span>
                        {entry.ms !== undefined && <span className="ml-2 text-[11px] text-muted">{entry.ms < 1 ? "<1" : Math.round(entry.ms)} ms</span>}
                    </div>
                ))}
                {busy && <div className="console-entry text-muted">running…</div>}
            </div>
            <form onSubmit={submit} className="flex items-center gap-2 border-t border-rule px-4 py-3">
                <span className="select-none font-mono text-muted" aria-hidden="true">›</span>
                <label htmlFor="console-input" className="sr-only">Command</label>
                <input
                    id="console-input"
                    ref={inputRef}
                    onKeyDown={onInputKey}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-ink outline-none"
                    placeholder="help()"
                />
            </form>
        </dialog>
    );
}
