import { ChartBox } from "@/components/analytics/chart-box";
import { TopBox } from "@/components/analytics/top-box";
import { 
    chartBoxUser, 
    chartBoxRevenue, 
    chartBoxProduct, 
    chartBoxConversion, 
    barChartBoxVisit, 
    barChartBoxRevenue, 
    pieChartBoxProduct,
    bigChartBoxRevenue
 } from "@/actions/data";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { BarChartBox } from "@/components/analytics/barChart-box";
import { PieChartBox } from "@/components/analytics/pieChart-box";
import { BigChartBox } from "@/components/analytics/bigChart-box";


const HomePage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    // const sizes = await prismadb.size.findMany({
    //     where: {
    //         storeId: params.storeId
    //     },
    //     orderBy: {
    //         createdAt: 'desc'
    //     }
    // });

    // const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    //     id: item.id,
    //     name: item.name,
    //     value: item.value,
    //     createdAt: format(item.createdAt, "MMMM do, yyyy")
    // }));

    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-1 gap-5 p-2 auto-rows-[minmax(180px,auto)]">
            <div className="row-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                <TopBox />
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <ChartBox data={chartBoxUser}/>
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <ChartBox data={chartBoxProduct}/>
            </div>
            <div className="row-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                <PieChartBox data={pieChartBoxProduct}/>
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <ChartBox data={chartBoxConversion}/>
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <ChartBox data={chartBoxRevenue}/>
            </div>
            <div className="col-span-2 row-span-2 p-5 rounded-[10px] border-solid border-[1px]">
                <BigChartBox data={bigChartBoxRevenue}/>
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <BarChartBox data={barChartBoxVisit} />
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <BarChartBox data={barChartBoxRevenue} />
            </div>
        </div>
    );
}

export default HomePage;