"use client";

import { topDealUsers } from "@/actions/data";

interface TopBoxProps {
    data: any
}

export const TopBox = ({

}) => {

    return (
       <div className="">
        <h1 className="mb-5">Top Deals</h1>
        <div className="list">
            {topDealUsers.map((user) => (
                <div className="flex items-center justify-between mb-[30px]" key={user.id}>
                    <div className="flex gap-5">
                        <img src={user.img} alt="" className="w-10 h-10 object-cover rounded-full"/>
                        <div className="flex flex-col gap-[5px]">
                            <span className="text-sm font-medium">{user.username}</span>
                            <span className="text-sm/[12px] ">{user.email}</span>
                        </div>
                    </div>
                    <span className="font-medium">${user.amount}</span>
                </div>
            ))}
        </div>
       </div>
    );
}