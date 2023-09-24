function escapeHtml(unsafe) {
	return unsafe
		.replaceAll(/&amp;/g, "&")
		.replaceAll(/&lt;/g, "<")
		.replaceAll(/&gt;/g, ">")
		.replaceAll(/&quot;/g, '"')
		.replaceAll(/&#039;/g, "'");
}
		
function decodeHtml(str) {
	return str
		.replaceAll(/&/g, "&amp;")
		.replaceAll(/</g, "&lt;")
		.replaceAll(/>/g, "&gt;")
		.replaceAll(/"/g, '&quot;')
		.replaceAll(/'/g, "&#039;")
		.replaceAll(/\n/g,'<br>')
		.replaceAll(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
		.replaceAll(/\s/g, "&nbsp;");				
}