/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: "http",
            hostname: "localhost",

            },
          {
            protocol: "https",
            hostname: "img.clerk.com",
          },
          {
            protocol: "https",
            hostname: "images.clerk.dev",
          },
          {
            protocol: "https",
            hostname: "uploadthing.com",
          },
          {
            protocol: "https",
            hostname: "placehold.co",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
          {
            protocol: "https",
            hostname: "utfs.io",
          }
        ],
      },
}

module.exports = nextConfig
