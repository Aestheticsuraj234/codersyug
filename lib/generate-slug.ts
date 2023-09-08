export const generateSlug = (title: string) => {

    const trimmedTitle = title.trim().toLowerCase();
    const slug = trimmedTitle.replace(/\s+/g, '-');

    return slug;
}