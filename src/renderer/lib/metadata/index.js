export default async id => {
    try{
        return await import(`./${id}`);
    }catch (e) {
        throw new Error(`metadata fetcher for ${id} not found`)
    }
}
