/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3002/api/:path*'
            }
        ];
    },
    env: {
        serverUrl: 'http://localhost:3002/api/v1'
    }
};

module.exports = nextConfig;
