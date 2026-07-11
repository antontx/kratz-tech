import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, BookOpen, Play } from "lucide-react";

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
		type: "watch",
		source: "Relentless · YouTube",
		date: "23 Mar 2026",
		icon: Play,
	},
	{
		title: "Do Things that Don't Scale",
		href: "https://www.paulgraham.com/ds.html",
		type: "read",
		source: "Paul Graham",
		date: "Jul 2013",
		icon: BookOpen,
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

				<section
					aria-label="reading and watch list"
					className="border-border border-t"
				>
					{entries.map((entry) => {
						const Icon = entry.icon;

						return (
							<a
								key={entry.href}
								href={entry.href}
								target="_blank"
								rel="noreferrer"
								className="group grid min-h-32 grid-cols-[1fr_auto] gap-5 border-border border-b py-6 transition-colors hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 sm:px-4"
							>
								<span>
									<span className="mb-2 flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
										<Icon className="size-3.5" aria-hidden="true" />
										{entry.type}
									</span>
									<span className="block text-lg leading-7 text-foreground">
										{entry.title}
									</span>
									<span className="mt-2 block text-muted-foreground text-sm">
										{entry.source} · {entry.date}
									</span>
								</span>
								<ArrowUpRight
									className="mt-1 size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
									aria-hidden="true"
								/>
							</a>
						);
					})}
				</section>
			</div>
		</main>
	);
}
