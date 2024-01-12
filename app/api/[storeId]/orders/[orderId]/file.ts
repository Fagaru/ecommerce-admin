import fs from "fs";

import { NextResponse } from "next/server";

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";

const readFile = (
    req: NextApiRequest, 
    saveLocally?: boolean
): Promise<{fields: formidable.Fields; files: formidable.Files}> => {
    const options: formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/files");
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename;
        }
    }

    const form = formidable(options)
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({fields, files});
        });
    });
}

const handler: NextApiHandler = async (req, res) => {
    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/files"), (err) => {
            if (err) {
              console.error('Error creating directory:', err);
            } else {
              console.log('Directory available');
            }
        });
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/files"), (err) => {
            if (err) {
              console.error('Error creating directory:', err);
            } else {
              console.log('Directory created successfully:');
            }
        });
    }
    await readFile(req, true);
    res.json({done: "ok"});
};

export default handler;