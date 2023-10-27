import * as z from 'zod';

export const all_interests = [
	'Web Development',
	'Blog',
	'UI/UX Design',
	'CMS Integration',
	'Hosting',
	'WebGl / 3D',
];

export const all_budgets = ['<500', '500-1k', '3k-5k', '5k-10k'];

export const formSchema = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Please enter a valid name',
		})
		.max(50, {
			message: 'Name must be less than 50 characters',
		}),
	email: z.string().email({
		message: 'Please enter a valid email address',
	}),
	interests: z
		.array(
			z.string().refine((v) => all_interests.includes(v), {
				message: 'Please select a valid interest',
			})
		)
		.nonempty({
			message: 'Please select at least one interest',
		}),
	budget: z
		.string()
		.min(1, {
			message: 'Please select a budget',
		})
		.refine((v) => all_budgets.includes(v)),
	info: z.string().optional(),
});
