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
        serverUrl: 'http://localhost:3002/api/v1',
        jwtTokenPwd: 'IKD3e50CvQ0c6JphHFgd8HtRiZjMg75tbURfxEBaZVU6Z5tJuPHFXFmZTxf5AJg5'
    }
};

module.exports = nextConfig;
