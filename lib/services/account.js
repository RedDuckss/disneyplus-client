const format = require('string-template');
const got = require('got');

class AccountServiceClient {
	/**
	 * Calls account::createAccountGrant
	 * Exchanges the accounts BAM Identity token for an account token
	 * @async
	*/
	async createAccountGrant() {
		const serviceData = this.services.account.client.endpoints.createAccountGrant;
		const headers = Object.assign(this.commonHeaders, serviceData.headers);

		headers.Authorization = format(headers.Authorization, { accessToken: this.tokens.access });

		const data = await got.post(serviceData.href, {
			headers,
			body: JSON.stringify({ id_token: this.tokens.identity })
		}).json();

		// TODO: Error check

		this.tokens.account = data.assertion;
	}

	/**
	 * Calls account::getUserProfiles
	 * Gets the current list of account profiles
	 * @returns {Array} List of profiles on the account
	 * @async
	*/
	async getUserProfiles() {
		const serviceData = this.services.account.client.endpoints.getUserProfiles;
		const headers = Object.assign(this.commonHeaders, serviceData.headers);

		headers.Authorization = format(headers.Authorization, { accessToken: this.tokens.access });

		const data = await got(serviceData.href, { headers }).json();

		// TODO: Error check

		console.log(data);
	}
}

module.exports = AccountServiceClient;