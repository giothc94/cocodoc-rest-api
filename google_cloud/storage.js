const { Storage } = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
    projectId: 'cocodoc-1563257331101',
    keyFilename: `/home/giothcode/Escritorio/cocodocREST/Cocodoc-1738ee1630b1.json`,
});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const bucketName = 'cocodoc';

async function createBucket() {
    // Creates the new bucket
    // await storage.createBucket(bucketName);
    // console.log(`Bucket ${bucketName} created.`);

    const [files] = await storage.bucket(bucketName).getFiles();

    console.log('Files:');
    files.forEach(file => {
        console.log('FILE::', file.name);
        // console.log('METADATOS', file.metadata);
        // console.log('PADRE DEL ARCHIVO', file.parent.id);7

    });

    // storage.bucket(bucketName).upload('.env.example', { destination: `pruebas/env/${'.env.example'}` })
}

createBucket();