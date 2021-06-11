import { ImapProvider } from "./ImapProvider";

export class GmailProvider extends ImapProvider {
	constructor(username: string, password: string) {
		super({
			password,
			host: "imap.gmail.com",
			port: 993,
			secure: true,
			email: username,
		});
		this.type = "gmail";
	}

	async init() {
		try {
			return await super.init();
		} catch (error) {
			if ((error?.message || error).includes(" in via your web browser")) {
				throw new Error(
					`You need to enable "allow access to less secure apps": https://myaccount.google.com/lesssecureapps`
				);
			}

			throw error;
		}
	}
}
