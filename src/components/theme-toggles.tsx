import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Theme = 'theme-light' | 'dark' | 'system';

const toggles = [
	{
		value: 'theme-light',
		icon: <Sun size={14} />,
	},
	{
		value: 'dark',
		icon: <Moon size={14} />,
	},
] satisfies { value: Theme; icon: JSX.Element }[];

const ThemeToggles: React.FC = () => {
	const [theme, setThemeState] = useState<Theme>('dark');

	useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains('dark');
		setThemeState(isDarkMode ? 'dark' : 'theme-light');
	}, []);

	useEffect(() => {
		const isDark =
			theme === 'dark' ||
			(theme === 'system' &&
				window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
	}, [theme]);

	return null;

	return (
		<div className='flex items-center gap-x-2'>
			{toggles.map((toggle) => (
				<Button
					variant={toggle.value === theme ? 'outline' : 'ghost'}
					key={toggle.value}
					size={'sm'}
					onClick={() => setThemeState(toggle.value)}
				>
					{toggle.icon}
				</Button>
			))}
		</div>
	);
};

export default ThemeToggles;
