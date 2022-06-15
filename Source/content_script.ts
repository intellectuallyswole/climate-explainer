
const TERM_MAP = {
	"CDR":"Carbon Dioxide Removal",
	"CCS":"Carbon Capture and sequestration; removing carbon from the atmosphere and storing it somewhere, often underground.",
	"CCU": "Carbon capture and utilization; removing carbon from the atmosphere and using it as an input, such as making diamonds or carbonating soda water.",
	"CCUS": "Carbon capture utilization and sequestration",
	"additionality": "a measure of how much additional carbon would be removed from the atmosphere with this project, relative to without this project. Did this project actually lead to a net removal of carbon, or did it merely shift it around?",
	"permanence": "how long will the carbon be removed for",
	"DAC": "Direct air capture; using machines to pull carbon dioxide out of the air.",
	"BEECS": "Bioenergy with CCS",
	"red hydrogen": "hydrogen produced via electrolysis or steam reforming powered by nuclear energy",
	"gold hydrogen": "hydrogen produced by microbes",
	"green hydrogen": "hydrogen made from electrolysis powered by renewable energy",
	"yellow hydrogen": "hydrogen made from electrolysis powered by solar energy",
	"blue hydrogen": "hydrogen made via methane steam reforming, where the resultant CO2 is captured.",
	"grey hydrogen": "hydrogen made via methane steam reforming, where the resultant CO2 is not captured.",
	"purple hydrogen": "hydrogen produced via electrolysis or steam reforming powered by nuclear energy",
}
	


function walk(node)
{
	// I stole this function from here:
	// http://is.gd/mwZp7E

	let child, next;

	let tagName = node.tagName ? node.tagName.toLowerCase() : "";
	if (tagName == 'input' || tagName == 'textarea') {
		return;
	}
	if (node.classList && node.classList.contains('ace_editor')) {
		return;
	}

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode)
{
	let v = textNode.nodeValue;

	for (let term in TERM_MAP) {
		const regex = new RegExp(`\b${term}\b`, 'g');
		v = v.replace(regex, `${term} (${TERM_MAP[term]})`);
	}
	textNode.nodeValue = v;
}

walk(document.body);