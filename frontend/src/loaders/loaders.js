export async function profileLoader({ request }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/profile/myprofile",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            console.log(result);
            return result;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }


}