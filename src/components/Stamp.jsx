const colors = {
	'red': {
		bg: 'bg-white',
		text: 'text-red-600',
		border: 'border-red-700'
	},
	'green': {
		bg: 'bg-white',
		text: 'text-green-600',
		border: 'border-green-700'
	}
}
const Stamp = ({ text, color }) => {
	const _color = colors[color]
	return (
		<div className={`${_color.text} text-2xl md:text-xs text-nowrap font-bold uppercase tracking-widest ${_color.bg} bg-opacity-85 border-4 ${_color.border} rounded-lg px-4 py-2 shadow-lg transform rotate-[-25deg]`}>
			{text}
		</div>
	)
}

export default Stamp