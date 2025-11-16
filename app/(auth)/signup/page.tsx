import databaseConnector from "@/api/config/DbConnection";
export async function Page() {
    const connection = await databaseConnector();
    connection.on("error", (error) => {
        console.error(`Connection error: ${error}`);
    });
    connection.once("open", () => {
        console.log("Connected with database.");
    });
    
    return <p>Registration page</p>;
}