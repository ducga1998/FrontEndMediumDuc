// this is here query api speacil data in backend
// All API Rank 
export const rankData = async () => {
    return await fetch('/rank').then(data => data.json())
}
// something api