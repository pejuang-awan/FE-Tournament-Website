import axios from "axios";

export const getAllTournaments = async () => {
    const response = await axios.get(
            "https://be-tournament-manager-uuq75raixq-et.a.run.app/api/tournaments/1",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    return response.data;
}

export const getTotalTournaments = async () => {
    return getAllTournaments().then((result) => {
        console.log(result)
        return result.length;
    });
}