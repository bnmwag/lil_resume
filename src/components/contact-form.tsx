import * as z from 'zod';
import { useForm, type ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, X } from 'lucide-react';

import UseAnimations from 'react-useanimations';
import icon from 'react-useanimations/lib/radioButton';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Textarea } from './ui/textarea';
import { all_interests, all_budgets, formSchema } from '@/lib/schemas';
import { sendWH } from '@/lib/discord';

const statusContainerConfig = {
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 100 },
	initial: { opacity: 0, y: -100 },

	transition: {
		type: 'spring',
		damping: 10,
		stiffness: 100,
	},
};

const ContactForm: React.FC<{ whUrl: string }> = ({ whUrl }) => {
	const [interests, setInterests] = useState<string[]>([]);
	const [uiState, setUiState] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle');

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema as any),
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			interests: [],
			budget: '',
			info: '',
		},
	});

	const handleInterestChange = (
		interest: string,
		field: ControllerRenderProps<z.infer<typeof formSchema>, 'interests'>
	) => {
		const set = new Set(field.value) as Set<string>;

		if (set.has(interest)) set.delete(interest);
		else set.add(interest);

		setInterests([...set]);

		field.onChange([...set]);
	};

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setUiState('loading');

		try {
			const { response } = await sendWH({ values, url: whUrl });

			if (response === 'Success') {
				form.reset();
				setUiState('success');
				setInterests([]);
			} else {
				setUiState('error');
			}
		} catch (error) {
			setUiState('error');
			console.error('[ERROR WH]', error);
		} finally {
			setTimeout(() => {
				setUiState('idle');
			}, 5000);
		}
	}

	return (
		<>
			<AnimatePresence mode='wait'>
				{uiState === 'idle' ? (
					<motion.div key={'idle'} {...statusContainerConfig}>
						<Form {...form}>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									form.trigger().then((isValid) => {
										if (isValid) onSubmit(form.getValues());
									});
								}}
								className='anim-fade-in | space-y-8 max-w-[750px] pr-12'
								style={{
									animationDelay: '0.5s',
								}}
							>
								<div className='flex flex-col high:items-center gap-x-4 gap-y-8 high:flex-row'>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem className='flex-1'>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem className='flex-1'>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div>
									<FormField
										control={form.control}
										name='interests'
										render={({ field }) => (
											<FormItem className='flex-1'>
												<FormLabel>Interests</FormLabel>
												<FormControl>
													<div className='flex flex-wrap gap-4'>
														{all_interests.map(
															(interest) => {
																const isActive =
																	interests.includes(
																		interest
																	);
																return (
																	<UseAnimations
																		key={
																			interest
																		}
																		animation={
																			icon
																		}
																		size={
																			24
																		}
																		strokeColor={
																			isActive
																				? '#10b981'
																				: '#fff'
																		}
																		onClick={() => {
																			handleInterestChange(
																				interest,
																				field
																			);
																		}}
																		render={(
																			eventProps,
																			animationProps
																		) => (
																			<button
																				type='button'
																				className={`px-2 pr-4 py-1 rounded-full transition-colors duration-200 flex items-center gap-x-2 bg-transparent text-white hover:bg-white/10 ${
																					isActive
																						? 'border-2 border-emerald-500'
																						: 'border-2'
																				}`}
																				{...eventProps}
																			>
																				<div
																					{...animationProps}
																				/>
																				{
																					interest
																				}
																			</button>
																		)}
																	/>
																);
															}
														)}
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div>
									<FormField
										control={form.control}
										name='budget'
										render={({ field }) => (
											<FormItem className='flex-1'>
												<FormLabel>
													Budget in €
												</FormLabel>
												<FormControl>
													<div className='flex flex-wrap gap-4'>
														{all_budgets.map(
															(budget) => {
																const isActive =
																	field.value ===
																	budget;
																return (
																	<button
																		key={
																			budget
																		}
																		type='button'
																		className={`px-4 py-1 rounded-full transition-colors duration-200 flex items-center gap-x-2 bg-transparent text-white hover:bg-white/10 ${
																			isActive
																				? 'border-2 border-emerald-500'
																				: 'border-2'
																		}`}
																		onClick={() => {
																			field.onChange(
																				budget
																			);
																		}}
																	>
																		{budget}
																	</button>
																);
															}
														)}
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name='info'
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormLabel>
												Project information
											</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													rows={2}
													className='resize-none'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type='submit'>Submit</Button>
							</form>
						</Form>
					</motion.div>
				) : null}
				{uiState === 'loading' ? (
					<motion.div key={'loading'} {...statusContainerConfig}>
						<div className='w-full grid place-items-center h-[500px]'>
							<div>
								<Loader2 className='animate-spin' />
							</div>
						</div>
					</motion.div>
				) : null}
				{uiState === 'success' ? (
					<motion.div key={'success'} {...statusContainerConfig}>
						<div className='w-full grid place-items-center h-[500px]'>
							<div className='flex flex-col items-center gap-y-3'>
								<Check className='text-emerald-500' size={32} />
								<p className='text-center max-w-xs'>
									Thanks for your message! I'll get back to
									you as soon as possible.
								</p>
							</div>
						</div>
					</motion.div>
				) : null}
				{uiState === 'error' ? (
					<motion.div key={'error'} {...statusContainerConfig}>
						<div className='w-full grid place-items-center h-[500px]'>
							<div className='flex flex-col items-center gap-y-3'>
								<X className='text-rose-500' size={32} />
								<p className='text-center max-w-xs'>
									Something went wrong. Please try again or
									reach out to me via{' '}
									<a
										href='mailto:bnm.wag@gmail.com'
										className='underline'
									>
										mail
									</a>
									.
								</p>
							</div>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	);
};

export default ContactForm;
