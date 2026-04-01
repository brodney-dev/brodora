module.exports = {
	extends: ["@commitlint/config-conventional"],
	prompt: {
		scopes: ["brodora", "storybook", "website", "ui", "icons"],
		enableMultipleScopes: true,
	},
};
