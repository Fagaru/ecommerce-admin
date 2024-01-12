"use client";

import { topDealUsers } from "@/actions/data";
import { User, Users } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
    color: string;
    icon: string;
    title: string;
    dataKey: string;
    number: number | string;
    percentage: number;
    chartData: object[];
}

interface ChartBoxProps {
    data: Props
}
  

export const ChartBox: React.FC<ChartBoxProps> = ({
data
}) => {
    const params = useParams();

    return (
       <div className="flex h-full">
            <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-center gap-2.5">
                    <Users size="20px" />
                    <span className="">{data.title}</span>
                </div>
                <h1>{data.number}</h1>
                <Link 
                    key={`/${params.storeId}/products`}
                    href={`/${params.storeId}/products`}
                    style={{color: data.color}}
                >
                View all
                </Link>
            </div>
            <div className="flex flex-1 flex-col justify-between">
                <div className="h-full w-full">
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={data.chartData}>
                            <Tooltip 
                                contentStyle={{background:"transparent", border:"none"}}
                                labelStyle={{display:"none"}}
                                position={{ x: 10, y: 50 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey={data.dataKey}
                                stroke={data.color}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-lg font-bold" style={{color: data.percentage<0 ? "tomato" : "limegreen" }}>{data.percentage}%</span>
                    <span className="text-sm">this month</span>
                </div>
            </div>
       </div>
    );
}