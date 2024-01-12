"use client";

import { topDealUsers } from "@/actions/data";
import { Background } from "@cloudinary/url-gen/qualifiers";
import { User, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ResponsiveContainer, BarChart, Bar, Tooltip, PieChart, Pie, Cell } from 'recharts';

type Props = {
    color: string;
    title: string;
    dataKey: string;
    chartData: any[];
}

interface PieChartBoxProps {
    data: Props
}
  
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const PieChartBox: React.FC<PieChartBoxProps> = ({
data
}) => {
    const params = useParams();

    return (
       <div className="flex flex-col justify-between h-full w-full">
            <h1 className="text-lg mb-5">{data.title}</h1>
            <div className="flex items-center justify-center w-full h-full">
                <ResponsiveContainer width="99%" height={300}>
                    <PieChart>
                        <Tooltip 
                            contentStyle={{background:"white", borderRadius:"5px"}}
                        />
                        <Pie
                        data={data.chartData}
                        innerRadius={"70%"}
                        outerRadius={"90%"}
                        paddingAngle={5}
                        dataKey={data.dataKey}
                        >
                        {data.chartData.map((item) => (
                            <Cell 
                                key={item?.name} 
                                fill={item?.color} 
                            />
                        ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-between gap-2.5 text-sm">
                {data.chartData.map((item) => (
                    <div className="flex flex-col gap-2.5 items-center" key={item.name}>
                        <span>{item.name}</span>
                        <div className="flex gap-2.5 items-center">
                            <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor:item.color}} />
                            <span>{item.value}</span>
                        </div>
                        
                    </div>
                    
                    )
                )}
            </div>
       </div>
    );
}