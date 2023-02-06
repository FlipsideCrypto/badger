import { useState, useEffect } from "react";

const req = require.context("../../stories", true, /\.md$/);

const processContents = (files, contents) => {
    return files.map((file, index) => {
        const parsedContents = contents[index].split("---");
        const attributes = parsedContents[0].split("\n");
        const attributesObject = {};

        attributes.forEach((attribute) => {
            const [key, value] = attribute.split(": ");

            if (key && value) {
                attributesObject[key.trim()] = value.trim();
            }
        });

        const content = parsedContents[1];

        return {
            filename: file.filename,
            attributes: attributesObject,
            content,
        };
    });
};

export const useStories = () => {
    const [stories, setStories] = useState(null);

    useEffect(() => {
        const fetchStories = async () => {
            const files = req.keys().map((filename) => {
                const file = req(filename);
                filename = filename
                    .replace("./", "")
                    .replace(".md", "");

                return { filename, file }
            });

            Promise.all(files.map(async (file) => {
                return fetch(file.file).then((response) => response.text());
            }))
                .then((contents) => {
                    const processedStories = processContents(files, contents);
                    setStories(processedStories)
                });
        }

        fetchStories();
    }, []);

    return { stories };
}

export const useStory = (filename) => {
    const [story, setStory] = useState(null);

    useEffect(() => {
        const fetchStory = async () => {
            const req = require.context("../../stories", true, /\.md$/);

            // Get the file
            const file = req(`./${filename}.md`);

            // Get the content of the file
            const paper = await fetch(file).then((response) => response.text());

            setStory({
                ...processContents([file], [paper])[0],
                filename
            })
        }

        fetchStory();
    }, [])

    return { story };
}