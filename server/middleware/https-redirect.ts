import {
	defineEventHandler,
	getRequestProtocol,
	getRequestURL,
	sendRedirect,
} from "h3";

export default defineEventHandler((event) => {
	if (getRequestProtocol(event) !== "http") {
		return;
	}

	const url = getRequestURL(event, { xForwardedHost: true });

	if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
		return;
	}

	url.protocol = "https:";

	return sendRedirect(event, url.toString(), 308);
});
