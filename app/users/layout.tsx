import Sidebar from "../components/sidebar/Sidebar";

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode,
}) {
    // const users = await getUsers();

    return (
            <Sidebar>
                <div className="h-full">
                    {children}
                </div>
            </Sidebar>
    );
}