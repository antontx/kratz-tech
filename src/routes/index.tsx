import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { MatterhornAscii } from "@/components/matterhorn-ascii";

export const Route = createFileRoute("/")({
	component: HomePage,
});

const linkedInUrl = "https://www.linkedin.com/in/nakratz/";
const githubUrl = "https://github.com/antontx";
const siteLinkClass =
	"cursor-pointer rounded-sm p-0 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40";

function HomePage() {
	return (
		<main className="flex min-h-dvh flex-col bg-background text-foreground">
			<InvertingCursor />
			<h1 className="sr-only">nils anton kratz</h1>
			<div className="px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
				<article className="w-full max-w-[34rem]">
					<p className="text-pretty text-base leading-7 text-foreground/80">
						hey, i&apos;m nils anton. i&apos;m building{" "}
						<a
							href="https://alexandria.so/about"
							target="_blank"
							rel="noreferrer"
							className="rounded-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
						>
							alexandria
						</a>{" "}
						in munich. we help ai agents learn how experts work, using
						vision-language models and confidential compute to keep that work
						private.
					</p>
					<nav aria-label="Site links" className="mt-6 text-sm">
						<ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/60">
							<li>
								<Link to="/reading-watch-list" className={siteLinkClass}>
									reading / watch list
								</Link>
							</li>
							<li>
								<a
									href={githubUrl}
									target="_blank"
									rel="noreferrer"
									className={siteLinkClass}
								>
									github
								</a>
							</li>
							<li>
								<a
									href={linkedInUrl}
									target="_blank"
									rel="noreferrer"
									className={siteLinkClass}
								>
									linkedin
								</a>
							</li>
						</ul>
					</nav>
				</article>
			</div>
			<footer className="mt-auto w-full pt-16">
				<MatterhornAscii />
			</footer>
		</main>
	);
}

function InvertingCursor() {
	const cursorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const cursor = cursorRef.current;
		const finePointer = window.matchMedia("(pointer: fine)");
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

		if (!cursor || !finePointer.matches || reducedMotion.matches) {
			return;
		}
		const activeCursor = cursor;

		const ease = 0.18;
		const settleDistance = 0.1;
		let frame = 0;
		let hasPosition = false;
		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;

		function renderCursor() {
			activeCursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
		}

		function animateCursor() {
			const deltaX = targetX - currentX;
			const deltaY = targetY - currentY;

			currentX += deltaX * ease;
			currentY += deltaY * ease;
			renderCursor();

			if (
				Math.abs(deltaX) > settleDistance ||
				Math.abs(deltaY) > settleDistance
			) {
				frame = window.requestAnimationFrame(animateCursor);
				return;
			}

			currentX = targetX;
			currentY = targetY;
			renderCursor();
			frame = 0;
		}

		function startAnimation() {
			if (!frame) {
				frame = window.requestAnimationFrame(animateCursor);
			}
		}

		function moveCursor(event: PointerEvent) {
			if (event.pointerType && event.pointerType !== "mouse") {
				return;
			}

			targetX = event.clientX;
			targetY = event.clientY;
			activeCursor.dataset.visible = "true";

			if (!hasPosition) {
				currentX = targetX;
				currentY = targetY;
				hasPosition = true;
				renderCursor();
			}

			startAnimation();
		}

		function hideCursor() {
			activeCursor.dataset.visible = "false";
			hasPosition = false;
		}

		document.documentElement.classList.add("has-inverting-cursor");
		window.addEventListener("pointermove", moveCursor, { passive: true });
		window.addEventListener("pointerleave", hideCursor);
		window.addEventListener("blur", hideCursor);

		return () => {
			if (frame) {
				window.cancelAnimationFrame(frame);
			}

			document.documentElement.classList.remove("has-inverting-cursor");
			window.removeEventListener("pointermove", moveCursor);
			window.removeEventListener("pointerleave", hideCursor);
			window.removeEventListener("blur", hideCursor);
		};
	}, []);

	return (
		<div
			ref={cursorRef}
			aria-hidden="true"
			data-visible="false"
			className="inverting-cursor pointer-events-none fixed top-0 left-0 z-[1000] size-3 rounded-full bg-white opacity-0 mix-blend-difference transition-opacity duration-150 data-[visible=true]:opacity-100"
		/>
	);
}
