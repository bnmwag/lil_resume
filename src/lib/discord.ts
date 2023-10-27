import type z from 'zod';
import DiscordWebhook from 'discord-webhook-ts';
import type { formSchema } from './schemas';

type ResponseStatus = 'Success' | 'Error' | null;

export const sendWH = async ({
	values,
	url,
}: {
	values: z.infer<typeof formSchema>;
	url: string;
}): Promise<{ response: ResponseStatus }> => {
	let response: ResponseStatus = null;

	const discordClient = new DiscordWebhook(url);

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

	await new Promise((resolve) => setTimeout(resolve, 2000));

	await discordClient
		.execute(reqBody)
		.then(() => {
			response = 'Success';
		})
		.catch(() => {
			response = 'Error';
		});

	return { response };
};
