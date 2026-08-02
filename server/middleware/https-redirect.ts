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
	url.protocol = "https:";

	return sendRedirect(event, url.toString(), 308);
});
