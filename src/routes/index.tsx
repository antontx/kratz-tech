import { createFileRoute, Link } from "@tanstack/react-router";
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
