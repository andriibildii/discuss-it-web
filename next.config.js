/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: [
			"storage.googleapis.com",
			"lh1.googleusercontent.com",
			"lh2.googleusercontent.com",
			"lh3.googleusercontent.com",
			"lh4.googleusercontent.com",
			"lh5.googleusercontent.com",
			"lh6.googleusercontent.com",
			"graph.facebook.com",
		],
	},
};

module.exports = nextConfig;
