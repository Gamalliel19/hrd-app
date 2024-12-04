import React, { useEffect, useState } from "react";
import { neon } from "@neondatabase/serverless";

function Grade() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
				const response = await sql`SELECT version()`;
				setData(response[0].version);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, []); // Run only once after the component mounts

	if (error) return <div>Error: {error}</div>;
	if (!data) return <div>Loading...</div>;

	return <div>Database Version: {data}</div>;
}

export default Grade;
