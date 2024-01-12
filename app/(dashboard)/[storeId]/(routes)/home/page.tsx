import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

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

 import { ChartBox } from "@/components/analytics/chart-box";
import { TopBox } from "@/components/analytics/top-box";
import { BarChartBox } from "@/components/analytics/barChart-box";
import { PieChartBox } from "@/components/analytics/pieChart-box";
import { BigChartBox } from "@/components/analytics/bigChart-box";
import { getProducts } from "@/actions/get-products";
import { getOrders } from "@/actions/get-orders";
import GoogleMapSecionApiKeyWrapper from "@/providers/components/google-map-apikey-wrapper";


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

    const orders = await getOrders(params.storeId, "accepted", "in preparation");

    const formattedData = orders.map((item) => ({
        products: item.orderItems.map((orderItem) => orderItem.product.name),
        totalPrice: item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)*Number(item.quantity)
        }, 0),
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    const totalPrices = formatter.format(formattedData.reduce((total, item) => {
        return total + item.totalPrice
    }, 0));

    const totalPoducts = formattedData.reduce((total, item) => {
        return total + item.products.length
    }, 0);

    const formattedProducts = {
        color: "skyblue",
        icon: "/productIcon.svg",
        title: "Total Products",
        number: totalPoducts,
        dataKey: "product",
        percentage: 21,
        chartData: formattedData.map((item) => (
          { name: item.createdAt, product: item.products.length } 
        ))
      };

    const formattedProfit = {
        color: "#8884d8",
        icon: "/productIcon.svg",
        title: "Profit Earned",
        number: totalPrices,
        dataKey: "profit",
        percentage: 21,
        chartData: formattedData.map((item) => (
          { name: item.createdAt, profit: item.totalPrice } 
        ))
      };

    const formattedRevenue = {
        color: "teal",
        icon: "/productIcon.svg",
        title: "Total revenue",
        number: totalPrices,
        dataKey: "revenue",
        percentage: 21,
        chartData: formattedData.map((item) => (
          { name: item.createdAt, revenue: item.totalPrice } 
        ))
      };

    
    const formattedOrders = {
        color: "#8884d8",
        icon: "/productIcon.svg",
        title: "Total Orders",
        number: formattedData.length,
        dataKey: "order",
        percentage: 21,
        chartData: formattedData.map((item) => (
          { name: item.createdAt, order: 1 } 
        ))
      };
      console.log("formattedData", formattedOrders);

    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-1 gap-5 p-2 auto-rows-[minmax(180px,auto)]">
            <div className="row-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                <TopBox />
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <ChartBox data={formattedOrders}/>
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <ChartBox data={formattedProducts}/>
            </div>
            <div className="row-span-3 p-5 rounded-[10px] border-solid border-[1px]">
                <PieChartBox data={pieChartBoxProduct}/>
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <ChartBox data={chartBoxConversion}/>
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <ChartBox data={formattedRevenue}/>
            </div>
            <div className="col-span-2 row-span-2 p-5 rounded-[10px] border-solid border-[1px]">
                <BigChartBox data={bigChartBoxRevenue}/>
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <BarChartBox data={barChartBoxVisit} />
            </div>
            <div className="p-5 rounded-[10px] border-solid border-[1px]">
                <BarChartBox data={formattedProfit} />
            </div>
            <div>
                <GoogleMapSecionApiKeyWrapper />
            </div>
        </div>
    );
}

export default HomePage;