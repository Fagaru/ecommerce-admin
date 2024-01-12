"use client";

import { topDealUsers } from "@/actions/data";
import { User, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';

type Props = {
    color: string;
    title: string;
    dataKey: string;
    chartData: object[];
}

interface BarChartBoxProps {
    data: Props
} 

export const BarChartBox: React.FC<BarChartBoxProps> = ({
data
}) => {
    const params = useParams();

    return (
       <div className="h-full w-full">
            <h1 className="text-lg mb-5">{data.title}</h1>
            <div className="">
            <ResponsiveContainer width="99%" height={150}>
                <BarChart data={data.chartData}>
                    <Tooltip 
                        contentStyle={{background:"#2a3447", border:"5px"}}
                        labelStyle={{display:"none"}}
                        cursor={{fill:"none"}}
                    />
                    <Bar dataKey={data.dataKey} fill={data.color} />
                </BarChart>
            </ResponsiveContainer>
            </div>
       </div>
    );
}