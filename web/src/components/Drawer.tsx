export default function Drawer() {
    return (
    <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost h-16">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
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
                <li className="p-2"><a><img src="/home.svg"/>Greenhouses</a></li>
                <li className="p-2"><a> <img src="/users.svg"/>Chat</a></li>
                <li className="p-2"><a><img src="/archive.svg"/>Inventory</a></li>
                <li className="p-2"><a><img src="/bell.svg"/>Alerts</a></li>
            </ul>
        </div>
    </div>
    );
}
