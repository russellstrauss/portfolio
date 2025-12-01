import html
import codecs

html_escape_table = {
	"\t": "",
	"\n": "",
	"\r": "",
	"\\": "\\\\", # escape \
	"\"": "\\\"" # escape "
}

def html_escape(text):
	"""Produce entities within text."""
	return "".join(html_escape_table.get(c,c) for c in text)



file = codecs.open("html-parser.html", "r")
html = file.read()
file.close()

result = html_escape(html)
file = open("result.html","w")
file.write(result)
file.close()
print("File saved to result.html")