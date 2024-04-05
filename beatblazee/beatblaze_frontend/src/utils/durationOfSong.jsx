export const getCloudinaryAudioDuration = async (cloudinaryUrl) => {
    return new Promise((resolve, reject) => {
        const audio = new Audio(cloudinaryUrl);
        audio.addEventListener("loadedmetadata", () => {
            const duration = audio.duration;
            resolve(duration);
        });
        audio.addEventListener("error", (err) => {
            reject(err);
        });
        audio.load();
    });
};
