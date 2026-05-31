import { createFileRoute } from "@tanstack/react-router";
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
const footerLinkClass =
	"cursor-pointer rounded-sm p-0 text-muted-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:bg-accent hover:text-accent-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40";

function HomePage() {
	const [impressumOpen, setImpressumOpen] = useState(false);
	const impressumId = useId();

	return (
		<main className="flex min-h-dvh flex-col bg-background text-foreground">
			<InvertingCursor />
			<h1 className="sr-only">Nils Kratz</h1>
			<article className="w-full max-w-2xl px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
				<p className="text-pretty text-base leading-7 text-foreground/80">
					Hey, I&apos;m <ProfileHoverCard />. I turn ambiguous business and
					engineering problems into calm software: AI systems, data products,
					and internal tools that make rough workflows feel obvious. Right now I
					work in data science and AI at{" "}
					<span className="font-medium text-foreground">BMW Group</span> in
					Munich, usually somewhere between Python, TypeScript, cloud
					infrastructure, and product thinking. I like dense interfaces, honest
					prototypes, and teams that can explain the hard part in a sentence.
					You can find me on{" "}
					<a
						href={linkedInUrl}
						target="_blank"
						rel="noreferrer"
						className="rounded-sm text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:bg-accent hover:text-accent-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
					>
						LinkedIn
					</a>
					.
				</p>
			</article>
			<footer className="mt-auto w-full max-w-2xl px-6 pb-8 text-sm text-muted-foreground sm:px-10 lg:px-16">
				<section
					id={impressumId}
					hidden={!impressumOpen}
					className="mb-4 space-y-4 border-border/60 border-t pt-4"
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
				<nav
					aria-label="Footer links"
					className="flex flex-wrap gap-x-4 gap-y-2"
				>
					<a
						href={githubUrl}
						target="_blank"
						rel="noreferrer"
						className={footerLinkClass}
					>
						GitHub
					</a>
					<a
						href={linkedInUrl}
						target="_blank"
						rel="noreferrer"
						className={footerLinkClass}
					>
						LinkedIn
					</a>
					<button
						type="button"
						aria-controls={impressumId}
						aria-expanded={impressumOpen}
						className={footerLinkClass}
						onClick={() => {
							setImpressumOpen((open) => !open);
						}}
					>
						Impressum
					</button>
				</nav>
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

		let frame = 0;
		let x = 0;
		let y = 0;

		function updatePosition() {
			if (!cursor) {
				return;
			}

			cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
			frame = 0;
		}

		function moveCursor(event: PointerEvent) {
			if (event.pointerType && event.pointerType !== "mouse") {
				return;
			}

			x = event.clientX;
			y = event.clientY;
			cursor.dataset.visible = "true";

			if (!frame) {
				frame = window.requestAnimationFrame(updatePosition);
			}
		}

		function hideCursor() {
			cursor.dataset.visible = "false";
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
					aria-label="Nils Kratz on LinkedIn"
					onFocus={openCard}
					onBlur={scheduleClose}
					onMouseEnter={openCard}
					onMouseLeave={scheduleClose}
					className="inline-flex shrink-0 cursor-pointer items-center gap-1 align-[-0.18em] font-medium text-foreground decoration-border underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:underline"
				>
					<Avatar className="size-[1.15em] rounded-full">
						<AvatarImage
							src={profileImage}
							alt="Nils Kratz"
							className="object-cover"
						/>
						<AvatarFallback className="text-[0.5em]">NK</AvatarFallback>
					</Avatar>
					<span className="leading-none">Nils</span>
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
							alt="Nils Kratz"
							className="object-cover"
						/>
						<AvatarFallback>NK</AvatarFallback>
					</Avatar>
					<div className="min-w-0 pt-0.5">
						<p className="text-sm font-semibold leading-none">Nils Kratz</p>
						<p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
							<MapPin className="size-3.5" aria-hidden="true" />
							Munich, Germany
						</p>
					</div>
				</div>
				<p className="mt-3 text-sm leading-6 text-muted-foreground">
					Data science, AI systems, and product-minded engineering.
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
							LinkedIn
						</span>
						<ArrowUpRight className="size-4" aria-hidden="true" />
					</a>
				</Button>
			</HoverCardContent>
		</HoverCard>
	);
}
