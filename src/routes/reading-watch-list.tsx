import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/reading-watch-list")({
	component: ReadingWatchListPage,
	head: () => ({
		meta: [
			{ title: "reading / watch list | nils kratz" },
			{
				name: "description",
				content: "articles and videos worth returning to.",
			},
		],
	}),
});

const entries = [
	{
		title: "How Brian Armstrong Built Coinbase",
		href: "https://www.youtube.com/watch?v=bzYQWBBX7wU",
		source: "Relentless · YouTube",
		date: "23 Mar 2026",
	},
	{
		title: "Do Things that Don't Scale",
		href: "https://www.paulgraham.com/ds.html",
		source: "Paul Graham",
		date: "Jul 2013",
	},
	{
		title: "Thinking, Fast and Slow",
		source: "Daniel Kahneman",
		date: "2011",
	},
	{
		title: "Shoe Dog",
		source: "Phil Knight",
		date: "2016",
	},
];

function ReadingWatchListPage() {
	return (
		<main className="min-h-dvh bg-background px-6 py-8 text-foreground sm:px-10 sm:py-12 lg:px-16 lg:py-16">
			<div className="w-full max-w-2xl">
				<Link
					to="/"
					className="mb-14 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
				>
					<ArrowLeft className="size-4" aria-hidden="true" />
					back home
				</Link>

				<header className="mb-10">
					<h1 className="text-2xl font-medium tracking-tight">
						reading / watch list
					</h1>
					<p className="mt-3 text-base leading-7 text-muted-foreground">
						things worth returning to.
					</p>
				</header>

				<ul
					aria-label="reading and watch list"
					className="list-disc space-y-3 pl-5 text-base leading-7 marker:text-muted-foreground"
				>
					{entries.map((entry) => (
						<li key={entry.title} className="pl-1">
							{"href" in entry ? (
								<a
									href={entry.href}
									target="_blank"
									rel="noreferrer"
									className="rounded-sm text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:bg-accent hover:text-accent-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
								>
									{entry.title}
								</a>
							) : (
								<span className="text-foreground">{entry.title}</span>
							)}
							<span className="text-muted-foreground">
								{" "}
								— {entry.source} · {entry.date}
							</span>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
