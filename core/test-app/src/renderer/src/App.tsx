import type { BrodoraParentUserRow } from "@shared/brodora-parent";
import * as React from "react";

export default function App() {
	const [user, setUser] = React.useState<BrodoraParentUserRow | null>(null);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		void window.api.brodoraParent
			.fetchUserById(1)
			.then(setUser)
			.catch((e) => {
				setError(e instanceof Error ? e.message : String(e));
			});

		return window.api.brodoraParent.onUserUpdated((next) => {
			setUser(next);
			setError(null);
		});
	}, []);

	if (error && !user) {
		return (
			<div style={{ padding: 16, fontFamily: "system-ui" }}>
				<p>Brodora user: {error}</p>
				<p style={{ opacity: 0.7, fontSize: 14 }}>
					Session updates will still apply when you connect from Brodora.
				</p>
			</div>
		);
	}

	if (!user) {
		return (
			<div style={{ padding: 16, fontFamily: "system-ui" }}>
				Loading user from Brodora…
			</div>
		);
	}

	return (
		<div style={{ padding: 16, fontFamily: "system-ui" }}>
			<h1 style={{ fontSize: 18, marginBottom: 12 }}>User from Brodora</h1>
			<dl style={{ margin: 0, display: "grid", gap: 8 }}>
				<dt style={{ fontWeight: 600 }}>id2</dt>
				<dd style={{ margin: 0 }}>{user.id}</dd>
				<dt style={{ fontWeight: 600 }}>name</dt>
				<dd style={{ margin: 0 }}>{user.name}</dd>
				<dt style={{ fontWeight: 600 }}>loggedIn</dt>
				<dd style={{ margin: 0 }}>{String(user.loggedIn)}</dd>
			</dl>
		</div>
	);
}
