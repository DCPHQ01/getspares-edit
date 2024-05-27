import React from "react";
import { roles } from "../../utils";
import { MdSearch } from "react-icons/md";
// import styles from "../overview/styles.module.css";
// import styles from "../meca_admin-dashboardFolder/overview/styles.module.css";
import styles from "../overview/styles.module.css"
import image1 from "../../../../assets/dashboardAssets/Avatar.png";
import image2 from "../../../../assets/dashboardAssets/Avatar1.png";
import Image from "next/image";

const data = [
  {
    avatar: image1,
    name: "Ebuka Shima Oke",
    email: "ebukashima@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 200,000.00",
    date: "24 June 2022",
    time: "12:00PM",
  },
  {
    avatar: image2,
    name: "Sanni Rabiu",
    email: "sannirabiu@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 1,000,000.00",
    date: "30 June 2023",
    time: "06:00PM",
  },
  {
    avatar: image1,
    name: "Ayodele Olakoya",
    email: "ayodeleola@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 600,000.00",
    date: "12 May 2024",
    time: "08:45PM",
  },
  {
    avatar: image2,
    name: "Ngozi Ike",
    email: "ngoziike.com",
    sale: "MCA3435656jh787",
    vale: "₦ 120,000.00",
    date: "02 Sep 2022",
    time: "11:15AM",
  },
  {
    avatar: image1,
    name: "Ayodele Olakoya",
    email: "ayodeleola@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 700,000,00",
    date: "30 Aug 2022",
    time: "04:00PM",
  },

  {
    avatar: image1,
    name: "Ebuka Shima Oke",
    email: "ebukashima@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 200,000.00",
    date: "24 June 2022",
    time: "12:00PM",
  },
  {
    avatar: image2,
    name: "Sanni Rabiu",
    email: "sannirabiu@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 1,000,000.00",
    date: "30 June 2023",
    time: "06:00PM",
  },
  {
    avatar: image2,
    name: "Ngozi Ike",
    email: "ngoziike.com",
    sale: "MCA3435656jh787",
    vale: "₦ 120,000.00",
    date: "02 Sep 2022",
    time: "11:15AM",
  },
  {
    avatar: image1,
    name: "Ayodele Olakoya",
    email: "ayodeleola@gmail.com",
    sale: "MCA3435656jh787",
    vale: "₦ 700,000,00",
    date: "30 Aug 2022",
    time: "04:00PM",
  },
];

interface IProps {
  buyerRoles: string;
}

function Index({ buyerRoles }: IProps) {
  const role: any = buyerRoles;

  return (
    <div className="">
      <div>
        <div className="flex gap-x-2 ">
          <h1
            id="welcomeTitle"
            className={`font-semibold text-[1.9rem] text-[#101828]`}
          >
            Orders
          </h1>
          <div className="w-16 h-6 rounded-full border-2 mt-3">
            <p className="text-xs text-center mt-1 ">430,607</p>
          </div>
        </div>
        <p id="welcomeText" className={`text-[#364152]`}>
          Keep track of buyers, items bought and their transaction values.
        </p>
      </div>

      <div
        className="flex mt-4 items-center gap-x-2 relative"
        id="searchDesktop"
      >
        <MdSearch size={24} className="absolute left-1 text-mecaGoBackArrow" />
        <input
          id="inputSearchDesktop"
          placeholder="Search for buyers"
          className="border-2 w-[253px]  h-[44px] rounded-full px-9 outline-none"
        />
      </div>

      <div id="tableContainer">
        <div
          id="mecaAdminTable"
          className={`my-[1.25rem] w-full max-h-[30rem] overflow-y-auto scrollbar-none ${styles.table}`}
        >
          <table id="adminTable" className={`w-full`}>
            <thead>
              <tr>
                <th id="companyNameHeader">Product</th>
                <th id="totalItemsSoldHeader">Order ID</th>
                <th id="transactionValueHeader">Transaction value</th>
                <th id="dateTimeJoinedHeader">Buyers</th>
                <th id="dateTimeJoinedHeader">Date & time ordered</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, index) => (
                <tr key={index} id={`row_${index}`}>
                  <td id={`companyData_${index}`}>
                    <div
                      className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                    >
                      <Image
                        src={d.avatar}
                        className="object-contain"
                        alt="Avatar"
                        id={`avatar_${index}`}
                      />
                      <div id={`companyDetails_${index}`}>
                        <div>{d.name}</div>
                      </div>
                    </div>
                  </td>

                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                    id={`itemsSold_${index}`}
                  >
                    {d.sale}
                  </td>

                  <td
                    className={`text-[0.88rem] py-[1rem] px-[3.13rem]`}
                    id={`transactionValue_${index}`}
                  >
                    {d.vale}
                  </td>

                  <td id={`companyData_${index}`}>
                    <div
                      className={`flex gap-3 text-[0.88rem] py-[1rem] px-[1.25rem]`}
                    >
                      <Image
                        src={d.avatar}
                        className="object-contain"
                        alt="Avatar"
                        id={`avatar_${index}`}
                      />
                      <div id={`companyDetails_${index}`}>
                        <div>{d.name}</div>
                        <div className={`text-[#4B5565]`} id={`email_${index}`}>
                          {d.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td id={`dateJoined_${index}`}>
                    <div className={`text-[0.88rem] py-[1rem] px-[2.75rem]`}>
                      <div id={`date_${index}`}>{d.date}</div>
                      <div className={`text-[#4B5565]`} id={`time_${index}`}>
                        {d.time}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Index;
