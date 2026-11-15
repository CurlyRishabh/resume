import Image from "next/image";

/**
 * A browser window showing a real screenshot of the live shop. The
 * screenshot is taller than the window and pans slowly up and down
 * (see .shop-pan in globals.css); hovering pauses it.
 */
export default function ShopPreview() {
    return (
        <div className="rounded-2xl border border-white/10 bg-black shadow-2xl shadow-accent2/20 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/10">
                <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-400/80"></span>
                <span className="ml-3 flex-1 min-w-0 truncate rounded-md bg-black/60 px-3 py-1 text-xs text-gray-400 font-mono">
                    curlyrishabh.github.io/E-commerce
                </span>
            </div>
            <div className="shop-window h-[22rem] overflow-hidden">
                <Image
                    src="/projects/cool-store.jpg"
                    alt="The Cool Store home page: a featured shoe, best sellers with prices and Add to Cart buttons, and featured collections"
                    width={960}
                    height={2250}
                    sizes="(max-width: 1024px) 100vw, 36rem"
                    className="shop-pan w-full h-auto"
                />
            </div>
        </div>
    );
}
