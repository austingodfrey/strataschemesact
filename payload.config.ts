import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

// We can then go down to our plugins array, which you may or may not already have initialized. If you don't, you do need to add this plugins array to use your storage adapter.

  plugins: [
    vercelBlobStorage({
       enabled: true,
       collections: { // If you have another collection that supports uploads, you can add it below
         media: true,
       },
       token: process.env.BLOB_READ_WRITE_TOKEN
     })
    ]