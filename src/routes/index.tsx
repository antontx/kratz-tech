import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Linkedin, Mail, MapPin } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

export const Route = createFileRoute("/")({
	component: HomePage,
});

const linkedInUrl = "https://www.linkedin.com/in/nakratz/";
const githubUrl = "https://github.com/antontx";
const emailUrl = "mailto:nils@kratz.tech";
const profileImage = "/nils-profile.jpg";
const siteLinkClass =
	"cursor-pointer rounded-sm p-0 text-muted-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:bg-accent hover:text-accent-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40";

function HomePage() {
	const [impressumOpen, setImpressumOpen] = useState(false);
	const impressumId = useId();

	return (
		<main className="flex min-h-dvh flex-col bg-background text-foreground">
			<InvertingCursor />
			<h1 className="sr-only">nils kratz</h1>
			<div className="grid grid-cols-1 items-start gap-8 px-6 py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-16 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
				<article className="w-full max-w-[34rem]">
					<p className="text-pretty text-base leading-7 text-foreground/80">
						hey, i&apos;m <ProfileHoverCard />. i have a passion for complex
						problem solving and currently care about long-horizon task mining,
						cryptographics, and enterprise platform architecture. you can find
						me on{" "}
						<a
							href={linkedInUrl}
							target="_blank"
							rel="noreferrer"
							className="rounded-sm text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:bg-accent hover:text-accent-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
						>
							linkedin
						</a>
						.
					</p>
				</article>
				<aside className="relative w-full text-right text-sm text-muted-foreground sm:w-56">
					<nav
						aria-label="Site links"
						className="flex flex-col items-end gap-3"
					>
						<Link to="/reading-watch-list" className={siteLinkClass}>
							reading / watch list
						</Link>
						<a
							href={githubUrl}
							target="_blank"
							rel="noreferrer"
							className={siteLinkClass}
						>
							github
						</a>
						<a
							href={linkedInUrl}
							target="_blank"
							rel="noreferrer"
							className={siteLinkClass}
						>
							linkedin
						</a>
						<button
							type="button"
							aria-controls={impressumId}
							aria-expanded={impressumOpen}
							className={siteLinkClass}
							onClick={() => {
								setImpressumOpen((open) => !open);
							}}
						>
							Impressum
						</button>
					</nav>
					<section
						id={impressumId}
						hidden={!impressumOpen}
						className="absolute top-full right-0 z-10 mt-6 w-full space-y-4 border-border/60 border-t bg-background/95 pt-4 text-xs leading-6"
					>
						<div>
							<p className="font-medium text-foreground">Impressum</p>
							<p>Angaben nach § 5 DDG</p>
						</div>
						<div>
							<p>KRATZ Tech UG (haftungsbeschränkt)</p>
							<p>Moritzstr. 75</p>
							<p>55130 Mainz</p>
							<p>Deutschland</p>
						</div>
						<div>
							<p>Vertreten durch: Nils Anton Kratz</p>
							<p>E-Mail: nils@kratz.tech</p>
						</div>
					</section>
				</aside>
			</div>
			<footer className="mt-auto w-full overflow-hidden pt-16">
				<img
					src="/swiss-alps-abstract.webp"
					alt="Dither art of the Swiss Alps, with the Matterhorn rising on the right."
					width={2172}
					height={724}
					decoding="async"
					className="block h-[clamp(15rem,33.333vw,40rem)] w-full select-none object-cover object-[78%_bottom] opacity-60 grayscale [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_65%,transparent_98%)]"
				/>
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

function ProfileHoverCard() {
	const [open, setOpen] = useState(false);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	function clearCloseTimer() {
		if (closeTimer.current) {
			clearTimeout(closeTimer.current);
			closeTimer.current = null;
		}
	}

	function openCard() {
		clearCloseTimer();
		setOpen(true);
	}

	function scheduleClose() {
		clearCloseTimer();
		closeTimer.current = setTimeout(() => setOpen(false), 120);
	}

	return (
		<HoverCard
			open={open}
			onOpenChange={setOpen}
			openDelay={80}
			closeDelay={120}
		>
			<HoverCardTrigger asChild>
				<a
					href={linkedInUrl}
					target="_blank"
					rel="noreferrer"
					aria-label="nils kratz on linkedin"
					onFocus={openCard}
					onBlur={scheduleClose}
					onMouseEnter={openCard}
					onMouseLeave={scheduleClose}
					className="inline-flex shrink-0 cursor-pointer items-center gap-1 align-[-0.18em] font-medium text-foreground decoration-border underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:underline"
				>
					<Avatar className="size-[1.15em] rounded-full">
						<AvatarImage
							src={profileImage}
							alt="nils kratz"
							className="object-cover"
						/>
						<AvatarFallback className="text-[0.5em]">NK</AvatarFallback>
					</Avatar>
					<span className="leading-none">nils</span>
				</a>
			</HoverCardTrigger>
			<HoverCardContent
				side="right"
				align="start"
				sideOffset={12}
				collisionPadding={16}
				onFocus={openCard}
				onBlur={scheduleClose}
				onMouseEnter={openCard}
				onMouseLeave={scheduleClose}
				className="w-[min(18rem,calc(100vw-2rem))] rounded-lg border-border/80 bg-popover/95 p-3 text-popover-foreground shadow-xl backdrop-blur"
			>
				<div className="flex gap-3">
					<Avatar className="size-14 rounded-md border border-border">
						<AvatarImage
							src={profileImage}
							alt="nils kratz"
							className="object-cover"
						/>
						<AvatarFallback>NK</AvatarFallback>
					</Avatar>
					<div className="min-w-0 pt-0.5">
						<p className="text-sm font-semibold leading-none">nils kratz</p>
						<p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
							<MapPin className="size-3.5" aria-hidden="true" />
							munich, germany
						</p>
					</div>
				</div>
				<p className="mt-3 text-sm leading-6 text-muted-foreground">
					long-horizon task mining, cryptographics, and enterprise platform
					architecture.
				</p>
				<Button
					asChild
					size="sm"
					variant="default"
					className="mt-4 w-full justify-between"
				>
					<a href={emailUrl}>
						<span className="inline-flex items-center gap-2">
							<Mail className="size-4" aria-hidden="true" />
							nils@kratz.tech
						</span>
						<ArrowUpRight className="size-4" aria-hidden="true" />
					</a>
				</Button>
				<Button
					asChild
					size="sm"
					variant="secondary"
					className="mt-2 w-full justify-between"
				>
					<a href={linkedInUrl} target="_blank" rel="noreferrer">
						<span className="inline-flex items-center gap-2">
							<Linkedin className="size-4" aria-hidden="true" />
							linkedin
						</span>
						<ArrowUpRight className="size-4" aria-hidden="true" />
					</a>
				</Button>
			</HoverCardContent>
		</HoverCard>
	);
}
