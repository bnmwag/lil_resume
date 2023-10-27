import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getCurrentTimeInVienna = (): string => {
	const viennaTime = new Date().toLocaleTimeString('en-US', {
		timeZone: 'Europe/Vienna',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});

	const [hours, minutes, seconds] = viennaTime.split(':');
	const formattedHours = hours === '24' ? '00' : hours;

	return `${formattedHours}:${minutes}:${seconds}`;
};
