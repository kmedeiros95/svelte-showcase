import { error } from '@sveltejs/kit';

export const actions = {
	resetPassword: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.pb.collection('users').requestPasswordReset(body.email);
			return {
				sucess: true
			};
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong requesting password reset');
		}
	}
};
