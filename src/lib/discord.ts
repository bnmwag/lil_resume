import z from 'zod';
import DiscordWebhook from 'discord-webhook-ts';
import { formSchema } from './schemas';

type ResponseStatus = 'Success' | 'Error' | null;

export const sendWH = async ({
	values,
	whUrl,
}: {
	values: z.infer<typeof formSchema>;
	whUrl: string;
}): Promise<{ response: ResponseStatus }> => {
	let response: ResponseStatus = null;

	try {
		const isValid = formSchema.safeParse(values);

		if (!isValid.success) {
			return { response: 'Error' };
		}

		const discordClient = new DiscordWebhook(whUrl);

		const { name, email, interests, budget, info } = values;

		const reqBody = {
			content: `<@397344528454909954>`,
			embeds: [
				{
					title: 'New Lead',
					type: 'rich',
					color: 0x000000,
					footer: {
						text: 'ㅤ'.repeat(47),
					},
					fields: [
						{ name: 'Name', value: name, inline: true },
						{ name: 'Email', value: email, inline: true },
						{ name: 'Interests', value: interests.join(', ') },
						{ name: 'Budget', value: budget },
						{ name: 'Info', value: info || '(None)' },
					],
				},
			],
		};

		await new Promise((resolve, reject) => {
			if (!discordClient) reject('Error');
			setTimeout(resolve, 2000);
		});

		await discordClient
			.execute(reqBody)
			.then(() => {
				response = 'Success';
			})
			.catch((error: any) => {
				console.log('Error in dc wh', error);
				response = 'Error';
			});

		return { response };
	} catch (error) {
		console.error(error);
		return { response: 'Error' };
	}
};
