const storage = {
  // The key here will be what is referenced in the image field
  my_local_images: {
    // Images that use this store will be stored on the local machine
    kind: "local" as const,
    // This store is used for the image field type
    type: "image" as const,
    // The URL that is returned in the Keystone GraphQL API
    generateUrl: (path: string) => `${process.env.SERVER_PORT}/images${path}`,
    // The route that will be created in Keystone's backend to serve the images
    serverRoute: {
      path: "/images",
    },
    storagePath: "public/images",
  },
  my_local_files: {
    // Images that use this store will be stored on the local machine
    kind: "local" as const,
    // This store is used for the image field type
    type: "file" as const,
    // The URL that is returned in the Keystone GraphQL API
    generateUrl: (path: string) => `${process.env.SERVER_PORT}/files${path}`,
    // The route that will be created in Keystone's backend to serve the images
    serverRoute: {
      path: "/files",
    },
    storagePath: "public/files",
  },
}

export default storage
