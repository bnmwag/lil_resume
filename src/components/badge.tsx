interface IBadgeProps {
	label: string;
	isActive: boolean;
	action: () => void;
}

const Badge: React.FC<IBadgeProps> = ({ label, isActive, action }) => {
	return (
		<button
			type='button'
			className={`px-4 py-1 rounded-full transition-colors duration-200 flex items-center gap-x-2 bg-transparent text-foreground hover:bg-foreground/10 text-sm ${
				isActive ? 'border-2 border-emerald-500' : 'border-2'
			}`}
			onClick={action}
		>
			{label}
		</button>
	);
};

export default Badge;
