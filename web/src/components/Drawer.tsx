import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/auth";

export default function Drawer() {
    const { user } = useAuth();
    return (
        <div className="drawer z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost h-16">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 22 22"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
            </div>
            <div className="drawer-side bg-transparent fixed top-16 h-full">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full py-4 border-none">
                    {/* Sidebar content here */}
                    {user?.manager ?
                        <>
                            <Link href="/greenhouses"><li className="p-2"><a><Image alt="" height={22} width={22} src="/home.svg" />Greenhouses</a></li></Link>
                            <Link href="/employees"><li className="p-2"><a> <Image alt="" height={22} width={22} src="/users.svg" />Employees</a></li></Link>
                            <Link href="/inventory"><li className="p-2"><a><Image alt="" height={22} width={22} src="/archive.svg" />Inventory</a></li></Link>
                            <Link href="/alerts"><li className="p-2"><a><Image alt="" height={22} width={22} src="/bell.svg" />Alerts</a></li></Link>
                        </>
                        :
                        <>
                            <Link href="/greenhouses"><li className="p-2"><a><Image alt="" height={22} width={22} src="/home.svg" />Greenhouses</a></li></Link>
                            <Link href="/employee-chat"><li className="p-2"><a> <Image alt="" height={22} width={22} src="/Chat.svg" />Chat</a></li></Link>
                            <Link href="/employee/inventory"><li className="p-2"><a><Image alt="" height={22} width={22} src="/archive.svg" />Inventory</a></li></Link>
                            <Link href="/employee/alerts"><li className="p-2"><a><Image alt="" height={22} width={22} src="/bell.svg" />Alerts</a></li></Link>
                        </>
                    }

                </ul>
            </div>
        </div>
    );
}
