/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@repo/ui', '@repo/contracts', '@repo/api'],
	allowedDevOrigins: ['172.16.0.87'],
}

export default nextConfig
