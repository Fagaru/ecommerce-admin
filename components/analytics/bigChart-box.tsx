"use client";

import { useParams } from "next/navigation";
import { ResponsiveContainer, BarChart, Bar, Tooltip, AreaChart, CartesianGrid, XAxis, YAxis, Area } from 'recharts';

type Props = {
    color: string;
    title: string;
    dataKey: string;
    chartData: object[];
}

interface BigChartBoxProps {
    data: Props
} 

export const BigChartBox: React.FC<BigChartBoxProps> = ({
data
}) => {
    const params = useParams();

    return (
       <div className="flex flex-col h-full w-full justify-between">
            <h1>{data.title}</h1>
            <div className="w-full h-[300px]">
            <ResponsiveContainer width="99%" height="100%">
                <AreaChart
                    data={data.chartData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="paracetamol" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="doliprane" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="amoxiline" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
            </ResponsiveContainer>
            </div>
       </div>
    );
}