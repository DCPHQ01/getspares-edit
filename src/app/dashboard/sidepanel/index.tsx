import React, { useState } from 'react';
import {
    MdBusinessCenter,
    MdCategory,
    MdDashboard,
    MdInventory2,
    MdLocalPolice,
    MdPersonPin,
    MdYard,
    MdLogout
} from "react-icons/md"
import { useAppDispatch } from "../../../redux/hooks";
import { dashboardActions } from "../../../redux/features/dashboard/dashboardSlice";
import { sidePanel, roles, userRole } from "../../../app/dashboard/utils";

function Index() {

    const dispatch = useAppDispatch();
    const [activeButton, setActiveButton] = useState(0);

    const role = userRole;

    const buttons = [
        {
            icon: <MdDashboard />,
            title: "Overview",
            size: 18,
            panel: sidePanel.OVERVIEW,
            role: [roles.MECA_ADMIN, roles.VENDOR_ADMIN],
        },
        {
            icon: <MdYard />,
            title: "Vendors",
            size: 18,
            panel: sidePanel.VENDORS,
            role: [roles.MECA_ADMIN],
        },
        {
            icon: <MdLocalPolice />,
            title: "Agents",
            size: 18,
            panel: sidePanel.AGENTS,
            role: [roles.MECA_ADMIN, roles.VENDOR_ADMIN],
        },
        {
            icon: <MdBusinessCenter />,
            title: "Buyers",
            size: 18,
            panel: sidePanel.BUYERS,
            role: [roles.MECA_ADMIN],
        },
        {
            icon: <MdBusinessCenter />,
            title: "Orders",
            size: 18,
            panel: sidePanel.ORDERS,
            role: [roles.VENDOR_ADMIN],
        },
        {
            icon: <MdInventory2 />,
            title: "Inventory",
            size: 18,
            panel: sidePanel.INVENTORY,
            role: [roles.MECA_ADMIN, roles.VENDOR_ADMIN],
        },
        {
            icon: <MdCategory />,
            title: "Category",
            size: 18,
            panel: sidePanel.CATEGORY,
            role: [roles.MECA_ADMIN],
        },
    ]

    const bottomButton = [
        {
            icon: <MdPersonPin />,
            title: "Profile",
            size: 18,
            onClick: () => {
                console.log("Profile Button Clicked");
            },
        },
        {
            icon: <MdLogout />,
            title: "Logout",
            size: 18,
            onClick: () => {
                console.log("Logout Button Clicked");
            },
        },
    ]

    const handleButtonClick = (index:any, panel:any) => {
        setActiveButton(index);
        dispatch(dashboardActions.setNavButton(panel));
    };

    const filteredButtons = buttons.filter((button) => button.role.includes(role))

    return (
        <>
            <div className={`w-[280px] fixed h-screen py-[32px] border-2 border-r-[#EAECF0] bg-white`}>
                <h1 className={`text-[#0852C0] mx-[35px] text-[30px] font-[700]`}>e-meca</h1>
                <div className={`mx-[31px] mt-[52px]`}>
                    {filteredButtons.map((btn, index) => (
                        <button
                            key={index}
                            className={`flex items-center text-[#364152] rounded-full hover:bg-[#EFF4FF] hover:text-[#0852C0] w-full py-[8px] px-[12px] gap-4 mb-[16px] ${activeButton === index ? 'bg-[#EFF4FF] text-[#0852C0]' : ''}`}
                            onClick={() => handleButtonClick(index, btn.panel)}
                        >
                            <span>{React.cloneElement(btn.icon, { size: btn.size })}</span>
                            <span>{btn.title}</span>
                        </button>
                    ))}
                </div>
                <div className={`absolute bottom-0 mx-[31px]`}>
                    {bottomButton.map((btn, index) => (
                        <button key={index}
                                className={`flex items-center text-[#364152] rounded-full hover:bg-[#EFF4FF] hover:text-[#0852C0] w-[208px] py-[8px] px-[12px] gap-4 mb-[16px]`}
                                onClick={btn.onClick}>
                            <span>{React.cloneElement(btn.icon, { size: btn.size })}</span>
                            <span>{btn.title}</span>
                        </button>
                    ))}
                </div>

            </div>
        </>
    );
}

export default Index;
