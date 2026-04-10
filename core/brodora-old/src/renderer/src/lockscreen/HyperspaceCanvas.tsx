import * as React from "react";

type Streak = {
	angle: number;
	dist: number;
	speed: number;
	len: number;
};

export type HyperspaceCanvasProps = {
	backgroundColor: string;
	streakColor: string;
};

/**
 * Full-viewport canvas “hyperspace” streak animation for the lock screen backdrop.
 */
export function HyperspaceCanvas({
	backgroundColor,
	streakColor,
}: HyperspaceCanvasProps) {
	const wrapRef = React.useRef<HTMLDivElement>(null);
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const streaksRef = React.useRef<Streak[]>([]);
	const streakColorRef = React.useRef(streakColor);
	const backgroundColorRef = React.useRef(backgroundColor);

	streakColorRef.current = streakColor;
	backgroundColorRef.current = backgroundColor;

	React.useLayoutEffect(() => {
		const wrap = wrapRef.current;
		const canvas = canvasRef.current;
		if (!wrap || !canvas) {
			return;
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return;
		}

		let raf = 0;
		let last = performance.now();

		const layoutSize = () => {
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			return {
				w: Math.max(1, Math.floor(w)),
				h: Math.max(1, Math.floor(h)),
			};
		};

		const spawnStreaks = (w: number, h: number) => {
			const area = w * h;
			const count = Math.min(420, Math.max(80, Math.floor(area / 9000)));
			const maxR = Math.hypot(w, h) * 0.72;
			streaksRef.current = Array.from({ length: count }, () => ({
				angle: Math.random() * Math.PI * 2,
				dist: Math.random() * maxR * 0.1,
				speed: 2 + Math.random() * 5,
				len: 6 + Math.random() * 42,
			}));
		};

		const resize = () => {
			const { w, h } = layoutSize();
			const dpr = Math.min(2.5, window.devicePixelRatio || 1);
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			spawnStreaks(w, h);
		};

		const ro = new ResizeObserver(() => {
			resize();
		});
		ro.observe(wrap);
		window.addEventListener("resize", resize);
		resize();

		const tick = (now: number) => {
			const { w, h } = layoutSize();
			const cx = w * 0.5;
			const cy = h * 0.5;
			const maxR = Math.hypot(w, h) * 0.72;
			const dt = Math.min(48, now - last) / 16.67;
			last = now;

			ctx.fillStyle = backgroundColorRef.current;
			ctx.fillRect(0, 0, w, h);

			const cos = Math.cos;
			const sin = Math.sin;
			const streaks = streaksRef.current;

			for (let i = 0; i < streaks.length; i++) {
				const s = streaks[i];
				if (!s) {
					continue;
				}
				s.dist += s.speed * dt;
				if (s.dist > maxR + s.len) {
					s.angle = Math.random() * Math.PI * 2;
					s.dist = Math.random() * maxR * 0.08;
					s.speed = 2 + Math.random() * 5;
					s.len = 6 + Math.random() * 42;
				}

				const a0 = s.angle;
				const r0 = Math.max(0, s.dist - s.len);
				const r1 = s.dist;
				const x0 = cx + cos(a0) * r0;
				const y0 = cy + sin(a0) * r0;
				const x1 = cx + cos(a0) * r1;
				const y1 = cy + sin(a0) * r1;

				const t = Math.min(1, s.dist / (maxR * 0.35));
				const headBoost = Math.min(1, s.dist / (maxR * 0.85));
				const alpha = 0.22 + t * 0.55 + headBoost * 0.2;
				const width = 0.35 + headBoost * 1.85;

				ctx.strokeStyle = streakColorRef.current;
				ctx.globalAlpha = Math.min(1, alpha);
				ctx.lineWidth = width;
				ctx.lineCap = "round";
				ctx.beginPath();
				ctx.moveTo(x0, y0);
				ctx.lineTo(x1, y1);
				ctx.stroke();
			}

			ctx.globalAlpha = 1;
			raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<div
			ref={wrapRef}
			aria-hidden
			style={{
				position: "absolute",
				inset: 0,
				pointerEvents: "none",
			}}
		>
			<canvas
				ref={canvasRef}
				style={{
					display: "block",
					width: "100%",
					height: "100%",
				}}
			/>
		</div>
	);
}
