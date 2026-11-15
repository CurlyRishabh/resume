"use client"
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * The lead work story, played by scrolling. On wide screens the card pins
 * while the manual "before" steps are crossed out and the automated
 * "after" steps light up one by one. On small screens the same animation
 * plays as the card scrolls past, without pinning.
 */

function BeforeStep({ progress, index, count, reduce, children }) {
    const start = 0.34 + (index / count) * 0.2;
    const strike = useTransform(progress, [start, start + 0.07], [0, 1]);
    const opacity = useTransform(progress, [start, start + 0.07], [1, 0.4]);
    return (
        <motion.li
            className="relative rounded-xl border border-dashed border-gray-600 px-4 py-3 text-gray-300"
            style={{ opacity: reduce ? 0.4 : opacity }}
        >
            {children}
            <motion.span
                className="absolute left-3 right-3 top-1/2 h-0.5 origin-left bg-gray-400"
                style={{ scaleX: reduce ? 1 : strike }}
                aria-hidden="true"
            />
        </motion.li>
    );
}

function AfterStep({ progress, index, count, isResult, reduce, children }) {
    const start = 0.56 + (index / count) * 0.34;
    const opacity = useTransform(progress, [start, start + 0.08], [0.3, 1]);
    const x = useTransform(progress, [start, start + 0.08], [24, 0]);
    return (
        <motion.li
            className={
                isResult
                    ? "rounded-xl px-4 py-3 font-semibold text-black bg-accent2 shadow-lg shadow-accent2/20"
                    : "rounded-xl border border-accent2/50 bg-accent2/10 px-4 py-3 text-gray-100"
            }
            style={reduce ? undefined : { opacity, x }}
        >
            {children}
        </motion.li>
    );
}

export default function PinnedStory({ story }) {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end end"] });
    const meter = useTransform(scrollYProgress, [0.34, 0.92], [0, 1], { clamp: true });

    return (
        <div ref={ref} className="lg:h-[240vh]">
            <div className="lg:sticky lg:top-0 lg:h-screen flex items-center">
                <article className="w-full max-w-6xl mx-auto bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 lg:p-10 border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">{story.context}</p>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">{story.title}</h3>
                    <p className="text-gray-200 text-lg leading-relaxed mb-8 max-w-3xl">{story.plain}</p>

                    <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-10 items-start">
                        <div>
                            <p className="text-xs uppercase tracking-wider font-semibold mb-3 text-gray-500">Before</p>
                            <ol className="space-y-3">
                                {story.before.map((step, index) => (
                                    <BeforeStep key={step} progress={scrollYProgress} index={index} count={story.before.length} reduce={reduce}>
                                        {step}
                                    </BeforeStep>
                                ))}
                            </ol>
                        </div>

                        <div className="hidden lg:flex self-center text-4xl text-accent2" aria-hidden="true">→</div>

                        <div>
                            <p className="text-xs uppercase tracking-wider font-semibold mb-3 text-accent2">After</p>
                            <ol className="space-y-3">
                                {story.after.map((step, index) => (
                                    <AfterStep
                                        key={step}
                                        progress={scrollYProgress}
                                        index={index}
                                        count={story.after.length}
                                        isResult={index === story.after.length - 1}
                                        reduce={reduce}
                                    >
                                        {step}
                                    </AfterStep>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Manual -> automated meter, driven by the same scroll */}
                    <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-wider font-semibold" aria-hidden="true">
                        <span className="text-gray-500">By hand</span>
                        <div className="flex-1 h-1.5 rounded-full bg-gray-800 overflow-hidden">
                            <motion.div
                                className="h-full origin-left rounded-full bg-gradient-to-r from-accent2 to-accent"
                                style={{ scaleX: reduce ? 1 : meter }}
                            />
                        </div>
                        <span className="text-accent2">Automatic</span>
                    </div>

                    <p className="mt-6 pt-4 border-t border-white/10 text-sm text-gray-400 leading-relaxed">
                        <span className="font-mono text-xs uppercase tracking-wider text-accent2">Under the hood </span>
                        {story.tech}
                    </p>
                </article>
            </div>
        </div>
    );
}
