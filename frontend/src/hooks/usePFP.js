import { getPFPImage } from '@utils';


const usePFP = () => {
    const characterPFP = async (string) => {
        const char = string.charAt(0).toUpperCase();

        const image = await getPFPImage(char);

        return { image };
    }

    return { characterPFP };
}

export { usePFP };